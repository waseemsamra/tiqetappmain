/**
 * Intui transfer API (version "Light") client.
 *
 * Endpoint: https://en.intui.travel/api/v5/transfer/get/  (GET or POST, JSON)
 * Documented in the Intui partner back office; see the API Light brief.
 *
 * The search is anchored on an IATA airport code. `popular=1` returns priced
 * routes out of that airport and needs no hotel coordinates, which is the only
 * mode reachable from a free-text form. A specific destination needs either
 * `hotelid` (EAN), `hotelname` + `hoteladdress`, or `hotellatitude` +
 * `hotellongitude`.
 *
 * Known blocker: this host sits behind a Cloudflare bot challenge that returns
 * 403 to server-to-server requests, so every call currently fails. Intui must
 * allowlist our egress IP (or exempt `/api/v5/`) before offers can be returned.
 * `searchTransfers` reports that state instead of throwing, and the UI falls
 * back to a tracked landing link.
 */

const API_ENDPOINT = 'https://en.intui.travel/api/v5/transfer/get/';

/**
 * Our partner ID, used as `partnerID` on the API.
 *
 * This is NOT the same as the `p_site` value (2873517) used by the embeddable
 * widget snippet. Intui tracks those separately: `partnerID` identifies the
 * partner account, `p_site` identifies the publisher site.
 */
const PARTNER_ID = process.env.INTUI_PARTNER_ID ?? '287008';

const REQUEST_TIMEOUT_MS = 15000;

export interface TransferQuery {
  /** IATA airport code, e.g. "DXB". Required. */
  airportCode: string;
  /**
   * Destination. The digest requires one of: hotelid (EAN), or
   * hotelname + hoteladdress, or hotellatitude + hotellongitude. Free text
   * gives us hotelname, so the address is collected alongside it.
   */
  hotelName?: string;
  hotelAddress?: string;
  /** EAN hotel id, used instead of the name/address pair when known. */
  hotelId?: string;
  hotelLatitude?: number;
  hotelLongitude?: number;
  /** Pickup date, yyyy-mm-dd. */
  arrivalDate: string;
  /** Pickup time, hh:mm. */
  arrivalTime: string;
  /** Return leg date/time; omit for a one-way transfer. */
  departureDate?: string;
  departureTime?: string;
  adults?: number;
  children?: number;
  infants?: number;
  /** One of RUB, EUR, USD, GBP. Defaults to USD. */
  currency?: string;
  /**
   * `api2` returns the airport landing page, which carries Intui's own search
   * form with the airport preselected plus its popular destinations.
   */
  api2?: boolean;
  /** Drops shuttle-bus options; the digest notes this raises average order value. */
  withoutShuttle?: boolean;
}

export interface TransferOffer {
  productId: string;
  productType: string;
  description: string;
  /** Route label, e.g. "Atatürk Airport - Beyazit". */
  routeName: string;
  transferMinutes: number;
  minPax: number;
  maxPax: number;
  currency: string;
  unitPrice: number;
  totalPrice: number;
  /** True when the price is per seat rather than per vehicle. */
  perPerson: boolean;
  /** Route-specific booking link. Popular routes carry one; `items` share the
   *  response-level `url`. */
  bookingUrl?: string;
}

export interface TransferSearchResult {
  /** False when the API is unreachable, e.g. still behind the bot challenge. */
  ok: boolean;
  offers: TransferOffer[];
  /** Tracked Intui page that starts the booking flow. */
  bookingUrl: string;
  error?: string;
}

