'use client';

import { useEffect } from 'react';

const SCRIPT_BASE_ID = 'tiqets-booking-engine-script';

export function VariantBookingClient({ productId }: { productId: string }) {
  useEffect(() => {
    const scriptId = `${SCRIPT_BASE_ID}-${productId}`;
    const existing = document.getElementById(scriptId);
    if (existing) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [productId]);

  return (
    <div
      data-tiqets-widget="booking"
      data-product-id={productId}
      data-trigger-selector="#tiqets-trigger"
    >
      <button
        id="tiqets-trigger"
        type="button"
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
    </div>
  );
}
