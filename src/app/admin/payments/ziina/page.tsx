'use client';

import { type PaymentSettings } from '@/lib/payments';
import { ZiinaIcon } from '../page';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Suspense, useEffect, useState } from 'react';
import { verifyZiinaConnectionAction } from './actions';
import { getPaymentSettingsAction } from '../actions';
import { PaymentSettingsForm } from '../payment-settings-form';


const VerificationStatus = () => {
    const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkConnection = async () => {
            setIsLoading(true);
            const res = await verifyZiinaConnectionAction();
            setResult(res);
            setIsLoading(false);
        };
        checkConnection();
    }, []);

    if (isLoading) {
        return (
            <Alert>
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertTitle>Checking Status</AlertTitle>
                <AlertDescription>
                    Verifying connection to ZIINA...
                </AlertDescription>
            </Alert>
        );
    }
    
    if (result?.success) {
        return (
            <Alert className="border-green-500 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Successfully Connected</AlertTitle>
                <AlertDescription>
                    Your API key is valid and the connection to ZIINA is active.
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Connection Failed</AlertTitle>
            <AlertDescription>
                {result?.error || "An unknown error occurred."}
            </AlertDescription>
        </Alert>
    )
}

const ZiinaSettingsPageContent = ({ initialSettings }: { initialSettings: PaymentSettings }) => {
    return (
        <div>
            <div className="mb-6">
                <Button asChild variant="outline" size="sm" className="mb-4">
                    <Link href="/admin/payments">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Payment Providers
                    </Link>
                </Button>
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 h-12"><ZiinaIcon /></div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Configure ZIINA</h1>
                        <p className="text-muted-foreground">Connect your ZIINA account using your API Key.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                 <Suspense fallback={<Alert>Checking connection status...</Alert>}>
                    <VerificationStatus />
                 </Suspense>

                <PaymentSettingsForm
                    initialSettings={initialSettings}
                    provider="ziina"
                />
            </div>
        </div>
    );
}

function ZiinaSettingsPageWrapper() {
    const [settings, setSettings] = useState<PaymentSettings | null>(null);
    useEffect(() => {
        getPaymentSettingsAction().then(setSettings);
    }, []);

    if (!settings) {
         return <div>Loading settings...</div>;
    }

    return <ZiinaSettingsPageContent initialSettings={settings} />;
}


export default function ZiinaSettingsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ZiinaSettingsPageWrapper />
        </Suspense>
    )
}
