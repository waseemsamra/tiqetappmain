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

    const countryById = new Map(mapped.map((c: any) => [c.id, { code: c.code, name: c.name }]));
    const countryByCode = new Map(mapped.map((c: any) => [c.code.toLowerCase(), { id: c.id, name: c.name }]));

    const cities: any[] = [];
    const batch = mapped.slice(0, 10);
    for (const country of batch) {
      try {
        const list = await fetchTiqetsCities(country.id);
        for (const city of list) {
          let countryCode = (country.code || '').toLowerCase();
          let countryName = country.name || '';

          const rawCountryCode = city.country_code || '';
          if (rawCountryCode) {
            const byId = countryById.get(String(rawCountryCode));
            if (byId) {
              countryCode = byId.code.toLowerCase();
              countryName = byId.name;
            } else {
              const byCode = countryByCode.get(String(rawCountryCode).toLowerCase());
              if (byCode) {
                countryCode = String(byCode.id);
                countryName = byCode.name;
              }
            }
          }

          cities.push({
            id: String(city.id || ''),
            name: city.name || '',
            country_code: countryCode,
            country_name: countryName,
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
