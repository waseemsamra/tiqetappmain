// Updated: 2026-06-13T20:25:59+04:00 - GitHub update trigger
'use client';

import { useEffect, useRef, useState } from 'react';

const SCRIPT_ID = 'tiqets-booking-engine-script';

export function VariantBookingClient({ productId }: { productId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEngineLoaded, setIsEngineLoaded] = useState(false);
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

      script.onload = () => {
        if (!mounted || !containerRef.current) return;
        const checkEngine = setInterval(() => {
          if (!mounted || !containerRef.current) return;
          const tiqetsEngine =
            (window as any).tiqetsBookingEngine ||
            (window as any).TiqetsBookingEngine ||
            (window as any).tiqets_booking_engine;

          if (tiqetsEngine) {
            setIsEngineLoaded(true);
            clearInterval(checkEngine);
          }
        }, 300);

        const timeout = setTimeout(() => {
          if (!mounted) return;
          clearInterval(checkEngine);
        }, 15000);
      };

      document.body.appendChild(script);
    } else {
      const checkEngine = setInterval(() => {
        if (!mounted || !containerRef.current) return;
        const tiqetsEngine =
          (window as any).tiqetsBookingEngine ||
          (window as any).TiqetsBookingEngine ||
          (window as any).tiqets_booking_engine;

        if (tiqetsEngine) {
          setIsEngineLoaded(true);
          clearInterval(checkEngine);
        }
      }, 300);

      const timeout = setTimeout(() => {
        if (!mounted) return;
        clearInterval(checkEngine);
      }, 5000);
    }

    return () => {
      mounted = false;
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
        onClick={() => {
          const experienceUrl =
            (containerRef.current?.querySelector('[data-tiqets-widget="booking"]') as HTMLElement | null)?.getAttribute(
              'data-experience-url'
            ) || '';

          if (isEngineLoaded) return;

          if (experienceUrl) {
            window.open(experienceUrl, '_blank', 'noopener,noreferrer');
          }
        }}
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
      {loadError && (
        <div className="mt-2 text-sm text-red-500 text-center">
          {loadError}
        </div>
      )}
    </div>
  );
}
