
import { Suspense } from "react";
import { getExcursionTypes } from "@/app/actions";
import SearchClientPage from "./search-client-page";

export const revalidate = 0;

export default async function SearchPage() {
    const allExcursionTypes = await getExcursionTypes();

    return (
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchClientPage 
                    allExcursionTypes={allExcursionTypes}
                />
            </Suspense>
        </div>
    );
}
