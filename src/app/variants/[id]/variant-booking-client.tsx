'use client';

import { useEffect, useCallback, useState } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  const triggerId = `tiqets-trigger-${productId}`;
  const containerId = `tiqets-booking-container-${productId}`;
  const [, setScriptLoaded] = useState(false);

  const initBooking = useCallback(() => {
    if (typeof window === 'undefined') return;

    if ((window as any).__TIQETS_LOADER_REINIT) {
      (window as any).__TIQETS_LOADER_REINIT();
    }

    if ((window as any).TiqetsBookingEngine) {
      try {
        (window as any).TiqetsBookingEngine.init({
          container: `#${containerId}`,
          trigger: `#${triggerId}`,
          productId,
          partner: 'time_travel_tourism_dubai',
          currency: 'USD',
        });
      } catch {
        // Direct init is a fallback; the loader handles the widget.
      }
    }
  }, [productId, triggerId, containerId]);

  const handleClick = useCallback(() => {
    initBooking();
  }, [initBooking]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scriptId = 'tiqets-booking-engine-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    const loadScript = () => {
      if (script) return;

      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js`;
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
        setTimeout(initBooking, 100);
      };
      script.onerror = () => {
        // Booking engine unavailable; the button stays inert.
      };
      document.body.appendChild(script);
    };

    if (script && (window as any).__TIQETS_LOADER_REINIT) {
      initBooking();
    } else {
      loadScript();
    }

    return () => {
      // Keep the script loaded across navigations.
    };
  }, [initBooking]);

  return (
    <>
      <div
        id={containerId}
        data-tiqets-widget="booking"
        data-product-id={productId}
        data-partner="time_travel_tourism_dubai"
        data-currency="USD"
        data-trigger-selector={`#${triggerId}`}
      />
      <button
        id={triggerId}
        type="button"
        onClick={handleClick}
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors md:w-auto md:px-8"
      >
        Book Now
      </button>
    </>
  );
}