function buildParams(query: TransferQuery): URLSearchParams {
  const currency = (query.currency ?? 'USD').toUpperCase();

  const params = new URLSearchParams({
    partnerID: PARTNER_ID,
    airportcode: query.airportCode.toUpperCase(),
    // The digest's parameter table names this `currency`, but every worked
    // example uses `cy`. Both are sent so the currency is honoured either way.
    currency,
    cy: currency,
    arrivaldate: query.arrivalDate,
    arrivaltime: query.arrivalTime,
    numberofadults: String(query.adults ?? 2),
  });

  // Landing controls from the digest: `api` strips their marketing clutter,
  // `api2` returns the airport page with their search form, and
  // `without-shuttle` removes shuttle options.
  params.set('api', '');
  if (query.api2) params.set('api2', '');
  if (query.withoutShuttle) params.set('without-shuttle', '');

  if (query.departureDate) params.set('departuredate', query.departureDate);
  if (query.departureTime) params.set('departuretime', query.departureTime);
  if (query.children) params.set('numberofchildren', String(query.children));
  if (query.infants) params.set('numberofinfants', String(query.infants));

  // Destination, in the three forms the digest allows. Preference order is the
  // digest's own: EAN id, then GPS coordinates, then name plus address.
  if (query.hotelId) {
    params.set('hotelid', query.hotelId);
  } else if (
    typeof query.hotelLatitude === 'number' &&
    typeof query.hotelLongitude === 'number'
  ) {
    params.set('hotellatitude', String(query.hotelLatitude));
    params.set('hotellongitude', String(query.hotelLongitude));
  } else if (query.hotelName && query.hotelAddress) {
    params.set('hotelname', query.hotelName);
    params.set('hoteladdress', query.hotelAddress);
  } else {
    // No destination supplied, so fall back to priced popular routes out of the
    // airport, which is the only mode that needs no hotel details.
    params.set('popular', '1');
    params.set('several_popular', '1');
  }

  return params;
}

/**
 * Dev-only mock. Set INTUI_MOCK=1 to render the results UI with sample offers
 * while Intui's API is still blocking this host. Never enable in production:
 * it returns fabricated prices.
 */
function mockResult(query: TransferQuery): TransferSearchResult {
  const legs = [
    { id: 468432, type: 'Shuttle bus transfer', minutes: 50, min: 0, max: 0, unit: 1986.34, total: 1986.34, perPerson: true },
    { id: 468433, type: 'Private transfer', minutes: 30, min: 1, max: 4, unit: 6854.08, total: 6854.08, perPerson: false },
    { id: 468434, type: 'Private minibus', minutes: 30, min: 5, max: 10, unit: 9867.91, total: 9867.91, perPerson: false },
  ];

  return {
    ok: true,
    offers: legs.map((leg) => ({
      productId: String(leg.id),
      productType: leg.type,
      description: '',
      routeName: `${query.airportCode} - ${query.hotelName || 'City centre'}`,
      transferMinutes: leg.minutes,
      minPax: leg.min,
      maxPax: leg.max,
      currency: (query.currency ?? 'USD').toUpperCase(),
      unitPrice: leg.unit,
      totalPrice: leg.total,
      perPerson: leg.perPerson,
      bookingUrl: buildAirportLandingUrl(query),
    })),
    bookingUrl: buildAirportLandingUrl(query),
  };
}

