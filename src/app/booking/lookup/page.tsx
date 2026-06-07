
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { findBookingAction, FormState } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Ticket } from 'lucide-react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button className="w-full" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Ticket className="mr-2 h-4 w-4" />}
            {pending ? 'Searching...' : 'Find My Booking'}
        </Button>
    );
}

const initialState: FormState = {
    success: true,
    message: '',
};

export default function FindMyBookingPage() {
    const [state, formAction] = useFormState(findBookingAction, initialState);

    return (
        <div className="container mx-auto max-w-2xl py-12 px-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Find My Booking</CardTitle>
                    <CardDescription>
                        Enter your booking reference and the email address used during checkout to retrieve your voucher.
                    </CardDescription>
                </CardHeader>
                <form action={formAction}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bookingReference">Booking Reference</Label>
                            <Input
                                id="bookingReference"
                                name="bookingReference"
                                placeholder="e.g., RR-ABC123DE"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <SubmitButton />
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
