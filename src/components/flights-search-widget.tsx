'use client';

/**
 * Flight search form, hosted by Travelpayouts.
 *
 * The tpemd.com/content script renders the white-label
 * search form itself and, on submit, redirects to
 * flights.aafare.com/flights with the filled parameters
 * (origin, destination, dates, passengers), so the
 * search lands on the partner subdomain with the user's
 * input carried over.
 */

import { useEffect, useRef } from 'react';

const FLIGHTS_WIDGET_SRC =
  'https://tpemd.com/content?currency=usd&trs=213012&shmarker=26913&show_hotels=false&powered_by=false&locale=en&searchUrl=flights.aafare.com%2Fflights&primary_override=%2332a8dd&color_button=%233b6ffe&color_icons=%2332a8dd&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%2332a8dd&border_radius=0&no_labels=true&plain=true&promo_id=7879&campaign_id=100';

export function FlightsSearchWidget({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Re-inject on every mount so the widget always renders
    // into a live container (tab switches unmount the panel).
    container.innerHTML = '';
    const script = document.createElement('script');
    script.async = true;
    script.charset = 'utf-8';
    script.src = FLIGHTS_WIDGET_SRC;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label="Flight search"
    />
  );
}
