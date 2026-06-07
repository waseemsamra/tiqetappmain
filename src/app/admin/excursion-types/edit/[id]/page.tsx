
import { getExcursionTypeById } from "@/app/actions";
import { ExcursionTypeForm } from "../../excursion-type-form";
import { notFound } from "next/navigation";
import { updateExcursionTypeServerAction } from "./actions";

export default async function EditExcursionTypePage({
  params,
}: {
  params: { id: string };
}) {
  const excursionType = await getExcursionTypeById(params.id);

  if (!excursionType) {
    notFound();
  }

  // Bind the ID to the server action for the form to use
  const actionWithId = updateExcursionTypeServerAction.bind(null, excursionType.id);

  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Edit Excursion Type</h1>
            <p className="text-muted-foreground">Update the details for "{excursionType.name}".</p>
        </div>
        <ExcursionTypeForm 
          excursionType={excursionType} 
          onFormSubmit={actionWithId} 
        />
    </div>
  );
}
