
import Link from "next/link";
import {
    LayoutDashboard,
    Ticket,
    Briefcase,
    User,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { logout } from '@/app/auth/actions';

export default async function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== 'partner') {
    return redirect('/login?message=You must be a partner to view this page.');
  }

  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
                <Ticket className="h-6 w-6" />
                <span>AAFare</span>
              </Link>
               <Badge variant="secondary" className="ml-auto">Partner</Badge>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  href="/partner-dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard & Profile
                </Link>
                 <Link
                  href="/partner-dashboard/excursions"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Briefcase className="h-4 w-4" />
                  My Excursions
                </Link>
              </nav>
            </div>
             <div className="mt-auto p-4 border-t">
                  <form action={logout}>
                     <Button variant="ghost" className="w-full justify-start gap-4 px-4 py-3" type="submit">
                          <LogOut className="h-5 w-5" />
                          <span className="font-medium">Logout</span>
                      </Button>
                  </form>
              </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <div className="w-full flex-1" />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
  );
}
