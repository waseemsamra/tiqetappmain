'use client';

import { useEffect } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  useEffect(() => {
    // Load Tiqets script - same pattern as booking/page.tsx
    if (document.getElementById('tiqets-booking-engine-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'tiqets-booking-engine-script';
    script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <>
      <div
        data-tiqets-widget="booking"
        data-product-id={productId}
        data-trigger-selector={`#tiqets-trigger-${productId}`}
      />
      <button
        id={`tiqets-trigger-${productId}`}
        type="button"
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
    </>
  );
}