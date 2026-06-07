
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { handlePasswordUpdate } from './actions';
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
      {pending ? 'Updating...' : 'Update Password'}
    </Button>
  );
}

const initialState: FormState = {
  message: "",
  success: false,
};

export function UpdatePasswordForm({ error, message: successMessage }: { error?: string, message?: string }) {
  const [state, formAction] = useFormState(handlePasswordUpdate, initialState);
  const [message, setMessage] = useState(successMessage || error);
  const [isSuccess, setIsSuccess] = useState(!!successMessage);
  
  useEffect(() => {
    if (state?.message) {
      setMessage(state.message);
      setIsSuccess(state.success);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
        {message && (
            <Alert variant={isSuccess ? 'default' : 'destructive'} className="mb-4">
            <AlertDescription>{message}</AlertDescription>
            </Alert>
        )}
        {isSuccess ? (
             <Button asChild className="w-full">
                <Link href="/login">Return to Login</Link>
            </Button>
        ) : (
            <>
                <div className="grid gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input id="password" name="password" type="password" required minLength={6} />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={6} />
                </div>
                <SubmitButton />
            </>
        )}
    </form>
  );
}
