import LocationsClientPage from '../locations-client-page';

export const revalidate = 0;

export default async function AdminCountriesPage() {
  const res = await fetch('http://localhost:9002/api/locations', { cache: 'no-store' });
  const data = await res.json();
  return <LocationsClientPage initialCountries={data.countries || []} initialCities={[]} showCities={false} />;
}
