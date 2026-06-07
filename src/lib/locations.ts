'use server';

import * as TiqetsApi from '@/lib/tiqets-api';
import type { City, Country } from '@/types';

export async function getCountries(supabaseClient?: any): Promise<Country[]> {
  return TiqetsApi.fetchTiqetsCountries();
}

export async function getCountryByCode(code: string, supabaseClient?: any): Promise<Country | null> {
  const countries = await TiqetsApi.fetchTiqetsCountries();
  return countries.find(c => c.code.toLowerCase() === code.toLowerCase()) || null;
}

export async function getCitiesByCountryCode(countryCode: string, supabaseClient?: any): Promise<City[]> {
  // Fetch all cities and filter by country code
  return TiqetsApi.fetchTiqetsCities().then(cities => 
    cities.filter(c => c.country_code.toLowerCase() === countryCode.toLowerCase())
  );
}

export async function getCityById(cityId: string, supabaseClient?: any): Promise<City | null> {
  return TiqetsApi.fetchTiqetsCityById(cityId);
}