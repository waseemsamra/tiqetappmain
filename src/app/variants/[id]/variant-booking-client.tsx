'use client';

import { useEffect, useRef, useState } from 'react';

const SCRIPT_ID = 'tiqets-booking-engine-script';

export function VariantBookingClient({ productId }: { productId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEngineLoaded, setIsEngineLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    const scriptId = 'tiqets-booking-engine-script';

    // Only add script if not already present
    const existing = document.getElementById(SCRIPT_ID);
    if (!existing) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Check periodically if the engine has loaded
    const checkInterval = setInterval(() => {
      if (!mounted || !containerRef.current) return;
      
      // Check if Tiqets engine is available on window
      if (typeof window !== 'undefined' && (window as any).tiqetsBookingEngine) {
        setIsEngineLoaded(true);
        clearInterval(checkInterval);
      }
    }, 500);

    // Fallback: after 8 seconds, assume it's loaded or failed
    const timeout = setTimeout(() => {
      if (!mounted) return;
      setIsEngineLoaded(true); // Assume loaded to avoid blocking UI
      clearInterval(checkInterval);
    }, 8000);

    return () => {
      mounted = false;
      clearInterval(checkInterval);
      clearTimeout(timeout);
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
        className={`block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors ${
          isEngineLoaded ? '' : 'opacity-50 cursor-not-allowed'
        }`}
      >
        Book Now
      </button>
    </div>
  );
}