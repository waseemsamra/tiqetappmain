

import Link from "next/link";
import { Home, List, Plane, Tag, Map, Presentation, Ticket, LayoutDashboard, Users, UserCog, Briefcase, LogOut, CreditCard, Settings, TrendingUp, WalletCards, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
              <Ticket className="h-6 w-6" />
              <span>RoamReady</span>
            </Link>
             <Badge variant="secondary" className="ml-auto">Admin</Badge>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Admin Dashboard
              </Link>
               {/* Excursions & Types Group */}
               <div className="my-2">
                 <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Content</p>
                 <Link
                   href="/admin/excursions"
                   className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                 >
                   <List className="h-4 w-4" />
                   Excursions
                 </Link>
                 <Link
                   href="/admin/excursion-types"
                   className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                 >
                   <Tag className="h-4 w-4" />
                   Excursion Types
                 </Link>
                 <Link
                   href="/admin/excursion-types/options"
                   className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                 >
                   <SlidersHorizontal className="h-4 w-4" />
                   Options
                 </Link>
                 <Link
                   href="/admin/locations"
                   className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                 >
                   <Map className="h-4 w-4" />
                   Locations
                 </Link>
               </div>
              
              {/* User Management Group */}
              <div className="my-2">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">User Management</p>
                <Link
                  href="/admin/users"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  All Users
                </Link>
                <Link
                  href="/admin/users/agents"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <UserCog className="h-4 w-4" />
                  Agents
                </Link>
                <Link
                  href="/admin/users/partners"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Briefcase className="h-4 w-4" />
                  Partners
                </Link>
              </div>
              
              {/* Business Management Group */}
               <div className="my-2">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Business</p>
                 <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary opacity-50 cursor-not-allowed"
                >
                  <WalletCards className="h-4 w-4" />
                  Commission Runs
                </Link>
                 <Link
                  href="/admin/payments"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CreditCard className="h-4 w-4" />
                  Payment Providers
                </Link>
              </div>

               {/* CMS Group */}
               <div className="my-2">
                 <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">CMS</p>
                 <Link
                   href="/admin/cms"
                   className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                 >
                   <Presentation className="h-4 w-4" />
                   CMS Home
                 </Link>
                 <Link
                   href="/admin/hero"
                   className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                 >
                   <Presentation className="h-4 w-4" />
                   Hero Content
                 </Link>
               </div>


               {/* Settings Group */}
               <div className="my-2">
                 <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Settings</p>
                   <Link
                    href="/admin/settings/variants"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Variants
                  </Link>
                   <Link
                    href="/admin/settings/google"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Google Settings
                  </Link>
               </div>


              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-4"
              >
                <LayoutDashboard className="h-4 w-4" />
                My Dashboard
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" type="button">
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {/* Can add mobile nav toggle here if needed */}
            <div className="w-full flex-1">
               {/* Can add breadcrumbs or search here */}
            </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
