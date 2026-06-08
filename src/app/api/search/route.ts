
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import * as TiqetsApi from '@/lib/tiqets-api';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('query') || '').trim();
    if (!query) {
      return NextResponse.json({ activities: [], countries: [], cities: [] });
    }

    const [excursions, countries, cities] = await Promise.all([
      TiqetsApi.fetchTiqetsProducts(),
      TiqetsApi.fetchTiqetsCountries(),
      TiqetsApi.fetchTiqetsCities(),
    ]);

    const lower = query.toLowerCase();
    const matchedExcursions = excursions
      .filter(ex => ex.name.toLowerCase().includes(lower) || ex.country.toLowerCase().includes(lower) || ex.city.toLowerCase().includes(lower))
      .slice(0, 10);

    const matchedCountries = countries
      .filter(c => c.name.toLowerCase().includes(lower))
      .slice(0, 10);

    const matchedCities = cities
      .filter(c => c.name && c.name.toLowerCase().includes(lower))
      .slice(0, 10);

    return NextResponse.json({ activities: matchedExcursions, countries: matchedCountries, cities: matchedCities });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Search API Error:', errorMessage);
    return NextResponse.json({ activities: [], countries: [], cities: [], error: errorMessage }, { status: 500 });
  }
}
