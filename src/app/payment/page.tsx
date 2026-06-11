

'use client';

import { Suspense, useEffect, useState, useTransition } from 'react';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar, Users, CreditCard, Loader2, Apple, Landmark, ArrowLeft } from 'lucide-react';
import type { Excursion } from '@/types';
import { getExcursionForCheckoutAction } from '../checkout/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { processBookingAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

const PayPalIcon = () => (
    <svg role="img" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>PayPal</title><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.32a.641.641 0 0 1 .633-.535h4.945c4.432 0 7.371 2.333 6.387 6.924-1.147 5.35-4.416 6.34-8.08 6.34h-1.7v2.284a.64.64 0 0 1-.642.64m10.134-12.06c.433-2.61-2.91-2.65-3.83.024-.855 2.513.216 5.286 3.83 5.286h2.228c.633 0 1.13-.47.99-1.07-.15-.657-1.002-4.18-3.228-4.24z"/></svg>
);


function PaymentForm({ excursion, bookingDate, quantity, email }: { excursion: Excursion, bookingDate: Date, quantity: number, email: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const handleProcessBooking = () => {
        startTransition(async () => {
          const result = await processBookingAction(excursion.id, bookingDate, quantity, email);
          
          if (result.success && result.redirectUrl) {
            router.push(result.redirectUrl);
          } else {
            toast({
                variant: 'destructive',
                title: 'Booking Failed',
                description: result.error || "An unknown error occurred.",
            });
          }
        });
    }

    return (
        <div className="space-y-8">
            <RadioGroup defaultValue="card" className="space-y-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                       <Label htmlFor="card" className="font-bold text-lg cursor-pointer">Credit or debit card</Label>
                       <RadioGroupItem value="card" id="card" />
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-0">
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="expiry-date">Expiry Date</Label>
                            <Input id="expiry-date" placeholder="MM / YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                       <Label htmlFor="paypal" className="font-bold text-lg flex items-center gap-2 cursor-pointer"><PayPalIcon /> PayPal</Label>
                       <RadioGroupItem value="paypal" id="paypal" />
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                       <Label htmlFor="apple-pay" className="font-bold text-lg flex items-center gap-2 cursor-pointer"><Apple /> Pay</Label>
                       <RadioGroupItem value="apple-pay" id="apple-pay" />
                    </CardHeader>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                       <Label htmlFor="bank" className="font-bold text-lg flex items-center gap-2 cursor-pointer"><Landmark /> Bank transfer</Label>
                       <RadioGroupItem value="bank" id="bank" />
                    </CardHeader>
                </Card>
            </RadioGroup>

            <div className="flex justify-end">
                <Button size="lg" className="w-full md:w-auto" onClick={handleProcessBooking} disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
                    {isPending ? 'Processing...' : 'Proceed to payment'}
                </Button>
            </div>
        </div>
    );
}

const BookingProgress = () => {
    const steps = [
        { id: 1, name: 'Select tickets' },
        { id: 2, name: 'Your details' },
        { id: 3, name: 'Payment' },
    ];
    const currentStep = 3;

    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center">
                {steps.map((step, stepIdx) => (
                <li key={step.name} className={`relative flex-1 ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                    <div className="flex items-center text-sm font-medium">
                        <span className={`flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full ${step.id <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            {step.id < currentStep ? '✓' : step.id}
                        </span>
                        <span className="hidden sm:inline ml-4">{step.name}</span>
                    </div>
                     {stepIdx < steps.length - 1 && (
                       <div className="absolute inset-0 top-4 left-4 -z-10 h-0.5 w-full bg-gray-200" aria-hidden="true" />
                     )}
                </li>
                ))}
            </ol>
        </nav>
    );
};


function PaymentPageContent() {
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
            getExcursionForCheckoutAction(activityId).then(data => {
                if (data) {
                    setExcursion(data);
                }
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [activityId]);

    if (isLoading) {
        return <div className="space-y-6"><Skeleton className="h-48 w-full" /><Skeleton className="h-64 w-full" /></div>;
    }
    
    if (!excursion || !dateStr || !email || !quantityStr) {
        notFound();
    }

    const bookingDate = new Date(dateStr);
    const quantity = parseInt(quantityStr, 10);
    const totalPrice = Number((excursion.price || 0) * quantity);


    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
            <BookingProgress />
            
            <Button variant="outline" onClick={() => router.back()} className="mt-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Your Details
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2">
                    <PaymentForm 
                        excursion={excursion} 
                        bookingDate={bookingDate} 
                        quantity={quantity} 
                        email={email}
                    />
                </div>
                <div className="lg:col-span-1">
                     <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Booking Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="flex items-start gap-4">
                                <Image src={excursion.images[0]} alt={excursion.name} width={64} height={64} className="rounded-md object-cover" />
                                <h3 className="font-bold flex-1">{excursion.name}</h3>
                            </div>
                             <div className="border-t border-muted -mx-6 my-4" />
                            <div className="space-y-2 text-sm text-muted-foreground">
                               <div className="flex justify-between items-center"><Calendar className="h-4 w-4 mr-2 inline" /> <span>{format(bookingDate, 'MMMM d, yyyy')}</span></div>
                               <div className="flex justify-between items-center"><Users className="h-4 w-4 mr-2 inline" /> <span>{quantity} Passenger(s)</span></div>
                            </div>
                        </CardContent>
                         <CardFooter className="flex-col items-start gap-4">
                            <div className="border-t border-muted w-full pt-4" />
                            <div className="w-full text-lg flex justify-between items-center">
                                <span className="font-bold">Total:</span>
                                <span className="font-extrabold">${totalPrice.toFixed(2)}</span>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Payment...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}
