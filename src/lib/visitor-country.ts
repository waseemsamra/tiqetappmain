/**
 * Cookie holding the visitor's ISO 3166-1 alpha-2 country code.
 *
 * Set by the middleware from the edge's geo header, so it survives the fact that
 * the page itself only sees the request headers.
 */
export const VISITOR_COUNTRY_COOKIE = 'aafare_visitor_country';

/** Header names the common CDNs use for the visitor's country, in priority order. */
const GEO_HEADERS = [
  'x-vercel-ip-country',
  'cf-ipcountry',
  'x-country-code',
  'x-geo-country',
];

export function readVisitorCountry(headers: Headers): string {
  for (const name of GEO_HEADERS) {
    const value = headers.get(name);
    if (value && value !== 'XX' && value !== 'T1') return value.toUpperCase();
  }
  return '';
}
