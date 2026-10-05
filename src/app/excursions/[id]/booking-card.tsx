'use client';

import type { Excursion, ExcursionVariant } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/currency';
import { VariantBookingClient } from '@/app/variants/[id]/variant-booking-client';

interface BookingCardProps {
  excursion: Excursion;
  selectedVariant?: ExcursionVariant | null;
}

export const BookingCard = ({ excursion, selectedVariant }: BookingCardProps) => {
  const displayPrice = selectedVariant?.price ?? excursion.price;
  const displayCurrency = (selectedVariant?.currency ?? excursion.currency) || 'USD';
  const displayDuration = selectedVariant?.duration ?? excursion.duration;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">
          <span className='text-sm font-normal text-muted-foreground'>From</span>
          <br />
          <span className="font-bold text-3xl">
            {formatPrice(displayPrice, displayCurrency)}
          </span>
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
      <CardFooter className="flex-col items-stretch gap-4 p-4">
        {displayPrice > 0 ? (
          <VariantBookingClient productId={excursion.id} />
        ) : (
          <p className="text-sm font-medium text-center text-muted-foreground">
            Price not available
          </p>
        )}
      </CardFooter>
    </Card>
  );
};
