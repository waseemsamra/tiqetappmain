'use client';

/**
 * Intui airport-transfer booking widget/white-label, shown in the Transfers tab.
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
 *
 * Supports two modes:
 * - widget: Standard Intui widget (current default)
 * - whitelabel: White-label iframe from partner.intui.travel (custom branding)
 */

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useT } from '@/components/language-provider';

type TransferMode = 'widget' | 'whitelabel';

interface AirportTransfersWidgetProps {
  /** 'widget' (default) or 'whitelabel' */
  mode?: TransferMode;
  /** Partner ID from Intui (p_site for widget, partnerID for whitelabel) */
  partnerId?: string;
  /** White-label color scheme (only for whitelabel mode) */
  colorScheme?: string;
  /** White-label language (only for whitelabel mode) */
  language?: string;
  /** Custom header text for whitelabel mode */
  headerText?: string;
}

const RESIZER_SRC = 'https://www.intui.travel/public/js/jquery/iframeResizer.js';

/** Height before the partner page reports its own. */
const FALLBACK_HEIGHT = 318;

function buildSrc(mode: TransferMode, props: AirportTransfersWidgetProps): string {
  const {
    partnerId = '2873517',
    colorScheme = 'basic',
    language = 'en',
    headerText = 'Airport transfers executed by local Professional companies',
  } = props;

  if (mode === 'whitelabel') {
    // White-label iframe URL - configure at https://partner.intui.travel/en/whitelabel/
    const params = new URLSearchParams({
      partnerID: partnerId,
      color_scheme: colorScheme,
      lang: language,
    });
    if (headerText) {
      params.set('h', headerText);
    }
    return `https://iframe.intui.travel/${language}/?${params.toString()}`;
  }

  // Widget mode (matches Intui's iframe embed code)
  const params = new URLSearchParams({
    p_site: partnerId,
    constructor: '1',
    color_scheme: colorScheme,
    b: '111111100011111111',
    h: headerText,
  });
  return `https://en.intui.travel/?${params.toString()}`;
}

export function AirportTransfersWidget({
  mode = 'widget',
  ...props
}: AirportTransfersWidgetProps) {
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

  const src = buildSrc(mode, props);
  const fallbackLink = mode === 'whitelabel'
    ? `https://www.intui.travel/transfer/?api&partnerID=${props.partnerId || '287008'}`
    : 'https://www.intui.travel/transfer/?api&partnerID=287008';

  return (
    <div>
      <iframe
        ref={frameRef}
        id="intuiIframe"
        src={src}
        title={t('search.airportTransfers')}
        className="w-full border-0"
        style={{ height: `${height}px` }}
        loading="lazy"
        scrolling="no"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a
        href={fallbackLink}
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
