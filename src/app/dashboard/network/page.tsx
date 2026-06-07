

import { createClient } from '@/lib/supabase/server';
import { getDirectDownline } from '@/lib/user-service';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import type { User } from '@/types';
import { NetworkClientPage } from './network-client-page';

export const revalidate = 0;

async function NetworkContent() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== 'agent') {
    redirect('/login?message=You must be an agent to view this page.');
  }

  const downlineMembers = await getDirectDownline(user.id);

  return <NetworkClientPage initialMembers={downlineMembers as User[]} />;
}

export default function MyNetworkPage() {
    return (
        <Suspense fallback={<div>Loading network...</div>}>
            <NetworkContent />
        </Suspense>
    )
}
