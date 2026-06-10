import LocationsClientPage from './locations-client-page';

export const revalidate = 0;

export default async function AdminLocationsPage() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') || 'http://localhost:9002';
    const res = await fetch(`${base}/api/locations`, { cache: 'no-store' });
    if (!res.ok) {
      return <LocationsClientPage countries={[]} cities={[]} />;
    }
    const data = await res.json();
    return <LocationsClientPage countries={data.countries || []} cities={data.cities || []} />;
  } catch (error) {
    console.error('Failed to load locations for admin:', error);
    return <LocationsClientPage countries={[]} cities={[]} />;
  }
}
