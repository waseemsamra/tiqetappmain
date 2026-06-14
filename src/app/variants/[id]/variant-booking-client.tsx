'use client';

import { useEffect } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  useEffect(() => {
    const existing = document.getElementById('tiqets-booking-engine-script');
    if (existing) return;

    const script = document.createElement('script');
    script.id = 'tiqets-booking-engine-script';
    script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [productId]);

  return (
    <div
      data-tiqets-widget="booking"
      data-product-id={productId}
      data-trigger-selector="#tiqets-trigger"
    >
      <button
        type="button"
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
    </div>
  );
}
