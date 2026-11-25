'use client';

import { useEffect, useCallback, useState, useRef } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  const triggerId = `tiqets-trigger-${productId}`;
  const containerId = `tiqets-booking-container-${productId}`;
  const initTried = useRef(false);

  const initBooking = useCallback((retries = 3) => {
    if (typeof window === 'undefined') return;

    const apiKey = process.env.NEXT_PUBLIC_TIQETS_API_KEY;
    if (apiKey && !(window as any).TIQETS_API_KEY) {
      (window as any).TIQETS_API_KEY = apiKey;
    }

    if ((window as any).__TIQETS_LOADER_REINIT) {
      (window as any).__TIQETS_LOADER_REINIT();
    }

    const engine = (window as any).TiqetsBookingEngine;
    if (!engine) {
      if (retries > 0) {
        setTimeout(() => initBooking(retries - 1), 200);
      }
      return;
    }

    const trigger = document.getElementById(triggerId);
    const container = document.getElementById(containerId);
    if (!trigger || !container) {
      if (retries > 0) {
        setTimeout(() => initBooking(retries - 1), 200);
      }
      return;
    }

    try {
      engine.init({
        container: `#${containerId}`,
        trigger: `#${triggerId}`,
        productId,
        partner: 'time_travel_tourism_dubai',
        currency: 'USD',
      });
      initTried.current = true;
    } catch {
      if (retries > 0) {
        setTimeout(() => initBooking(retries - 1), 200);
      }
    }
  }, [productId, triggerId, containerId]);

  const handleClick = useCallback(() => {
    initBooking(5);
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
        setTimeout(() => initBooking(3), 100);
      };
      script.onerror = () => {
        // Booking engine unavailable; the button stays inert.
      };
      document.body.appendChild(script);
    };

    if (script) {
      setTimeout(() => initBooking(3), 50);
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
