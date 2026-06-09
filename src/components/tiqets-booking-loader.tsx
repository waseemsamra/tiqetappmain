'use client';

import { useEffect } from 'react';

const SCRIPT_ID = 'tiqets-booking-engine-script';
const SCRIPT_SRC = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';

export function TiqetsBookingLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only load the script if not already present
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return null;
}
