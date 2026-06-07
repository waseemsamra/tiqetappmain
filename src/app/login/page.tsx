
import Link from 'next/link';
import { Suspense } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoginForm } from './login-form';

function LoginPageContent({
  searchParams,
}: {
  searchParams: { message?: string; redirect_to?: string };
}) {
  return (
    <div className="w-full h-full flex items-center justify-center py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm message={searchParams?.message} />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string; redirect_to?: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent searchParams={searchParams} />
    </Suspense>
  );
}
