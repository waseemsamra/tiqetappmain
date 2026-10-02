'use client';

import { useEffect, useCallback, useState } from 'react';

export function VariantBookingClient({ productId }: { productId: string }) {
  const triggerId = `tiqets-trigger-${productId}`;
  const containerId = `tiqets-booking-container-${productId}`;
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const initBooking = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    console.log('[Tiqets] Initializing booking for', productId);
    
    // Check if container and trigger exist in DOM
    const container = document.getElementById(containerId);
    const trigger = document.getElementById(triggerId);
    console.log('[Tiqets] Container exists:', !!container, container);
    console.log('[Tiqets] Trigger exists:', !!trigger, trigger);
    
    // Check all data-tiqets-widget elements
    const widgets = document.querySelectorAll('div[data-tiqets-widget="booking"]');
    console.log('[Tiqets] Found widgets:', widgets.length);
    widgets.forEach((w, i) => {
      console.log(`[Tiqets] Widget ${i}:`, w.id, w.dataset);
    });
    
    // Call the Tiqets loader reinit function to scan for new widgets
    if ((window as any).__TIQETS_LOADER_REINIT) {
      console.log('[Tiqets] Calling __TIQETS_LOADER_REINIT');
      (window as any).__TIQETS_LOADER_REINIT();
    } else {
      console.log('[Tiqets] __TIQETS_LOADER_REINIT not available');
    }
    
    // Also try direct API if available
    if ((window as any).TiqetsBookingEngine) {
      console.log('[Tiqets] Direct TiqetsBookingEngine API available');
      try {
        (window as any).TiqetsBookingEngine.init({
          container: `#${containerId}`,
          trigger: `#${triggerId}`,
          productId,
          partner: 'time_travel_tourism_dubai',
          currency: 'USD',
        });
      } catch (e) {
        console.error('[Tiqets] Direct init failed:', e);
      }
    }
  }, [productId, triggerId, containerId]);

  const handleClick = useCallback(() => {
    console.log('[Tiqets] Book Now clicked');
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
        console.log('[Tiqets] Script loaded');
        setScriptLoaded(true);
        // Small delay to ensure script is fully parsed
        setTimeout(initBooking, 100);
      };
      script.onerror = () => {
        console.error('[Tiqets] Script failed to load');
      };
      document.body.appendChild(script);
    };

    // If script already loaded, just reinit
    if (script && (window as any).__TIQETS_LOADER_REINIT) {
      console.log('[Tiqets] Script already loaded, reinitializing');
      initBooking();
    } else {
      loadScript();
    }

    return () => {
      // Don't remove script - keep it loaded
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