'use client';

import { useEffect, useRef, useState } from 'react';

export function VariantBookingClient({ productId, experienceUrl }: { productId: string; experienceUrl?: string }) {
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const scriptLoadedRef = useRef(false);
  const clickScheduledRef = useRef(false);

  useEffect(() => {
    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true;
      const script = document.createElement('script');
      script.id = 'tiqets-booking-engine-script';
      script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setFallbackUrl(getFallbackUrl());
      };
      document.body.appendChild(script);
    }

    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        if (typeof (window as any).tiqetsBookingEngine !== 'undefined') {
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const script = document.getElementById('tiqets-booking-engine-script');
    if (script && scriptLoadedRef.current) {
      const newScript = document.createElement('script');
      newScript.id = 'tiqets-booking-engine-script';
      newScript.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      newScript.async = true;
      newScript.defer = true;
      newScript.onerror = () => {
        setFallbackUrl(getFallbackUrl());
      };
      script.parentNode?.replaceChild(newScript, newScript);
    }
  }, [productId]);

  const getFallbackUrl = () => {
    if (typeof window !== 'undefined' && (window as any).tiqetsBookingEngine) {
      return null;
    }
    if (experienceUrl) return experienceUrl;
    return `https://www.tiqets.com/en-dubai-cruises-tickets-l202222/`;
  };

  const handleClick = async () => {
    if (clickScheduledRef.current) return;
    clickScheduledRef.current = true;

    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).tiqetsBookingEngine) {
        return;
      }
      const url = getFallbackUrl();
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      clickScheduledRef.current = false;
    }, 400);

    const btn = document.getElementById(`tiqets-trigger-${productId}`);
    btn?.click();
  };

  const buttonId = `tiqets-trigger-${productId}`;

  return (
    <>
      <div
        data-tiqets-widget="booking"
        data-product-id={productId}
        data-trigger-selector={`#${buttonId}`}
      />
      <button
        id={buttonId}
        type="button"
        onClick={handleClick}
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
    </>
  );
}