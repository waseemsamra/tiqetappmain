'use client';

import { useEffect, useRef } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    const scriptId = 'tiqets-booking-engine-script';

    const existing = document.getElementById(scriptId);
    if (!existing) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const timer = setTimeout(() => {
      if (!mounted || !containerRef.current) return;
      const widget = containerRef.current.querySelector('[data-tiqets-widget="booking"]') as HTMLElement | null;
      const btn = containerRef.current.querySelector('button');
      if (widget && btn && typeof window !== 'undefined' && !(window as any).tiqetsBookingEngine) {
        btn.textContent = 'Open booking';
      }
    }, 1500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [productId]);

  return (
    <div ref={containerRef} className="tiqets-booking-root">
      <div
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
    </div>
  );
}
