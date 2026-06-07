'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import WebhookManager from './webhook-manager';
import { getZiinaWebhooks } from './actions';
import { Suspense, useEffect, useState } from 'react';
import type { ZiinaWebhook } from './actions';

function WebhookPageContent() {
    const [webhooks, setWebhooks] = useState<ZiinaWebhook[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getZiinaWebhooks()
            .then(result => {
                if (result.success) {
                    setWebhooks(result.webhooks || []);
                } else {
                    setError(result.error);
                }
            })
            .catch(err => {
                setError(err instanceof Error ? err.message : "An unknown error occurred.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading webhooks...</div>
    }

    return <WebhookManager initialWebhooks={webhooks} initialError={error} />;
}


export default function ZiinaWebhooksPage() {
    return (
        <div className="space-y-6">
            <div>
                <Button asChild variant="outline" size="sm" className="mb-4">
                    <Link href="/admin/payments/ziina">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to ZIINA Configuration
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Manage ZIINA Webhooks</h1>
                <p className="text-muted-foreground">
                    Configure webhooks to receive real-time notifications for payment events.
                </p>
            </div>
            
            <Suspense fallback={<div>Loading...</div>}>
                <WebhookPageContent />
            </Suspense>
        </div>
    );
}
