import { NextResponse } from 'next/server';
import { fetchTiqetsCountries, fetchTiqetsCities } from '@/lib/tiqets-api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const countries = await fetchTiqetsCountries();
    const mapped = countries.map((c: any) => ({
      id: String(c.id || c.code || ''),
      name: c.name || '',
      code: c.code || '',
      currency: c.currency || '',
      currency_symbol: c.currency_symbol || '',
    }));

    const cities: any[] = [];
    const batch = mapped.slice(0, 10);
    for (const country of batch) {
      try {
        const list = await fetchTiqetsCities(country.id);
        for (const city of list) {
          cities.push({
            id: String(city.id || ''),
            name: city.name || '',
            country_code: (city.country_code || country.code).toLowerCase(),
            country_name: country.name || '',
          });
        }
      } catch {}
    }

    return NextResponse.json({ countries: mapped, cities });
  } catch (error) {
    console.error('Failed to load locations:', error);
    return NextResponse.json({ countries: [], cities: [] });
  }
}
