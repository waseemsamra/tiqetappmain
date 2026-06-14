'use client';

import { useEffect, useRef } from 'react';

const SCRIPT_ID = 'tiqets-booking-engine-script';

export function VariantBookingClient({ productId }: { productId: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

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
    const root = rootRef.current;
    if (!root) return;

    const oldWidget = root.querySelector('[data-tiqets-widget="booking"]');
    if (oldWidget) {
      oldWidget.removeAttribute('data-initialized');
    }

    const lightbox = document.querySelector('.basicLightbox');
    if (lightbox) {
      lightbox.remove();
    }

    if (typeof window.__TIQETS_LOADER_REINIT === 'function') {
      window.__TIQETS_LOADER_REINIT();
    }

    const btn = document.getElementById('tiqets-trigger');
    if (btn && typeof btn.click === 'function') {
      btn.click();
    }
  };

  return (
    <div ref={rootRef} className="tiqets-booking-root">
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
