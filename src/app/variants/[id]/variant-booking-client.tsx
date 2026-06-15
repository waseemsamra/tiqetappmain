'use client';

import { useEffect } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scriptId = 'tiqets-booking-engine-script';

    if (document.getElementById(scriptId)) {
      document.getElementById(scriptId)?.remove();
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js?cb=${Date.now()}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, [productId]);

  return (
    <>
      <div
        id="tiqets-booking-container"
        data-tiqets-widget="booking"
        data-product-id={productId}
        data-trigger-selector="#tiqets-trigger"
      />
      <button
        id="tiqets-trigger"
        type="button"
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
    </>
  );
}