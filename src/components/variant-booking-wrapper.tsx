'use client';

import { useState } from 'react';
import { BookingModal } from '@/components/booking-modal';

export function VariantBookingWrapper({ productId }: { productId: string }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsBookingOpen(true)}
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
      <BookingModal
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        productId={productId}
      />
    </>
  );
}
