import LocationsClientPage from './locations-client-page';

export const revalidate = 0;

export default async function AdminLocationsPage() {
  let countries: any[] = [];
  let cities: any[] = [];

  try {
    const base = 'http://localhost:9002';
    const res = await fetch(`${base}/api/locations`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      countries = Array.isArray(data.countries) ? data.countries : [];
      cities = Array.isArray(data.cities) ? data.cities : [];
    }
  } catch {}

  return <LocationsClientPage initialCountries={countries} initialCities={cities} />;
}
