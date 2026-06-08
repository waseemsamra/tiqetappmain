export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import * as TiqetsApi from '@/lib/tiqets-api';

const PAGE_SIZE = 100;
const MAX_PAGES = 5;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('query') || '').trim();
    const city = (searchParams.get('city') || '').trim();
    const country = (searchParams.get('country') || '').trim();
    const types = searchParams.getAll('types');
    const page = parseInt(searchParams.get('page') || '1', 10);

    const lower = query.toLowerCase();

    // 1. Country search - fetch directly from Tiqets by country_id
    if (country) {
      const countries = await TiqetsApi.fetchTiqetsCountries();
      const matchedCountry = countries.find(c => c.name.toLowerCase() === country.toLowerCase());
      if (!matchedCountry) {
        return NextResponse.json({ activities: [], countries: [], cities: [], total: 0, page, totalPages: 0 });
      }

      let allActivities: any[] = [];
      for (let p = 1; p <= MAX_PAGES; p++) {
        const resp = await fetch(`https://api.tiqets.com/v2/experiences?country_id=${matchedCountry.id}&page_size=${PAGE_SIZE}&page=${p}`, {
          headers: { 'Accept': 'application/json', 'Authorization': `Token ${process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W'}`, 'User-Agent': 'my user agent' },
        });
        if (!resp.ok) break;
        const data = await resp.json();
        const batch = (data.experiences || data.products || data.items || []);
        allActivities.push(...batch);
        if (batch.length < PAGE_SIZE) break;
      }

      const transformed = allActivities.map(TiqetsApi.transformTiqetsProduct);
      let filtered = transformed;
      if (query) {
        filtered = filtered.filter(ex => ex.name.toLowerCase().includes(lower) || ex.country.toLowerCase().includes(lower) || ex.city.toLowerCase().includes(lower));
      }

      const start = (page - 1) * PAGE_SIZE;
      const paged = filtered.slice(start, start + PAGE_SIZE);

      return NextResponse.json({ activities: paged, countries: [], cities: [], total: filtered.length, page, totalPages: Math.ceil(filtered.length / PAGE_SIZE) });
    }

    // 2. City search - fetch directly by city_id
    if (city) {
      const cityId = TiqetsApi.KNOWN_CITY_IDS[city.toLowerCase()];
      if (cityId) {
        let allActivities: any[] = [];
        for (let p = 1; p <= MAX_PAGES; p++) {
          const resp = await fetch(`https://api.tiqets.com/v2/experiences?city_id=${cityId}&page_size=${PAGE_SIZE}&page=${p}`, {
            headers: { 'Accept': 'application/json', 'Authorization': `Token ${process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W'}`, 'User-Agent': 'my user agent' },
          });
          if (!resp.ok) break;
          const data = await resp.json();
          const batch = (data.experiences || data.products || data.items || []);
          allActivities.push(...batch);
          if (batch.length < PAGE_SIZE) break;
        }
        const transformed = allActivities.map(TiqetsApi.transformTiqetsProduct);
        let filtered = transformed;
        if (query) {
          filtered = filtered.filter(ex => ex.name.toLowerCase().includes(lower) || ex.country.toLowerCase().includes(lower) || ex.city.toLowerCase().includes(lower));
        }
        const start = (page - 1) * PAGE_SIZE;
        const paged = filtered.slice(start, start + PAGE_SIZE);
        return NextResponse.json({ activities: paged, countries: [], cities: [], total: filtered.length, page, totalPages: Math.ceil(filtered.length / PAGE_SIZE) });
      }
    }

    // 3. General text search - check if query matches a country/city first
    const [allCountries, allCities] = await Promise.all([
      TiqetsApi.fetchTiqetsCountries(),
      TiqetsApi.fetchTiqetsCities(),
    ]);

    const matchedCountry = allCountries.find(c => c.name.toLowerCase() === lower);
    const matchedCity = allCities.find(c => c.name && c.name.toLowerCase() === lower);

    if (matchedCountry) {
      let allActivities: any[] = [];
      for (let p = 1; p <= MAX_PAGES; p++) {
        const resp = await fetch(`https://api.tiqets.com/v2/experiences?country_id=${matchedCountry.id}&page_size=${PAGE_SIZE}&page=${p}`, {
          headers: { 'Accept': 'application/json', 'Authorization': `Token ${process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W'}`, 'User-Agent': 'my user agent' },
        });
        if (!resp.ok) break;
        const data = await resp.json();
        const batch = (data.experiences || data.products || data.items || []);
        allActivities.push(...batch);
        if (batch.length < PAGE_SIZE) break;
      }
      const transformed = allActivities.map(TiqetsApi.transformTiqetsProduct);
      const start = (page - 1) * PAGE_SIZE;
      const paged = transformed.slice(start, start + PAGE_SIZE);
      return NextResponse.json({ activities: paged, countries: [], cities: [], total: transformed.length, page, totalPages: Math.ceil(transformed.length / PAGE_SIZE) });
    }

    if (matchedCity) {
      const cityId = TiqetsApi.KNOWN_CITY_IDS[matchedCity.name.toLowerCase()] || matchedCity.id;
      let allActivities: any[] = [];
      for (let p = 1; p <= MAX_PAGES; p++) {
        const resp = await fetch(`https://api.tiqets.com/v2/experiences?city_id=${cityId}&page_size=${PAGE_SIZE}&page=${p}`, {
          headers: { 'Accept': 'application/json', 'Authorization': `Token ${process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W'}`, 'User-Agent': 'my user agent' },
        });
        if (!resp.ok) break;
        const data = await resp.json();
        const batch = (data.experiences || data.products || data.items || []);
        allActivities.push(...batch);
        if (batch.length < PAGE_SIZE) break;
      }
      const transformed = allActivities.map(TiqetsApi.transformTiqetsProduct);
      const start = (page - 1) * PAGE_SIZE;
      const paged = transformed.slice(start, start + PAGE_SIZE);
      return NextResponse.json({ activities: paged, countries: [], cities: [], total: transformed.length, page, totalPages: Math.ceil(transformed.length / PAGE_SIZE) });
    }

    // Fallback: broad fetcher
    const allExcursions = await TiqetsApi.fetchTiqetsProducts();
    const matchedExcursions = allExcursions.filter(ex =>
      ex.name.toLowerCase().includes(lower) || ex.country.toLowerCase().includes(lower) || ex.city.toLowerCase().includes(lower)
    );
    const matchedCountries = allCountries.filter(c => c.name.toLowerCase().includes(lower)).slice(0, 10);
    const matchedCities = allCities.filter(c => c.name && c.name.toLowerCase().includes(lower)).slice(0, 10);
    const start = (page - 1) * PAGE_SIZE;
    const paged = matchedExcursions.slice(start, start + PAGE_SIZE);
    return NextResponse.json({ activities: paged, countries: matchedCountries, cities: matchedCities, total: matchedExcursions.length, page, totalPages: Math.ceil(matchedExcursions.length / PAGE_SIZE) });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Search API Error:', errorMessage);
    return NextResponse.json({ activities: [], countries: [], cities: [], total: 0, page: 1, totalPages: 0, error: errorMessage }, { status: 500 });
  }
}
