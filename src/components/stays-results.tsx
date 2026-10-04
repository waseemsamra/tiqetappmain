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
import type { AgodaArea } from '@/lib/agoda-catalog';

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

/** Great-circle distance in km between two coordinates. */
function haversineKm(
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number },
): number {
  const R = 6371;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLng = ((b.longitude - a.longitude) * Math.PI) / 180;
  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Max distance from an area centre for a hotel to count as "in" that area. */
const AREA_RADIUS_KM = 6;

function HotelCard({
  hotel,
  currency,
  href,
  onOpen,
}: {
  hotel: AgodaHotelResult;
  currency: string;
  /** Resolved outbound link — Agoda detail page or tracked landing URL. */
  href?: string;
  /** Called when the card is clicked, before navigating. */
  onOpen?: (href: string) => void;
}) {
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
            <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 bg-[#1A2B49] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
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
          <h3 className="text-[16px] font-bold leading-snug text-[#1A2B49]">
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
            <div className="flex items-start gap-1.5 text-[12px] text-[#5392F9]">
              <MapPin className="mt-px h-2.5 w-2.5 shrink-0 text-[#E23F3F]" />
              <span>
                {hotel.latitude.toFixed(2)}, {hotel.longitude.toFixed(2)} ·{' '}
                <span className="underline">View on map</span>
              </span>
            </div>
          )}
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 text-[12px] text-[#5C6B85]">
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
            <div className="inline-flex w-fit items-center gap-1.5 rounded bg-[#1A2B49] px-2 py-0.5 text-[11px] font-bold text-white">
              <Star className="h-2.5 w-2.5 text-yellow-300" fill="currentColor" />
              Deals
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="flex flex-col justify-between gap-3 border-t border-[#E8EDF2] p-4 text-right lg:border-l lg:border-t-0">
          <div className="flex flex-col items-start gap-0.5 lg:items-end">
            <span
              className={`text-[16px] font-bold ${
                hotel.reviewScore >= 8 ? 'text-[#2E9C6C]' : 'text-[#1A2B49]'
              }`}
            >
              {hotel.reviewScore.toFixed(1)} {scoreLabel(hotel.reviewScore)}
            </span>
            {hotel.reviewCount !== undefined && (
              <span className="text-[11px] text-[#8B96A8]">
                {hotel.reviewCount.toLocaleString()} reviews
              </span>
            )}
          </div>
          <div className="flex flex-col items-start gap-0.5 lg:items-end">
            {discount > 0 && hasStrike && (
              <span className="text-[13px] text-[#8B96A8] line-through">
                {formatMoney(hotel.crossedOutRate as number, currency)}{' '}
                <span className="font-semibold text-[#E23F3F] no-underline">
                  -{discount}%
                </span>
              </span>
            )}
            <span className="text-[24px] font-extrabold leading-none text-[#1A2B49]">
              {formatMoney(hotel.dailyRate, currency)}
            </span>
            <span className="mt-1 text-[11px] leading-snug text-[#8B96A8]">
              Per night before taxes and fees
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          onOpen?.(href);
        }}
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
const NEIGHBORHOOD_PREVIEW = 10;
const FACILITIES_PREVIEW = 8;
const AMENITIES_PREVIEW = 8;

/**
 * Agoda's room amenity taxonomy. Room-level assignment
 * comes from the Content Feed API (feed_id 14
 * "Facilities per Roomtype"), so the rows render with a
 * "Soon" marker until that feed is connected.
 */
const ROOM_AMENITIES = [
  'TV',
  'Washing machine',
  'Coffee/tea maker',
  'Air conditioning',
  'Balcony/terrace',
  'Refrigerator',
  'Ironing facilities',
  'Bathtub',
  'Kitchen',
  'Heating',
  'Private pool',
  'Internet access',
  'Pets allowed in room',
];

/**
 * Agoda's bed-type taxonomy. Bedding assignment
 * comes from the Demand Search API
 * (rooms[].normalBedding) / Content Feed, so the
 * rows render with a "Soon" marker until those
 * are connected.
 */
const BED_TYPES = [
  'King',
  'Double',
  'Queen',
  'Single/twin',
  'Bunk bed',
];

