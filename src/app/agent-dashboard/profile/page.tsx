
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

import { AgentProfileForm } from './agent-profile-form';
import { getAgentProfile } from '@/lib/user-service';

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== 'agent') {
    redirect('/login?message=You must be an agent to view this page.');
  }

  const agentProfile = await getAgentProfile(user.id);
  if (!agentProfile) {
      notFound();
  }
  
  const profileWithAuth = {
      ...agentProfile,
      full_name: user.user_metadata.full_name || user.email,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your agent profile and public-facing information.</p>
      </div>
      <AgentProfileForm agentProfile={profileWithAuth} userEmail={user.email!} />
    </div>
  );
}
