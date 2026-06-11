

'use client';

import { ShieldCheck } from 'lucide-react';
import type { Excursion, ExcursionVariant } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface BookingCardProps {
  excursion: Excursion;
  selectedVariant?: ExcursionVariant | null;
}

export const BookingCard = ({ excursion, selectedVariant }: BookingCardProps) => {
  const displayPrice = selectedVariant?.price ?? excursion.price;
  const displayDuration = selectedVariant?.duration ?? excursion.duration;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          <span className='text-sm font-normal text-muted-foreground'>From</span>
          <br />
          <span className="font-bold text-3xl">${Number(displayPrice || 0).toFixed(2)}</span>
          {displayDuration && displayDuration !== 'Not specified' && (
            <p className="text-sm font-normal text-muted-foreground mt-1">{displayDuration}</p>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground px-1">
            Keep in mind you need to arrive 30 minutes before start.
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-4 items-stretch p-4">
        <div
          data-tiqets-widget="booking"
          data-product-id={excursion.id}
          data-trigger-selector="#cta_button_excursion"
        />
        <Button
          id="cta_button_excursion"
          size="lg"
          type="button"
          className="w-full h-12 text-base bg-purple-600 hover:bg-purple-700"
        >
          Check availability
        </Button>
        <div className="flex items-center gap-2 bg-muted p-3 rounded-lg">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            <div>
                <p className="font-semibold text-sm">Cancellation policy</p>
                <p className="text-xs text-muted-foreground">{excursion.cancellationpolicy || 'This ticket is nonrefundable.'}</p>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
};
