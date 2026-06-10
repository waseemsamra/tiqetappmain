import LocationsClientPage from "./locations-client-page";
import { readFileSync } from "fs";
import { join } from "path";

export const revalidate = 0;

export default async function LocationsPage() {
  const filePath = join(process.cwd(), "cache", "locations.json");
  let initialCountries: any[] = [];
  let initialCities: any[] = [];
  try {
    const raw = readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    initialCountries = Array.isArray(parsed.countries) ? parsed.countries : [];
    initialCities = Array.isArray(parsed.cities) ? parsed.cities : [];
  } catch (err) {
    // keep empty arrays if file missing
  }

  return <LocationsClientPage initialCountries={initialCountries} initialCities={initialCities} />;
}
