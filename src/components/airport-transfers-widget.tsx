'use client';

/**
 * Intui airport-transfer booking widget, shown in the Transfers tab.
 *
 * Embeds Intui's booking form via iframe. Intui self-sizes the frame
 * with `iframeResizer.js`, which posts the measured height back to this
 * window, so that script is injected here rather than hard-coded.
 *
 * Supports two modes:
 * - widget: Standard Intui widget (current default)
 * - whitelabel: White-label iframe from partner.intui.travel (custom branding)
 */

import { useEffect, useRef, useState } from 'react';
import { useT } from '@/components/language-provider';

type TransferMode = 'widget' | 'whitelabel';

interface AirportTransfersWidgetProps {
  mode?: TransferMode;
  partnerId?: string;
  colorScheme?: string;
  language?: string;
  headerText?: string;
}

const RESIZER_SRC = 'https://www.intui.travel/public/js/jquery/iframeResizer.js';

const FALLBACK_HEIGHT = 318;

function buildSrc(mode: TransferMode, props: AirportTransfersWidgetProps): string {
  const {
    partnerId = '2873517',
    colorScheme = 'bg',
    language = 'en',
    headerText = 'Airport transfers executed by local Professional companies',
  } = props;

  if (mode === 'whitelabel') {
    const params = new URLSearchParams({
      partnerID: partnerId,
      color_scheme: colorScheme,
      lang: language,
      h: headerText,
    });
    return `https://iframe.intui.travel/${language}/?${params.toString()}`;
  }

  // Widget mode - matches Intui's iframe embed code
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(FALLBACK_HEIGHT);

  // Inject the iframe and iframeResizer script via JavaScript
  useEffect(() => {
    if (!containerRef.current) return;

    const src = buildSrc(mode, props);
    const container = containerRef.current;

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.id = 'intuiIframe';
    iframe.src = src;
    iframe.style.width = '100%';
    iframe.style.height = `${FALLBACK_HEIGHT}px`;
    iframe.style.border = 'none';
    iframe.scrolling = 'no';
    iframe.title = t('search.airportTransfers');
    container.appendChild(iframe);

    // Load iframeResizer script
    const existingScript = document.querySelector(`script[src="${RESIZER_SRC}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = RESIZER_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    // Listen for height messages from Intui
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
        iframe.style.height = `${Math.ceil(reported)}px`;
      }
    };

    window.addEventListener('message', onMessage);

    return () => {
      window.removeEventListener('message', onMessage);
      // Clean up iframe on unmount
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, props.partnerId, props.colorScheme, props.language, props.headerText]);

  return (
    <div>
      <div ref={containerRef} className="w-full" />
    </div>
  );
}