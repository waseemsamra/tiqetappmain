

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getAgentStats, getAgentReferrals, getAgentRank } from '@/app/actions';
import { getDirectDownline } from '@/lib/user-service';
import type { User } from '@/types';
import AgentDashboardWrapper from './agent-dashboard-wrapper';

export default async function AgentDashboardPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'agent') {
        redirect('/login?message=You must be an agent to view this page.');
    }

    const [statsData, downlineMembers] = await Promise.all([
        getAgentStats(user.id),
        getDirectDownline(user.id)
    ]);
    
    const rank = await getAgentRank(statsData.totalReferrals);

  return (
    <AgentDashboardWrapper
      user={user as User}
      initialStats={statsData}
      agentRank={rank}
      latestRegistrations={downlineMembers}
    />
  );
}
