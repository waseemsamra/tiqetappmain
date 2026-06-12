'use client';

import { useEffect, useRef, useState } from 'react';

const SCRIPT_ID = 'tiqets-booking-engine-script';

export function VariantBookingClient({ productId }: { productId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEngineLoaded, setIsEngineLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    const scriptId = 'tiqets-booking-engine-script';

    // Only add script if not already present
    const existing = document.getElementById(scriptId);
    if (!existing) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      script.async = true;
      script.defer = true;
      
      // Handle script load errors
      script.onerror = () => {
        if (mounted) {
          setLoadError('Failed to load booking engine script');
          setIsLoading(false);
          // Assume loaded anyway to avoid blocking UI completely
          setIsEngineLoaded(true);
        }
      };
      
      script.onload = () => {
        if (mounted) {
          // Script loaded successfully, now check for engine
          const checkEngine = setInterval(() => {
            if (!mounted || !containerRef.current) return;
            
            // Check if Tiqets engine is available on window
            if (typeof window !== 'undefined' && (window as any).tiqetsBookingEngine) {
              setIsEngineLoaded(true);
              setIsLoading(false);
              clearInterval(checkEngine);
            }
          }, 300); // Check more frequently
          
          // Fallback: after 10 seconds, assume it's loaded or failed
          const timeout = setTimeout(() => {
            if (!mounted) return;
            setIsLoading(false);
            // Assume loaded to avoid blocking UI completely
            setIsEngineLoaded(true);
            clearInterval(checkEngine);
          }, 10000);
        }
      };
      
      document.body.appendChild(script);
    } else {
      // Script already exists, check if engine is ready
      const checkEngine = setInterval(() => {
        if (!mounted || !containerRef.current) return;
        
        // Check if Tiqets engine is available on window
        if (typeof window !== 'undefined' && (window as any).tiqetsBookingEngine) {
          setIsEngineLoaded(true);
          setIsLoading(false);
          clearInterval(checkEngine);
        }
      }, 300);
      
      // Fallback: after 5 seconds, assume it's loaded
      const timeout = setTimeout(() => {
        if (!mounted) return;
        setIsLoading(false);
        setIsEngineLoaded(true);
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
        disabled={isLoading || !isEngineLoaded}
        className={`block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors ${
          isLoading || !isEngineLoaded ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Loading...' : 'Book Now'}
      </button>
      {loadError && (
        <div className="mt-2 text-sm text-red-500 text-center">
          {loadError}
        </div>
      )}
    </div>
  );
}
