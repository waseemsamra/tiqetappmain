import { getDisplayCurrency, getDisplayLanguage } from '@/lib/tiqets-api';

/**
 * Agoda Affiliate Long Tail Search API client.
 *
 * The endpoint searches by city ID, a list of hotel IDs, or a
 * geo coordinate + radius — it never accepts a destination
 * string, so callers resolve the destination to a city ID or
 * coordinates with the catalog in `agoda-catalog.ts` first.
 *
 * Auth is the partner API-key scheme: an `Authorization: siteId:apikey`
 * header on every request (Agoda deprecates this in favour of OAuth 2.0
 * at the end of 2026).
 */

const AGODA_API_URL = process.env.AGODA_API_BASE_URL || 'https://affiliateapi.agoda.com/affiliateservice/lt_v1';
const AGODA_PARTNER_ID = process.env.AGODA_PARTNER_ID || '';
const AGODA_API_KEY = process.env.AGODA_API_KEY || '';

export const isAgodaConfigured = !!(AGODA_PARTNER_ID && AGODA_API_KEY);

if (!isAgodaConfigured) {
  console.warn('[Agoda] Missing AGODA_PARTNER_ID/AGODA_API_KEY; stays search will fail.');
}

export interface AgodaOccupancy {
  numberOfAdult: number;
  numberOfChildren?: number;
  childrenAges?: number[];
}

export interface AgodaAdditional {
  currency?: string;
  language?: string;
  maxResult?: number;
  sortBy?: string;
  discountOnly?: boolean;
  minimumStarRating?: number;
  minimumReviewScore?: number;
  dailyRate?: { minimum?: number; maximum?: number };
  occupancy?: AgodaOccupancy;
}

export interface AgodaGeo {
  latitude: number;
  longitude: number;
  searchRadius: number;
}

export interface AgodaSearchCriteria {
  cityId?: number;
  hotelId?: number[];
  geo?: AgodaGeo;
  additional?: AgodaAdditional;
  checkInDate: string;
  checkOutDate: string;
}

export interface AgodaHotelResult {
  hotelId: number;
  hotelName: string;
  roomtypeName?: string;
  starRating: number;
  reviewScore: number;
  reviewCount?: number;
  currency: string;
  dailyRate: number;
  crossedOutRate?: number;
  discountPercentage?: number;
  imageURL?: string;
  landingURL?: string;
  includeBreakfast?: boolean;
  freeWifi?: boolean;
  latitude?: number;
  longitude?: number;
}

export interface AgodaSearchResponse {
  results: AgodaHotelResult[];
}

export class AgodaApiError extends Error {
  constructor(
    public readonly id: number,
    message: string,
  ) {
    super(message);
    this.name = 'AgodaApiError';
  }
}

/**
 * Maps the app's two-letter language codes to Agoda's locale codes.
 * Agoda defaults to en-us for anything it does not recognise.
 */
const AGODA_LANGUAGES: Record<string, string> = {
  en: 'en-us',
  ca: 'ca-es',
  cs: 'cs-cz',
  da: 'da-dk',
  de: 'de-de',
  el: 'el-gr',
  es: 'es-es',
  fr: 'fr-fr',
  it: 'it-it',
  ko: 'ko-kr',
  nl: 'nl-nl',
  ja: 'ja-jp',
  pl: 'pl-pl',
  pt: 'pt-pt',
  ru: 'ru-ru',
  sv: 'sv-se',
  zh: 'zh-cn',
};

export function agodaLanguage(): string {
  return AGODA_LANGUAGES[getDisplayLanguage()] || 'en-us';
}

async function postAgoda(criteria: AgodaSearchCriteria): Promise<Response> {
  return fetch(AGODA_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip,deflate',
      Authorization: `${AGODA_PARTNER_ID}:${AGODA_API_KEY}`,
    },
    body: JSON.stringify({ criteria }),
  });
}

/**
 * Runs a Long Tail Search. The endpoint intermittently answers
 * `101 Site ID is invalid` on a cold connection; one retry
 * resolves it, so we retry that specific error once.
 */
export async function searchAgodaHotels(
  criteria: AgodaSearchCriteria,
): Promise<AgodaSearchResponse> {
  if (!isAgodaConfigured) {
    throw new AgodaApiError(0, 'Agoda API credentials are not configured');
  }

  let response: Response;
  try {
    response = await postAgoda(criteria);
    const first = await response.json().catch(() => null);
    if (
      first &&
      typeof first.error?.id === 'number' &&
      first.error.id === 101 &&
      !response.redirected
    ) {
      response = await postAgoda(criteria);
    } else if (first) {
      return handleBody(first, response);
    }
  } catch {
    throw new AgodaApiError(0, 'Could not reach the Agoda API');
  }

  const body = await response.json().catch(() => null);
  if (!body) {
    throw new AgodaApiError(
      response.status,
      `Agoda API returned ${response.status} with no JSON — verify AGODA_API_BASE_URL against your partner package`,
    );
  }
  return handleBody(body, response);
}

function handleBody(body: unknown, response: Response): AgodaSearchResponse {
  const anyBody = body as { error?: { id?: number; message?: string }; results?: AgodaHotelResult[] };

  if (anyBody.error && anyBody.error.id !== undefined) {
    throw new AgodaApiError(anyBody.error.id, anyBody.error.message ?? 'Agoda API error');
  }

  if (!response.ok) {
    throw new AgodaApiError(response.status, `Agoda API returned ${response.status}`);
  }

  return { results: anyBody.results ?? [] };
}

/** Builds search criteria using the visitor's display language and currency. */
export function buildSearchCriteria(input: {
  cityId?: number;
  hotelIds?: number[];
  geo?: AgodaGeo;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  childAges?: number[];
  maxResults?: number;
  sortBy?: string;
}): AgodaSearchCriteria {
  return {
    ...(input.cityId !== undefined ? { cityId: input.cityId } : {}),
    ...(input.hotelIds && input.hotelIds.length > 0 ? { hotelId: input.hotelIds } : {}),
    ...(input.geo ? { geo: input.geo } : {}),
    checkInDate: input.checkInDate,
    checkOutDate: input.checkOutDate,
    additional: {
      currency: getDisplayCurrency(),
      language: agodaLanguage(),
      ...(input.maxResults !== undefined ? { maxResult: input.maxResults } : {}),
      ...(input.sortBy ? { sortBy: input.sortBy } : {}),
      occupancy: {
        numberOfAdult: input.adults,
        ...(input.children > 0
          ? {
              numberOfChildren: input.children,
              ...(input.childAges && input.childAges.length > 0
                ? { childrenAges: input.childAges }
                : {}),
            }
          : {}),
      },
    },
  };
}
