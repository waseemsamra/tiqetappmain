import { pickTiqetsImageUrls } from '@/lib/tiqets-image';
import { withPreferences } from '@/lib/tiqets-api';
import type { Excursion } from '@/types';

const TIQETS_API_BASE = 'https://api.tiqets.com/v2';
const PAGE_SIZE = 100;
/** Upper bound on pages walked, so a misbehaving pagination cursor cannot loop forever. */
const MAX_PAGES = 10;

/**
 * Tiqets country ids, keyed by the country name used in `Excursion.country`.
 *
 * Shared by `/country/[name]` and the homepage, which both need to resolve a
 * visitor's country to real inventory rather than the local snapshot.
 */
export const COUNTRY_IDS: Record<string, string> = {
  // Americas
  'Peru': '50174',
  'Aruba': '50013',
  'Costa Rica': '50049',
  'Mexico': '50157',
  'Argentina': '50009',
  'United States': '50233',
  'Canada': '50037',
  'Colombia': '50048',
  'Brazil': '50030',
  'Bahamas': '50031',
  'Dominican Republic': '50060',
  'Jamaica': '50111',
  'Puerto Rico': '50182',
  'Ecuador': '50062',
  'Belize': '50036',
  'Guatemala': '50090',

  // EMEA
  'Italy': '50109',
  'Spain': '50067',
  'France': '50074',
  'Netherlands': '50166',
  'The Netherlands': '50166',
  'United Arab Emirates': '50001',
  'Bosnia and Herzegovina': '50016',
  'Israel': '50102',
  'Turkey': '50225',
  'Qatar': '50187',
  'Bulgaria': '50021',
  'Germany': '50056',
  'Hungary': '50099',
  'Croatia': '50097',
  'Estonia': '50063',
  'Ireland': '50101',
  'Belgium': '50019',
  'Iceland': '50108',
  'Greece': '50088',
  'Monaco': '50138',
  'Portugal': '50184',
  'Romania': '50189',
  'Russia': '50191',
  'Malta': '50153',
  'Slovenia': '50201',
  'Latvia': '50135',
  'Lithuania': '50133',
  'Norway': '50167',
  'Denmark': '50058',
  'Czech Republic': '50055',
  'Poland': '50179',
  'Finland': '50069',
  'Switzerland': '50042',
  'Austria': '50011',
  'Sweden': '50198',
  'Andorra': '50004',
  'Egypt': '50064',
  'Jordan': '50112',
  'Kenya': '50114',
  'United Kingdom': '50076',
  'Luxembourg': '50134',
  'Morocco': '50137',
  'Serbia': '50190',
  'Slovakia': '50203',
  'Tanzania': '50229',
  'South Africa': '50247',

  // APAC
  'India': '50104',
  'Indonesia': '50100',
  'Japan': '50113',
  'Singapore': '50199',
  'South Korea': '50121',
  'Australia': '50012',
  'New Zealand': '50014',
  'Taiwan': '50228',
  'Thailand': '50218',
  'China': '50047',
  'Vietnam': '50241',
  'Malaysia': '50158',
  'Cambodia': '50116',
};

export function countryIdFor(name: string): string | undefined {
  return COUNTRY_IDS[name] || COUNTRY_IDS[name.trim()];
}

function transformExperience(product: any, fallbackCountry: string): Excursion {
  return {
    id: product.id?.toString() || '',
    name: product.title || '',
    city: product.address?.city_name || '',
    country: product.address?.country_name || fallbackCountry,
    description: product.description || product.summary || '',
    price: product.from_price || product.price || 0,
    currency: product.currency || 'USD',
    duration: product.duration || 'Not specified',
    images: pickTiqetsImageUrls(product.images),
    rating: product.ratings?.average || undefined,
    reviewsTotal: product.ratings?.total || product.ratings?.count || undefined,
    excursionType: { id: product.id?.toString() || '', name: product.tagline || 'Activity' },
    status: 'active' as const,
    activitytypeid: product.id?.toString() || '',
    product_ids: [],
    reviews: [],
    partner_id: null,
  };
}

/**
 * Live experiences for a country, walking the paginated feed.
 *
 * Results are cached per country for an hour: the homepage calls this on every
 * render for the visitor's country, and the payload is large (Australia alone is
 * ~380 experiences).
 */
const countryCache = new Map<string, { at: number; data: Excursion[] }>();
const COUNTRY_TTL_MS = 60 * 60 * 1000;

export async function fetchCountryExcursions(countryName: string): Promise<Excursion[]> {
  const countryId = countryIdFor(countryName);
  if (!countryId) return [];

  const cached = countryCache.get(countryId);
  if (cached && Date.now() - cached.at < COUNTRY_TTL_MS) return cached.data;

  const apiKey = process.env.TIQETS_API_KEY;
  if (!apiKey) return [];

  const headers = {
    Accept: 'application/json',
    'User-Agent': 'my user agent',
    Authorization: `Token ${apiKey}`,
  };

  try {
    const all: any[] = [];
    for (let page = 1; page <= MAX_PAGES; page++) {
      const response = await fetch(
        withPreferences(`${TIQETS_API_BASE}/experiences?country_id=${countryId}&page=${page}&page_size=${PAGE_SIZE}`),
        { method: 'GET', headers },
      );
      if (!response.ok) break;

      const data = await response.json();
      const experiences = Array.isArray(data.experiences) ? data.experiences : [];
      all.push(...experiences);

      const pagination = data.pagination || {};
      if (
        experiences.length < PAGE_SIZE ||
        (pagination.total && all.length >= pagination.total)
      ) {
        break;
      }
    }

    const result = all.map((item) => transformExperience(item, countryName));
    if (result.length > 0) {
      countryCache.set(countryId, { at: Date.now(), data: result });
    }
    return result;
  } catch {
    return [];
  }
}
