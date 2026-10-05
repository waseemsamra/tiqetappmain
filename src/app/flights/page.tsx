import { FlightsSearchWidget } from '@/components/flights-search-widget';

/**
 * Flight search is hosted by Travelpayouts on `flights.aafare.com`.
 * The white-label form below submits there with the filled
 * parameters, so the search carries the user's input along
 * instead of bouncing to a bare landing page.
 */
export default function FlightsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <FlightsSearchWidget />
    </main>
  );
}
