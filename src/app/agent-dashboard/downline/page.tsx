
import { createClient } from '@/lib/supabase/server';
import { getDirectDownline } from '@/lib/user-service';
import { redirect } from 'next/navigation';
import { DownlineClientPage } from './downline-client-page';
import { Suspense } from 'react';
import type { UserForAdmin } from '@/types';

export const revalidate = 0;

async function DownlineContent() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== 'agent') {
    redirect('/login?message=You must be an agent to view this page.');
  }

  const members = await getDirectDownline(user.id);

  return (
    <DownlineClientPage 
        initialMembers={members} 
    />
    );
}

export default function DownlinePage() {
    return (
        <Suspense fallback={<div>Loading downline...</div>}>
            <DownlineContent />
        </Suspense>
    )
}
