
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

import { ProfileForm } from './profile-form';
import { DocumentManager } from './document-manager';
import { AgentProfileForm } from '@/app/agent-dashboard/profile/agent-profile-form';
import { PartnerProfileForm } from '@/app/partner-dashboard/profile/partner-profile-form';

import { getAgentProfile, getPartnerProfile } from '@/lib/user-service';

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?message=You must be logged in to view your profile.');
  }

  const role = user.user_metadata?.role;

  let profileComponent;

  if (role === 'agent') {
    const agentProfile = await getAgentProfile(user.id);
    if (!agentProfile) {
        notFound();
    }
    const profileWithAuth = {
        ...agentProfile,
        full_name: user.user_metadata.full_name || user.email,
    };
    profileComponent = <AgentProfileForm agentProfile={profileWithAuth} userEmail={user.email!} />;
  } else if (role === 'partner') {
    const partnerProfile = await getPartnerProfile(user.id);
    if (!partnerProfile) {
        notFound();
    }
    profileComponent = <PartnerProfileForm partnerProfile={partnerProfile} />;
  } else {
    // Default to customer profile
    const userProfileData = {
        email: user.email || '',
        fullName: user.user_metadata?.full_name || '',
        avatarUrl: user.user_metadata?.avatar_url || '',
        phone: user.user_metadata?.phone || '',
        emergencyContactName: user.user_metadata?.emergency_contact_name || '',
        emergencyContactPhone: user.user_metadata?.emergency_contact_phone || '',
        seatPreference: user.user_metadata?.seat_preference || 'none',
        dietaryRestrictions: user.user_metadata?.dietary_restrictions || '',
      };
    profileComponent = <ProfileForm userProfile={userProfileData} />;
  }


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information, travel preferences, and documents.</p>
      </div>
      {profileComponent}
      {role === 'customer' && <DocumentManager userId={user.id} />}
    </div>
  );
}
