

import { getExcursionById, getExcursionTypes, getCountries } from "@/app/actions";
import { ExcursionForm } from "../../excursion-form";
import { notFound } from "next/navigation";
import { generateExcursionDescription } from "@/ai/flows/generate-excursion-description-flow";

export default async function EditExcursionPage({ params }: { params: { id: string } }) {
    const excursionData = await getExcursionById(params.id);

    if (!excursionData) {
        notFound();
    }

    const [excursionTypes, countries] = await Promise.all([
        getExcursionTypes(),
        getCountries()
    ]);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Edit Excursion</h1>
                <p className="text-muted-foreground">Update the details for "{excursionData.name}".</p>
            </div>
            <ExcursionForm 
                isEditing={true}
                excursion={excursionData} 
                excursionTypes={excursionTypes} 
                countries={countries}
                onGenerateDescription={generateExcursionDescription}
            />
        </div>
    );
}
