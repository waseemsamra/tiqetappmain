import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PackagesClientPage from "./packages-client-page";
import type { Package } from "@/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const revalidate = 0;

const placeholderPackages: Package[] = [
  {
    id: "pkg_bronze",
    name: "Bronze Standard",
    tier: "bronze",
    categoryName: "packages",
    price: 1000,
    image: "https://placehold.co/200x120/E9D5D5/8C4A4A?text=Bronze",
  },
  {
    id: "pkg_silver",
    name: "Silver Plus",
    tier: "silver",
    categoryName: "packages",
    price: 1500,
    image: "https://placehold.co/200x120/E0E0E0/6C757D?text=Silver",
  },
  {
    id: "pkg_gold",
    name: "Gold Elite",
    tier: "gold",
    categoryName: "packages",
    price: 2000,
    image: "https://placehold.co/200x120/FFD700/8B4513?text=Gold",
  },
  {
    id: "pkg_platinum",
    name: "Platinum Supreme",
    tier: "platinum",
    categoryName: "packages",
    price: 5000,
    image: "https://placehold.co/200x120/E5E4E2/4A4A4A?text=Platinum",
  },
];


export default async function PackagesPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'agent') {
        redirect('/login?message=You must be an agent to view this page.');
    }

    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
          <Breadcrumb className="mt-2">
              <BreadcrumbList>
                  <BreadcrumbItem>
                  <BreadcrumbLink href="/agent-dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbPage>Packages</BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
        </header>
        <PackagesClientPage initialPackages={placeholderPackages} />
      </div>
    );
}
