
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signup } from '../auth/actions';
import type { FormState } from '@/types';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account..." : "Create an account"}
    </Button>
  );
}

const initialState: FormState = {
    message: "",
    success: false,
};

export function SignupForm({ prefillMessage }: { prefillMessage?: string }) {
  const [state, formAction] = useFormState(signup, initialState);
  const [message, setMessage] = useState(prefillMessage);

  useEffect(() => {
    if (state?.message) {
      setMessage(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
        {message && (
            <Alert variant={state.success ? 'default' : 'destructive'} className="mb-4">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        <div className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Jane Doe"
            required
            />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} />
        </div>
        <SignupButton />
        </div>
    </form>
  );
}
