'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { updatePaymentSettingsAction } from './actions';
import type { FormState } from '@/types';
import type { PaymentSettings } from '@/lib/payments';
import Link from 'next/link';

function SubmitButton() {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : 'Save Settings'}</Button>;
}

const initialState: FormState = {
    message: "",
    success: false,
};

interface PaymentSettingsFormProps {
    initialSettings: PaymentSettings;
    provider: 'ziina';
}

export function PaymentSettingsForm({ initialSettings, provider }: PaymentSettingsFormProps) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(updatePaymentSettingsAction, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({ title: 'Success', description: state.message });
      } else {
        const description = state.errors ? Object.values(state.errors).flat().join('\n') : state.message;
        toast({ variant: 'destructive', title: 'Error', description });
      }
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <Card>
        {provider === 'ziina' && (
             <>
                <CardHeader>
                    <CardTitle>ZIINA Configuration</CardTitle>
                    <CardDescription>Enter your ZIINA API key. This is stored securely and is not exposed on the client-side.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="ziinaApiKey">ZIINA API Key</Label>
                        <Input id="ziinaApiKey" name="ziinaApiKey" type="password" defaultValue={initialSettings.ziinaApiKey ? '********' : ''} placeholder="prod_..." />
                        {state?.errors?.ziinaApiKey && <p className="text-sm text-destructive mt-1">{state.errors.ziinaApiKey.join(', ')}</p>}
                    </div>
                     <div className="space-y-2 pt-4">
                        <Button asChild variant="outline">
                           <Link href="/admin/payments/ziina/webhooks">Manage Webhooks</Link>
                        </Button>
                    </div>
                </CardContent>
            </>
        )}
        <CardFooter className="justify-end">
            <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}
