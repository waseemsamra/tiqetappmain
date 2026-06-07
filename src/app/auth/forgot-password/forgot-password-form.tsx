
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { handlePasswordResetRequest } from './actions';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FormState {
    message: string;
    success: boolean;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Reset Link'}
    </Button>
  );
}

const initialState: FormState = {
  message: "",
  success: false,
};

export function ForgotPasswordForm({ prefillMessage }: { prefillMessage?: string }) {
  const [state, formAction] = useFormState(handlePasswordResetRequest, initialState);
  const [message, setMessage] = useState(prefillMessage);

  useEffect(() => {
    if (state?.message) {
      setMessage(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      {message && (
        <Alert variant={state.success ? 'default' : 'destructive'} className="mb-4">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      {!state.success && (
        <>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <SubmitButton />
        </>
      )}
       <div className="mt-4 text-center text-sm">
            Remember your password?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
        </div>
    </form>
  );
}
