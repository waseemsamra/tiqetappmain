import { readPreferenceCookie } from '@/lib/preference-cookie';
import { mergeTiqetsImageUrls, pickTiqetsImageUrls } from '@/lib/tiqets-image';
import {
  CURRENCY_COOKIE,
  DEFAULT_CURRENCY,
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE,
  isSupportedCurrency,
  isSupportedLanguage,
} from '@/lib/preferences';

const TIQETS_API_BASE = 'https://api.tiqets.com/v2';
const TIQETS_API_KEY = process.env.TIQETS_API_KEY;

if (!TIQETS_API_KEY) {
  console.warn('[Tiqets] Missing TIQETS_API_KEY; running in offline/local-survey mode.');
}

const headers = {
  'Accept': 'application/json',
  'User-Agent': 'my user agent',
  ...(TIQETS_API_KEY ? { 'Authorization': `Token ${TIQETS_API_KEY}` } : {}),
};

const isTiqetsAvailable = !!TIQETS_API_KEY;

function readCookie(name: string): string | undefined {
  return readPreferenceCookie(name);
}

/**
 * The currency the visitor picked in the settings modal, falling back to the
 * app default. Tiqets converts server-side via `?currency=`, so the price shown
 * here is the price checkout will charge.
 */
export function getDisplayCurrency(): string {
  const fromCookie = readCookie(CURRENCY_COOKIE);
  if (isSupportedCurrency(fromCookie)) return fromCookie as string;
  const fromEnv = process.env.NEXT_PUBLIC_DEFAULT_CURRENCY;
  if (isSupportedCurrency(fromEnv)) return fromEnv as string;
  return DEFAULT_CURRENCY;
}

export function getDisplayLanguage(): string {
  const fromCookie = readCookie(LANGUAGE_COOKIE);
  if (isSupportedLanguage(fromCookie)) return fromCookie as string;
  const fromEnv = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
  if (isSupportedLanguage(fromEnv)) return fromEnv as string;
  return DEFAULT_LANGUAGE;
}

function appendParam(url: string, key: string, value: string): string {
  if (new RegExp(`[?&]${key}=`).test(url)) return url;
  return `${url}${url.includes('?') ? '&' : '?'}${key}=${encodeURIComponent(value)}`;
}

export function withCurrency(url: string): string {
  return appendParam(url, 'currency', getDisplayCurrency());
}

/**
 * Applies the visitor's chosen content language.
 *
 * The parameter is `lang`, not `language` -- Tiqets ignores `?language=`
 * silently and keeps returning English, which is easy to mistake for "no
 * translations available". Verified against the live API: `?lang=de`, `fr`,
 * `es`, `ja` and the other supported codes all return translated title,
 * tagline and description.
 */
export function withLanguage(url: string): string {
  return appendParam(url, 'lang', getDisplayLanguage());
}

/** Applies both the visitor's language and currency preferences to a request URL. */
export function withPreferences(url: string): string {
  return appendParam(
    appendParam(url, 'currency', getDisplayCurrency()),
    'lang',
    getDisplayLanguage(),
  );
}

