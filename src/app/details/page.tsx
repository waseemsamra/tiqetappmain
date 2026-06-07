

'use client';

import { Suspense, useEffect, useState } from 'react';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar, Users, CreditCard, ArrowLeft } from 'lucide-react';
import type { Excursion } from '@/types';
import { getExcursionById } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import Image from 'next/image';
import { getUserProfileDataAction } from './actions';

interface UserProfileData {
    email: string;
    fullName: string;
    userId?: string;
}

function DetailsForm({ excursion, bookingDate, quantity, profileData }: { excursion: Excursion, bookingDate: Date, quantity: number, profileData: UserProfileData }) {
    const router = useRouter();

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;

        if (!email || !firstName || !lastName) {
            alert('All fields are required.');
            return;
        }

        const params = new URLSearchParams({
            activityId: excursion.id,
            date: bookingDate.toISOString(),
            quantity: quantity.toString(),
            email,
        });

        if (profileData.userId) {
            params.set('userId', profileData.userId);
        }

        router.push(`/checkout?${params.toString()}`);
    };

    return (
        <form onSubmit={handleFormSubmit} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Your Details</CardTitle>
                    <CardDescription>Please provide your contact information.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" name="firstName" defaultValue={profileData.fullName?.split(' ')[0] || ''} placeholder="John" required readOnly={!!profileData.fullName} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" name="lastName" defaultValue={profileData.fullName?.split(' ').slice(1).join(' ') || ''} placeholder="Doe" required readOnly={!!profileData.fullName}/>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" defaultValue={profileData.email} readOnly={!!profileData.email} placeholder="you@example.com" required />
                         <p className="text-xs text-muted-foreground">Your ticket will be sent to this email address.</p>
                    </div>
                     <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="phone">Phone Number (optional)</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between items-center">
                 <Button type="button" variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
                <Button size="lg" className="w-full md:w-auto" type="submit">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Review and Confirm
                </Button>
            </div>
        </form>
    );
}

const BookingProgress = () => {
    const steps = [
        { id: 1, name: 'Select tickets' },
        { id: 2, name: 'Your details' },
        { id: 3, name: 'Payment' },
    ];
    const currentStep = 2;

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


function DetailsPageContent() {
    const searchParams = useSearchParams();
    
    const activityId = searchParams.get('activityId');
    const dateStr = searchParams.get('date');
    const quantityStr = searchParams.get('quantity');
    
    const [excursion, setExcursion] = useState<Excursion | null>(null);
    const [profileData, setProfileData] = useState<UserProfileData>({ email: '', fullName: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!activityId) {
                setIsLoading(false);
                return;
            }
            try {
                const [excursionData, userProfileData] = await Promise.all([
                    getExcursionById(activityId),
                    getUserProfileDataAction(),
                ]);

                if (excursionData) setExcursion(excursionData);
                if (userProfileData) setProfileData(userProfileData);
            } catch (error) {
                console.error("Failed to fetch page data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [activityId]);

    if (isLoading) {
        return <div className="space-y-6"><Skeleton className="h-48 w-full" /><Skeleton className="h-64 w-full" /></div>;
    }
    
    if (!excursion || !dateStr || !quantityStr) {
        notFound();
    }

    const bookingDate = new Date(dateStr);
    const quantity = parseInt(quantityStr, 10);
    const totalPrice = (excursion.price * quantity).toFixed(2);
    
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
            <BookingProgress />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2">
                    <DetailsForm excursion={excursion} bookingDate={bookingDate} quantity={quantity} profileData={profileData} />
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
                         <CardFooter>
                            <div className="w-full text-lg flex justify-between items-center">
                                <span className="font-bold">Total:</span>
                                <span className="font-extrabold">${totalPrice}</span>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Details...</div>}>
      <DetailsPageContent />
    </Suspense>
  );
}
