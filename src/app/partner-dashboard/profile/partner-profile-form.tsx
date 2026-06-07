
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { updatePartnerProfileAction } from '@/app/actions';
import type { Partner, FormState } from '@/types';


interface PartnerProfileFormProps {
    partnerProfile: Partner;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save Changes'}</Button>;
}

const initialState: FormState = {
    message: "",
    success: false,
};

export function PartnerProfileForm({ partnerProfile }: PartnerProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useFormState(updatePartnerProfileAction, initialState);

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

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Update your company's public details here.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="companyName" defaultValue={partnerProfile.company_name} />
                {state.errors?.companyName && <p className="text-sm text-destructive mt-1">{state.errors.companyName.join(', ')}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" name="contactEmail" type="email" defaultValue={partnerProfile.contact_email} />
                {state.errors?.contactEmail && <p className="text-sm text-destructive mt-1">{state.errors.contactEmail.join(', ')}</p>}
            </div>
             <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" type="url" defaultValue={partnerProfile.website || ''} placeholder="https://example.com" />
                 {state.errors?.website && <p className="text-sm text-destructive mt-1">{state.errors.website.join(', ')}</p>}
            </div>
        </CardContent>
      </Card>
      
       <Card className="mt-8">
          <CardHeader>
              <CardTitle>Payout Information</CardTitle>
              <CardDescription>Enter your bank details to receive payouts for your bookings.</CardDescription>
          </CardHeader>
          <CardContent>
               <div className="space-y-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input id="iban" name="iban" defaultValue={partnerProfile.iban || ''} placeholder="AE00 0000 0000 0000 0000 000" />
                 {state.errors?.iban && <p className="text-sm text-destructive mt-1">{state.errors.iban.join(', ')}</p>}
            </div>
          </CardContent>
           <CardFooter className="justify-end">
            <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
