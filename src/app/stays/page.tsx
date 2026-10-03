import { ProductPageShell } from '@/components/product-page-shell';
import { StaysDestinationField } from '@/components/stays-destination-field';
import { StaysResults } from '@/components/stays-results';
import {
  AgodaApiError,
  buildSearchCriteria,
  searchAgodaHotels,
  type AgodaHotelResult,
} from '@/lib/agoda-api';
import { AGODA_DESTINATIONS, findDestination } from '@/lib/agoda-catalog';
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

function NumberSelect({
  name,
  from,
  to,
  current,
}: {
  name: string;
  from: number;
  to: number;
  current: number;
}) {
  return (
    <select
      name={name}
      defaultValue={current}
      className="w-full cursor-pointer rounded-md border border-[#E8EDF2] bg-white px-2.5 py-2 text-[14px] text-[#1A2B49]"
    >
      {Array.from({ length: to - from + 1 }, (_, i) => from + i).map((n) => (
        <option key={n} value={n} selected={n === current}>
          {n}
        </option>
      ))}
    </select>
  );
}

/** Navy search strip with the white search bar. */
function SearchStrip(props: {
  selected: string;
  hotelQuery: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}) {
  return (
    <div className="-mx-4 mb-5 bg-[#1A2B49] px-4 py-3.5 md:-mx-6 md:px-6">
      <form method="get" action="/stays" className="mx-auto flex max-w-[1100px] flex-col gap-2 rounded-lg bg-white p-2 shadow-[0_2px_8px_rgba(0,0,0,0.15)] md:flex-row md:items-stretch md:gap-0 md:p-0 md:rounded-md">
        <StaysDestinationField
          destinations={AGODA_DESTINATIONS}
          defaultValue={props.selected}
        />

        <label className="flex flex-1 items-center gap-2.5 border-b border-[#E8EDF2] px-4 py-2.5 md:max-w-[190px] md:border-b-0 md:border-r md:py-0">
          <svg className="h-3.5 w-3.5 shrink-0 text-[#8B96A8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 4v16" />
            <path d="M2 8h18a2 2 0 0 1 2 2v10" />
            <path d="M2 17h20" />
            <path d="M6 8v9" />
          </svg>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-medium uppercase tracking-wide text-[#8B96A8]">
              Hotel name
            </span>
            <input
              type="text"
              name="hotel"
              defaultValue={props.hotelQuery}
              placeholder="Optional — filters the results"
              className="w-full text-[14px] font-semibold text-[#1A2B49] outline-none placeholder:font-normal placeholder:text-[#8B96A8]"
            />
          </span>
        </label>

        <label className="flex flex-1 items-center gap-2.5 border-b border-[#E8EDF2] px-4 py-2.5 md:max-w-[180px] md:border-b-0 md:border-r md:py-0">
          <svg className="h-3.5 w-3.5 shrink-0 text-[#8B96A8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-medium uppercase tracking-wide text-[#8B96A8]">
              Check-in
            </span>
            <input
              type="date"
              name="checkIn"
              defaultValue={props.checkIn}
              className="w-full text-[14px] font-semibold text-[#1A2B49]"
            />
          </span>
        </label>

        <label className="flex flex-1 items-center gap-2.5 border-b border-[#E8EDF2] px-4 py-2.5 md:max-w-[180px] md:border-b-0 md:border-r md:py-0">
          <svg className="h-3.5 w-3.5 shrink-0 text-[#8B96A8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-medium uppercase tracking-wide text-[#8B96A8]">
              Check-out
            </span>
            <input
              type="date"
              name="checkOut"
              defaultValue={props.checkOut}
              className="w-full text-[14px] font-semibold text-[#1A2B49]"
            />
          </span>
        </label>

        <div className="flex gap-2 border-b border-[#E8EDF2] px-4 py-2.5 md:max-w-[170px] md:border-b-0 md:border-r md:gap-3 md:py-0">
          <span className="flex min-w-0 flex-1 items-center gap-2.5">
            <svg className="h-3.5 w-3.5 shrink-0 text-[#8B96A8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-medium uppercase tracking-wide text-[#8B96A8]">
                Adults
              </span>
              <NumberSelect name="adults" from={1} to={36} current={props.adults} />
            </span>
          </span>
          <span className="flex min-w-0 flex-1 items-center gap-2.5">
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-medium uppercase tracking-wide text-[#8B96A8]">
                Children
              </span>
              <NumberSelect name="children" from={0} to={35} current={props.children} />
            </span>
          </span>
        </div>

        <button
          type="submit"
          className="rounded-md bg-[#5392F9] px-8 py-3 text-[14px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#3772CE] md:rounded-none md:py-0"
        >
          Search
        </button>
      </form>
    </div>
  );
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
  const hotelQuery = first('hotel')?.trim() ?? '';

  const tomorrow = addDays(new Date(), 1);
  const dayAfter = addDays(new Date(), 2);
  const checkIn = paramDate(first('checkIn')) ?? toISODate(tomorrow);
  const checkOut = paramDate(first('checkOut')) ?? toISODate(dayAfter);
  const adults = paramInt(first('adults'), 1, 36, 2);
  const children = paramInt(first('children'), 0, 35, 0);
  const sortBy = SORT_OPTIONS.some((o) => o.value === first('sortBy'))
    ? (first('sortBy') as string)
    : '';

  // A purely numeric destination query is an Agoda hotel ID —
  // look the property up directly. The Long Tail Search API
  // has no name search, so a hotel name goes through the
  // optional "Hotel name" field, which filters the results
  // of the chosen destination client-side.
  const hotelIdSearch = /^\d+$/.test(destinationParam)
    ? Number.parseInt(destinationParam, 10)
    : null;
  const destination = hotelIdSearch
    ? null
    : findDestination(destinationParam);

  let hotels: AgodaHotelResult[] = [];
  let error: { id: number; message: string } | null = null;

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
    : destination.name;

  return (
    <ProductPageShell titleKey="search.stays" subtitleKey="search.staysSubtitle" showHeader={false}>
      <SearchStrip
        selected={
          hotelIdSearch
            ? String(hotelIdSearch)
            : `${destination.name}, ${destination.country}`
        }
        hotelQuery={hotelQuery}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={adults}
        children={children}
      />

      {error && (
        <div className="mb-5 rounded-lg border border-rose-200 bg-rose-50 px-5 py-4">
          <p className="text-[14px] font-semibold text-rose-700">
            Hotel search unavailable
          </p>
          <p className="mt-1 text-[13px] text-rose-600">{error.message}</p>
        </div>
      )}

      {hotels.length > 0 ? (
        <StaysResults
          hotels={hotels}
          destinationName={destinationName}
          currency={currency}
          sortBy={sortBy}
          sortOptions={SORT_OPTIONS}
          areas={hotelIdSearch ? undefined : destination.areas}
          center={hotelIdSearch ? undefined : destination}
          initialQuery={hotelQuery}
        />
      ) : (
        !error && (
          <div className="rounded-lg border border-dashed border-[#D1D9E2] bg-[#F7F9FC] px-6 py-12 text-center">
            <p className="text-[15px] font-medium text-[#1A2B49]">
              No available properties
            </p>
            <p className="mt-1 text-[13px] text-[#8B96A8]">
              Try different dates or another destination.
            </p>
            <p className="mt-4 text-[12px] text-[#8B96A8]">
              Searched {destination.name} · {formatDateLabel(checkIn)} →{' '}
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
