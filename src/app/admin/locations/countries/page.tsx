import LocationsClientPage from '../locations-client-page';
import { readFileSync } from 'fs';
import { join } from 'path';

export const revalidate = 0;

export default async function AdminCountriesPage() {
  const filePath = join(process.cwd(), 'public', 'locations.json');
  let countries: any[] = [];
  try {
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    countries = Array.isArray(parsed.countries) ? parsed.countries : [];
  } catch {}

  return <LocationsClientPage initialCountries={countries} initialCities={[]} showCities={false} />;
}
