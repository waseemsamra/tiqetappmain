import { ProductPageShell } from '@/components/product-page-shell';
import { TravelpayoutsFlightsWidget } from '@/components/travelpayouts-flights-widget';

/**
 * Flight search page, backed by the Travelpayouts white-label metasearch.
 *
 * The loader is scoped to this page (see TravelpayoutsFlightsWidget) so the
 * partner script does not run on the rest of the site.
 */
export default function FlightsPage() {
  return (
    <ProductPageShell
      titleKey="search.flights"
      subtitleKey="search.flightsSubtitle"
      showHeader={false}
    >
      <TravelpayoutsFlightsWidget />
    </ProductPageShell>
  );
}