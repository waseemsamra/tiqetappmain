

import { ExcursionForm } from "../excursion-form";
import { getExcursionTypes, getCountries } from "@/app/actions";
import { generateExcursionDescription } from "@/ai/flows/generate-excursion-description-flow";

export default async function CreateExcursionPage() {
  const [excursionTypes, countries] = await Promise.all([
    getExcursionTypes(),
    getCountries()
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create New Excursion</h1>
        <p className="text-muted-foreground">Fill out the form below to add a new excursion to the database.</p>
      </div>
      <ExcursionForm
        isEditing={false}
        excursionTypes={excursionTypes} 
        countries={countries}
        onGenerateDescription={generateExcursionDescription}
      />
    </div>
  );
}
