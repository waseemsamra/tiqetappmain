
import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from './dashboard-sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login?message=You must be logged in to view your dashboard.');
  }

  const userRole = user.user_metadata?.role;

  // This is a protected route for customers.
  // If the user is an agent, partner, or admin, redirect them away.
  if (userRole === 'agent') {
    return redirect('/agent-dashboard');
  }
  if (userRole === 'partner') {
    return redirect('/partner-dashboard');
  }
  if (userRole === 'admin') {
    return redirect('/admin');
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
