import LocationsClientPage from '../locations-client-page';
import { readFileSync } from 'fs';
import { join } from 'path';

export const revalidate = 0;

export default async function AdminCitiesPage() {
  const filePath = join(process.cwd(), 'public', 'locations.json');
  let cities: any[] = [];
  try {
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    cities = Array.isArray(parsed.cities) ? parsed.cities : [];
  } catch {}

  return <LocationsClientPage initialCountries={[]} initialCities={cities} showCountries={false} />;
}
