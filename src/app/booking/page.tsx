
'use client';

import { Suspense, useEffect, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import { getExcursionById } from '@/app/actions';
import type { Excursion } from '@/types';
import { BookingWidget } from '@/components/booking-widget';
import { Skeleton } from '@/components/ui/skeleton';

function BookingPageContent() {
    const searchParams = useSearchParams();
    const activityId = searchParams.get('activityId');
    const [excursion, setExcursion] = useState<Excursion | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (activityId) {
            getExcursionById(activityId)
                .then(data => {
                    if (data) {
                        setExcursion(data);
                    } else {
                        notFound();
                    }
                })
                .catch(err => {
                    console.error(err);
                    notFound();
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            notFound();
        }
    }, [activityId]);

    if (isLoading) {
        return (
             <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
                <div className="lg:col-span-1">
                    <Skeleton className="h-64 w-full sticky top-24" />
                </div>
            </div>
        )
    }

    if (!excursion) {
        return notFound();
    }

    return (
        <div className="bg-muted/30">
            <BookingWidget excursion={excursion} />
        </div>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div>Loading booking page...</div>}>
            <BookingPageContent />
        </Suspense>
    );
}
