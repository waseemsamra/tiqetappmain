
'use client';

import { notFound, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Ticket, User, AtSign, MapPin, Globe, Send, Home, CheckCircle, Phone, Loader2, QrCode } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useTransition } from 'react';
import type { Booking } from '@/types';
import { getBookingByIdAction } from './actions';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const DetailRow = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | React.ReactNode }) => (
    <div className="flex items-start gap-4 py-3">
        <Icon className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
        <div className="flex-1">
            <p className="font-semibold text-foreground">{label}</p>
            <p className="text-muted-foreground">{value}</p>
        </div>
    </div>
);

const BookingVoucherSkeleton = () => (
    <div className="bg-muted/40 min-h-screen py-12">
        <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto shadow-lg animate-pulse">
                <CardHeader className="bg-background p-6">
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                       <div>
                          <Skeleton className="h-6 w-24 mb-2 rounded-md" />
                          <Skeleton className="h-10 w-80 rounded-md" />
                       </div>
                       <div className="text-left sm:text-right">
                          <Skeleton className="h-4 w-32 mb-2 rounded-md" />
                          <Skeleton className="h-5 w-40 rounded-md" />
                       </div>
                   </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div className="space-y-4">
                           {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-start gap-4 py-3">
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-1/4" />
                                        <Skeleton className="h-4 w-3/4" />
                                    </div>
                                </div>
                           ))}
                        </div>
                        <div className="flex items-center justify-center bg-muted p-4 rounded-lg">
                           <Skeleton className="h-[250px] w-[250px] rounded-md" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-background p-6 flex flex-col sm:flex-row justify-end gap-4">
                    <Skeleton className="h-10 w-40 rounded-md" />
                    <Skeleton className="h-10 w-44 rounded-md" />
                </CardFooter>
            </Card>
        </div>
   </div>
);


export default function BookingDetailsPage({ params }: { params: { id: string } }) {
    const [booking, setBooking] = useState<Booking | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
    const [whatsAppNumber, setWhatsAppNumber] = useState('');
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const isNewBooking = searchParams.get('new') === 'true';

    useEffect(() => {
        getBookingByIdAction(params.id)
            .then(data => {
                if (!data) {
                    notFound();
                } else {
                    setBooking(data);
                }
            })
            .catch(() => notFound())
            .finally(() => setIsLoading(false));
    }, [params.id]);

    const handleSendToWhatsApp = () => {
        if (!whatsAppNumber) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please enter a phone number.' });
            return;
        }
        if (!booking) {
             toast({ variant: 'destructive', title: 'Error', description: 'Booking details not loaded.' });
            return;
        }

        const message = `Your booking for "${booking.activity.name}" on ${new Date(booking.booking_date).toLocaleDateString()} is confirmed! View your voucher: ${window.location.href}`;
        const whatsappUrl = `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        
        toast({ title: 'Success!', description: 'Opening WhatsApp...' });
        setIsWhatsAppDialogOpen(false);
        setWhatsAppNumber('');
    };

    if (isLoading || !booking) {
        return <BookingVoucherSkeleton />;
    }

    const { activity } = booking;
    const bookingDate = new Date(booking.booking_date);
    const customerIdentifier = booking.guest_email || booking.user_id;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(booking.booking_reference)}`;

    return (
        <div className="bg-muted/40 min-h-screen py-12">
            <div className="container mx-auto px-4">
                 {isNewBooking && (
                    <Alert className="max-w-4xl mx-auto mb-8 border-green-500 text-green-700 bg-green-50">
                        <CheckCircle className="h-5 w-5" />
                        <AlertTitle className="font-bold">Your booking is confirmed!</AlertTitle>
                        <CardDescription>A confirmation email has been sent to your address.</CardDescription>
                    </Alert>
                 )}
                 <Card className="max-w-4xl mx-auto shadow-lg">
                    <CardHeader className="bg-background p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <Badge variant="secondary" className="mb-2">Booking Voucher</Badge>
                                <CardTitle className="text-3xl font-bold">{activity.name}</CardTitle>
                            </div>
                            <div className="text-left sm:text-right">
                                <p className="text-sm text-muted-foreground">Booking Reference</p>
                                <p className="font-mono text-sm">{booking.booking_reference}</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div className="space-y-2">
                                 <DetailRow
                                    icon={Calendar}
                                    label="Date"
                                    value={bookingDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                />
                                <DetailRow
                                    icon={Ticket}
                                    label="Quantity"
                                    value={`${booking.quantity} Ticket(s)`}
                                />
                                 <DetailRow
                                    icon={booking.guest_email ? AtSign : User}
                                    label={booking.guest_email ? "Guest Email" : "Booked by"}
                                    value={customerIdentifier || 'N/A'}
                                 />
                                 <DetailRow
                                    icon={MapPin}
                                    label="Location"
                                    value={`${activity.city}, ${activity.country}`}
                                 />
                                 <DetailRow
                                    icon={CheckCircle}
                                    label="Status"
                                    value={<Badge className="capitalize">{booking.status}</Badge>}
                                 />
                            </div>
                            <div className="flex items-center justify-center bg-white p-4 rounded-lg">
                                <Image
                                    src={qrCodeUrl}
                                    alt={`QR Code for booking ${booking.booking_reference}`}
                                    width={250}
                                    height={250}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="bg-background p-6 flex flex-col sm:flex-row justify-end gap-4">
                        <Button variant="outline" onClick={() => setIsWhatsAppDialogOpen(true)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send to WhatsApp
                        </Button>
                         <Button asChild>
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Close & Return Home
                            </Link>
                         </Button>
                    </CardFooter>
                 </Card>
            </div>
            
            <Dialog open={isWhatsAppDialogOpen} onOpenChange={setIsWhatsAppDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send Confirmation to WhatsApp</DialogTitle>
                        <DialogDescription>
                            Enter the recipient's phone number, including the country code.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="whatsapp-number" className="sr-only">WhatsApp Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="whatsapp-number"
                                type="tel"
                                value={whatsAppNumber}
                                onChange={(e) => setWhatsAppNumber(e.target.value)}
                                placeholder="e.g., +15551234567"
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleSendToWhatsApp}>
                            <Send className="mr-2 h-4 w-4" />
                            Send
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
