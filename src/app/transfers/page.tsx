import { AirportTransfersWidget } from '@/components/airport-transfers-widget';
import { TransfersSearchForm } from '@/components/transfers-search-form';
import { ProductPageShell } from '@/components/product-page-shell';

/**
 * Dedicated airport-transfer booking page.
 *
 * The Transfers tab on the homepage links here rather than hosting the partner
 * widget in the hero: the widget needs the full page width, and keeping it out
 * of the hero avoids a third-party layout sitting over our own.
 *
 * The site header and footer come from the root layout.
 */
/**
 * `widget` embeds Intui's own booking form, which is the interim mode while
 * their transfer API is blocked for our server. `api` uses our own form and
 * renders results on this page. Set with NEXT_PUBLIC_TRANSFERS_MODE.
 */
const TRANSFERS_MODE =
  process.env.NEXT_PUBLIC_TRANSFERS_MODE === 'api' ? 'api' : 'widget';

export default function TransfersPage() {
  return (
    <ProductPageShell
      titleKey="search.airportTransfers"
      subtitleKey="search.transfersSubtitle"
      showHeader={false}
    >
      {TRANSFERS_MODE === 'api' ? (
        <TransfersSearchForm />
      ) : (
        <AirportTransfersWidget />
      )}
    </ProductPageShell>
  );
}
