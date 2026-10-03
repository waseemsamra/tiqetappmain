'use client';

import { useMemo, useState } from 'react';
import {
  Coffee,
  Flame,
  Heart,
  MapPin,
  Search,
  Star,
  Ticket,
  Wifi,
  X,
} from 'lucide-react';
import type { AgodaHotelResult } from '@/lib/agoda-api';

export function scoreLabel(score: number): string {
  if (score >= 9) return 'Exceptional';
  if (score >= 8) return 'Excellent';
  if (score >= 7) return 'Good';
  return 'Pleasant';
}

function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${Math.round(amount)} ${currency}`;
  }
}

/** Agoda image URLs are served over http; upgrade so they load on https pages. */
function hotelImage(url?: string): string | undefined {
  return url?.replace(/^http:\/\//, 'https://');
}

function HotelCard({ hotel, currency }: { hotel: AgodaHotelResult; currency: string }) {
  const [liked, setLiked] = useState(false);
  const hasStrike =
    hotel.crossedOutRate !== undefined && hotel.crossedOutRate > hotel.dailyRate;
  const discount =
    hotel.discountPercentage && hotel.discountPercentage > 0
      ? Math.round(hotel.discountPercentage)
      : hasStrike
        ? Math.max(
            1,
            Math.round((1 - hotel.dailyRate / (hotel.crossedOutRate as number)) * 100),
          )
        : 0;
  const image = hotelImage(hotel.imageURL);
  const filledStars = Math.round(hotel.starRating);

  const card = (
    <div className="overflow-hidden rounded-lg border border-[#E8EDF2] bg-white transition-shadow duration-200 hover:border-[#D1D9E2] hover:shadow-[0_4px_16px_rgba(15,23,42,0.1)]">
      <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_240px]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-[#E8EDF2] sm:h-auto sm:min-h-[200px]">
          {image ? (
            <img
              src={image}
              alt={hotel.hotelName}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <MapPin className="h-8 w-8 text-[#8B96A8]" />
            </div>
          )}
          {discount > 0 && (
            <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 bg-[#1A2B49] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              <Star className="h-2.5 w-2.5 text-yellow-300" fill="currentColor" />
              VIP Deal
            </div>
          )}
          <button
            type="button"
            aria-label="Save to wishlist"
            onClick={(e) => {
              e.preventDefault();
              setLiked((v) => !v);
            }}
            className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#5C6B85] transition-colors hover:text-[#E23F3F]"
          >
            <Heart
              className={`h-3.5 w-3.5 ${liked ? 'fill-[#E23F3F] text-[#E23F3F]' : ''}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-col gap-1.5 p-4">
          <h3 className="text-[15px] font-bold leading-snug text-[#1A2B49]">
            {hotel.hotelName}
          </h3>
          <div className="flex gap-0.5 text-[#F5A623]">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-2.5 w-2.5 ${
                  i < filledStars ? 'fill-current' : 'fill-current text-slate-200'
                }`}
              />
            ))}
          </div>
          {hotel.latitude !== undefined && hotel.longitude !== undefined && (
            <div className="flex items-start gap-1.5 text-[11px] text-[#5392F9]">
              <MapPin className="mt-px h-2.5 w-2.5 shrink-0 text-[#E23F3F]" />
              <span>
                {hotel.latitude.toFixed(2)}, {hotel.longitude.toFixed(2)} ·{' '}
                <span className="underline">View on map</span>
              </span>
            </div>
          )}
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[11px] text-[#5C6B85]">
            {hotel.includeBreakfast && (
              <span className="flex items-center gap-1">
                <Coffee className="h-2.5 w-2.5 text-[#8B96A8]" />
                Breakfast included
              </span>
            )}
            {hotel.freeWifi && (
              <span className="flex items-center gap-1">
                <Wifi className="h-2.5 w-2.5 text-[#8B96A8]" />
                Free WiFi
              </span>
            )}
          </div>
          {discount > 0 && (
            <div className="inline-flex w-fit items-center gap-1.5 rounded bg-[#1A2B49] px-2 py-0.5 text-[10px] font-bold text-white">
              <Star className="h-2.5 w-2.5 text-yellow-300" fill="currentColor" />
              Deals
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="flex flex-col justify-between gap-3 border-t border-[#E8EDF2] p-4 text-right lg:border-l lg:border-t-0">
          <div className="flex flex-col items-start gap-0.5 lg:items-end">
            <span
              className={`text-[15px] font-bold ${
                hotel.reviewScore >= 8 ? 'text-[#2E9C6C]' : 'text-[#1A2B49]'
              }`}
            >
              {hotel.reviewScore.toFixed(1)} {scoreLabel(hotel.reviewScore)}
            </span>
            {hotel.reviewCount !== undefined && (
              <span className="text-[10px] text-[#8B96A8]">
                {hotel.reviewCount.toLocaleString()} reviews
              </span>
            )}
          </div>
          <div className="flex flex-col items-start gap-0.5 lg:items-end">
            {discount > 0 && hasStrike && (
              <span className="text-[12px] text-[#8B96A8] line-through">
                {formatMoney(hotel.crossedOutRate as number, currency)}{' '}
                <span className="font-semibold text-[#E23F3F] no-underline">
                  -{discount}%
                </span>
              </span>
            )}
            <span className="text-[22px] font-extrabold leading-none text-[#1A2B49]">
              {formatMoney(hotel.dailyRate, currency)}
            </span>
            <span className="mt-1 text-[10px] leading-snug text-[#8B96A8]">
              Per night before taxes and fees
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (hotel.landingURL) {
    return (
      <a
        href={hotel.landingURL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block cursor-pointer"
      >
        {card}
      </a>
    );
  }
  return <div className="cursor-pointer">{card}</div>;
}

/**
 * Agoda's property type taxonomy. Type assignment per hotel
 * comes from the Content Feed API (feed_id 5), so the rows
 * render with a "Soon" marker until that feed is connected.
 */
const PROPERTY_TYPES = [
  'Entire homes & apartments',
  'Apartment/Flat',
  'Hotel',
  'Entire House',
  'Serviced apartment',
  'Guesthouse/bed and breakfast',
  'Villa',
  'Capsule hotel',
  'Homestay',
  'Hostel',
  'Resort',
  'Boat/cruise',
  'Tent',
  'Holiday park/caravan park',
  'Inn',
  'Resort villa',
  'Lodge',
  'Riad',
];

const PROPERTY_TYPES_PREVIEW = 8;

interface Props {
  hotels: AgodaHotelResult[];
  destinationName: string;
  currency: string;
  sortBy: string;
  sortOptions: { value: string; label: string }[];
}

export function StaysResults({ hotels, destinationName, currency, sortBy, sortOptions }: Props) {
  const [couponOpen, setCouponOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyTypeExpanded, setPropertyTypeExpanded] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice === '' ? 0 : Number.parseFloat(minPrice) || 0;
    const max = maxPrice === '' ? Number.POSITIVE_INFINITY : Number.parseFloat(maxPrice) || Number.POSITIVE_INFINITY;
    return hotels.filter((h) => {
      if (q && !h.hotelName.toLowerCase().includes(q)) return false;
      if (h.reviewScore < minRating) return false;
      // The Long Tail Search API only returns bookable properties,
      // so every result satisfies "show only available properties".
      if (!availableOnly) return false;
      if (h.dailyRate < min || h.dailyRate > max) return false;
      return true;
    });
  }, [hotels, query, minRating, availableOnly, minPrice, maxPrice]);

  const changeSort = (value: string) => {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set('sortBy', value);
    else url.searchParams.delete('sortBy');
    window.location.href = url.toString();
  };

  /**
   * Amenity, payment-model and location-score filters need the
   * Agoda Content Feed API (feed_id 9 "Facilities per Hotel"),
   * which requires a datafeed token from the account manager.
   * Until that feed is connected, those rows render with a
   * "Soon" marker instead of a working checkbox.
   */
  const FilterRow = ({
    checked,
    onChange,
    label,
    count,
    soon = false,
  }: {
    checked?: boolean;
    onChange?: (v: boolean) => void;
    label: string;
    count?: number;
    soon?: boolean;
  }) => (
    <div
      className={`flex items-center gap-2 py-1 text-[12px] ${
        soon ? 'text-[#8B96A8]' : 'cursor-pointer text-[#5C6B85] transition-colors hover:text-[#1A2B49]'
      }`}
    >
      <input
        type="checkbox"
        checked={soon ? false : checked}
        disabled={soon || !onChange}
        onChange={(e) => onChange?.(e.target.checked)}
        className={`h-4 w-4 shrink-0 accent-[#5392F9] ${soon ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
      />
      <span>{label}</span>
      {soon ? (
        <span className="ml-auto rounded bg-[#F7F9FC] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8B96A8]">
          Soon
        </span>
      ) : (
        count !== undefined && (
          <span className="ml-auto text-[11px] text-[#8B96A8]">({count})</span>
        )
      )}
    </div>
  );

  const prices = useMemo(() => hotels.map((h) => h.dailyRate), [hotels]);
  const priceFloor = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const priceCeil = prices.length ? Math.ceil(Math.max(...prices)) : 0;

  return (
    <div className="flex flex-col gap-3.5">
      {/* Coupon banner */}
      {couponOpen && (
        <div className="flex items-center justify-center gap-4 border-b border-[#FADCDC] bg-[#FDE8E8] px-6 py-3">
          <Ticket className="h-5 w-5 shrink-0 text-[#E23F3F]" />
          <p className="text-[13px] leading-snug text-[#1A2B49]">
            <strong className="text-[14px] font-bold text-[#E23F3F]">
              Looking for instant coupons?
            </strong>
            <br />
            Check out our Coupons &amp; Deals page for today&apos;s discounts
          </p>
          <span className="hidden cursor-pointer whitespace-nowrap rounded bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#5392F9] transition-colors hover:bg-[#F0F5FF] sm:inline-block">
            See all coupons
          </span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setCouponOpen(false)}
            className="cursor-pointer p-1 text-[#8B96A8] transition-colors hover:text-[#1A2B49]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-5 px-4 lg:grid-cols-[280px_1fr] lg:px-6">
        {/* Sidebar */}
        <aside className="hidden flex-col gap-4 lg:flex">
          {/* Map preview */}
          <div className="relative flex h-28 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#F5F0E1] via-[#E8F4E0] to-[#D4E8F0] shadow-[inset_0_0_0_1px_#E8EDF2]">
            <MapPin className="relative z-10 h-7 w-7 text-[#E23F3F] drop-shadow" />
            <span className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-[11px] font-bold uppercase tracking-wider text-[#1A2B49]">
              Search on map
            </span>
          </div>

          {/* Text search */}
          <div className="flex items-center gap-2 rounded-md border border-[#E8EDF2] px-3.5 py-2.5">
            <Search className="h-3.5 w-3.5 shrink-0 text-[#8B96A8]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Text search"
              className="w-full min-w-0 text-[13px] text-[#1A2B49] placeholder:text-[#8B96A8]"
            />
          </div>

          {/* Budget */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[13px] font-bold text-[#1A2B49]">
              Your budget (per night)
            </p>
            <div className="mb-3 flex gap-2">
              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-[#8B96A8]">
                  Min
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder={String(priceFloor)}
                  className="w-full rounded border border-[#E8EDF2] px-2.5 py-2 text-[13px] font-medium text-[#1A2B49] focus:border-[#5392F9] focus:outline-none"
                />
              </div>
              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-[#8B96A8]">
                  Max
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder={String(priceCeil)}
                  className="w-full rounded border border-[#E8EDF2] px-2.5 py-2 text-[13px] font-medium text-[#1A2B49] focus:border-[#5392F9] focus:outline-none"
                />
              </div>
            </div>
            <p className="text-[11px] text-[#8B96A8]">
              Price range: {currency} {priceFloor} to {currency} {priceCeil}
            </p>
          </div>

          {/* Your filters */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[13px] font-bold text-[#1A2B49]">
              Your filters
            </p>
            <FilterRow soon label="Pay at the hotel" />
          </div>

          {/* Popular filters */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[13px] font-bold text-[#1A2B49]">
              Popular filters for {destinationName}
            </p>
            <FilterRow soon label="Location: 7+ Very good" />
            <FilterRow soon label="Kitchen" />
            <FilterRow soon label="Private pool" />
            <FilterRow soon label="Balcony/terrace" />
            <FilterRow soon label="Pets allowed in room" />
            <FilterRow
              checked={minRating === 6}
              onChange={(v) => setMinRating(v ? 6 : 0)}
              label="Guest rating: 6+ Good"
              count={hotels.filter((h) => h.reviewScore >= 6).length}
            />
            <FilterRow soon label="Pets allowed" />
            <FilterRow soon label="Smoking area" />
          </div>

          {/* Availability */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[13px] font-bold text-[#1A2B49]">
              Availability
            </p>
            <FilterRow
              checked={availableOnly}
              onChange={setAvailableOnly}
              label="Show only available properties"
              count={hotels.length}
            />
          </div>

          {/* Property type */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[13px] font-bold text-[#1A2B49]">
              Property type
            </p>
            {(propertyTypeExpanded
              ? PROPERTY_TYPES
              : PROPERTY_TYPES.slice(0, PROPERTY_TYPES_PREVIEW)
            ).map((type) => (
              <FilterRow key={type} soon label={type} />
            ))}
            {PROPERTY_TYPES.length > PROPERTY_TYPES_PREVIEW && (
              <button
                type="button"
                onClick={() => setPropertyTypeExpanded((v) => !v)}
                className="mt-1.5 text-[12px] font-semibold text-[#5392F9] hover:underline"
              >
                {propertyTypeExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        </aside>

        {/* Results */}
        <div className="flex min-w-0 flex-col gap-3.5">
          {/* Warning banner */}
          <div className="flex items-center gap-3 rounded-lg border border-[#FFE4C4] bg-[#FFF8F0] px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E23F3F] text-white">
              <Flame className="h-3.5 w-3.5" />
            </div>
            <p className="text-[12px] leading-snug text-[#5C6B85]">
              <strong className="text-[13px] font-bold text-[#E23F3F]">
                Hurry! {Math.max(1, Math.round(hotels.length * 0.46))} of {hotels.length} properties are in high demand!
              </strong>
              <br />
              Rooms in {destinationName} are popular on your selected dates. Reserve now before prices go up.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between py-1">
            <p className="text-[16px] font-bold text-[#1A2B49]">
              {filtered.length} properties in {destinationName}
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="stays-sort" className="text-[12px] text-[#5C6B85]">
                Sort by:
              </label>
              <select
                id="stays-sort"
                value={sortBy}
                onChange={(e) => changeSort(e.target.value)}
                className="cursor-pointer rounded-md border border-[#E8EDF2] bg-white px-3.5 py-2 text-[12px] font-medium text-[#1A2B49] transition-colors hover:border-[#D1D9E2]"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#D1D9E2] bg-[#F7F9FC] px-6 py-12 text-center">
              <p className="text-[15px] font-medium text-[#1A2B49]">No properties match your filters</p>
              <p className="mt-1 text-[13px] text-[#8B96A8]">
                Try widening your budget or clearing filters.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {filtered.map((hotel) => (
                <HotelCard key={hotel.hotelId} hotel={hotel} currency={currency} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
