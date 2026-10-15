
'use client';

import type {Booking} from '@/types';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import Image from 'next/image';
import { imageUrlFor } from '@/lib/tiqets-image';
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
          <div className="grid grid-cols-1 md:grid-cols-[150px_1fr]">
            <div className="relative h-24 md:h-48">
                {booking.activity.images?.[0] && booking.activity.images?.[0].length > 0 ? (
                    <Image src={imageUrlFor(booking.activity.images?.[0], 'card')} alt={booking.activity.name} fill className="object-cover" unoptimized />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">No image</div>
                )}
            </div>
            <div className="md:col-span-1">
              <CardHeader>
                <CardTitle>{booking.activity.name}</CardTitle>
                <CardDescription>
                  <span className="flex items-center gap-2 text-sm mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Date: {new Date(booking.booking_date).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                    </span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{booking.booking_type || 'EXCURSIONS'}</Badge>
                  <Badge variant={booking.status === 'confirmed' ? 'default' : 'destructive'}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-2 line-clamp-2">{booking.activity.description}</p>
                {(booking.miles_earned || booking.loyalty_points) && (
                  <p className="text-xs text-[#58c0e8] mt-1">
                    {booking.miles_earned && `${booking.miles_earned} miles`} {booking.loyalty_points && `• ${booking.loyalty_points} pts`}
                  </p>
                )}
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
