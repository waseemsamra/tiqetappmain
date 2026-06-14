'use client';

import { useEffect, useRef } from 'react';

const SCRIPT_ID = 'tiqets-booking-engine-script';

export function VariantBookingClient({ productId }: { productId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID);
    if (!existing) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [productId]);

  const handleClick = () => {
    const widgetDiv = containerRef.current?.querySelector('[data-tiqets-widget="booking"]');
    if (widgetDiv) {
      widgetDiv.removeAttribute('data-initialized');
    }

    const engine =
      (window as any).tiqetsBookingEngine ||
      (window as any).TiqetsBookingEngine ||
      (window as any).tiqets_booking_engine;

    if (engine && typeof engine.open === 'function') {
      engine.open();
      return;
    }

    const btn = document.getElementById('tiqets-trigger');
    if (btn) {
      btn.click();
    }
  };

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
        onClick={handleClick}
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
    </div>
  );
}
