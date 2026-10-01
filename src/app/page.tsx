 
import { cookies, headers } from 'next/headers';
import { getHeroContent } from '@/lib/hero';
import HomePageClient from './home-page-client';
import type { Excursion, HeroContent } from '@/types';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getDisplayCurrency, getDisplayLanguage } from '@/lib/tiqets-api';
import { convertCurrency, roundCents } from '@/lib/fx';
import { VISITOR_COUNTRY_COOKIE } from '@/lib/visitor-country';
import { countryNameFor, destinationsForCountry } from '@/lib/country-destinations';
import { fetchCountryExcursions } from '@/lib/country-experiences';
import { translate } from '@/lib/messages';
import { cityCoverImages, repairDeadImages } from '@/lib/image-health';
import { fetchTiqetsExperienceImages } from '@/lib/tiqets-api';

export const revalidate = 0;

// DEPLOYMENT TRIGGER: 2026-06-15T04:23:00+04:00 - Force deploy for Singapore KL Bangkok tab fix

const TOP_CITY = 'New York';
const WORLDWIDE_CITIES = ['Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam', 'Singapore', 'Kuala Lumpur', 'Bangkok'];
const UAE_CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras al-Khaimah', 'Fujairah'];

/** Currency the on-disk cache was snapshotted in. */
const CACHE_BASE_CURRENCY = 'USD';

/** Language the on-disk cache was snapshotted in. */
const CACHE_BASE_LANGUAGE = 'en';

function loadLocalExcursions(): Excursion[] {
  try {
    const filePath = join(process.cwd(), 'public', 'excursions.json');
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    const list: Excursion[] = Array.isArray(parsed.experiences) ? parsed.experiences : [];
    // Experiences the supplier has delisted keep a stale local-currency price we
    // cannot verify in USD, so they must not be shown as purchasable.
    return list.filter((e) => !(e as any).delisted);
  } catch {
    return [];
  }
}

/**
 * Overlays the snapshotted translations onto the cached rows.
 *
 * Only `name` and `description` are replaced. `city` and `country` are left in
 * English on purpose: `attraction-listing.tsx` filters cards by matching them
 * against the English city tab names ("Dubai", "Abu Dhabi"), so translating
 * them to "Dubaï" / "Abou Dabi" makes whole sections filter to zero cards. The
 * section headings do not depend on these fields -- they come from the message
 * catalog in `src/lib/messages.ts`, which is translated.
 *
 * Experiences Tiqets has no translation for keep their English text.
 */
