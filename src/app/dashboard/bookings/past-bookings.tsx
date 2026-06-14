
'use client';

import type {Booking} from '@/types';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import {Calendar, Star} from 'lucide-react';

export default function PastBookings({ bookings }: { bookings: Booking[] }) {
  if (!bookings || bookings.length === 0) {
    return (
       <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/40 p-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">No Past Bookings</h2>
        <p className="mt-2 text-muted-foreground">Your travel history will appear here once you've completed a trip.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map(booking => (
        <Card key={booking.id} className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
             <div className="relative h-48 md:h-full">
                 {booking.activity.images?.[0] && booking.activity.images?.[0].length > 0 ? (
                    <Image src={booking.activity.images?.[0]} alt={booking.activity.name} fill className="object-cover" unoptimized />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">No image</div>
                )}
            </div>
            <div className="md:col-span-2">
              <CardHeader>
                <CardTitle>{booking.activity.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Booked on: {new Date(booking.booking_date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Completed</Badge>
                <p className="text-muted-foreground mt-2 line-clamp-2">{booking.activity.description}</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button asChild variant="outline">
                  <Link href={`/excursions/${booking.activity.id}`}>
                    <Star className="mr-2 h-4 w-4" />
                    Leave a Review
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/excursions/${booking.activity.id}`}>Book Again</Link>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
