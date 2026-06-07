
import { getCountries } from "@/app/actions";
import LocationsClientPage from "./locations-client-page";

export const revalidate = 0;

export default async function LocationsPage() {
  const data = await getCountries();

  return (
    <LocationsClientPage initialCountries={data} />
  );
}
