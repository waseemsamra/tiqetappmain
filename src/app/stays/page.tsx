import { ProductPageShell } from '@/components/product-page-shell';
import { StaysResults } from '@/components/stays-results';
import { StaysSearchBar } from '@/components/stays-search-bar';
import {
  AgodaApiError,
  buildSearchCriteria,
  searchAgodaHotels,
  type AgodaHotelResult,
} from '@/lib/agoda-api';
import {
  AGODA_DESTINATIONS,
  matchDestination,
  type AgodaDestination,
} from '@/lib/agoda-catalog';
import { resolveHotelLinks } from '@/lib/agoda-detail-url';
import { getDisplayCurrency } from '@/lib/tiqets-api';

/** Clamps a query param to an integer within [min, max]. */
function paramInt(value: string | undefined, min: number, max: number, fallback: number): number {
  const n = Number.parseInt(value ?? '', 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

/** Validates a YYYY-MM-DD string, returning null when malformed. */
function paramDate(value: string | undefined): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) return null;
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return value ?? null;
}

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDateLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const SORT_OPTIONS = [
  { value: '', label: 'Best match' },
  { value: 'PriceAsc', label: 'Price (lowest first)' },
  { value: 'PriceDesc', label: 'Price (highest first)' },
  { value: 'StarRatingDesc', label: 'Star rating' },
  { value: 'AllGuestsReviewScore', label: 'Review score' },
];

