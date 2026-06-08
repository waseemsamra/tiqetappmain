'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Excursion } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import { BookingModal } from '@/components/booking-modal';

interface PriceCardProps {
  excursion: Excursion;
}

export const PriceCard = ({ excursion }: PriceCardProps) => {
  const router = useRouter();

  const handleBooking = () => {
    router.push(`/booking?activityId=${excursion.id}`);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          <span className='text-sm font-normal text-muted-foreground'>From</span>
          <br />
          <span className="font-bold text-3xl">${excursion.price.toFixed(2)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground px-1">
          Keep in mind you need to arrive 30 minutes before start.
        </p>
      </CardContent>
      <div className="px-4 pb-4">
        <Button
          className="w-full h-12 text-base bg-purple-600 hover:bg-purple-700"
          onClick={handleBooking}
        >
          Check availability
        </Button>
        <div className="flex items-center gap-2 bg-muted p-3 rounded-lg mt-4">
          <ShieldCheck className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-semibold text-sm">Cancellation policy</p>
            <p className="text-xs text-muted-foreground">{excursion.cancellationpolicy || 'This ticket is nonrefundable.'}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};