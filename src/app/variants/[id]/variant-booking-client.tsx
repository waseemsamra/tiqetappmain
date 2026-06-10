'use client';

import { useEffect, useRef } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true;
      const script = document.createElement('script');
      script.id = 'tiqets-booking-engine-script';
      script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const script = document.getElementById('tiqets-booking-engine-script');
    if (script && scriptLoadedRef.current) {
      const newScript = document.createElement('script');
      newScript.id = 'tiqets-booking-engine-script';
      newScript.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      newScript.async = true;
      script.defer = true;
      script.parentNode?.replaceChild(newScript, script);
    }
  }, [productId]);

  const buttonId = `tiqets-trigger-${productId}`;

  return (
    <>
      <div
        data-tiqets-widget="booking"
        data-product-id={productId}
        data-trigger-selector={`#${buttonId}`}
      />
      <button
        id={buttonId}
        type="button"
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
    </>
  );
}
