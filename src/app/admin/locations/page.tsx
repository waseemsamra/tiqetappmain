import LocationsClientPage from './locations-client-page';
import { readFileSync } from 'fs';
import { join } from 'path';

export const revalidate = 0;

export default async function AdminLocationsPage() {
  const filePath = join(process.cwd(), 'public', 'locations.json');
  let countries: any[] = [];
  let cities: any[] = [];
  try {
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    countries = Array.isArray(parsed.countries) ? parsed.countries : [];
    cities = Array.isArray(parsed.cities) ? parsed.cities : [];
  } catch {}

  return <LocationsClientPage initialCountries={countries} initialCities={cities} showCities={false} />;
}
