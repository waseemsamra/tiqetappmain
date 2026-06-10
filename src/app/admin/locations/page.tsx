import { getCountries, getCities } from "@/lib/locations";
import LocationsClientPage from "./locations-client-page";

export const revalidate = 0;

export default async function LocationsPage() {
  const [data, cities] = await Promise.all([getCountries(), getCities()]);
  return <LocationsClientPage initialCountries={data} initialCities={cities} />;
}
