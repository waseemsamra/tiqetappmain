import { getCountries, getCities } from "@/lib/locations";
import LocationsClientPage from "./locations-client-page";

export const revalidate = 0;

export default async function LocationsPage() {
  let data = await getCountries();
  let cities = await getCities();

  if (!data.length || !cities.length) {
    try {
      const { syncLocations } = await import("@/lib/locations");
      await syncLocations();
      data = await getCountries();
      cities = await getCities();
    } catch {}
  }

  return <LocationsClientPage initialCountries={data} initialCities={cities} />;
}
