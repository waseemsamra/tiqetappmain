'use client';

import { useEffect } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  useEffect(() => {
    // Ensure script is loaded
    if (!document.getElementById('tiqets-booking-engine-script')) {
      const script = document.createElement('script');
      script.id = 'tiqets-booking-engine-script';
      script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <div
        data-tiqets-widget="booking"
        data-product-id={productId}
        data-trigger-selector={`#tiqets-trigger-${productId}`}
      />
      {/* Hidden trigger for Tiqets script */}
      <button
        id={`tiqets-trigger-${productId}`}
        type="button"
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
      {/* Visible button that triggers the hidden one */}
      <button
        type="button"
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        onClick={() => {
          const hiddenTrigger = document.getElementById(`tiqets-trigger-${productId}`);
          hiddenTrigger?.click();
        }}
      >
        Book Now
      </button>
    </>
  );
}