export function transformTiqetsProduct(product: any, fallbackCity?: string): Excursion {
  const ratingValue = product.ratings?.average;
  const ratingsTotal = product.ratings?.total || product.ratings?.count || 0;
  const safeRating = typeof ratingValue === 'number' ? ratingValue : 
                   typeof ratingValue === 'string' && !isNaN(Number(ratingValue)) ? Number(ratingValue) : 0;
       
    const imageUrls = pickTiqetsImageUrls(product.images);
   
   // For packages without images, try to get images from package_products
  if (imageUrls.length === 0 && Array.isArray(product.package_products) && product.package_products.length > 0) {
    // We'll populate these asynchronously in the calling code
    // For now, use the summary as it often contains rich info
  }

  // City and country can be at top level (products) or inside address (experiences)
  const city = product.city_name || product.address?.city_name || '';
  const country = product.country_name || product.address?.country_name || '';
  
  // Use summary for packages when description/tagline are empty
  const description = product.description || product.summary || '';
  const tagline = product.tagline || '';

    return {
      id: product.id?.toString() || Math.random().toString(36).substring(2, 9),
      name: product.title || '',
      city: city,
      country: country,
      description: description,
      price: Number(product.from_price || product.price || 0),
      currency: product.currency || getDisplayCurrency(),
      duration: product.duration || 'Not specified',
      activitytypeid: product.id?.toString() || 'default',
      excursionType: {
        id: product.id?.toString() || 'default',
        name: tagline || 'Activity'
      },
     rating: safeRating,
     images: imageUrls,
     discount: product.promo_label ? 0 : undefined,
     operatinghours: undefined,
     whatsincluded: product.whats_included || '',
     whatsnotincluded: product.whats_excluded || '',
     instructions: product.checkout_information?.usage || product.how_to_use || '',
     howtogetthere: product.venue?.address || product.address?.street || '',
     additionalinfo: product.checkout_information?.good_to_know || '',
     cancellationpolicy: product.variants?.[0]?.cancellation || '',
     status: 'active' as const,
     partner_id: null,
     reviews: [],
     product_ids: product.product_ids || [],
     reviewsTotal: ratingsTotal,
     tag_ids: Array.isArray(product.tag_ids) ? product.tag_ids.map(String) : [],
     experience_url: product.experience_url || '',
     product_groups: Array.isArray(product.product_groups) ? product.product_groups : []
   };
}

function transformTiqetsCountry(country: any): Country {
  return {
    id: parseInt(country.id) || 0,
    name: country.name || '',
    code: country.id || '',
    currency: 'USD',
    currency_symbol: '$'
  };
}

function transformTiqetsCity(city: any): City {
  return {
    id: city.id || '',
    name: city.name || '',
    country_code: city.country_id || ''
  };
}

// Use city ID from API - known working city IDs for filtering
export const KNOWN_CITY_IDS: Record<string, string> = {
    'barcelona': '66342',
    'rome': '71631',
    'paris': '66746',
    'milan': '71749',
    'florence': '71854',
    'venice': '71510',
    'antwerp': '60863',
    'sintra': '76496',
    'amsterdam': '75061',
    'new york': '260932',
    'dubai': '60005',
    'abu dhabi': '60013',
    'sharjah': '60007',
    'lima': '75306',
    'cusco': '75323',
    'puno': '75296',
    'arequipa': '75334',
    'aguas calientes': '261863',
    'london': '67458',
    'mexico city': '67461',
    'buenos aires': '60189',
    'ushuaia': '60210',
    'salta': '60240',
    'bariloche': '60331',
    'kuala lumpur': '74416',
    'singapore': '78125',
    'bangkok': '78586',
    'san carlos de bariloche': '272595',
    'palm beach': '263317',
    'nassau': '62236',
    'rio de janeiro': '61535',
    'vancouver': '62496',
    'toronto': '62492',
    'niagara falls': '62419',
    'montreal': '25',
    'calgary': '62338',
    'ottawa': '62431',
    'victoria': '62501',
    'quebec': '62516',
    'vaughan': '62499',
    'banff': '87579',
    'jasper': '322',
    'beaupre': '137139',
    'saint-constant': '62458',
    'britannia beach': '263089',
    'saint-joseph-de-la-rive': '270495',
    'richmond': '62452',
    'mississauga': '62408',
    'fort macleod': '136629',
    'brentwood bay': '263090',
    'whistler': '87924',
    'kamloops': '62382',
    'niagara-on-the-lake': '982',
    'gananoque': '269628',
    'edmonton': '62366',
    'scott': '271125',
    'cochrane': '62349',
    'lake louise': '137177',
    'golden': '136649',
    'gatineau': '62372',
    'squamish': '301',
    'sao paulo': '61533',
    'salvador': '61537',
    'manaus': '61539',
    'belem': '61541',
    'maceio': '61543',
    'curitiba': '61545',
    'porto alegre': '61547',
    'recife': '61549',
    'fortaleza': '61551',
    'sao luis': '61553',
    'florianopolis': '61555',
    'rio branco': '61557',
    'palmas': '61559',
    'campo grande': '61561',
    'goiania': '61563',
    'macapa': '61565',
    'teresina': '61567',
    'cuiaba': '61569',
    'porto velho': '61571',
    'joao pessoa': '61573',
    'aracaju': '61575',
    'natal': '61577',
    'cabo frio': '61579',
};

