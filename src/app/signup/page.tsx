
import Link from 'next/link'
import { Suspense } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignupForm } from './signup-form';


function SignupPageContent({ searchParams }: { searchParams: { message: string }}) {
   return (
    <div className="w-full h-full flex items-center justify-center py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create a customer account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm prefillMessage={searchParams.message} />
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
   )
}


export default function SignupPage({ searchParams }: { searchParams: { message: string }}) {
  return (
     <Suspense fallback={<div>Loading...</div>}>
      <SignupPageContent searchParams={searchParams} />
    </Suspense>
  )
}
