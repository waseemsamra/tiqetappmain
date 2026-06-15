'use client';

import { useEffect, useRef } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
    const container = containerRef.current;
    const trigger = triggerRef.current;
    if (!container || !trigger) return;

    container.setAttribute('data-tiqets-widget', 'booking');
    container.setAttribute('data-product-id', productId);
    container.setAttribute('data-trigger-selector', `#book-trigger-${productId}`);
    trigger.id = `book-trigger-${productId}`;

    const timer = window.setTimeout(() => {
      if (container.children.length === 0) {
        container.innerHTML = '<p class="p-4 text-sm text-gray-500">Booking engine is loading or unavailable for this product.</p>';
      }
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [productId]);

  return (
    <>
      <div ref={containerRef} id="tiqets-booking-container" />
      <button
        ref={triggerRef}
        id={`book-trigger-${productId}`}
        type="button"
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
    </>
  );
}