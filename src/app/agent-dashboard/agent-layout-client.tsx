
'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Briefcase,
  User,
  LogOut,
  Share2,
  Network,
  DollarSign,
  Presentation,
  ChevronDown,
  Users,
  Settings,
  BarChart2,
  FileText,
  Mail,
  Store,
  MessageSquare,
  HelpCircle,
  Video,
  Archive,
  UserCheck,
  UserCog,
  Package,
  Calendar,
  Ticket as CouponIcon,
  Star,
  ClipboardCheck,
  ShoppingCart,
  Crown,
  Banknote,
  Mails,
  Cog,
  ArrowRightLeft,
  UserPlus,
  TrendingUp,
  Wallet,
  History,
  Trophy,
  Contact,
  WalletCards,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/auth/actions';
import { usePathname } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useAuth } from '@/app/auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const NavLink = ({
  href,
  icon: Icon,
  children,
  isSubItem = false,
  color,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isSubItem?: boolean;
  color?: 'orange';
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const colorClass = color === 'orange' ? 'text-orange-500 hover:text-orange-600' : 'text-muted-foreground';

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
        isActive ? 'bg-primary/10 text-primary' : (color ? colorClass : 'text-muted-foreground'),
        isSubItem && 'pl-11'
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );
};

const CollapsibleNavLink = ({
  title,
  icon: Icon,
  children,
  initialOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  initialOpen?: boolean;
}) => {
   const pathname = usePathname();
   const isActive = React.Children.toArray(children).some(child => {
    if (React.isValidElement(child) && child.props.href) {
      return pathname.startsWith(child.props.href);
    }
    return false;
  });

  return (
  <Collapsible defaultOpen={initialOpen || isActive}>
    <CollapsibleTrigger asChild>
      <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer">
        <Icon className="h-4 w-4" />
        {title}
        <ChevronDown className="ml-auto h-4 w-4 transition-transform data-[state=open]:rotate-180" />
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent className="space-y-1">{children}</CollapsibleContent>
  </Collapsible>
  );
};

