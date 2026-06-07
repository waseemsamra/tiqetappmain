import { Suspense } from "react";
import { getExcursionTypes, getTopRatedExcursions } from "@/app/actions";
import TopSearchedClientPage from "./top-searched-client-page";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600; // Revalidate every hour

async function TopSearchedContent() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const [topExcursions, allExcursionTypes] = await Promise.all([
        getTopRatedExcursions(),
        getExcursionTypes()
    ]);

    return (
        <TopSearchedClientPage 
            initialExcursions={topExcursions}
            allExcursionTypes={allExcursionTypes}
            user={user}
        />
    );
}


export default function TopSearchedPage() {
    return (
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
            <Suspense fallback={<div>Loading top experiences...</div>}>
                <TopSearchedContent />
            </Suspense>
        </div>
    );
}
