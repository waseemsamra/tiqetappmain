'use server';

import * as TiqetsApi from '@/lib/tiqets-api';
import { loadCache, saveCache, LOCATIONS_CACHE_FILE, type CachedCountry, type CachedCity } from '@/lib/json-cache';
import type { City, Country } from '@/types';

function toCountry(c: CachedCountry): Country {
  return {
    id: c.id || c.code,
    name: c.name || '',
    code: c.code || '',
    currency: c.currency || 'USD',
    currency_symbol: c.currency_symbol || '$'
  };
}

function toCity(c: CachedCity): City {
  return {
    id: c.id || '',
    name: c.name || '',
    country_code: c.country_code || '',
    country_name: c.country_name || undefined
  };
}

export async function getCountries(supabaseClient?: any): Promise<Country[]> {
  let cached: CachedCountry[] = [];
  try {
    cached = await loadCache<CachedCountry>(LOCATIONS_CACHE_FILE);
  } catch {}

  if (cached.length) {
    return cached.map(toCountry);
  }

  const countries = await TiqetsApi.fetchTiqetsCountries();
  const mapped: CachedCountry[] = countries.map((c) => ({
    id: String(c.id || c.code || ''),
    name: c.name || '',
    code: c.code || '',
    currency: c.currency,
    currency_symbol: c.currency_symbol
  }));

  try {
    await saveCache(LOCATIONS_CACHE_FILE, mapped);
  } catch {}

  return countries;
}

export async function getCountryByCode(code: string, supabaseClient?: any): Promise<Country | null> {
  const countries = await getCountries();
  return countries.find(c => c.code.toLowerCase() === code.toLowerCase()) || null;
}

export async function getCitiesByCountryCode(countryCode: string, supabaseClient?: any): Promise<City[]> {
  const country = await getCountryByCode(countryCode);
  if (!country) return [];

  const code = country.code.toLowerCase();
  let cached: CachedCity[] = [];
  try {
    cached = await loadCache<CachedCity>(LOCATIONS_CACHE_FILE);
  } catch {}

  const cachedForCountry = cached.filter(c => c.country_code.toLowerCase() === code);
  if (cachedForCountry.length) {
    return cachedForCountry.map(toCity);
  }

  const cities = await TiqetsApi.fetchTiqetsCities(countryCode.toUpperCase());
  const mapped: CachedCity[] = cities.map((c) => ({
    id: String(c.id || ''),
    name: c.name || '',
    country_code: c.country_code || code,
    country_name: c.country_name || country.name
  }));

  const existing = (await loadCache<CachedCity>(LOCATIONS_CACHE_FILE)).filter(c => c.country_code.toLowerCase() !== code);
  existing.push(...mapped);

  try {
    await saveCache(LOCATIONS_CACHE_FILE, existing);
  } catch {}

  return cities;
}

export async function getCityById(cityId: string, supabaseClient?: any): Promise<City | null> {
  let cached: CachedCity[] = [];
  try {
    cached = await loadCache<CachedCity>(LOCATIONS_CACHE_FILE);
  } catch {}

  const found = cached.find(c => c.id === cityId);
  if (found) return toCity(found);

  const city = await TiqetsApi.fetchTiqetsCityById(cityId);
  if (!city) return null;

  const mapped: CachedCity = {
    id: String(city.id || cityId),
    name: city.name || '',
    country_code: city.country_code || '',
    country_name: city.country_name || undefined
  };

  const existing = [...cached];
  const idx = existing.findIndex(c => c.id === mapped.id);
  if (idx >= 0) existing[idx] = mapped;
  else existing.push(mapped);

  try {
    await saveCache(LOCATIONS_CACHE_FILE, existing);
  } catch {}

  return city;
}

export async function syncLocations() {
  const countries = await TiqetsApi.fetchTiqetsCountries();
  const mappedCountries: CachedCountry[] = countries.map((c) => ({
    id: String(c.id || c.code || ''),
    name: c.name || '',
    code: c.code || '',
    currency: c.currency,
    currency_symbol: c.currency_symbol
  }));

  let allCachedCities: CachedCity[] = [];
  try {
    allCachedCities = await loadCache<CachedCity>(LOCATIONS_CACHE_FILE);
  } catch {}

  const BATCH_SIZE = 10;
  const DELAY_MS = 1000;

  for (let i = 0; i < mappedCountries.length; i += BATCH_SIZE) {
    const batch = mappedCountries.slice(i, i + BATCH_SIZE);
    for (const country of batch) {
      try {
        const cities = await TiqetsApi.fetchTiqetsCities(country.code.toUpperCase());
        const mapped: CachedCity[] = cities.map((c) => ({
          id: String(c.id || ''),
          name: c.name || '',
          country_code: c.country_code || country.code,
          country_name: c.country_name || country.name
        }));
        const others = allCachedCities.filter(c => c.country_code.toLowerCase() !== country.code.toLowerCase());
        allCachedCities = [...others, ...mapped];
      } catch {}
    }

    if (i + BATCH_SIZE < mappedCountries.length) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    }
  }

  try {
    await saveCache(LOCATIONS_CACHE_FILE, allCachedCities);
  } catch {}

  return {
    countries: mappedCountries.length,
    cities: allCachedCities.length
  };
}