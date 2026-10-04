'use client';

import Script from 'next/script';

/**
 * Agoda Sherpa "dynamic" ad unit.
 *
 * The widget script renders an auto-scrolling grid of
 * discounted hotels into the placeholder div below
 * (AutoScrollSpeed=3000, DiscountedOnly=true, city 2994).
 *
 * The config must only run once the loader has executed —
 * `next/script` injects external scripts asynchronously, so
 * an inline config script would run before the global
 * `AgdDynamic` exists and the unit would never initialize.
 * The initialization therefore lives in the loader's
 * onLoad callback. The unit's own settings (layout, width,
 * height) are controlled by Agoda's widget configuration,
 * not by the page.
 */
const WIDGET_ID = 'adgshp314391741';

export default function AgodaSherpaWidget() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id={WIDGET_ID}></div>
        <Script
          src="//cdn0.agoda.net/images/sherpa/js/init-dynamic_v8.min.js"
          strategy="afterInteractive"
          onLoad={() => {
            const AgdDynamic = (window as any).AgdDynamic;
            if (typeof AgdDynamic !== 'function') return;

            const stg: Record<string, string | boolean | number> = {
              crt: '5035933860666',
              version: '1.05',
              id: WIDGET_ID,
              name: WIDGET_ID,
              Width: '300px',
              Height: '300px',
              RefKey: 'X3ZtofgraJPbhZDNhhTueQ==',
              AutoScrollSpeed: 3000,
              AutoScrollToggle: true,
              SearchboxShow: false,
              DiscountedOnly: true,
              Layout: 'squaredynamic',
              Language: 'en-us',
              ApiKey: 'd4475522-6b7c-47e4-a8f0-f4af9a8111bf',
              Cid: '1976555',
              City: '2994',
              Currency: 'USD',
              OverideConf: false,
            };
            new AgdDynamic(WIDGET_ID).initialize(stg);
          }}
        />
      </div>
    </section>
  );
}
