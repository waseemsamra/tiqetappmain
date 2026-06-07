
'use client';

import { useEffect, useTransition, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateUserProfileAction } from '@/app/actions';
import type { FormState } from '@/types';

interface ProfileData {
    email: string;
    fullName: string;
    avatarUrl: string;
    phone: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    seatPreference: string;
    dietaryRestrictions: string;
}

interface ProfileFormProps {
    userProfile: ProfileData;
}

const initialState: FormState = {
    message: '',
    success: false,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Saving...' : 'Save All Changes'}
        </Button>
    );
}

export function ProfileForm({ userProfile }: ProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useFormState(updateUserProfileAction, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({ title: 'Success', description: state.message });
        router.refresh();
      } else {
        const description = state.errors ? Object.values(state.errors).flat().join('\n') : state.message;
        toast({ variant: 'destructive', title: 'Error', description: description || 'An unknown error occurred.' });
      }
    }
  }, [state, toast, router]);

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
                 <Avatar className="h-16 w-16">
                    <AvatarImage src={userProfile.avatarUrl} alt="User avatar" />
                    <AvatarFallback>{userProfile.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" defaultValue={userProfile.fullName} />
                     {state.errors?.fullName && <p className="text-sm text-destructive mt-1">{state.errors.fullName.join(', ')}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" defaultValue={userProfile.email} disabled readOnly />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" defaultValue={userProfile.phone} />
                    {state.errors?.phone && <p className="text-sm text-destructive mt-1">{state.errors.phone.join(', ')}</p>}
                </div>
            </div>
        </CardContent>
      </Card>

       <Card className="mt-8">
        <CardHeader>
          <CardTitle>Travel Preferences & Emergency Contact</CardTitle>
          <CardDescription>Help us make your travel smoother and safer.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="seatPreference">Seat Preference</Label>
                 <Select name="seatPreference" defaultValue={userProfile.seatPreference}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a seat preference" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="aisle">Aisle</SelectItem>
                        <SelectItem value="window">Window</SelectItem>
                        <SelectItem value="middle">Middle</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                <Textarea id="dietaryRestrictions" name="dietaryRestrictions" defaultValue={userProfile.dietaryRestrictions} placeholder="e.g., Vegetarian, Gluten-Free..." />
            </div>
             <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                <Input id="emergencyContactName" name="emergencyContactName" defaultValue={userProfile.emergencyContactName}/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                <Input id="emergencyContactPhone" name="emergencyContactPhone" defaultValue={userProfile.emergencyContactPhone} />
            </div>
        </CardContent>
        <CardFooter className="justify-end">
           <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
