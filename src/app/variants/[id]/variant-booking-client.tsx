'use client';

import { useEffect } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scriptId = 'tiqets-booking-engine-script';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = document.getElementById('tiqets-booking-container');
    const trigger = document.getElementById('tiqets-trigger');
    if (!container || !trigger) return;

    const timer = window.setTimeout(() => {
      if (container.children.length === 0) {
        container.innerHTML = '<p class="p-4 text-sm text-gray-500">Booking engine is loading or unavailable for this product.</p>';
      }
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [productId]);

  return (
    <>
      <div
        key={productId}
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
