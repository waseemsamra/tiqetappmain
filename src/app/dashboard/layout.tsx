
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import DashboardSidebar from './dashboard-sidebar';

const OPEN_PREVIEW_PATHS = ['/dashboard/bookings'];

function getRequestPath(): string {
  const h = headers();
  const xPathname = h.get('x-pathname');
  if (xPathname) return xPathname;
  const xNextJsUrl = h.get('x-nextjs-url');
  if (xNextJsUrl) {
    try {
      return new URL(xNextJsUrl).pathname;
    } catch {}
  }
  const referer = h.get('referer');
  if (referer) {
    try {
      return new URL(referer).pathname;
    } catch {
      return new URL(referer, 'http://localhost').pathname;
    }
  }
  return '';
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const pathname = getRequestPath();
  const isOpenPreview = OPEN_PREVIEW_PATHS.some(p => pathname.startsWith(p));

  if (!user && !isOpenPreview) {
    return redirect('/login?message=You must be logged in to view your dashboard.');
  }

  const userRole = user?.user_metadata?.role;

  if (user) {
    if (userRole === 'agent') {
      return redirect('/agent-dashboard');
    }
    if (userRole === 'partner') {
      return redirect('/partner-dashboard');
    }
    if (userRole === 'admin') {
      return redirect('/admin');
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
      <DashboardSidebar userRole={userRole || 'customer'} />
      <main className="flex flex-1 flex-col bg-background overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">
            {children}
        </div>
      </main>
    </div>
  );
}
