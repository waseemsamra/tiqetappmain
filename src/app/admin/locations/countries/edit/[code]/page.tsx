
import { getCountryByCode, getCitiesByCountryCode } from "@/app/actions";
import { CountryForm } from "../../../country-form";
import { notFound } from "next/navigation";
import { CityList } from "../../../city-list";
import { Separator } from "@/components/ui/separator";

export const revalidate = 0; // Ensures data is fresh on every request

export default async function EditCountryPage({
  params,
}: {
  params: { code: string };
}) {
  const country = await getCountryByCode(params.code);
  
  if (!country) {
    return notFound();
  }
  
  const cities = await getCitiesByCountryCode(params.code);

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Edit Country</h1>
            <p className="text-muted-foreground">Update the details for "{country.name}".</p>
        </div>
        <CountryForm country={country} />
      </div>
      
      <Separator />

      <div>
        <CityList country={country} cities={cities} />
      </div>
    </div>
  );
}
