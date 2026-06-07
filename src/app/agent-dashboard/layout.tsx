
import React from 'react';
import AgentLayoutClient from './agent-layout-client';
import { AuthProvider } from '@/app/auth-provider';
import { createClient } from '@/lib/supabase/server';

export default async function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <AuthProvider session={session}>
      <AgentLayoutClient>{children}</AgentLayoutClient>
    </AuthProvider>
  );
}
