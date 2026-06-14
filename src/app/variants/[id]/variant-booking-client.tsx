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

  const onClick = () => {
    const oldRoot = document.getElementById('tiqets-booking-root');
    if (oldRoot) {
      oldRoot.innerHTML = '';
    }

    const root = document.createElement('div');
    root.id = 'tiqets-booking-root';
    root.className = 'tiqets-booking-root';

    const widget = document.createElement('div');
    widget.setAttribute('data-tiqets-widget', 'booking');
    widget.setAttribute('data-product-id', productId);
    widget.setAttribute('data-trigger-selector', '#tiqets-trigger');

    const button = document.createElement('button');
    button.id = 'tiqets-trigger';
    button.type = 'button';
    button.className =
      'block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors';
    button.textContent = 'Book Now';

    root.appendChild(widget);
    root.appendChild(button);

    const anchor = document.querySelector('#tiqets-booking-root-anchor');
    if (anchor) {
      anchor.replaceWith(root);
    } else if (oldRoot) {
      oldRoot.replaceWith(root);
    } else {
      document.body.appendChild(root);
    }

    const engine =
      (window as any).tiqetsBookingEngine ||
      (window as any).TiqetsBookingEngine ||
      (window as any).tiqets_booking_engine;

    const run = () => {
      if (engine && typeof engine.open === 'function') {
        engine.open();
      } else {
        button.click();
      }
    };

    if (engine && typeof engine.open === 'function') {
      run();
    } else {
      setTimeout(run, 200);
    }
  };

  return (
    <div id=" tiqets-booking-root-anchor">
      <button
        id="tiqets-trigger-anchor"
        type="button"
        onClick={onClick}
        className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Book Now
      </button>
    </div>
  );
}
