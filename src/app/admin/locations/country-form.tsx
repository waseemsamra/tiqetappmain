
"use client";

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createOrUpdateCountryAction, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { Country } from '@/types';
import { useRouter } from 'next/navigation';

function SubmitButton({ isEditing }: { isEditing: boolean }) {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Country'}</Button>;
}

const initialState: FormState = {
    message: "",
    success: false,
};

export function CountryForm({ country }: { country?: Country }) {
  const { toast } = useToast();
  const router = useRouter();
  const [state, formAction] = useFormState(createOrUpdateCountryAction, initialState);
  const isEditing = !!country;

  useEffect(() => {
    if (state.message) {
      if(state.success) {
        // Redirection is handled in the server action, but we can still toast
        toast({ title: "Success", description: state.message });
      } else {
        const description = state.errors ? 
          Object.values(state.errors).flat().join('\n') : 
          state.message;
        toast({ variant: 'destructive', title: 'Error', description });
      }
    }
  }, [state, toast, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={country?.code || ''} />
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Country" : "Create Country"}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Country Name</Label>
              <Input id="name" name="name" defaultValue={country?.name} required />
              {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name.join(', ')}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="code">Country Code</Label>
              <Input 
                  id="code"
                  name="code"
                  defaultValue={country?.code}
                  disabled={isEditing} 
                  placeholder={isEditing ? '' : 'Auto-generated if empty'}
                  maxLength={2}
              />
              <p className="text-xs text-muted-foreground">A 2-character code (e.g., US, FR). Cannot be changed after creation.</p>
              {state?.errors?.code && <p className="text-sm text-destructive">{state.errors.code.join(', ')}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" name="currency" defaultValue={country?.currency} placeholder="e.g., USD" required />
              {state?.errors?.currency && <p className="text-sm text-destructive">{state.errors.currency.join(', ')}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency_symbol">Currency Symbol</Label>
              <Input id="currency_symbol" name="currency_symbol" defaultValue={country?.currency_symbol} placeholder="e.g., $" required />
              {state?.errors?.currency_symbol && <p className="text-sm text-destructive">{state.errors.currency_symbol.join(', ')}</p>}
            </div>
        </CardContent>
        <CardFooter className="justify-end">
            <SubmitButton isEditing={isEditing} />
        </CardFooter>
      </Card>
    </form>
  );
}
