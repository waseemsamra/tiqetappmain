
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getExcursionsByPartner } from "@/app/actions";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export const revalidate = 0;

export default async function PartnerExcursionsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'partner') {
        redirect('/login?message=You must be a partner to view this page.');
    }

    const data = await getExcursionsByPartner(user.id);

    return (
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Excursions</h1>
                    <p className="text-muted-foreground">Manage all your travel excursions here.</p>
                </div>
                <Button asChild>
                <Link href="/admin/create">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New
                </Link>
                </Button>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
