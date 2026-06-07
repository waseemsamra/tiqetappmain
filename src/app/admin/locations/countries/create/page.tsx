
import { CountryForm } from "../../country-form";

export default function CreateCountryPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create New Country</h1>
        <p className="text-muted-foreground">Fill out the form below to add a new country.</p>
      </div>
      <CountryForm />
    </div>
  );
}
