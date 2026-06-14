'use client';

import { useEffect } from 'react';

const SCRIPT_ID = 'tiqets-booking-engine-script';

export function VariantBookingClient({ productId }: { productId: string }) {
  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID);
    if (!existing) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://tiqets-cdn.s3.amazonaws.com/booking_engine/loader/10716.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [productId]);

  return (
    <a
      href={`https://www.tiqets.com/en/tickets/product-${productId}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
    >
      Book Now
    </a>
  );
}
