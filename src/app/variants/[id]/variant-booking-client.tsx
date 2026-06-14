// Updated: 2026-06-13T20:25:59+04:00 - GitHub update trigger
'use client';

import { useEffect, useRef, useState } from 'react';

const SCRIPT_ID = 'tiqets-booking-engine-script';

export function VariantBookingClient({ productId, experienceUrl }: { productId: string; experienceUrl?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

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

      script.onerror = () => {
        if (mounted) {
          setLoadError('Booking engine failed to load. You will be redirected to complete your booking.');
        }
      };

      document.body.appendChild(script);
    }

    return () => {
      mounted = false;
    };
  }, [productId]);

  const fallbackUrl = `https://www.tiqets.com/en/tickets/product-${productId}/`;

  return (
    <div ref={containerRef} className="tiqets-booking-root">
      <div
        data-tiqets-widget="booking"
        data-product-id={productId}
        data-trigger-selector="#tiqets-trigger"
      />
      {experienceUrl ? (
        <a
          id="tiqets-trigger"
          href={experienceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Book Now
        </a>
      ) : (
        <a
          id="tiqets-trigger"
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Book Now
        </a>
      )}
      {loadError && (
        <div className="mt-2 text-sm text-red-500 text-center">
          {loadError}
        </div>
      )}
    </div>
  );
}
