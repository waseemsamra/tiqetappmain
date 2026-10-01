'use client';

/**
 * Intui airport-transfer booking widget, shown in the Transfers tab.
 *
 * Interim approach while Intui's transfer API is blocked for our server
 * (403 `cf-mitigated: challenge`). Intui self-sizes the frame with
 * `iframeResizer.js`, which posts the measured height back to this window, so
 * that script is injected here rather than hard-coded into the markup.
 *
 * Because the frame is cross-origin, results stay inside it and cannot be
 * lifted into our own main-area panel. Once the API is reachable the widget
 * can be replaced by our own form, which feeds results to the main area.
 *
 * If the browser refuses the frame (the partner host has been observed sending
 * `X-Frame-Options: SAMEORIGIN`), the fallback link keeps booking reachable.
 */

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useT } from '@/components/language-provider';

const INTUI_SRC =
  'https://en.intui.travel/?p_site=2873517&constructor=1&wlmode=wdg&view=detail&color_scheme=basic&wg=0&h=Airport%20transfers%20executed%20by%20local%20Professional%20companies';

const RESIZER_SRC = 'https://www.intui.travel/public/js/jquery/iframeResizer.js';

/** Height before the partner page reports its own. */
const FALLBACK_HEIGHT = 318;

export function AirportTransfersWidget() {
  const t = useT();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(FALLBACK_HEIGHT);
  const [resizerReady, setResizerReady] = useState(false);

  useEffect(() => {
    if (document.querySelector(`script[src="${RESIZER_SRC}"]`)) {
      setResizerReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = RESIZER_SRC;
    script.async = true;
    script.onload = () => setResizerReady(true);
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  // Grow the frame to the height the partner page reports, so the booking form
  // is never clipped part-way through an interaction.
  useEffect(() => {
    if (!resizerReady) return;

    const onMessage = (event: MessageEvent) => {
      let hostname = '';
      try {
        hostname = new URL(event.origin).hostname;
      } catch {
        return;
      }
      if (!/intui\.travel$/i.test(hostname)) return;

      const data = event.data as {
        msg?: { height?: number };
        height?: number;
      } | null;
      const reported = Number(data?.msg?.height ?? data?.height);
      if (Number.isFinite(reported) && reported > 0) {
        setHeight(Math.ceil(reported));
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [resizerReady]);

  return (
    <div>
      <iframe
        ref={frameRef}
        id="intuiIframe"
        src={INTUI_SRC}
        title={t('search.airportTransfers')}
        className="w-full border-0"
        style={{ height: `${height}px` }}
        loading="lazy"
        scrolling="no"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a
        href="https://www.intui.travel/transfer/?api&partnerID=287008"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-600 underline underline-offset-2 hover:text-slate-900"
      >
        {t('search.continueOnIntui')}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    </div>
  );
}
