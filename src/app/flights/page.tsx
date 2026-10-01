import { redirect } from 'next/navigation';

/**
 * Flight search is hosted by Travelpayouts on `flights.aafare.com`.
 *
 * Travelpayouts renders its white-label experience only for that host and sends
 * no `X-Frame-Options`, but embedding it produced an empty widget: the
 * `tpwl-search` / `tpwl-tickets` containers from their setup guide are legacy
 * placeholders, and the live build mounts its own app from `tp.media` instead.
 * A redirect is therefore both simpler and more reliable than an iframe.
 *
 * Replace this with a real page once we host flight search ourselves.
 */
const FLIGHTS_SEARCH_URL = 'https://flights.aafare.com/';

export default function FlightsPage() {
  redirect(FLIGHTS_SEARCH_URL);
}