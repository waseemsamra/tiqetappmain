
import { ExcursionTypeForm } from "../excursion-type-form";
import { createExcursionTypeServerAction } from "./actions";

export default function CreateExcursionTypePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create New Excursion Type</h1>
        <p className="text-muted-foreground">Fill out the form below to add a new excursion type.</p>
      </div>
      <ExcursionTypeForm onFormSubmit={createExcursionTypeServerAction} />
    </div>
  );
}