function applyDisplayLanguage(excursions: Excursion[]): Excursion[] {
  const language = getDisplayLanguage();
  if (language === CACHE_BASE_LANGUAGE) return excursions;

  let translations: Record<string, Record<string, { name?: string; description?: string }>> = {};
  try {
    const filePath = join(process.cwd(), 'public', 'excursions.translations.json');
    translations = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch {
    return excursions;
  }

  const forLanguage = translations[language];
  if (!forLanguage) return excursions;

  return excursions.map((excursion) => {
    const translation = forLanguage[String(excursion.id)];
    if (!translation) return excursion;
    return {
      ...excursion,
      name: translation.name || excursion.name,
      description: translation.description || excursion.description,
    };
  });
}

/**
 * The listing cache holds a USD snapshot, so a visitor who picked another
 * currency sees it converted here. Detail and checkout pages are unaffected:
 * they read live prices in the visitor's own currency straight from Tiqets.
 */
async function applyDisplayCurrency(excursions: Excursion[]): Promise<Excursion[]> {
  const target = getDisplayCurrency();
  if (target === CACHE_BASE_CURRENCY) return excursions;

  return Promise.all(
    excursions.map(async (excursion) => ({
      ...excursion,
      price: roundCents(await convertCurrency(excursion.price, CACHE_BASE_CURRENCY, target)),
      currency: target,
    })),
  );
}

/**
 * Dev-only country override, so the geo-driven section can be checked without a
 * VPN. `?previewCountry=AU` is ignored entirely in production builds, leaving
 * the deployed behaviour dependent on real geo headers alone.
 */
function readPreviewCountry(searchParams?: { previewCountry?: string | string[] }): string {
  if (process.env.NODE_ENV === 'production') return '';
  const value = searchParams?.previewCountry;
  return (Array.isArray(value) ? value[0] : value) || '';
}

export default async function HomePage({ searchParams }: { searchParams?: { previewCountry?: string | string[] } }) {
  // Selection runs against the cached (English) rows on purpose: the city
  // constants below are English, and Tiqets translates city names
  // ("Dubai" -> "Dubaï"), so filtering a translated list would silently drop
  // whole sections. Translations are applied afterwards, for display only.
  const cachedExcursions = loadLocalExcursions();
  const displayExcursions = applyDisplayLanguage(cachedExcursions);
  const translatedById = new Map(displayExcursions.map((e) => [String(e.id), e]));
  const display = (list: Excursion[]) =>
    list.map((e) => translatedById.get(String(e.id)) || e);

  let heroContent: HeroContent = { headline: 'Discover Amazing Experiences', subheading: 'Find the best things to do worldwide', backgroundImage: '' };

  try {
    const fetched = await getHeroContent();
    heroContent = {
      headline: fetched.headline || heroContent.headline,
      subheading: fetched.subheading || heroContent.subheading,
      backgroundImage: fetched.backgroundImage || '',
    };
  } catch {}

  const byCity = (city: string, limit = 10) =>
    cachedExcursions.filter(ex => (ex.city || '').toLowerCase().includes(city.toLowerCase())).slice(0, limit);

  const uaeExcursions = display(UAE_CITIES.flatMap(city => byCity(city, 10)));
  const worldwideExcursions = display(WORLDWIDE_CITIES.flatMap(city => byCity(city, 10)));
  const topCityExcursions = display(byCity(TOP_CITY, 10));
  const topRatedExcursions = display(
    [...cachedExcursions]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 20),
  );

  // Lead with the visitor's own country. The cookie is written by the middleware
  // from the edge's geo header; the request header is a fallback for the first hit.
  const availableCountries = [...new Set(cachedExcursions.map(e => e.country).filter(Boolean))];
  const previewCountry = readPreviewCountry(searchParams);
  const visitorCountry =
    previewCountry ||
    cookies().get(VISITOR_COUNTRY_COOKIE)?.value ||
    headers().get('x-visitor-country') ||
    '';

  // The local snapshot only covers a few countries, but the API has far more
  // (Australia alone is ~380 experiences). Country data therefore comes from the
  // API; the snapshot is the fallback when a request fails.
  const resolvedCountryName = countryNameFor(visitorCountry);
  const liveCountryExcursions = resolvedCountryName
    ? await fetchCountryExcursions(resolvedCountryName)
    : [];
  const hasLive = liveCountryExcursions.length > 0;

  const countryPool = hasLive
    ? applyDisplayLanguage(liveCountryExcursions)
    : cachedExcursions;

  const featured = destinationsForCountry(
    visitorCountry,
    hasLive && resolvedCountryName
      ? [...availableCountries, resolvedCountryName]
      : availableCountries,
  );

  const byCountryCity = (city: string, limit = 10) =>
    countryPool
      .filter((ex) => (ex.city || '').toLowerCase().includes(city.toLowerCase()))
      .slice(0, limit);

  const featuredExcursions = featured.cities.flatMap((city) => byCountryCity(city, 10));
  const showFeatured = featuredExcursions.length > 0;
  const featuredTitle = showFeatured
    ? translate(getDisplayLanguage(), 'home.bestPlacesIn', { country: featured.name })
    : translate(getDisplayLanguage(), 'home.bestPlacesUae');
  const featuredCities = featured.cities.filter((city) =>
    countryPool.some((ex) => (ex.city || '').toLowerCase().includes(city.toLowerCase())),
  );

  // Tiqets delists images without removing them from the snapshot, so a cached
  // card or tab can point at a 404. Repair the rendered rows before they reach
  // the client, otherwise a delisted asset shows as a blank surface.
  const renderedRows = [
    ...uaeExcursions,
    ...worldwideExcursions,
    ...topCityExcursions,
    ...topRatedExcursions,
  ];
  const repairedById = new Map(
    (
      await repairDeadImages(
        renderedRows,
        (id) => fetchTiqetsExperienceImages(id),
      )
    ).map((e) => [String(e.id), e]),
  );

  const repair = (list: Excursion[]) =>
    list.map((e) => repairedById.get(String(e.id)) || e);

  // Tab rows resolve their own cover per city, since a city image is shared by
  // several cards and may come from a different experience than the tab.
  const tabCities = [...featuredCities, ...WORLDWIDE_CITIES];
  const cityImages = await cityCoverImages(
    cachedExcursions.filter((e) => tabCities.includes(e.city || '')),
  );

  const allExcursions = await applyDisplayCurrency(displayExcursions);

  return (
    <HomePageClient
      allExcursions={allExcursions}
      topRatedExcursions={repair(topRatedExcursions)}
      heroContent={heroContent}
      featuredExcursions={repair(featuredExcursions)}
      featuredTitle={featuredTitle}
      featuredCities={featuredCities}
      cityImages={cityImages}
      worldwideExcursions={repair(worldwideExcursions)}
      topCityExcursions={repair(topCityExcursions)}
      topCityName={TOP_CITY}
      language={getDisplayLanguage()}
    />
  );
};
