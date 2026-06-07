
'use client';

import type {Booking} from '@/types';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import {Calendar, Ticket} from 'lucide-react';

export default function UpcomingTrips({bookings}: {bookings: Booking[]}) {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/40 p-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">No Upcoming Trips</h2>
        <p className="mt-2 text-muted-foreground">You haven't booked any adventures yet. Let's find one!</p>
        <Button asChild className="mt-6">
          <Link href="/search">Explore Excursions</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map(booking => (
        <Card key={booking.id} className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="relative h-48 md:h-full">
              <Image src={booking.activity.images?.[0] || 'https://placehold.co/400x300.png'} alt={booking.activity.name} fill className="object-cover" />
            </div>
            <div className="md:col-span-2">
              <CardHeader>
                <CardTitle>{booking.activity.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Date: {new Date(booking.booking_date).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge>Confirmed</Badge>
                <p className="text-muted-foreground mt-2 line-clamp-2">{booking.activity.description}</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button asChild>
                  <Link href={`/booking/${booking.id}`}>
                    <Ticket className="mr-2 h-4 w-4" />
                    View Voucher
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/excursions/${booking.activity.id}`}>View Excursion</Link>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
