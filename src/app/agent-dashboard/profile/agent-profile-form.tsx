'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { updateAgentProfileAction } from '@/app/actions';
import type { Agent, FormState } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Copy, WalletCards, Bell, Globe, Facebook, Twitter, Instagram } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface AgentProfileFormProps {
    agentProfile: Agent & {full_name: string};
    userEmail: string;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save Changes'}</Button>;
}

const initialState: FormState = {
    message: "",
    success: false,
};

export function AgentProfileForm({ agentProfile, userEmail }: AgentProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useFormState(updateAgentProfileAction, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({ title: 'Success', description: state.message });
        router.refresh();
      } else {
        const description = state.errors ? Object.values(state.errors).flat().join('\n') : state.message;
        toast({ variant: 'destructive', title: 'Error', description });
      }
    }
  }, [state, toast, router]);
  
  const copyReferralCode = () => {
    navigator.clipboard.writeText(agentProfile.referral_code);
    toast({ title: 'Copied!', description: 'Referral code copied to clipboard.' });
  }

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>Agent Profile</CardTitle>
          <CardDescription>This information is used for your internal profile and payouts.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" defaultValue={agentProfile.full_name || ''} readOnly disabled />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Account Email</Label>
                <Input id="email" name="email" defaultValue={userEmail} disabled readOnly />
            </div>
            <div className="space-y-2">
                <Label htmlFor="commissionRate">Commission Rate</Label>
                <div className="flex items-center">
                    <Input id="commissionRate" name="commissionRate" value={`${agentProfile.commission_rate}%`} disabled readOnly />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="referralCode">Referral Code</Label>
                <div className="flex items-center gap-2">
                    <Input id="referralCode" name="referralCode" value={agentProfile.referral_code} disabled readOnly />
                    <Button type="button" variant="outline" size="icon" onClick={copyReferralCode}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
             <div className="md:col-span-2 space-y-2">
                <Label htmlFor="paypalEmail">PayPal Email for Payouts</Label>
                <Input id="paypalEmail" name="paypalEmail" type="email" defaultValue={agentProfile.paypal_email || ''} placeholder="payout@example.com"/>
                {state.errors?.paypalEmail && <p className="text-sm text-destructive mt-1">{state.errors.paypalEmail.join(', ')}</p>}
            </div>
        </CardContent>
      </Card>
      
       <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Globe /> Public Profile</CardTitle>
          <CardDescription>This information will be displayed on your public agent page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="bio">Public Bio</Label>
                <Textarea id="bio" name="bio" defaultValue={agentProfile.bio || ''} placeholder="Tell prospects a little bit about yourself..." rows={4} />
                 {state.errors?.bio && <p className="text-sm text-destructive mt-1">{state.errors.bio.join(', ')}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="facebookUrl" className="flex items-center gap-2"><Facebook /> Facebook URL</Label>
                    <Input id="facebookUrl" name="facebookUrl" defaultValue={agentProfile.facebook_url || ''} placeholder="https://facebook.com/..." />
                     {state.errors?.facebookUrl && <p className="text-sm text-destructive mt-1">{state.errors.facebookUrl.join(', ')}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="twitterUrl" className="flex items-center gap-2"><Twitter /> Twitter URL</Label>
                    <Input id="twitterUrl" name="twitterUrl" defaultValue={agentProfile.twitter_url || ''} placeholder="https://twitter.com/..." />
                     {state.errors?.twitterUrl && <p className="text-sm text-destructive mt-1">{state.errors.twitterUrl.join(', ')}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="instagramUrl" className="flex items-center gap-2"><Instagram /> Instagram URL</Label>
                    <Input id="instagramUrl" name="instagramUrl" defaultValue={agentProfile.instagram_url || ''} placeholder="https://instagram.com/..." />
                     {state.errors?.instagramUrl && <p className="text-sm text-destructive mt-1">{state.errors.instagramUrl.join(', ')}</p>}
                </div>
            </div>
        </CardContent>
      </Card>


      <Card className="mt-8">
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell /> Push Notifications</CardTitle>
              <CardDescription>Manage your mobile app notifications. (Coming Soon)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                  <div>
                      <Label htmlFor="notification-signup" className="font-medium">New Sign-Ups</Label>
                      <p className="text-xs text-muted-foreground">Notify me when someone joins my downline.</p>
                  </div>
                  <Switch id="notification-signup" disabled />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                  <div>
                      <Label htmlFor="notification-commission" className="font-medium">New Commission</Label>
                      <p className="text-xs text-muted-foreground">Notify me when I earn a new commission.</p>
                  </div>
                  <Switch id="notification-commission" disabled />
              </div>
               <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                  <div>
                      <Label htmlFor="notification-message" className="font-medium">Team Messages</Label>
                      <p className="text-xs text-muted-foreground">Notify me of new messages in the team chat.</p>
                  </div>
                  <Switch id="notification-message" disabled />
              </div>
          </CardContent>
      </Card>
      
      <div className="mt-8 flex justify-end">
        <SubmitButton />
      </div>

    </form>
  );
}
