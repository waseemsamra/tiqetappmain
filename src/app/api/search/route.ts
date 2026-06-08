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
    const city_id = (searchParams.get('city_id') || '').trim();
    const country = (searchParams.get('country') || '').trim();
    const types = searchParams.getAll('types');
    const page = parseInt(searchParams.get('page') || '1', 10);

    const lower = query.toLowerCase();

    // 0. City search by ID - fastest path
    if (city_id) {
      let allActivities: any[] = [];
      for (let p = 1; p <= MAX_PAGES; p++) {
        const resp = await fetch(`https://api.tiqets.com/v2/experiences?city_id=${city_id}&page_size=${PAGE_SIZE}&page=${p}`, {
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

    // 2. City search - fetch directly by city_id or known city name
    if (city) {
      const KNOWN_CITY_IDS: Record<string, string> = {
        'barcelona': '66342', 'rome': '71631', 'paris': '66746', 'milan': '71749',
        'florence': '71854', 'venice': '71510', 'antwerp': '60863', 'sintra': '76496',
        'amsterdam': '75061', 'new york': '260932', 'dubai': '60005', 'abu dhabi': '60013',
        'sharjah': '60007', 'lima': '75306', 'cusco': '75323', 'puno': '75296',
        'arequipa': '75334', 'aguas calientes': '261863', 'london': '67458',
        'mexico city': '67461', 'buenos aires': '60189', 'ushuaia': '60210',
        'salta': '60240', 'bariloche': '60331', 'palm beach': '263317', 'nassau': '62236',
        'rio de janeiro': '61535', 'vancouver': '62496', 'toronto': '62492',
        'niagara falls': '62419', 'montreal': '25', 'calgary': '62338', 'ottawa': '62431',
        'victoria': '62501', 'quebec': '62516', 'vaughan': '62499', 'banff': '87579',
        'jasper': '322', 'beaupre': '137139', 'saint-constant': '62458',
        'britannia beach': '263089', 'saint-joseph-de-la-rive': '270495',
        'richmond': '62452', 'mississauga': '62408', 'fort macleod': '136629',
        'brentwood bay': '263090', 'whistler': '87924', 'kamloops': '62382',
        'niagara-on-the-lake': '982', 'gananoque': '269628', 'edmonton': '62366',
        'scott': '271125', 'cochrane': '62349', 'lake louise': '137177', 'golden': '136649',
        'gatineau': '62372', 'squamish': '301',
      };
      const cityId = KNOWN_CITY_IDS[city.toLowerCase()];
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
      // Unknown city: fall through to general text search below
    }

    // 3. General text search - auto-detect country/city from query first
    const KNOWN_CITY_IDS: Record<string, string> = {
      'barcelona': '66342', 'rome': '71631', 'paris': '66746', 'milan': '71749',
      'florence': '71854', 'venice': '71510', 'antwerp': '60863', 'sintra': '76496',
      'amsterdam': '75061', 'new york': '260932', 'dubai': '60005', 'abu dhabi': '60013',
      'sharjah': '60007', 'lima': '75306', 'cusco': '75323', 'puno': '75296',
      'arequipa': '75334', 'aguas calientes': '261863', 'london': '67458',
      'mexico city': '67461', 'buenos aires': '60189', 'ushuaia': '60210',
      'salta': '60240', 'bariloche': '60331', 'palm beach': '263317', 'nassau': '62236',
      'rio de janeiro': '61535', 'vancouver': '62496', 'toronto': '62492',
      'niagara falls': '62419', 'montreal': '25', 'calgary': '62338', 'ottawa': '62431',
      'victoria': '62501', 'quebec': '62516', 'vaughan': '62499', 'banff': '87579',
      'jasper': '322', 'beaupre': '137139', 'saint-constant': '62458',
      'britannia beach': '263089', 'saint-joseph-de-la-rive': '270495',
      'richmond': '62452', 'mississauga': '62408', 'fort macleod': '136629',
      'brentwood bay': '263090', 'whistler': '87924', 'kamloops': '62382',
      'niagara-on-the-lake': '982', 'gananoque': '269628', 'edmonton': '62366',
      'scott': '271125', 'cochrane': '62349', 'lake louise': '137177', 'golden': '136649',
      'gatineau': '62372', 'squamish': '301', 'madrid': '60400', 'barcelona': '66342',
    };
    const [allCountries, allCities] = await Promise.all([
      TiqetsApi.fetchTiqetsCountries(),
      TiqetsApi.fetchTiqetsCities().catch(() => []),
    ]);
    const matchedCountry = allCountries.find(c => c.name.toLowerCase() === lower);
    const matchedCityId = KNOWN_CITY_IDS[lower];
    const matchedCityRecord = allCities.find(c => c.name && c.name.toLowerCase() === lower);

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

    if (matchedCityId || matchedCityRecord) {
      const cityId = matchedCityId || matchedCityRecord.id;
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
