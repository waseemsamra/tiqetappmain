
'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '../auth/actions';
import type { FormState } from '@/types';

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  );
}

const initialState: FormState & { redirectTo?: string } = {
  message: "",
  success: false,
};

export function LoginForm({ message }: { message?: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useFormState(login, initialState);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
  useEffect(() => {
    if (state.success && state.redirectTo) {
      // This is a hard redirect that forces a full page reload,
      // ensuring the new session is picked up by the server and client.
      window.location.href = state.redirectTo;
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      {state.message && !state.success && (
         <Alert variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/forgot-password" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <div className="relative">
            <Input id="password" name="password" type={showPassword ? 'text' : 'password'} required className="pr-10" />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-10 text-muted-foreground"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <LoginButton />
      </div>
    </form>
  );
}
