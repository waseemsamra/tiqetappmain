'use client';

import { ArrowUpRight } from 'lucide-react';
import { useT } from '@/components/language-provider';

/**
 * Flight search, served by Travelpayouts.
 *
 * Travelpayouts hosts the white-label experience on `flights.aafare.com`
 * (registered to account `wl_id=22891`), and that host only renders the widget
 * for its own domain — loading their `main.js` loader into this app leaves both
 * containers empty. So the working partner page is embedded directly instead.
 *
 * The host currently sends no `X-Frame-Options`, so framing is allowed. The
 * fallback link stays visible so the search is still reachable if Travelpayouts
 * ever blocks framing.
 */
const FLIGHTS_SEARCH_URL = 'https://flights.aafare.com/';

export function TravelpayoutsFlightsWidget() {
  const t = useT();

  return (
    <div>
      <iframe
        src={FLIGHTS_SEARCH_URL}
        title={t('search.flights')}
        className="h-[900px] w-full rounded-[12px] border border-slate-200 bg-white"
        loading="lazy"
      />

      <a
        href={FLIGHTS_SEARCH_URL}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-900 underline underline-offset-4"
      >
        {t('search.openFlightSearch')}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}