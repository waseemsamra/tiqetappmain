import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getExcursionsByPartner } from "@/app/actions";
import ProductsClientPage from "./products-client-page";

export const revalidate = 0;

export default async function PartnerExcursionsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'agent') {
        redirect('/login?message=You must be an agent to view this page.');
    }

    const data = await getExcursionsByPartner(user.id);

    return (
        <ProductsClientPage initialExcursions={data} />
    );
}
