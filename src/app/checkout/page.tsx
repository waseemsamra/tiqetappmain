

'use client';

import { Suspense, useEffect, useState, useTransition } from 'react';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MapPin, Users, CreditCard, Loader2 } from 'lucide-react';
import type { Excursion } from '@/types';
import { getExcursionById } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

function CheckoutPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activityId = searchParams.get('activityId');
    const dateStr = searchParams.get('date');
    const quantityStr = searchParams.get('quantity');
    const email = searchParams.get('email');
    
    const [excursion, setExcursion] = useState<Excursion | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (activityId) {
            getExcursionById(activityId).then(data => {
                if (data) {
                    setExcursion(data);
                }
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [activityId]);

    const handleConfirmAndPay = () => {
        // Forward all existing search params to the payment page
        router.push(`/payment?${searchParams.toString()}`);
    }

    if (isLoading) {
        return <div className="space-y-6"><Skeleton className="h-48 w-full" /><Skeleton className="h-64 w-full" /></div>;
    }
    
    if (!excursion || !dateStr || !email || !quantityStr) {
        notFound();
    }

    const bookingDate = new Date(dateStr);
    const quantity = parseInt(quantityStr, 10);

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Review Your Booking</h1>
                <p className="text-lg text-muted-foreground mt-1">You're just one step away. Please confirm your details before payment.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Booking Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /> <span>{format(bookingDate, 'PPPP')}</span></div>
                            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /> <span>{quantity} Passenger(s)</span></div>
                        </CardContent>
                    </Card>
                     <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">{email}</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                     <Card className="sticky top-24">
                        <CardHeader className="p-0">
                            <div className="relative aspect-[4/3]">
                                 {excursion.images && excursion.images[0] && excursion.images[0].length > 0 ? (
                                   <Image src={excursion.images[0]} alt={excursion.name} fill className="object-cover rounded-t-lg" />
                                 ) : null}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-xl font-bold">{excursion.name}</h3>
                            <div className="space-y-3 text-muted-foreground text-sm">
                               <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> <span>{excursion.city}, {excursion.country}</span></div>
                               <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> <span>{excursion.duration}</span></div>
                            </div>
                        </CardContent>
                         <CardFooter className="flex-col items-stretch space-y-4">
                            <div className="w-full text-lg flex justify-between items-center">
                                <span className="font-bold">Total:</span>
                                <span className="font-extrabold">${Number((excursion.price || 0) * quantity).toFixed(2)}</span>
                            </div>
                            <Button size="lg" className="w-full" onClick={handleConfirmAndPay}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Confirm and Pay
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Checkout...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}
