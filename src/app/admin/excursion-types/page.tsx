
import { getExcursionTypes } from "@/app/actions";
import ExcursionTypesClientPage from "./excursion-types-client-page";

export const revalidate = 0;

export default async function ExcursionTypesPage() {
  const data = await getExcursionTypes();

  return (
    <ExcursionTypesClientPage initialExcursionTypes={data} />
  );
}