/**
 * Distance buckets from the destination centre.
 * "Inside city center" needs Agoda's city-center
 * boundary data, so it stays a "Soon" row; the
 * distance buckets are computed from hotel coordinates.
 */
const DISTANCE_BUCKETS = [
  { key: 'inside', label: 'Inside city center' },
  { key: 'lt2', label: '<2 km to center', test: (d: number) => d < 2 },
  { key: '2-5', label: '2-5 km to center', test: (d: number) => d >= 2 && d < 5 },
  { key: '5-10', label: '5-10 km to center', test: (d: number) => d >= 5 && d < 10 },
  { key: 'gt10', label: '>10 km to center', test: (d: number) => d >= 10 },
];

/**
 * Agoda's property facility taxonomy. Per-hotel facility
 * assignment comes from the Content Feed API (feed_id 9
 * "Facilities per Hotel"), so the rows render with a
 * "Soon" marker until that feed is connected.
 */
const PROPERTY_FACILITIES = [
  'Swimming pool',
  'Internet',
  'Car park',
  'Airport transfer',
  'Gym/fitness',
  'Front desk [24-hour]',
  'Family/child friendly',
  'Non-smoking',
  'Spa/sauna',
  'Restaurants',
  'Smoking area',
  'Pets allowed',
  'Nightclub',
  'Facilities for disabled guests',
  'Business facilities',
  'Golf course [on-site]',
];

const RATING_THRESHOLDS = [
  { threshold: 9, label: 'Exceptional' },
  { threshold: 8, label: 'Excellent' },
  { threshold: 7, label: 'Very good' },
  { threshold: 6, label: 'Good' },
];

interface Props {
  hotels: AgodaHotelResult[];
  destinationName: string;
  currency: string;
  sortBy: string;
  sortOptions: { value: string; label: string }[];
  areas?: AgodaArea[];
  /** Destination centre for the distance filter. */
  center?: { latitude: number; longitude: number };
  /** Hotel name typed in the search strip — pre-fills the text filter. */
  initialQuery?: string;
  /** Resolved outbound links per hotel ID (Agoda detail page or landing URL). */
  hotelLinks?: Record<number, string>;
}

