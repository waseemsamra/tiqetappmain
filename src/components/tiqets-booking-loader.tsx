'use client';

import { useEffect } from 'react';

export function TiqetsBookingLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SCRIPT_ID = 'tiqets-booking-engine-script';
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
