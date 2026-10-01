import { readFile } from 'fs/promises';
import { join } from 'path';
import type { Excursion, ExcursionVariant } from '@/types';
import { getExcursionById } from '@/app/actions';
import { createClient } from '@/lib/supabase/server';
import ExcursionDetailClient from './excursion-detail-client';
import type { RelatedItem } from './excursion-detail-client';
import type { Review, ProductRating } from './detail/reviews-section';
import { notFound } from 'next/navigation';
import * as TiqetsApi from '@/lib/tiqets-api';
import { getExperienceByIdFromCache, getVariantsForExperience, loadCache, EXPERIENCES_CACHE_FILE } from '@/lib/json-cache';

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

/**
 * How many product IDs to probe against the Availability API.
 *
 * The API is one request per product and an experience can own dozens, so this
 * is capped. Probed products contribute real per-product pricing and tour
 * languages; the rest still render, just without a live "from" price.
 */
const AVAILABILITY_LOOKUP_LIMIT = 24;

/**
 * How many products are probed for written reviews, and how many are rendered.
 *
 * Reviews live behind one request per product, so this is capped. The products
 * with the largest review counts are chosen because they are the ones most
 * likely to return written feedback.
 */
const REVIEWS_LOOKUP_LIMIT = 6;
const REVIEWS_SHOWN = 8;

/** Images arrive either as imgix URL strings or as `{small, large, ...}` objects. */
function imageUrlsFrom(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const urls: string[] = [];
  for (const entry of value) {
    if (typeof entry === 'string' && entry) {
      urls.push(entry);
    } else if (entry && typeof entry === 'object') {
      const obj = entry as Record<string, unknown>;
      const picked = obj.extra_large || obj.large || obj.medium || obj.small;
      if (typeof picked === 'string' && picked) urls.push(picked);
    }
  }
  return urls;
}

/** `whats_included` and friends arrive as bullet lines, sometimes CRLF. */
function bullets(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  return value;
}

/**
 * Turns a cached Tiqets product into a card-ready variant.
 *
 * The enriched cache stores ratings flat (`rating`/`reviewsTotal`) and images as
 * size objects, while the older sync path used `ratings.average` and
 * `image_url`. Both are accepted so the page works regardless of which cache
 * produced the row.
 */
function normalizeProduct(product: any, excursion: Excursion): ExcursionVariant | null {
  if (product == null || product.id == null || product.id === '') return null;

  const ratings = product.ratings || {};
  const price = Number(product.from_price ?? product.price ?? product.amount ?? 0);
  const images = imageUrlsFrom(product.images);
  const fallbackImages = imageUrlsFrom(excursion.images);

  return {
    id: String(product.id),
    name: product.title || product.name || '',
    price: Number.isFinite(price) ? price : 0,
    currency: product.currency || excursion.currency || 'USD',
    rating: typeof product.rating === 'number' ? product.rating : ratings.average ?? undefined,
    reviewsTotal:
      typeof product.reviewsTotal === 'number'
        ? product.reviewsTotal
        : ratings.total ?? ratings.count ?? undefined,
    duration: product.duration || excursion.duration || '',
    description: product.description || product.summary || excursion.description || '',
    images: images.length > 0 ? images : typeof product.image_url === 'string' ? [product.image_url] : fallbackImages,
    status: product.sale_status === 'sold_out' ? 'unavailable' : 'available',
    promo_label: typeof product.promo_label === 'string' ? product.promo_label : null,
    whats_included: bullets(product.whats_included),
    whats_excluded: bullets(product.whats_excluded),
    cancellation: product.cancellation || null,
    smartphone_ticket: product.smartphone_ticket === true,
    instant_ticket_delivery: product.instant_ticket_delivery === true,
    wheelchair_access: product.wheelchair_access === true,
    skip_line: product.skip_line === true,
    audio_guide_languages: Array.isArray(product.audio_guide_languages) ? product.audio_guide_languages : null,
    age_range: product.age_range || null,
    advance_arrival_time: product.advance_arrival_time || null,
    good_to_know: bullets(product.good_to_know),
    must_know: bullets(product.must_know),
    usage: bullets(product.usage),
    safety_measures: bullets(product.safety_measures),
    sale_status: product.sale_status,
    is_package: product.is_package === true,
  } as ExcursionVariant;
}

function collectProducts(excursion: Excursion): any[] {
  if (Array.isArray(excursion.product_groups) && excursion.product_groups.length > 0) {
    return excursion.product_groups.flatMap((group) =>
      Array.isArray(group?.products) ? group.products : [],
    );
  }
  return [];
}

/**
 * The live `/experiences/{id}` payload carries only `product_ids`; the
 * per-product detail (ratings, inclusions, flags) lives in the enriched
 * `public/excursions.json` snapshot keyed by experience id. The snapshot is
 * preferred because it is the only place that detail exists.
 */
let enrichedSnapshot: Promise<any[]> | null = null;