/** Rejects if the promise does not settle within ms. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      timer = setTimeout(() => reject(new Error('Search timed out')), ms);
    }),
  ]).finally(() => clearTimeout(timer));
}

export default async function StaysPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const first = (key: string): string | undefined => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const destinationParam = first('destination')?.trim() ?? '';

  const tomorrow = addDays(new Date(), 1);
  const dayAfter = addDays(new Date(), 2);
  const checkIn = paramDate(first('checkIn')) ?? toISODate(tomorrow);
  const checkOut = paramDate(first('checkOut')) ?? toISODate(dayAfter);
  const adults = paramInt(first('adults'), 1, 36, 2);
  const children = paramInt(first('children'), 0, 35, 0);
  const rooms = paramInt(first('rooms'), 1, 10, 1);
  const sortBy = SORT_OPTIONS.some((o) => o.value === first('sortBy'))
    ? (first('sortBy') as string)
    : '';

  // A purely numeric destination query is an Agoda
  // hotel ID — look the property up directly. The
  // Long Tail Search API has no name search, so
  // any other free text is a property name: it
  // searches every destination and the merged
  // results are filtered by name client-side.
  const hotelIdSearch = /^\d+$/.test(destinationParam)
    ? Number.parseInt(destinationParam, 10)
    : null;
  const matched = hotelIdSearch
    ? undefined
    : matchDestination(destinationParam);
  const destination = matched ?? AGODA_DESTINATIONS[0];

  // A property-name query pre-fills the results'
  // text filter so only matching properties show.
  const propertyQuery =
    hotelIdSearch || matched || !destinationParam
      ? ''
      : destinationParam;

  // The API has no name search, so a property-name query
  // searches every known destination in parallel and the
  // merged results are filtered by name client-side.
  const propertyOnlySearch =
    !hotelIdSearch && !matched && destinationParam !== '';

  let hotels: AgodaHotelResult[] = [];
  let error: { id: number; message: string } | null = null;
  // Destination that returned each hotel — set by the
  // property-name search, which fans out to every
  // destination and merges the results.
  let hotelDestinations: Record<number, AgodaDestination> | undefined;

  // The API accepts exactly one of cityId / geo / hotelId per request.
  // Prefer the city ID when the catalog knows it, otherwise fall back
  // to a radius search around the destination centre.
  const searchTarget = hotelIdSearch
    ? { hotelIds: [hotelIdSearch] }
    : destination.cityId
      ? { cityId: destination.cityId }
      : {
          geo: {
            latitude: destination.latitude,
            longitude: destination.longitude,
            searchRadius: destination.radiusKm,
          },
        };

  try {
    if (hotelIdSearch) {
      const response = await searchAgodaHotels(
        buildSearchCriteria({
          hotelIds: [hotelIdSearch],
          checkInDate: checkIn,
          checkOutDate: checkOut,
          adults,
          children,
          maxResults: 30,
        }),
      );
      hotels = response.results;
    } else if (propertyOnlySearch) {
      const responses = await Promise.allSettled(
        AGODA_DESTINATIONS.map((d) =>
          withTimeout(
            searchAgodaHotels(
              buildSearchCriteria({
                ...(d.cityId
                  ? { cityId: d.cityId }
                  : {
                      geo: {
                        latitude: d.latitude,
                        longitude: d.longitude,
                        searchRadius: d.radiusKm,
                      },
                    }),
                checkInDate: checkIn,
                checkOutDate: checkOut,
                adults,
                children,
                maxResults: 30,
              }),
            ),
            6000,
          ),
        ),
      );
      const seen = new Set<number>();
      const foundDestinations: Record<number, AgodaDestination> = {};
      responses.forEach((response, index) => {
        if (response.status === 'fulfilled') {
          // Record which destination's search returned each
          // property, so its card can link to the Agoda
          // detail page under that destination's city slug.
          const found = AGODA_DESTINATIONS[index];
          for (const hotel of response.value.results) {
            if (!seen.has(hotel.hotelId)) {
              seen.add(hotel.hotelId);
              hotels.push(hotel);
              foundDestinations[hotel.hotelId] = found;
            }
          }
        }
      });
      hotelDestinations = foundDestinations;
    } else {
      const response = await searchAgodaHotels(
        buildSearchCriteria({
          ...searchTarget,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          adults,
          children,
          maxResults: 30,
          sortBy: sortBy || undefined,
        }),
      );
      hotels = response.results;
    }
  } catch (e) {
    if (e instanceof AgodaApiError) {
      error = { id: e.id, message: e.message };
    } else {
      error = { id: 0, message: 'Unexpected error while searching hotels' };
    }
  }

  const currency = hotels[0]?.currency ?? getDisplayCurrency();

  // Direct hotel lookups have no destination context — the
  // result itself names the property, and area/distance
  // filters (which need destination data) are skipped.
  const destinationName = hotelIdSearch
    ? hotels[0]?.hotelName ?? `Hotel #${hotelIdSearch}`
    : propertyOnlySearch
      ? destinationParam
      : destination.name;

  // Resolve the card link for every result: the Agoda
  // detail page when the name-derived slug verifies against
  // agoda.com, otherwise the tracked partner landing URL.
  // Property-name searches pass the destination that
  // returned each hotel; direct hotel-ID lookups have no
  // destination context, so every card uses the landing
  // URL there. Slug verdicts are cached for 24h, so only
  // the first render of a destination pays the cost.
  const hotelLinks = await resolveHotelLinks({
    hotels,
    destination: hotelIdSearch || propertyOnlySearch ? undefined : destination,
    destinationByHotel: hotelDestinations,
    checkIn,
    checkOut,
    adults,
    children,
    rooms,
  });

  return (
    <ProductPageShell titleKey="search.stays" subtitleKey="search.staysSubtitle" showHeader={false}>
      {/* Navy strip with the Agoda-style search bar */}
      <div className="-mx-4 mb-5 bg-[#1A2B49] px-4 py-5 md:-mx-6 md:px-6">
        <StaysSearchBar
          destinations={AGODA_DESTINATIONS}
          defaultDestination={
            hotelIdSearch
              ? String(hotelIdSearch)
              : matched
                ? `${matched.name}, ${matched.country}`
                : // Keep free text in the field so a
                  // property search shows what was typed.
                  (destinationParam ||
                    `${destination.name}, ${destination.country}`)
          }
          defaultCheckIn={checkIn}
          defaultCheckOut={checkOut}
          defaultAdults={adults}
          defaultChildren={children}
        />
      </div>
      {error && (
        <div className="mb-5 rounded-lg border border-rose-200 bg-rose-50 px-5 py-4">
          <p className="text-[16px] font-semibold text-rose-700">
            Hotel search unavailable
          </p>
          <p className="mt-1 text-[16px] text-rose-600">{error.message}</p>
        </div>
      )}

      {hotels.length > 0 ? (
        <StaysResults
          hotels={hotels}
          destinationName={destinationName}
          currency={currency}
          sortBy={sortBy}
          sortOptions={SORT_OPTIONS}
          areas={
            hotelIdSearch || propertyOnlySearch
              ? undefined
              : destination.areas
          }
          center={
            hotelIdSearch || propertyOnlySearch
              ? undefined
              : destination
          }
          initialQuery={propertyQuery}
          hotelLinks={hotelLinks}
        />
      ) : (
        !error && (
          <div className="rounded-lg border border-dashed border-[#D1D9E2] bg-[#F7F9FC] px-6 py-12 text-center">
            <p className="text-[17px] font-medium text-[#1A2B49]">
              No available properties
            </p>
            <p className="mt-1 text-[16px] text-[#8B96A8]">
              Try different dates or another destination.
            </p>
            <p className="mt-4 text-[13px] text-[#8B96A8]">
              Searched {destinationName} · {formatDateLabel(checkIn)} →{' '}
              {formatDateLabel(checkOut)} · {adults} adult
              {adults === 1 ? '' : 's'}
              {children > 0 ? `, ${children} child${children === 1 ? '' : 'ren'}` : ''}
            </p>
          </div>
        )
      )}
    </ProductPageShell>
  );
}
