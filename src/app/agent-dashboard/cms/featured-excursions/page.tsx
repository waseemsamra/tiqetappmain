
import { createClient } from "@/lib/supabase/server";
import { getExcursions } from "@/app/actions";
import { getFeaturedExcursionIds } from "@/lib/user-service";
import { redirect } from "next/navigation";
import ExcursionSelector from "./excursion-selector";

export const revalidate = 0;

export default async function FeaturedExcursionsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'agent') {
        redirect('/login?message=You must be an agent to view this page.');
    }

    const [allExcursions, featuredIds] = await Promise.all([
        getExcursions(),
        getFeaturedExcursionIds(user.id)
    ]);

    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold tracking-tight">Manage Featured Excursions</h1>
                <p className="text-muted-foreground mt-1">
                    Select the tours and activities you want to showcase on your public agent website.
                </p>
            </div>
            <ExcursionSelector
                allExcursions={allExcursions}
                initialFeaturedIds={featuredIds}
                agentId={user.id}
            />
        </div>
    );
}
