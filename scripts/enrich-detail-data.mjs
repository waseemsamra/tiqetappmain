import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CONCURRENCY = 2;
const MAX_ATTEMPTS = 6;

/**
 * Enriches `public/excursions.json` with the per-product fields the detail
 * page needs for its option cards and accordions.
 *
 * The Content API exposes these on `/products/{id}` but the listing cache only
 * kept title, price and images. `promo_label` in particular is what Tiqets
 * uses for merchandising badges, and it is null for most products here, so the
 * UI derives honest tags from real flags instead (instant delivery, mobile
 * ticket, cancellation window, low remaining capacity).
 *
 * Safe to re-run: prices and images are left exactly as they are.
 */
const filePath = join(process.cwd(), 'public', 'excursions.json');
const parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
const experiences = Array.isArray(parsed.experiences) ? parsed.experiences : [];

const headers = {
  Accept: 'application/json',
  'User-Agent': 'tiqetapp-detail-enrich',
  ...(process.env.TIQETS_API_KEY ? { Authorization: 'Token ' + process.env.TIQETS_API_KEY } : {}),
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchProduct(id) {
  const url = `https://api.tiqets.com/v2/products/${id}`;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const res = await fetch(url, { headers });
    if (res.status === 404) return null;
    if (res.status === 429 || res.status >= 500) {
      await sleep(1000 * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 400));
      continue;
    }
    if (!res.ok) return null;
    const data = await res.json();
    return data.product || data;
  }
  return null;
}

async function mapLimit(items, limit, worker) {
  const results = [];
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

const DETAIL_FIELDS = [
  'promo_label', 'whats_included', 'whats_excluded', 'cancellation',
  'smartphone_ticket', 'instant_ticket_delivery', 'wheelchair_access',
  'skip_line', 'audio_guide_languages', 'age_range', 'duration',
  'advance_arrival_time', 'good_to_know', 'must_know', 'usage',
  'opening_times', 'exhibitions', 'safety_measures', 'sale_status',
  // `is_package` is the only reliable signal that a product bundles several
  // experiences. Titles are not a substitute: plenty of single-attraction
  // products contain "+" purely for an included drink or souvenir.
  'is_package',
];

// The listing cache flattens product_groups to []; rebuild it from the API so
// the detail page has real per-product data to render.
const allProductIds = [
  ...new Set(
    experiences.flatMap((e) => (Array.isArray(e.product_ids) ? e.product_ids : []).map(String)),
  ),
];

console.log(`enriching ${allProductIds.length} products across ${experiences.length} experiences`);

const products = new Map();
const fetched = await mapLimit(allProductIds, CONCURRENCY, async (id) => [id, await fetchProduct(id)]);
for (const [id, product] of fetched) {
  if (!product) continue;
  const slim = { id: String(product.id ?? id), title: product.title || '' };
  for (const field of DETAIL_FIELDS) {
    const value = product[field];
    if (value !== undefined && value !== null && value !== '') slim[field] = value;
  }
  if (product.ratings) {
    slim.rating = product.ratings.average ?? null;
    slim.reviewsTotal = product.ratings.total ?? product.ratings.count ?? null;
  }
  if (Array.isArray(product.images) && product.images.length) slim.images = product.images;
  products.set(String(id), slim);
}

let enriched = 0;
for (const experience of experiences) {
  if (!Array.isArray(experience.product_ids) || experience.product_ids.length === 0) continue;
  const groups = experience.product_ids.map((id) => products.get(String(id))).filter(Boolean);
  if (!groups.length) continue;
  experience.product_groups = [{ products: groups }];
  enriched++;
}

writeFileSync(filePath, `${JSON.stringify(parsed, null, 0)}\n`);
console.log(`experiences enriched: ${enriched}/${experiences.length}, products resolved: ${products.size}`);