async function loadEnrichedExperiences(): Promise<any[]> {
  if (!enrichedSnapshot) {
    enrichedSnapshot = readFile(join(process.cwd(), 'public', 'excursions.json'), 'utf-8')
      .then((raw) => {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : parsed?.experiences || [];
      })
      .catch(() => []);
  }
  return enrichedSnapshot;
}

async function enrichedProductsFor(experienceId: string): Promise<any[]> {
  const experiences = await loadEnrichedExperiences();
  const match = experiences.find(
    (e: any) => String(e?.id) === String(experienceId) && Array.isArray(e?.product_groups),
  );
  if (!match) return [];
  return match.product_groups.flatMap((group: any) =>
    Array.isArray(group?.products) ? group.products : [],
  );
}

/**
 * Runs tasks with a small concurrency window.
 *
 * Firing every product's availability request at once trips the Tiqets rate
 * limit, so requests are deliberately staggered.
 */
async function mapWithConcurrency<T, R>(items: T[], limit: number, task: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await task(items[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

export default async function ExcursionDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let excursion = await getExperienceByIdFromCache(params.id);
  if (!excursion) excursion = await getExcursionById(params.id);

  if (!excursion) {
    const experiences = await loadCache<any>(EXPERIENCES_CACHE_FILE);
    const parent = (experiences || []).find((e: any) =>
      Array.isArray(e.product_ids) && e.product_ids.some((pid: any) => String(pid) === params.id),
    );
    if (parent) {
      excursion = {
        id: parent.id,
        name: parent.name || parent.title || 'Experience',
        city: parent.city || parent.city_name || '',
        country: parent.country || parent.country_name || '',
        description: parent.description || '',
        price: parent.price || 0,
        currency: parent.currency || 'USD',
        duration: parent.duration || '',
        images: imageUrlsFrom(parent.images),
        rating: parent.rating || 0,
        activitytypeid: parent.id,
        excursionType: { id: parent.id, name: parent.title || 'Activity' },
        status: 'active',
        partner_id: null,
        reviews: [],
        product_ids: parent.product_ids || [],
        reviewsTotal: parent.reviewsTotal || 0,
        tag_ids: [],
        experience_url: parent.experience_url || '',
        variants: [],
      } as any;
    }
  }

  if (!excursion) notFound();

  // Build the product list, in descending order of data richness: the enriched
  // snapshot, then any groups on the row itself, then a live product lookup.
  // `cache/variants.json` is written by the older sync and carries no
  // per-product detail, so it is only a last resort.
  const experienceId = (excursion as Excursion).id;
  const products = [
    ...(await enrichedProductsFor(experienceId)),
    ...collectProducts(excursion as Excursion),
  ];

  let variants: ExcursionVariant[] = [];
  const seenProductIds = new Set<string>();
  for (const product of products) {
    const variant = normalizeProduct(product, excursion as Excursion);
    if (!variant || seenProductIds.has(variant.id)) continue;
    seenProductIds.add(variant.id);
    variants.push(variant);
  }

  if (variants.length === 0) {
    const productIds = Array.isArray((excursion as Excursion).product_ids)
      ? ((excursion as Excursion).product_ids as unknown[]).map(String)
      : [];
    if (productIds.length > 0) {
      variants = (await TiqetsApi.fetchTiqetsProductVariants(productIds)) as ExcursionVariant[];
    }
  }

  if (variants.length === 0) {
    const cached = await getVariantsForExperience(experienceId);
    variants = cached.map((v: any) => ({ ...v, status: 'available' })) as ExcursionVariant[];
  }

  // One Availability pass per product, reused for tour languages, the date
  // strip, and per-product "from" pricing.
  const productIds = variants.map((v) => v.id).slice(0, AVAILABILITY_LOOKUP_LIMIT);
  const availabilities = await mapWithConcurrency(productIds, 4, (pid) =>
    TiqetsApi.fetchTiqetsAvailabilityCached(pid),
  );

  const priceByProduct = new Map<string, { price: number; currency: string }>();
  const languagesByProduct = new Map<string, string[]>();
  const dateMap = new Map<string, { date: string; price: number | null; currency: string | null; availability: number | null; timeslots: number }>();

  for (const availability of availabilities) {
    if (!availability) continue;

    // Lowest real price this product offers, used as its "from" price.
    for (const day of availability.dates) {
      if (typeof day.price !== 'number' || day.price <= 0 || !day.currency) continue;
      const best = priceByProduct.get(availability.productId);
      if (!best || day.price < best.price) {
        priceByProduct.set(availability.productId, { price: day.price, currency: day.currency });
      }
    }

    for (const variant of availability.variants) {
      if (variant.languages.length > 0 && !languagesByProduct.has(variant.id)) {
        languagesByProduct.set(variant.id, variant.languages);
      }
    }

    // Union every product's dates so the strip covers the whole experience.
    for (const day of availability.dates) {
      const existing = dateMap.get(day.date);
      if (!existing) {
        dateMap.set(day.date, { ...day });
        continue;
      }
      const prices = [existing.price, day.price].filter((p): p is number => typeof p === 'number');
      const quantities = [existing.availability, day.availability].filter(
        (a): a is number => typeof a === 'number',
      );
      dateMap.set(day.date, {
        date: day.date,
        price: prices.length > 0 ? Math.min(...prices) : null,
        currency: existing.currency || day.currency,
        availability: quantities.length > 0 ? Math.max(...quantities) : null,
        timeslots: existing.timeslots + day.timeslots,
      });
    }
  }

  const dates = [...dateMap.values()].sort((a, b) => a.date.localeCompare(b.date));

  // Real reviews. `/products/{id}/reviews` is the only source of written
  // reviews; the Content API's own `reviews` field is always null. Reviews
  // without text are dropped because an empty card is worse than a short list.
  const ranked = [...variants]
    .filter((variant) => (variant.reviewsTotal || 0) > 0)
    .sort((a, b) => (b.reviewsTotal || 0) - (a.reviewsTotal || 0))
    .slice(0, REVIEWS_LOOKUP_LIMIT);

  const reviewGroups = await mapWithConcurrency(ranked, 4, (variant) =>
    TiqetsApi.fetchTiqetsProductReviews(variant.id),
  );

  const reviews: Review[] = [];
  const seenReviewIds = new Set<string>();
  const seenBodies = new Set<string>();

  reviewGroups.forEach((group, index) => {
    const ticketTitle = ranked[index]?.name;
    for (const review of group) {
      if (!review.body) continue;
      // The same review is returned by several of an experience's product
      // endpoints, so dedupe by id and by normalised text.
      const bodyKey = review.body.toLowerCase().replace(/\s+/g, ' ').trim();
      if (seenReviewIds.has(String(review.id)) || seenBodies.has(bodyKey)) continue;
      seenReviewIds.add(String(review.id));
      seenBodies.add(bodyKey);

      reviews.push({
        id: review.id,
        author: review.author,
        rating: review.rating,
        date: review.date,
        source: review.source,
        body: review.body,
        ticketTitle,
      });
    }
  });
  reviews.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  const productRatings: ProductRating[] = ranked
    .filter((variant) => typeof variant.rating === 'number')
    .map((variant) => ({
      title: variant.name,
      rating: Number(variant.rating),
      reviewsTotal: Number(variant.reviewsTotal || 0),
    }));

  variants = variants.map((variant) => {
    const languages = languagesByProduct.get(variant.id);
    const price = priceByProduct.get(variant.id);
    return {
      ...variant,
      // Tour languages come from `language_selection` only, so only the
      // availability probe can set them.
      language_selection: languages,
      price: price && price.price > 0 ? price.price : variant.price,
      currency: price ? price.currency : variant.currency,
    };
  });

  // Related content is derived from the shared experiences cache so the page
  // stays a pure function of cached data.
  const all = await loadEnrichedExperiences();
  const pool = Array.isArray(all) && all.length > 0 ? all : [];
  const id = (excursion as Excursion).id;
  const city = (excursion as Excursion).city;
  const country = (excursion as Excursion).country;

  const toRelated = (item: any): RelatedItem => ({
    id: String(item.id),
    name: item.name || item.title || '',
    city: item.city || item.city_name || '',
    description: item.description || '',
    price: Number(item.price || 0),
    currency: item.currency || 'USD',
    rating: item.rating || 0,
    reviewsTotal: item.reviewsTotal || item.reviews_total || 0,
    images: imageUrlsFrom(item.images).slice(0, 1),
  });

  const sameCity = pool.filter((e: any) => String(e.id) !== String(id) && e.city === city && e.city);
  const sameCountry = pool.filter(
    (e: any) => String(e.id) !== String(id) && e.city !== city && e.country === country,
  );

  const alsoBought = [...sameCity, ...sameCountry].slice(0, 3).map(toRelated);
  const topThings = [...sameCity, ...sameCountry].slice(0, 8).map(toRelated);

  // `cache/locations.json` is a near-empty stub, so the city list is read from
  // the populated public snapshot.
  let nearbyCities: string[] = [];
  try {
    const raw = await readFile(join(process.cwd(), 'public', 'locations.json'), 'utf-8');
    const parsed = JSON.parse(raw);
    const cities = Array.isArray(parsed) ? parsed : parsed?.cities || [];
    nearbyCities = [
      ...new Set(
        cities
          .filter((c: any) => c.country_name === country && c.name && c.name !== city)
          .map((c: any) => c.name as string),
      ),
    ].slice(0, 8);
  } catch {
    nearbyCities = [];
  }

  return (
    <ExcursionDetailClient
      excursion={{ ...(excursion as Excursion), variants }}
      user={user}
      language={TiqetsApi.getDisplayLanguage()}
      dates={dates}
      reviews={reviews.slice(0, REVIEWS_SHOWN)}
      productRatings={productRatings}
      alsoBought={alsoBought}
      topThings={topThings}
      nearbyCities={nearbyCities}
    />
  );
}
