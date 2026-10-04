import type { AgodaHotelResult } from '@/lib/agoda-api';
import type { AgodaDestination } from '@/lib/agoda-catalog';
import { getDisplayLanguage } from '@/lib/tiqets-api';

const AGODA_PARTNER_ID = process.env.AGODA_PARTNER_ID || '1976555';

/**
 * URL locale segment per display language.
 * Agoda's detail URLs carry the locale as the
 * first path segment (e.g. /en-gb/...).
 */
const AGODA_URL_LOCALES: Record<string, string> = {
  en: 'en-gb',
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

/** Slugifies a hotel name the way Agoda's URLs do. */
export function agodaSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Nights between two ISO dates, minimum 1. */
function nightsBetween(checkIn: string, checkOut: string): number {
  const ms =
    new Date(`${checkOut}T00:00:00`).getTime() -
    new Date(`${checkIn}T00:00:00`).getTime();
  return Math.max(1, Math.round(ms / 86400000));
}

/**
 * Builds the Agoda hotel detail page URL.
 *
 * The Long Tail Search API does not return the
 * hotel's SEO slug, so it is derived from the
 * hotel name — Agoda redirects close matches to
 * the canonical slug (e.g. appends "-sg-clean-
 * certified"). When the destination context is
 * unknown (direct hotel-ID or cross-destination
 * property searches), the tracked partner landing
 * URL is used instead, since the city slug
 * cannot be determined.
 */
export function agodaDetailUrl(input: {
  hotel: AgodaHotelResult;
  destination?: AgodaDestination;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}): string {
  const { hotel, destination } = input;

  if (!destination || !hotel.hotelName) {
    return hotel.landingURL ?? '';
  }

  const locale = AGODA_URL_LOCALES[getDisplayLanguage()] || 'en-gb';
  const citySlug = `${destination.slug}-${destination.countryCode.toLowerCase()}`;
  const params = new URLSearchParams({
    cid: AGODA_PARTNER_ID,
    adults: String(input.adults),
    children: String(input.children),
    rooms: String(Math.max(1, input.rooms)),
    checkIn: input.checkIn,
    currencyCode: hotel.currency,
    los: String(nightsBetween(input.checkIn, input.checkOut)),
  });

  // Canonical detail-page path is /{locale}/{slug}/hotel/{city}.html
  // — the legacy /hotel/all/ variant 404s for many properties.
  return `https://www.agoda.com/${locale}/${agodaSlug(hotel.hotelName)}/hotel/${citySlug}.html?${params.toString()}`;
}

/**
 * Resolved card links, cached per hotel ID. Agoda's
 * canonical slugs rarely change, so a verdict is cached
 * for 24 hours; transient network errors are not cached
 * and are retried on the next render.
 */
const linkCache = new Map<number, { at: number; url: string }>();
const LINK_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * Resolves the outbound link for every hotel in a result set.
 *
 * The detail-page URL is derived from the hotel name, but
 * Agoda's canonical slug differs from the API name for about
 * one in six properties, which would 404. Each derived URL
 * is therefore verified against agoda.com with a HEAD
 * request (verdicts cached for 24h), and hotels whose slug
 * does not resolve fall back to the API's tracked landing
 * URL, which pre-selects the property on Agoda's search
 * page. Only the first render of a destination pays the
 * verification cost.
 *
 * Property-name searches span every destination, so callers
 * pass the destination that returned each hotel via
 * `destinationByHotel`; its city slug is used for that
 * hotel's detail URL.
 */
export async function resolveHotelLinks(input: {
  hotels: AgodaHotelResult[];
  destination?: AgodaDestination;
  /** Per-hotel destination (property-name searches span every destination). */
  destinationByHotel?: Record<number, AgodaDestination>;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}): Promise<Record<number, string>> {
  const { hotels, destination, destinationByHotel } = input;
  const links: Record<number, string> = {};

  if (!destination && !destinationByHotel) {
    for (const hotel of hotels) {
      links[hotel.hotelId] = hotel.landingURL ?? '';
    }
    return links;
  }

  // Per-hotel link verdict. `direct` is the URL the
  // name-derived slug produced, kept so a protection
  // wave can revert fallback verdicts to it.
  interface LinkVerdict {
    direct: string;
    url: string;
    /** Computed this render; cached verdicts are always genuine. */
    fresh: boolean;
    verdict: 'hotel' | 'fallback' | 'transient';
  }
  const results = new Map<number, LinkVerdict>();

  await Promise.all(
    hotels.map(async (hotel) => {
      const hotelDestination = destinationByHotel?.[hotel.hotelId] ?? destination;
      if (!hotelDestination) {
        results.set(hotel.hotelId, {
          direct: hotel.landingURL ?? '',
          url: hotel.landingURL ?? '',
          fresh: false,
          verdict: 'fallback',
        });
        return;
      }

      const direct = agodaDetailUrl({
        hotel,
        destination: hotelDestination,
        checkIn: input.checkIn,
        checkOut: input.checkOut,
        adults: input.adults,
        children: input.children,
        rooms: input.rooms,
      });

      const cached = linkCache.get(hotel.hotelId);
      if (cached && Date.now() - cached.at < LINK_CACHE_TTL_MS) {
        results.set(hotel.hotelId, {
          direct,
          url: cached.url,
          fresh: false,
          verdict: 'hotel',
        });
        return;
      }

      // Agoda frequently canonicalizes a property as
      // "{name} Hotel", so a plain-slug 404 gets one
      // retry with a "-hotel" suffix before falling
      // back to the tracked landing URL.
      const slug = agodaSlug(hotel.hotelName ?? '');
      const candidates =
        slug && !slug.endsWith('-hotel')
          ? [direct, direct.replace(`/${slug}/hotel/`, `/${slug}-hotel/hotel/`)]
          : [direct];

      let url = direct;
      let verdict: LinkVerdict['verdict'] = 'transient';
      let definitivelyBad = false;
      for (const candidate of candidates) {
        try {
          const response = await fetch(candidate, {
            method: 'HEAD',
            redirect: 'follow',
            cache: 'no-store',
            signal: AbortSignal.timeout(4000),
          });
          const finalPath = new URL(response.url).pathname;
          const onHotelPath =
            finalPath.includes('/hotel/') &&
            !finalPath.includes('/city/') &&
            !finalPath.includes('/search');

          if (response.status === 404 || response.status === 410) {
            // Definitive: the slug does not exist.
            definitivelyBad = true;
            continue;
          }
          if (response.status < 400) {
            // Definitive verdict: a resolvable slug
            // ends on a hotel path — Agoda 301s
            // non-canonical slugs to the canonical
            // hotel URL — while an unknown slug ends
            // on the city or search page.
            if (onHotelPath) {
              url = candidate;
              verdict = 'hotel';
              break;
            }
            definitivelyBad = true;
            continue;
          }
          // Agoda's bot protection answers HEADs with
          // 403/429/502, so error responses are
          // inconclusive: keep the derived URL (the
          // browser follows the same chain the
          // verification did) and retry later.
        } catch {
          // Timeout or network failure — inconclusive.
        }
      }
      if (verdict !== 'hotel') {
        if (definitivelyBad) {
          url = hotel.landingURL ?? direct;
          verdict = 'fallback';
        }
        // Otherwise the verdict stays transient and
        // keeps the derived URL.
      }
      results.set(hotel.hotelId, { direct, url, fresh: true, verdict });
    }),
  );

  // Bot protection fails many requests at once, while
  // genuinely unresolvable slugs affect only a minority
  // of a result set. When most fresh verdicts in a
  // larger set failed, the failures are protection
  // artifacts — revert them to the derived URLs and
  // retry verification on the next render.
  const fresh = [...results.values()].filter((r) => r.fresh);
  const protectionWave =
    fresh.length >= 4 &&
    fresh.filter((r) => r.verdict === 'fallback').length > fresh.length / 2;

  for (const [hotelId, result] of results) {
    let url = result.url;
    if (protectionWave && result.fresh && result.verdict === 'fallback') {
      url = result.direct;
    }
    // Cache positive verdicts only: Agoda's bot
    // protection also answers HEADs with 404, so a
    // negative verdict may be an artifact — fallbacks
    // are re-verified on every render until they
    // resolve, while a verified hotel slug is stable
    // for 24 hours.
    if (result.fresh && !protectionWave && result.verdict === 'hotel') {
      linkCache.set(hotelId, { at: Date.now(), url });
    }
    links[hotelId] = url;
  }
  return links;
}
