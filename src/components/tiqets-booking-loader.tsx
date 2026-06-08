'use client';

import { useEffect, useRef } from 'react';

const SCRIPT_ID = 'tiqets-booking-engine-script';
const SCRIPT_SRC = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';

export function TiqetsBookingLoader() {
  const triggeredRef = useRef(false);

  const tryTrigger = () => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;

    const widgets = document.querySelectorAll('[data-tiqets-widget="booking"]');
    if (widgets.length === 0) return;

    widgets.forEach(widget => {
      const triggerSelector = widget.getAttribute('data-trigger-selector');
      const trigger = triggerSelector ? document.querySelector(triggerSelector) : null;
      if (trigger) {
        trigger.click();
      }
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadAndRetry = () => {
      if (document.getElementById(SCRIPT_ID)) {
        // Script already present, retry trigger after a short delay
        setTimeout(tryTrigger, 400);
        return;
      }

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;

      const onReady = () => {
        setTimeout(tryTrigger, 400);
      };

      script.addEventListener('load', onReady);
      script.addEventListener('error', () => {
        setTimeout(tryTrigger, 800);
      });

      document.body.appendChild(script);
    };

    // Wait for hydration + one extra frame
    const timer = window.setTimeout(loadAndRetry, 100);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