export function StaysResults({ hotels, destinationName, currency, sortBy, sortOptions, areas, center, initialQuery, hotelLinks }: Props) {
  const [couponOpen, setCouponOpen] = useState(true);
  // Hotel whose price popup is open — set when a
  // card is clicked, before the Agoda page opens.
  const [pricePopup, setPricePopup] = useState<{
    hotel: AgodaHotelResult;
    href?: string;
  } | null>(null);
  const [query, setQuery] = useState(initialQuery ?? '');
  const [availableOnly, setAvailableOnly] = useState(true);
  const [selectedRatings, setSelectedRatings] = useState<Set<number>>(new Set());
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [propertyTypeExpanded, setPropertyTypeExpanded] = useState(false);
  const [neighborhoodExpanded, setNeighborhoodExpanded] = useState(false);
  const [facilitiesExpanded, setFacilitiesExpanded] = useState(false);
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<Set<string>>(new Set());
  const [selectedStars, setSelectedStars] = useState<Set<number>>(new Set());
  const [selectedDistances, setSelectedDistances] = useState<Set<string>>(new Set());
  const [breakfastOnly, setBreakfastOnly] = useState(false);

  /**
   * Assigns each result to its nearest area (within AREA_RADIUS_KM)
   * using the coordinates the search API returns, then counts
   * properties per area. Hotels outside every area fall into
   * an "Other" bucket.
   */
  const areaStats = useMemo(() => {
    if (!areas || areas.length === 0) return null;
    const counts = new Map<string, number>();
    const hotelArea = new Map<number, string>();
    for (const h of hotels) {
      if (h.latitude === undefined || h.longitude === undefined) continue;
      let best: string | null = null;
      let bestDistance = AREA_RADIUS_KM;
      for (const area of areas) {
        const distance = haversineKm(h, area);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = area.name;
        }
      }
      const name = best ?? 'Other';
      hotelArea.set(h.hotelId, name);
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    const list = [
      ...areas.map((area) => ({ name: area.name, count: counts.get(area.name) ?? 0 })),
      ...(counts.has('Other')
        ? [{ name: 'Other', count: counts.get('Other') as number }]
        : []),
    ].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    return { list, hotelArea };
  }, [areas, hotels]);

  /**
   * Buckets each result's star rating into Agoda's 1–5 star
   * classes (a 4.5-star hotel counts as a 5-star property)
   * and counts properties per class.
   */
  const starStats = useMemo(() => {
    const counts = new Map<number, number>();
    for (const h of hotels) {
      const star = Math.min(5, Math.max(1, Math.round(h.starRating)));
      counts.set(star, (counts.get(star) ?? 0) + 1);
    }
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts.get(star) ?? 0,
    }));
  }, [hotels]);

  const toggleStar = (star: number) => {
    setSelectedStars((prev) => {
      const next = new Set(prev);
      if (next.has(star)) next.delete(star);
      else next.add(star);
      return next;
    });
  };

  const toggleRating = (threshold: number) => {
    setSelectedRatings((prev) => {
      const next = new Set(prev);
      if (next.has(threshold)) next.delete(threshold);
      else next.add(threshold);
      return next;
    });
  };

  /**
   * Computes each result's straight-line distance to
   * the destination centre and buckets it for the
   * distance filter.
   */
  const distanceStats = useMemo(() => {
    if (!center) return null;
    const bucketOf = new Map<number, string>();
    const counts = new Map<string, number>();
    for (const h of hotels) {
      if (h.latitude === undefined || h.longitude === undefined) continue;
      const distance = haversineKm(h, center);
      const bucket =
        DISTANCE_BUCKETS.find((b) => b.test && b.test(distance))?.key ??
        'gt10';
      bucketOf.set(h.hotelId, bucket);
      counts.set(bucket, (counts.get(bucket) ?? 0) + 1);
    }
    return { bucketOf, counts };
  }, [hotels, center]);

  const toggleDistance = (key: string) => {
    setSelectedDistances((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleArea = (name: string) => {
    setSelectedAreas((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = minPrice === '' ? 0 : Number.parseFloat(minPrice) || 0;
    const max = maxPrice === '' ? Number.POSITIVE_INFINITY : Number.parseFloat(maxPrice) || Number.POSITIVE_INFINITY;
    return hotels.filter((h) => {
      if (q && !h.hotelName.toLowerCase().includes(q)) return false;
      if (
        selectedRatings.size > 0 &&
        ![...selectedRatings].some((t) => h.reviewScore >= t)
      ) {
        return false;
      }
      // The Long Tail Search API only returns bookable properties,
      // so every result satisfies "show only available properties".
      if (!availableOnly) return false;
      if (
        selectedAreas.size > 0 &&
        (!areaStats || !selectedAreas.has(areaStats.hotelArea.get(h.hotelId) ?? ''))
      ) {
        return false;
      }
      if (
        selectedStars.size > 0 &&
        !selectedStars.has(Math.min(5, Math.max(1, Math.round(h.starRating))))
      ) {
        return false;
      }
      if (breakfastOnly && !h.includeBreakfast) return false;
      if (
        selectedDistances.size > 0 &&
        (!distanceStats ||
          !selectedDistances.has(distanceStats.bucketOf.get(h.hotelId) ?? ''))
      ) {
        return false;
      }
      if (h.dailyRate < min || h.dailyRate > max) return false;
      return true;
    });
  }, [hotels, query, selectedRatings, availableOnly, selectedAreas, selectedStars, selectedDistances, breakfastOnly, areaStats, distanceStats, minPrice, maxPrice]);

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
    badge,
  }: {
    checked?: boolean;
    onChange?: (v: boolean) => void;
    label: string;
    count?: number;
    soon?: boolean;
    /** Small inline tag, e.g. Agoda's "New" marker. */
    badge?: string;
  }) => (
    <div
      className={`flex items-center gap-2 py-1 text-[13px] ${
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
      {badge && (
        <span className="rounded bg-[#E8F4FD] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#5392F9]">
          {badge}
        </span>
      )}
      {soon ? (
        <span className="ml-auto rounded bg-[#F7F9FC] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8B96A8]">
          Soon
        </span>
      ) : (
        count !== undefined && (
          <span className="ml-auto text-[12px] text-[#8B96A8]">({count})</span>
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
          <p className="text-[14px] leading-snug text-[#1A2B49]">
            <strong className="text-[15px] font-bold text-[#E23F3F]">
              Looking for instant coupons?
            </strong>
            <br />
            Check out our Coupons &amp; Deals page for today&apos;s discounts
          </p>
          <span className="hidden cursor-pointer whitespace-nowrap rounded bg-white px-3.5 py-1.5 text-[14px] font-semibold text-[#5392F9] transition-colors hover:bg-[#F0F5FF] sm:inline-block">
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
            <span className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 text-[12px] font-bold uppercase tracking-wider text-[#1A2B49]">
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
              className="w-full min-w-0 text-[14px] text-[#1A2B49] placeholder:text-[#8B96A8]"
            />
          </div>

          {/* Budget */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Your budget (per night)
            </p>
            <div className="mb-3 flex gap-2">
              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-[#8B96A8]">
                  Min
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder={String(priceFloor)}
                  className="w-full rounded border border-[#E8EDF2] px-2.5 py-2 text-[14px] font-medium text-[#1A2B49] focus:border-[#5392F9] focus:outline-none"
                />
              </div>
              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-[#8B96A8]">
                  Max
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder={String(priceCeil)}
                  className="w-full rounded border border-[#E8EDF2] px-2.5 py-2 text-[14px] font-medium text-[#1A2B49] focus:border-[#5392F9] focus:outline-none"
                />
              </div>
            </div>
            <p className="text-[12px] text-[#8B96A8]">
              Price range: {currency} {priceFloor} to {currency} {priceCeil}
            </p>
          </div>

          {/* Your filters */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Your filters
            </p>
            <FilterRow soon label="Pay at the hotel" />
          </div>

          {/* Popular filters */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Popular filters for {destinationName}
            </p>
            <FilterRow soon label="Location: 7+ Very good" />
            <FilterRow soon label="Kitchen" />
            <FilterRow soon label="Private pool" />
            <FilterRow soon label="Balcony/terrace" />
            <FilterRow soon label="Pets allowed in room" />
            <FilterRow soon label="Pets allowed" />
            <FilterRow soon label="Smoking area" />
          </div>

          {/* Guest rating */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Guest rating
            </p>
            {RATING_THRESHOLDS.map(({ threshold, label }) => (
              <FilterRow
                key={threshold}
                checked={selectedRatings.has(threshold)}
                onChange={() => toggleRating(threshold)}
                label={`${threshold}+ ${label}`}
                count={hotels.filter((h) => h.reviewScore >= threshold).length}
              />
            ))}
          </div>

          {/* Location rating */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Location rating
            </p>
            {/* Per-hotel location scores come from the
                Content Feed, not the Long Tail response. */}
            <FilterRow soon label="9+ Exceptional" />
            <FilterRow soon label="8+ Excellent" />
            <FilterRow soon label="7+ Very good" />
          </div>

          {/* Star rating */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Star rating
            </p>
            {/* Agoda Luxe is a curated collection that needs
                content-feed data to identify. */}
            <FilterRow soon badge="New" label="Agoda Luxe" />
            {starStats.map((s) => (
              <FilterRow
                key={s.star}
                checked={selectedStars.has(s.star)}
                onChange={() => toggleStar(s.star)}
                label={`${s.star}-Star rating`}
                count={s.count}
              />
            ))}
          </div>

          {/* Availability */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
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
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
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
                className="mt-1.5 text-[13px] font-semibold text-[#5392F9] hover:underline"
              >
                {propertyTypeExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Payment options */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Payment options
            </p>
            {/* Rate-level payment fields (paymentModel, freeCancellation)
                come from the Demand Search API / Content Feed, which are
                not part of the Long Tail Search response. */}
            <FilterRow soon label="Free cancellation" />
            <FilterRow soon label="Pay at the hotel" />
            <FilterRow soon label="Book now, pay later" />
            <FilterRow soon label="Pay now" />
            <FilterRow soon label="Book without credit card" />
          </div>

          {/* Room offers */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Room offers
            </p>
            <FilterRow
              checked={breakfastOnly}
              onChange={setBreakfastOnly}
              label="Breakfast included"
              count={hotels.filter((h) => h.includeBreakfast).length}
            />
            {/* Rate-level offers (meals, check-in/out times,
                deliveries, gym equipment, dietary options) come
                from the Demand Search API (rooms[].benefits) or
                the Content Feed. */}
            <FilterRow soon label="Dinner included" />
            <FilterRow soon label="Lunch included" />
            <FilterRow soon label="Early check-in" />
            <FilterRow soon label="Late check-out" />
            <FilterRow soon label="Outside food delivery allowed" />
            <FilterRow soon label="Delivery from nearby convenience store" />
            <FilterRow soon label="Delivery from family and relatives allowed" />
            <FilterRow soon label="Free shuttle service" />
            <FilterRow soon label="Exercise bike" />
            <FilterRow soon label="Dumbbells" />
            <FilterRow soon label="Halal" />
            <FilterRow soon label="Treadmill" />
            <FilterRow soon label="Car rental" />
            <FilterRow soon label="Airport transfer" />
            <FilterRow soon label="Online yoga/fitness classes" />
            <FilterRow soon label="Vegetarian" />
            <FilterRow soon label="Telemedicine consulting service" />
            <FilterRow soon label="Recreation area access with conditions" />
          </div>

          {/* Rooms and beds */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Rooms and beds
            </p>
            {/* Room-level occupancy (bedrooms, bathrooms,
                beds) comes from the Demand Search API /
                Content Feed, not the Long Tail response. */}
            {['Bedrooms', 'Bathrooms', 'Beds'].map((label) => (
              <div key={label} className="py-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[12px] font-medium text-[#5C6B85]">
                    {label}
                  </span>
                  <span className="rounded bg-[#F7F9FC] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8B96A8]">
                    Soon
                  </span>
                </div>
                <select
                  disabled
                  className="w-full cursor-not-allowed appearance-none rounded border border-[#E8EDF2] bg-[#F7F9FC] px-2.5 py-1.5 text-[13px] text-[#8B96A8]"
                >
                  <option>Any</option>
                </select>
              </div>
            ))}
          </div>

          {/* Room amenities */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Room amenities
            </p>
            {/* Room-level amenities come from the Content
                Feed API (feed_id 14 "Facilities per
                Roomtype"). */}
            {(amenitiesExpanded
              ? ROOM_AMENITIES
              : ROOM_AMENITIES.slice(0, AMENITIES_PREVIEW)
            ).map((amenity) => (
              <FilterRow key={amenity} soon label={amenity} />
            ))}
            {ROOM_AMENITIES.length > AMENITIES_PREVIEW && (
              <button
                type="button"
                onClick={() => setAmenitiesExpanded((v) => !v)}
                className="mt-1.5 text-[13px] font-semibold text-[#5392F9] hover:underline"
              >
                {amenitiesExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Bed type */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Bed type
            </p>
            {/* Bedding comes from the Demand Search API
                (rooms[].normalBedding) / Content Feed. */}
            {BED_TYPES.map((bed) => (
              <FilterRow key={bed} soon label={bed} />
            ))}
          </div>

          {/* Popular with families */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Popular with families
            </p>
            {/* "Kids stay for free" is a rate-level benefit
                from the Demand Search API / Content Feed. */}
            <FilterRow soon label="Kids stay for free" />
          </div>

          {/* Neighborhood */}
          {areaStats && (
            <div className="rounded-lg bg-white">
              <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
                Neighborhood
              </p>
              {(neighborhoodExpanded
                ? areaStats.list
                : areaStats.list.slice(0, NEIGHBORHOOD_PREVIEW)
              ).map((area) => (
                <FilterRow
                  key={area.name}
                  checked={selectedAreas.has(area.name)}
                  onChange={() => toggleArea(area.name)}
                  label={area.name}
                  count={area.count}
                />
              ))}
              {areaStats.list.length > NEIGHBORHOOD_PREVIEW && (
                <button
                  type="button"
                  onClick={() => setNeighborhoodExpanded((v) => !v)}
                  className="mt-1.5 text-[13px] font-semibold text-[#5392F9] hover:underline"
                >
                  {neighborhoodExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )}

          {/* Property facilities */}
          <div className="rounded-lg bg-white">
            <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
              Property facilities
            </p>
            {/* Per-hotel facilities come from the Content Feed
                API (feed_id 9 "Facilities per Hotel"). */}
            {(facilitiesExpanded
              ? PROPERTY_FACILITIES
              : PROPERTY_FACILITIES.slice(0, FACILITIES_PREVIEW)
            ).map((facility) => (
              <FilterRow key={facility} soon label={facility} />
            ))}
            {PROPERTY_FACILITIES.length > FACILITIES_PREVIEW && (
              <button
                type="button"
                onClick={() => setFacilitiesExpanded((v) => !v)}
                className="mt-1.5 text-[13px] font-semibold text-[#5392F9] hover:underline"
              >
                {facilitiesExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Distance to center */}
          {distanceStats && (
            <div className="rounded-lg bg-white">
              <p className="mb-2.5 text-[14px] font-bold text-[#1A2B49]">
                Distance to center
              </p>
              {/* "Inside city center" needs Agoda's city-center
                  boundary data; the distance buckets are
                  computed from hotel coordinates. */}
              <FilterRow soon label="Inside city center" />
              {DISTANCE_BUCKETS.filter((bucket) => bucket.test).map(
                (bucket) => (
                  <FilterRow
                    key={bucket.key}
                    checked={selectedDistances.has(bucket.key)}
                    onChange={() => toggleDistance(bucket.key)}
                    label={bucket.label}
                    count={distanceStats.counts.get(bucket.key) ?? 0}
                  />
                ),
              )}
            </div>
          )}
        </aside>

        {/* Results */}
        <div className="flex min-w-0 flex-col gap-3.5">
          {/* Warning banner */}
          <div className="flex items-center gap-3 rounded-lg border border-[#FFE4C4] bg-[#FFF8F0] px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E23F3F] text-white">
              <Flame className="h-3.5 w-3.5" />
            </div>
            <p className="text-[13px] leading-snug text-[#5C6B85]">
              <strong className="text-[14px] font-bold text-[#E23F3F]">
                Hurry! {Math.max(1, Math.round(hotels.length * 0.46))} of {hotels.length} properties are in high demand!
              </strong>
              <br />
              Rooms in {destinationName} are popular on your selected dates. Reserve now before prices go up.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between py-1">
            <p className="text-[18px] font-bold text-[#1A2B49]">
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} in {destinationName}
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="stays-sort" className="text-[13px] text-[#5C6B85]">
                Sort by:
              </label>
              <select
                id="stays-sort"
                value={sortBy}
                onChange={(e) => changeSort(e.target.value)}
                className="cursor-pointer rounded-md border border-[#E8EDF2] bg-white px-3.5 py-2 text-[13px] font-medium text-[#1A2B49] transition-colors hover:border-[#D1D9E2]"
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
              <p className="text-[16px] font-medium text-[#1A2B49]">No properties match your filters</p>
              <p className="mt-1 text-[14px] text-[#8B96A8]">
                Try widening your budget or clearing filters.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {filtered.map((hotel) => (
                <HotelCard
                  key={hotel.hotelId}
                  hotel={hotel}
                  currency={currency}
                  href={hotelLinks?.[hotel.hotelId] ?? hotel.landingURL}
                  onOpen={(href) => setPricePopup({ hotel, href })}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price popup — shows the clicked hotel's
          price before the Agoda page opens. */}
      {pricePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPricePopup(null)}
        >
          <div
            className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[16px] font-bold text-[#1A2B49]">
              {pricePopup.hotel.hotelName}
            </h3>
            <p className="mt-3 text-[24px] font-extrabold leading-none text-[#1A2B49]">
              {formatMoney(pricePopup.hotel.dailyRate, currency)}
            </p>
            <p className="mt-1 text-[11px] text-[#8B96A8]">
              Per night before taxes and fees
            </p>
            <p className="mt-2 text-[13px] text-[#5C6B85]">
              {pricePopup.hotel.reviewScore.toFixed(1)}{' '}
              {scoreLabel(pricePopup.hotel.reviewScore)}
              {pricePopup.hotel.reviewCount !== undefined &&
                ` · ${pricePopup.hotel.reviewCount.toLocaleString()} reviews`}
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={pricePopup.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                onClick={() => setPricePopup(null)}
                className="flex-1 rounded-md bg-[#5392F9] px-4 py-2.5 text-center text-[14px] font-semibold text-white"
              >
                Continue on Agoda
              </a>
              <button
                type="button"
                onClick={() => setPricePopup(null)}
                className="rounded-md border border-[#E8EDF2] px-4 py-2.5 text-[14px] font-semibold text-[#5C6B85]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
