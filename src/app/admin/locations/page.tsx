import { getCountries, getCities } from "@/lib/locations";
import LocationsClientPage from "./locations-client-page";

export const revalidate = 0;

export default async function LocationsPage() {
  const data = await getCountries();
  const cities = await getCities();

  return <LocationsClientPage initialCountries={data} initialCities={cities} />;
}
