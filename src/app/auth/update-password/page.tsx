
import { UpdatePasswordForm } from "./update-password-form";
import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function UpdatePasswordPageContent({ searchParams }: { searchParams: { message?: string, error?: string }}) {
    return (
        <div className="w-full h-full flex items-center justify-center py-12">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Update Password</CardTitle>
                    <CardDescription>
                        Enter a new password for your account below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UpdatePasswordForm error={searchParams?.error} message={searchParams?.message} />
                </CardContent>
            </Card>
        </div>
    );
}

export default function UpdatePasswordPage({ searchParams }: { searchParams: { message?: string, error?: string }}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdatePasswordPageContent searchParams={searchParams} />
        </Suspense>
    )
}