// Get all available cities from API
let cachedCities: any[] = [];
export async function getAvailableCities(): Promise<any[]> {
  if (cachedCities.length > 0) return cachedCities;
  
  try {
    const response = await fetch(`${TIQETS_API_BASE}/cities?page_size=100`, { method: 'GET', headers });
    if (response.ok) {
      const data = await response.json();
      cachedCities = data.cities || data || [];
      return cachedCities;
    }
  } catch (e) {
    console.error('Failed to fetch cities:', e);
  }
  return [];
}

export async function fetchTiqetsTags(): Promise<TiqetsTag[]> {
  try {
    const response = await fetch(`${TIQETS_API_BASE}/tags?page_size=200`, { method: 'GET', headers });
    if (!response.ok) return [];
    const data = await response.json();
    const tags = (data.tags || data || []) as any[];
    return tags.map(tag => ({
      id: String(tag.id ?? ''),
      name: tag.name || '',
      type_name: tag.type_name || '',
      type_id: String(tag.type_id ?? ''),
      type_group_name: tag.type_group_name ?? null,
    }));
  } catch (e) {
    console.error('Failed to fetch tags:', e);
    return [];
  }
}

export async function fetchTiqetsCountries(): Promise<Country[]> {
  let allCountries: any[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${TIQETS_API_BASE}/countries?page=${page}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error(`Tiqets API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const countries = data.countries || data || [];
    allCountries = allCountries.concat(countries);

    const pagination = data.pagination || {};
    if (countries.length < 10 || allCountries.length >= (pagination.total || 0)) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allCountries.map(transformTiqetsCountry);
}

export async function fetchTiqetsProducts(params: Record<string, string> = {}): Promise<Excursion[]> {
  if (!isTiqetsAvailable) {
    return [];
  }

  const allExcursions: Excursion[] = [];

  if (params.city_name) {
    const cityNameLower = params.city_name.toLowerCase();
    let cityId = KNOWN_CITY_IDS[cityNameLower];
    if (!cityId) {
      const cities = await getAvailableCities();
      const match = (cities || []).find((c: any) => (c.name || '').toLowerCase() === cityNameLower);
      if (!match || !match.id) {
        return [];
      }
      cityId = String(match.id);
    }

    const allActivities: any[] = [];

    for (let page = 1; page <= 5; page++) {
      try {
        const response = await fetch(withPreferences(`${TIQETS_API_BASE}/experiences?city_id=${cityId}&page_size=100&page=${page}`), { method: 'GET', headers });
        if (response.ok) {
          const data = await response.json();
          const products = data.experiences || data.products || data.items || [];
          allActivities.push(...products);
          if (products.length < 100) break;
        } else {
          break;
        }
      } catch (e) {
        break;
      }
    }

    for (let page = 1; page <= 5; page++) {
      try {
        const response = await fetch(withPreferences(`${TIQETS_API_BASE}/products?city_id=${cityId}&page_size=100&page=${page}`), { method: 'GET', headers });
        if (response.ok) {
          const data = await response.json();
          const items = data.products || data.experiences || data.items || [];
          allActivities.push(...items);
          if (items.length < 100) break;
        } else {
          break;
        }
      } catch (e) {
        break;
      }
    }

    if (allActivities.length > 0) {
      // Build a set of child product IDs so we can filter out variants from the flat list.
      const childProductIds = new Set<string>();
      for (const p of allActivities) {
        if (Array.isArray(p.product_ids)) {
          for (const pid of p.product_ids) {
            childProductIds.add(String(pid));
          }
        }
      }

      const transformedWithImages = await Promise.all(
        allActivities.map(async (p: any) => {
          const idStr = String(p.id);
          // Skip child products/variants; only show parent/vistable experiences
          if (childProductIds.has(idStr) && (!Array.isArray(p.product_ids) || p.product_ids.length === 0)) {
            return null;
          }

          let images: string[] = [];
          if (Array.isArray(p.images)) {
            images = pickTiqetsImageUrls(p.images);
          }
          if (images.length === 0 && p.venue?.id) {
            try {
              const venueResp = await fetch(withPreferences(`${TIQETS_API_BASE}/experiences/${p.venue.id}`), { method: 'GET', headers });
              if (venueResp.ok) {
                const venueData = await venueResp.json();
                images = pickTiqetsImageUrls(venueData.experience?.images || venueData.images);
              }
            } catch (e) {}
          }
          return { ...transformTiqetsProduct(p), images };
        })
      );
      return transformedWithImages.filter((x): x is NonNullable<typeof x> => x !== null);
    }
    return [];
  }

  if (params.country_id || params.country_name) {
    const countryFilter = params.country_id || params.country_name;
    try {
      const response = await fetch(withPreferences(`${TIQETS_API_BASE}/experiences?country_id=${countryFilter}&page_size=100`), { method: 'GET', headers });
      if (response.ok) {
        const data = await response.json();
        const products = data.experiences || data.products || data.items || [];
        if (products.length > 0) {
          return products.map(transformTiqetsProduct);
        }
      }
    } catch (e) {
      // continue
    }
    return [];
  } else {
    const prioritizedCities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam', 'London'];
    const cityPromises = prioritizedCities.map(async (city) => {
      const cityId = KNOWN_CITY_IDS[city.toLowerCase()];
      if (!cityId) return [];

      try {
        const response = await fetch(withPreferences(`${TIQETS_API_BASE}/experiences?city_id=${cityId}&page_size=100&page=1`), { method: 'GET', headers });
        if (response.ok) {
          const data = await response.json();
          const products = data.experiences || data.products || data.items || [];
          if (products.length > 0) {
            return products.map(transformTiqetsProduct);
          }
        }
      } catch (e) {
        // continue
      }

      try {
        const response = await fetch(withPreferences(`${TIQETS_API_BASE}/products?city_id=${cityId}&page_size=100&page=1`), { method: 'GET', headers });
        if (response.ok) {
          const data = await response.json();
          const products = data.products || data.experiences || data.items || [];
          return products.map(transformTiqetsProduct);
        }
      } catch (e) {
        return [];
      }

      return [];
    });

    const results = await Promise.all(cityPromises);
    for (const batch of results) {
      allExcursions.push(...batch);
    }

    if (allExcursions.length > 0) {
      return allExcursions.slice(0, 100);
    }

    return [];
  }
}

export async function fetchTiqetsProductVariants(productIds: string[]): Promise<any[]> {
  if (!productIds?.length) return [];

  const results: any[] = [];

  for (const id of productIds) {
    try {
      const response = await fetch(withPreferences(`${TIQETS_API_BASE}/products/${id}`), { method: 'GET', headers });
      if (!response.ok) continue;
      const data = await response.json();
      const product = data.product || data;
      if (!product) continue;

   const imageUrls = pickTiqetsImageUrls(product.images);

      results.push({
        id: String(product.id),
        product_id: id,
        name: product.title || product.name || '',
        label: product.title || product.name || '',
        variant_type: 'product',
        variant_type_raw: 'product',
        price: Number(product.price || product.from_price || 0),
        currency: product.currency || getDisplayCurrency(),
        // Products carry their own ratings, which differ widely from the parent
        // experience (e.g. 309 reviews vs 15,295 for Burj Khalifa). Cards must
        // show the product's own figures.
        rating: product.ratings?.average ?? undefined,
        reviewsTotal: product.ratings?.total ?? product.ratings?.count ?? undefined,
        description: product.tagline || product.description || '',
        images: imageUrls,
        status: product.sale_status || product.status || 'available',
        duration: product.duration || '',
        whatsincluded: product.whats_included || product.whatsincluded || '',
          age_range: product.age_range || product.minimum_age || null,
          languages: product.languages || [],
        requires_visitors_details: [],
        cancellation: product.cancellation || null,
        groups: [],
      });
    } catch (e) {
      console.error(`Error fetching product ${id}:`, e);
    }
  }

  return results;
}

export const fetchTiqetsProductById = async (id: string): Promise<Excursion | null> => {
  const endpoints = [
    { url: withPreferences(`${TIQETS_API_BASE}/experiences/${id}`), prefer: true },
    { url: withPreferences(`${TIQETS_API_BASE}/products/${id}`), prefer: false },
  ];

  let best: { product: any; score: number } | null = null;

  for (const endpoint of endpoints) {
    let response: Response | null = null;
    try {
      response = await fetch(endpoint.url, { method: 'GET', headers });
      if (response.status === 404) continue;
      if (!response.ok) continue;
      const data = await response.json();
      const product = data.experience || data.product || data;
      if (!product || product.id === undefined || product.id === null) continue;

      const score = [
        (Array.isArray(product.images) ? product.images.length : 0) * 2,
        (Array.isArray(product.product_ids) ? product.product_ids.length : 0),
        product.title ? 1 : 0,
        product.description ? 1 : 0,
        endpoint.prefer ? 3 : 0,
      ].reduce((a, b) => a + b, 0);

      if (!best || score > best.score) {
        best = { product, score };
      }
    } catch (e) {
      if (response?.status === 404) continue;
      console.error(`Error fetching product/experience ${id}:`, e);
    }
  }

  if (!best) return null;
   const result = transformTiqetsProduct(best.product);
   const venueId = best.product.venue?.id;

   // A product often ships only a handful of photos while its parent experience
   // carries a much larger gallery. Both sets are permitted by the API, so they
   // are merged instead of showing the product's few images alone.
   if (venueId) {
     try {
       const venueResp = await fetch(withPreferences(`${TIQETS_API_BASE}/experiences/${venueId}`), { method: 'GET', headers });
       if (venueResp.ok) {
         const venueData = await venueResp.json();
         const experience = venueData.experience || venueData;
         const venueImages = pickTiqetsImageUrls(experience?.images);
         if (venueImages.length) {
           result.images = mergeTiqetsImageUrls(result.images || [], venueImages);
         }
       }
     } catch (e) {}
   }
   return result;
 };

export async function fetchTiqetsCities(countryId?: string): Promise<City[]> {
  let url = `${TIQETS_API_BASE}/cities`;
  if (countryId) {
    url = `${url}?country_id=${countryId}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers
  });

  if (!response.ok) {
    throw new Error(`Tiqets API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return (data.cities || data || []).map(transformTiqetsCity);
}

export async function fetchTiqetsCityById(cityId: string): Promise<City | null> {
  const response = await fetch(`${TIQETS_API_BASE}/cities/${cityId}`, {
    method: 'GET',
    headers
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Tiqets API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const city = data.city || data;
  return city ? transformTiqetsCity(city) : null;
}
/**
 * Per-variant tour languages from the Availability API.
 *
 * Tiqets populates `language_selection` only for products where the language
 * selector is enabled, so an empty `languages` array is the normal, documented
 * result rather than an error. Callers use it to decide whether to offer a
 * language choice; see `src/lib/tour-language.ts`.
 */
export type TiqetsAvailability = {
  productId: string;
  languages: string[];
  /** Per-day price and remaining capacity, in the visitor's currency. */
  dates: Array<{
    date: string;
    price: number | null;
    currency: string | null;
    availability: number | null;
    timeslots: number;
    /** Bookable slot window for the day, used to describe opening hours. */
    firstTime: string;
    lastTime: string;
  }>;
  variants: Array<{
    id: string;
    label: string;
    description: string;
    languages: string[];
  }>;
};

export async function fetchTiqetsAvailability(productId: string | number): Promise<TiqetsAvailability | null> {
  try {
    const response = await fetch(
      withPreferences(`${TIQETS_API_BASE}/products/${productId}/availability`),
      { method: 'GET', headers },
    );
    if (!response.ok) return null;

    const data = await response.json();
    if (!data || data.success === false) return null;

    const variants = Array.isArray(data.variants) ? data.variants : [];
    const languages: string[] = [];
    for (const variant of variants) {
      // `language_selection` only. The product-level `languages` field lists
      // content languages, not tour languages, and must not trigger the
      // selector.
      const codes = Array.isArray(variant?.language_selection) ? variant.language_selection : [];
      for (const code of codes) {
        if (typeof code === 'string' && code && !languages.includes(code)) languages.push(code);
      }
    }

    return {
      productId: String(productId),
      languages,
      dates: (Array.isArray(data.dates) ? data.dates : []).map((day: any) => ({
        date: String(day?.date ?? ''),
        price: typeof day?.price === 'number' ? day.price : null,
        currency: day?.currency || null,
        availability: typeof day?.availability === 'number' ? day.availability : null,
        timeslots: Array.isArray(day?.timeslots) ? day.timeslots.length : 0,
        firstTime: Array.isArray(day?.timeslots) ? String(day.timeslots[0]?.time ?? '') : '',
        lastTime: Array.isArray(day?.timeslots)
          ? String(day.timeslots[day.timeslots.length - 1]?.time ?? '')
          : '',
      })).filter((day: any) => !!day.date),
      variants: variants.map((variant: any) => ({
        id: String(variant?.id ?? ''),
        label: variant?.label || '',
        description: variant?.description || '',
        languages: Array.isArray(variant?.language_selection) ? variant.language_selection : [],
      })),
    };
  } catch {
    return null;
  }
}

/**
 * Disk-backed TTL cache for availability.
 *
 * Availability is one request per product, and a detail page needs every
 * product it renders. Firing them all in parallel reliably trips the API's rate
 * limit (HTTP 403) and leaves cards without a price. Caching per
 * product + currency + language keeps repeat renders cheap while letting the
 * first render probe the full product list.
 *
 * Availability is not cached when the result is null, so a transient failure
 * does not stick around until the TTL expires.
 */
const AVAILABILITY_CACHE_TTL_MS = 30 * 60 * 1000;

const availabilityCache = new Map<string, { at: number; data: TiqetsAvailability }>();

function availabilityCacheKey(productId: string | number): string {
  return `${productId}_${getDisplayCurrency()}_${getDisplayLanguage()}`;
}

export async function fetchTiqetsAvailabilityCached(
  productId: string | number,
): Promise<TiqetsAvailability | null> {
  const key = availabilityCacheKey(productId);
  const hit = availabilityCache.get(key);
  if (hit && Date.now() - hit.at < AVAILABILITY_CACHE_TTL_MS) {
    return hit.data;
  }

  const data = await fetchTiqetsAvailability(productId);
  if (data) availabilityCache.set(key, { at: Date.now(), data });
  return data;
}

/** A single review as returned by `/products/{id}/reviews`. */
export type TiqetsReview = {
  id: number;
  author: string | null;
  rating: number | null;
  date: string | null;
  source: string | null;
  body: string | null;
  language: string | null;
};

/**
 * Real customer reviews for one product.
 *
 * The Content API's `product.reviews` field is always null, but the dedicated
 * `/products/{id}/reviews` endpoint does return them. `author` and `body` are
 * frequently empty, so callers must skip reviews with no text rather than
 * render a blank card.
 */
export async function fetchTiqetsProductReviews(
  productId: string | number,
  pageSize = 10,
): Promise<TiqetsReview[]> {
  try {
    // Deliberately not `withPreferences`: `lang` filters which reviews come
    // back, and review text is customer content rather than UI chrome, so the
    // visitor's language preference should not shrink the list. Currency is
    // irrelevant here.
    const response = await fetch(
      `${TIQETS_API_BASE}/products/${productId}/reviews?page_size=${pageSize}`,
      { method: 'GET', headers },
    );
    if (!response.ok) return [];

    const data = await response.json();
    const rows = Array.isArray(data?.product_reviews) ? data.product_reviews : [];

    return rows.map((row: any) => ({
      id: Number(row?.id ?? 0),
      author: typeof row?.author === 'string' && row.author.trim() ? row.author.trim() : null,
      rating: typeof row?.rating === 'number' ? row.rating : null,
      date: typeof row?.date === 'string' && row.date ? row.date : null,
      source: typeof row?.source === 'string' && row.source ? row.source : null,
      body: typeof row?.body === 'string' && row.body.trim() ? row.body.trim() : null,
      language: typeof row?.language === 'string' && row.language ? row.language : null,
    }));
  } catch {
    return [];
  }
}

/**
 * Full image gallery for a ticket.
 *
 * Tiqets returns a short image list on `/products/{id}` — often only four — but
 * the parent experience (reachable via the product's `venue.id`) carries many
 * more. Both sets are permitted by the API, so they are merged and de-duplicated
 * rather than showing the product's handful alone.
 */
export async function fetchTiqetsGalleryImages(
  productId: string | number,
): Promise<string[]> {
  try {
    const response = await fetch(
      withPreferences(`${TIQETS_API_BASE}/products/${productId}`),
      { method: 'GET', headers },
    );
    if (!response.ok) return [];
    const data = await response.json();
    const product = data.product || data;

    const merged: string[] = [...pickTiqetsImageUrls(product.images)];

    const venueId = product?.venue?.id;
    if (venueId) {
      try {
        const venueResponse = await fetch(
          withPreferences(`${TIQETS_API_BASE}/experiences/${venueId}`),
          { method: 'GET', headers },
        );
        if (venueResponse.ok) {
          const venueData = await venueResponse.json();
          const experience = venueData.experience || venueData;
          merged.push(...pickTiqetsImageUrls(experience.images));
        }
      } catch {
        // The product's own images are still usable without the experience's.
      }
    }

    // De-duplicate on the imgix asset path so the same photo at two renditions
    // is not shown twice, and prefer the highest-resolution copy of each.
    const best = new Map<string, string>();
    for (const url of merged) {
      const asset = url.match(/content\/([a-zA-Z0-9._-]+)/)?.[1];
      if (!asset) {
        best.set(url, url);
        continue;
      }
      const existing = best.get(asset);
      if (!existing) {
        best.set(asset, url);
        continue;
      }
      const sizeOf = (value: string) => {
        const w = Number(value.match(/[?&]w=(\d+)/)?.[1] || 0);
        const h = Number(value.match(/[?&]h=(\d+)/)?.[1] || 0);
        return w * h;
      };
      if (sizeOf(url) > sizeOf(existing)) best.set(asset, url);
    }

    return [...best.values()];
  } catch {
    return [];
  }
}

/** Raw Tiqets product payload, kept untransformed so detail pages can read any field. */
export type TiqetsProductDetail = Record<string, any>;

/**
 * Full detail for one ticket: the raw product plus its parent experience.
 *
 * `fetchTiqetsProductById` returns a card-shaped `Excursion`, which drops most
 * of the fields a detail page needs (tagline, inclusions, cancellation window,
 * meeting point, guide languages). This returns the raw payloads instead.
 */
/**
 * Fetches the current image list for a single experience.
 *
 * Used to repair cached rows whose images have been delisted upstream: the
 * snapshot keeps the dead URLs forever, so a 404 there is only fixable by
 * re-reading the live experience.
 */
export async function fetchTiqetsExperienceImages(
  experienceId: string | number,
): Promise<string[]> {
  try {
    const response = await fetch(
      `${TIQETS_API_BASE}/experiences/${experienceId}`,
      { method: 'GET', headers },
    );
    if (!response.ok) return [];

    const data = await response.json();
    const experience = data.experience || data;
    const images = Array.isArray(experience?.images) ? experience.images : [];
    return images
      .map((img: any) => img?.extra_large || img?.large || img?.medium)
      .filter((url: unknown): url is string => typeof url === 'string' && url.length > 0);
  } catch {
    return [];
  }
}

export async function fetchTiqetsProductDetail(
  productId: string | number,
): Promise<{ product: TiqetsProductDetail; experience: TiqetsProductDetail | null } | null> {
  try {
    const response = await fetch(
      withPreferences(`${TIQETS_API_BASE}/products/${productId}`),
      { method: 'GET', headers },
    );
    if (!response.ok) return null;

    const data = await response.json();
    const product: TiqetsProductDetail = data.product || data;
    if (!product || product.id == null) return null;

    let experience: TiqetsProductDetail | null = null;
    const experienceId = product?.venue?.id;
    if (experienceId) {
      try {
        const expResponse = await fetch(
          withPreferences(`${TIQETS_API_BASE}/experiences/${experienceId}`),
          { method: 'GET', headers },
        );
        if (expResponse.ok) {
          const expData = await expResponse.json();
          experience = expData.experience || expData;
        }
      } catch {
        // The product alone still renders a usable page.
      }
    }

    return { product, experience };
  } catch {
    return null;
  }
}
