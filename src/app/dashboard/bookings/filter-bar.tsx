'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Booking } from '@/types';
import UpcomingTrips from './upcoming-trips';
import PastBookings from './past-bookings';

const TYPE_FILTERS = ['ALL TYPES', 'EXCURSIONS', 'HOTELS', 'FLIGHTS', 'TRANSFERS', 'PACKAGES'];
const SORT_OPTIONS = ['CURRENT', 'PAST', 'UPCOMING', 'CANCELLED'];

type FilterProps = {
  upcomingBookings: Booking[];
  pastBookings: Booking[];
  initialType?: string;
  initialSort?: string;
};

export default function FilterBar({ upcomingBookings, pastBookings, initialType = 'ALL TYPES', initialSort = 'UPCOMING' }: FilterProps) {
  const [activeType, setActiveType] = useState(initialType);
  const [activeSort, setActiveSort] = useState(initialSort);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (activeType !== 'ALL TYPES') params.set('type', activeType);
    else params.delete('type');
    if (activeSort !== 'UPCOMING') params.set('sort', activeSort);
    else params.delete('sort');
    const query = params.toString();
    const newUrl = `${window.location.pathname}${query ? `?${query}` : ''}`;
    window.history.replaceState(null, '', newUrl);
  }, [activeType, activeSort]);

  const filterByType = (bookings: Booking[]) =>
    activeType === 'ALL TYPES' ? bookings : bookings.filter(b => b.booking_type === activeType);

  const filteredUpcoming = filterByType(upcomingBookings);
  const filteredPast = filterByType(pastBookings);

  const sortBookings = (bookings: Booking[]) => {
    return [...bookings].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      if (activeSort === 'UPCOMING') return da - db;
      if (activeSort === 'CANCELLED') return a.status.localeCompare(b.status);
      if (activeSort === 'CURRENT') return b.status === 'confirmed' ? -1 : 1;
      if (activeSort === 'PAST') return db - da;
      return 0;
    });
  };

  const displayUpcoming = sortBookings(filteredUpcoming);
  const displayPast = sortBookings(filteredPast);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {TYPE_FILTERS.map(filter => (
            <label key={filter} className="flex cursor-pointer items-center gap-1.5">
              <input
                type="radio"
                name="type-filter"
                value={filter}
                checked={activeType === filter}
                onChange={() => setActiveType(filter)}
                className="h-3 w-3 accent-primary"
              />
              <span className="text-xs font-medium leading-none">{filter}</span>
            </label>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Sort:</span>
          <Select value={activeSort} onValueChange={setActiveSort}>
            <SelectTrigger className="h-7 w-[110px] border border-border px-2 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(option => (
                <SelectItem key={option} value={option} className="text-xs">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {displayUpcoming.length > 0 && (
        <div className="mt-6">
          <UpcomingTrips bookings={displayUpcoming} />
        </div>
      )}

      {displayPast.length > 0 && (
        <div className="mt-6">
          <PastBookings bookings={displayPast} />
        </div>
      )}

      {!displayUpcoming.length && !displayPast.length && (
        <div className="mt-6 text-center text-muted-foreground">
          No bookings found.
        </div>
      )}
    </div>
  );
}
