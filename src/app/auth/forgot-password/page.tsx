
import { ForgotPasswordForm } from "./forgot-password-form";
import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function ForgotPasswordPageContent({ searchParams }: { searchParams: { message?: string }}) {
    return (
        <div className="w-full h-full flex items-center justify-center py-12">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email address and we'll send you a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ForgotPasswordForm prefillMessage={searchParams?.message} />
                </CardContent>
            </Card>
        </div>
    );
}

export default function ForgotPasswordPage({ searchParams }: { searchParams: { message?: string }}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordPageContent searchParams={searchParams} />
        </Suspense>
    )
}
