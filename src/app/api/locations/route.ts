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

    const allCities: any[] = [];
    const BATCH_SIZE = 10;
    const DELAY_MS = 1000;

    for (let i = 0; i < mapped.length; i += BATCH_SIZE) {
      const batch = mapped.slice(i, i + BATCH_SIZE);
      for (const country of batch) {
        try {
          const list = await fetchTiqetsCities(country.id);
          for (const city of list) {
            allCities.push({
              id: String(city.id || ''),
              name: city.name || '',
              country_code: country.code || '',
              country_name: country.name || '',
            });
          }
        } catch {}
      }
      if (i + BATCH_SIZE < mapped.length) {
        await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      }
    }

    return NextResponse.json({ countries: mapped, cities: allCities });
  } catch (error) {
    console.error('Failed to load locations:', error);
    return NextResponse.json({ countries: [], cities: [] });
  }
}
