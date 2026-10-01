import { AirportTransfersWidget } from '@/components/airport-transfers-widget';
import { TransfersSearchForm } from '@/components/transfers-search-form';

/**
 * Dedicated airport-transfer booking page.
 *
 * Full-width page for the transfers widget/white-label to use the entire viewport.
 * The site header and footer come from the root layout.
 */
/**
 * `widget` embeds Intui's own booking form (legacy widget mode).
 * `whitelabel` uses Intui's white-label iframe (custom branding via partner portal).
 * `api` uses our own form and renders results on this page.
 * Set with NEXT_PUBLIC_TRANSFERS_MODE.
 */
const TRANSFERS_MODE =
  (process.env.NEXT_PUBLIC_TRANSFERS_MODE as 'widget' | 'whitelabel' | 'api') || 'widget';

export default function TransfersPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="w-full px-6 py-8 max-md:py-6">
        <div className="mb-4">
          <nav aria-label="Breadcrumb" className="text-[13px] text-slate-500">
            <ol className="flex items-center gap-1.5">
              <li>
                <a href="/" className="hover:text-slate-900">
                  Home
                </a>
              </li>
              <li aria-hidden>/</li>
              <li className="text-slate-900 font-medium">Airport Transfers</li>
            </ol>
          </nav>
        </div>

        <div className="w-full">
          {TRANSFERS_MODE === 'api' ? (
            <TransfersSearchForm />
          ) : (
            <AirportTransfersWidget
              mode={TRANSFERS_MODE}
              partnerId={process.env.NEXT_PUBLIC_INTUI_PARTNER_ID}
              colorScheme={process.env.NEXT_PUBLIC_INTUI_COLOR_SCHEME}
              language={process.env.NEXT_PUBLIC_INTUI_LANGUAGE}
              headerText={process.env.NEXT_PUBLIC_INTUI_HEADER_TEXT}
            />
          )}
        </div>
      </div>
    </div>
  );
}
