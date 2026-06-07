
'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  User,
  Ticket,
  Heart,
  BrainCircuit,
  LogOut,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/auth/actions';

const NavLink = ({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) => (
    <Link href={href} prefetch={false} className="flex items-center gap-4 px-4 py-3 text-muted-foreground rounded-lg hover:bg-muted hover:text-foreground transition-all">
        <Icon className="h-5 w-5" />
        <span className="font-medium">{children}</span>
    </Link>
);

export default function DashboardSidebar({ userRole }: { userRole: string }) {

  return (
    <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col">
            <div className="flex h-20 items-center border-b px-6">
                 <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
                    <Ticket className="h-6 w-6" />
                    <span className="text-xl">RoamReady</span>
                </Link>
            </div>
            <div className="flex-1 p-2 overflow-y-auto">
                <nav className="flex flex-col gap-1 text-sm font-medium">
                    <NavLink href="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                    <NavLink href="/dashboard/profile" icon={User}>Profile</NavLink>
                    <NavLink href="/dashboard/bookings" icon={Ticket}>My Bookings</NavLink>
                    <NavLink href="/dashboard/wishlist" icon={Heart}>Wishlist</NavLink>
                    <NavLink href="/dashboard/wallet" icon={Wallet}>Wallet</NavLink>
                    <NavLink href="/concierge" icon={BrainCircuit}>AI Concierge</NavLink>
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
    </aside>
  );
}