export default function AgentLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useAuth();
  const pathname = usePathname();
  const user = session?.user;
  const userName = user?.user_metadata?.full_name || 'Agent';
  const userAvatar = user?.user_metadata?.avatar_url || '';

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-primary"
            >
              <Store className="h-6 w-6" />
              <span className="text-xl font-bold">LOGO</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <div className="flex items-center gap-3 rounded-lg px-3 py-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{userName}</span>
              </div>
              <NavLink href="/agent-dashboard" icon={LayoutDashboard}>
                Dashboard
              </NavLink>
              <CollapsibleNavLink title="Network" icon={Network} initialOpen={pathname.startsWith('/agent-dashboard/network')}>
                <NavLink
                  href="/agent-dashboard/network"
                  icon={Network}
                  isSubItem
                  color="orange"
                >
                  My Network
                </NavLink>
                <NavLink
                  href="/agent-dashboard/network/genealogy"
                  icon={Users}
                  isSubItem
                >
                  Genealogy
                </NavLink>
              </CollapsibleNavLink>
              <CollapsibleNavLink title="Financial" icon={DollarSign}>
                 <NavLink href="/agent-dashboard/financial/e-wallet" icon={Wallet} isSubItem>E-Wallet</NavLink>
                 <NavLink href="/agent-dashboard/financial/deposit-wallet" icon={WalletCards} isSubItem>Deposit Wallet</NavLink>
                 <NavLink href="/agent-dashboard/financial/fund-credit" icon={ArrowRightLeft} isSubItem>Fund Credit</NavLink>
                 <NavLink href="/agent-dashboard/payouts" icon={TrendingUp} isSubItem>Payout</NavLink>
              </CollapsibleNavLink>
              
              <CollapsibleNavLink title="Communication" icon={MessageSquare} initialOpen={pathname.startsWith('/agent-dashboard/communication')}>
                 <NavLink href="/agent-dashboard/communication/blog" icon={FileText} isSubItem>Blog</NavLink>
                 <NavLink href="/agent-dashboard/communication/faq" icon={HelpCircle} isSubItem>FAQ's</NavLink>
                 <NavLink href="/agent-dashboard/communication/emails" icon={Mail} isSubItem>Emails</NavLink>
                 <NavLink href="/agent-dashboard/communication/help-center" icon={HelpCircle} isSubItem>Help Center</NavLink>
                 <NavLink href="#" icon={FileText} isSubItem>Article</NavLink>
              </CollapsibleNavLink>
              
              <CollapsibleNavLink title="Tools" icon={Briefcase}>
                <NavLink href="/agent-dashboard/marketing-tools" icon={Share2} isSubItem>Marketing Tools</NavLink>
                <NavLink href="#" icon={FileText} isSubItem>Documents</NavLink>
                <NavLink href="#" icon={Video} isSubItem>Videos</NavLink>
              </CollapsibleNavLink>

              <CollapsibleNavLink title="Members Management" icon={Users} initialOpen={pathname.startsWith('/agent-dashboard/downline') || pathname.startsWith('/agent-dashboard/members')}>
                 <NavLink href="/agent-dashboard/downline" icon={Network} isSubItem>
                  Network Members
                 </NavLink>
                 <NavLink href="#" icon={Archive} isSubItem>Holding Tank</NavLink>
                 <NavLink href="/agent-dashboard/members/kyc" icon={UserCheck} isSubItem>KYC Details</NavLink>
              </CollapsibleNavLink>
              
              <CollapsibleNavLink title="Sub Admin" icon={UserCog}>
                 <NavLink href="/agent-dashboard/sub-admin" icon={Users} isSubItem>Sub Admins</NavLink>
              </CollapsibleNavLink>

              <CollapsibleNavLink title="Store" icon={Store}>
                 <NavLink href="/agent-dashboard/store/products" icon={Package} isSubItem>Products</NavLink>
                 <NavLink href="/agent-dashboard/store/packages" icon={Package} isSubItem>Packages</NavLink>
                 <NavLink href="/agent-dashboard/store/events" icon={Calendar} isSubItem>Events</NavLink>
                 <NavLink href="/agent-dashboard/store/coupons" icon={CouponIcon} isSubItem>Coupons</NavLink>
                 <NavLink href="/agent-dashboard/store/user-reviews" icon={Star} isSubItem>User Reviews</NavLink>
                 <NavLink href="/agent-dashboard/store/order-approval" icon={ClipboardCheck} isSubItem>Order Approval</NavLink>
                 <NavLink href="/agent-dashboard/store/orders" icon={ShoppingCart} isSubItem>Orders</NavLink>
              </CollapsibleNavLink>
              
              <CollapsibleNavLink title="Settings" icon={Settings} initialOpen={pathname.startsWith('/agent-dashboard/settings')}>
                 <NavLink href="/agent-dashboard/settings/brand" icon={Crown} isSubItem>Brand</NavLink>
                 <NavLink href="/agent-dashboard/settings/network" icon={Network} isSubItem>Network</NavLink>
                 <NavLink href="/agent-dashboard/settings/withdrawal" icon={Banknote} isSubItem>Withdrawal</NavLink>
                 <NavLink href="/agent-dashboard/settings/email-template" icon={Mails} isSubItem>Email Template</NavLink>
                 <NavLink href="/agent-dashboard/settings/advanced-settings" icon={Cog} isSubItem>Advanced Settings</NavLink>
              </CollapsibleNavLink>

              <CollapsibleNavLink title="Reports" icon={BarChart2}>
                 <NavLink href="/agent-dashboard/reports/fund-transfer" icon={ArrowRightLeft} isSubItem>Fund Transfer</NavLink>
                 <NavLink href="/agent-dashboard/reports/joining-report" icon={UserPlus} isSubItem>Joining Report</NavLink>
                 <NavLink href="/agent-dashboard/reports/member-income" icon={TrendingUp} isSubItem>Member Income</NavLink>
                 <NavLink href="/agent-dashboard/reports/payout" icon={Wallet} isSubItem>Payout</NavLink>
                 <NavLink href="/agent-dashboard/reports/point-history" icon={History} isSubItem>Point History</NavLink>
                 <NavLink href="/agent-dashboard/reports/sales" icon={DollarSign} isSubItem>Sales</NavLink>
                 <NavLink href="/agent-dashboard/reports/top-earners" icon={Trophy} isSubItem>Top Earners</NavLink>
              </CollapsibleNavLink>
              
              <NavLink href="/agent-dashboard/leads" icon={Contact}>
                Leads
              </NavLink>

            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <form action={logout}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                type="submit"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