export async function searchTransfers(
  query: TransferQuery,
): Promise<TransferSearchResult> {
  if (process.env.INTUI_MOCK === '1') {
    return mockResult(query);
  }

  const url = `${API_ENDPOINT}?${buildParams(query).toString()}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const contentType = response.headers.get('content-type') ?? '';

    // Cloudflare answers with an HTML challenge page instead of JSON.
    if (!contentType.includes('application/json')) {
      return {
        ok: false,
        offers: [],
        bookingUrl: buildAirportLandingUrl(query),
        // The upstream URL is included so the exact call can be replayed by
        // hand once Intui allows this host.
        error: `Intui API returned ${response.status} (${contentType || 'unknown'}) for ${url}`,
      };
    }

    const payload = (await response.json()) as unknown;
    const { offers, bookingUrl } = normalizeResponse(payload);

    return { ok: true, offers, bookingUrl };
  } catch (error) {
    return {
      ok: false,
      offers: [],
      bookingUrl: buildAirportLandingUrl(query),
      error: error instanceof Error ? error.message : 'Intui request failed',
    };
  }
}

/**
 * User-facing fallback when the API cannot be reached.
 *
 * The documented way to build a clickable partner link is to open the transfer
 * catalog and carry `partnerID`, so that is what we link to. When the API does
 * answer, its own `url` is preferred because it already has the partner ID and
 * route baked in.
 */
export function buildAirportLandingUrl(query: Partial<TransferQuery>): string {
  // `www.intui.travel/transfer/` is the only Intui transfer path verified to
  // serve a real response; `en.intui.travel` answers 403 and the deep route
  // slugs in the docs now 404. `api` strips their marketing clutter and
  // `partnerID` keeps the click attributed to us.
  const url = new URL('https://www.intui.travel/transfer/');
  url.searchParams.set('api', '');
  url.searchParams.set('partnerID', PARTNER_ID);
  if (query.airportCode) {
    url.searchParams.set('airportcode', query.airportCode.toUpperCase());
  }
  return url.toString();
}

/**
 * Intui returns booking links on `www.en.intui.travel`, which does not resolve
 * at all. The working host is `www.intui.travel`, so the host is rewritten
 * before we hand any link to the browser.
 */
function normalizeIntuiUrl(raw: unknown): string {
  if (typeof raw !== 'string' || !raw) return '';
  return raw.replace(
    /^https?:\/\/(?:www\.)?(?:en\.)?intui\.travel/i,
    'https://www.intui.travel',
  );
}

/**
 * The documented response is either a single object with `url` + `items`, or a
 * bare array of popular routes. Both are mapped onto `TransferOffer`, and an
 * unrecognised shape yields no offers rather than throwing.
 */
function normalizeResponse(payload: unknown): {
  offers: TransferOffer[];
  bookingUrl: string;
} {
  const root = payload as Record<string, unknown> | null;

  // Popular-routes shape: [{ name_route, price, currency, url }, ...]
  if (Array.isArray(payload)) {
    const offers = payload.flatMap((entry) => {
      const item = entry as Record<string, unknown>;
      const price = Number(item.price);
      if (!Number.isFinite(price)) return [];
      return [
        {
          productId: normalizeIntuiUrl(item.url),
          bookingUrl: normalizeIntuiUrl(item.url),
          productType: '',
          description: '',
          routeName: String(item.name_route ?? ''),
          transferMinutes: 0,
          minPax: 0,
          maxPax: 0,
          currency: String(item.currency ?? 'USD'),
          unitPrice: price,
          totalPrice: price,
          perPerson: true,
        } satisfies TransferOffer,
      ];
    });
    return { offers, bookingUrl: '' };
  }

  if (!root) return { offers: [], bookingUrl: '' };

  const bookingUrl = normalizeIntuiUrl(root.url);
  const items = Array.isArray(root.items) ? root.items : [];

  const offers = items.flatMap((entry) => {
    const item = entry as Record<string, unknown>;
    const total = Number(item.TotalPrice);
    if (!Number.isFinite(total)) return [];

    const routeName = [item.AirportName, item.ResortName]
      .filter((part) => typeof part === 'string' && part.trim())
      .join(' - ');

    return [
      {
        productId: String(item.ProductId ?? ''),
        productType: String(item.ProductType ?? ''),
        description: String(item.ProductDescription ?? ''),
        routeName,
        transferMinutes: Number(item.TransferMinutes ?? 0),
        minPax: Number(item.MinPax ?? 0),
        maxPax: Number(item.MaxPax ?? 0),
        currency: String(item.CurrencyCode ?? 'USD'),
        unitPrice: Number(item.UnitPrice ?? total),
        totalPrice: total,
        perPerson: Boolean(item.PerPerson),
      } satisfies TransferOffer,
    ];
  });

  return { offers, bookingUrl };
}
