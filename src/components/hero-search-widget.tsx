'use client';

/**
 * Tabbed hero search, matching the main-screen mockup:
 * a white pill tab bar over a light panel, with the
 * search button overlapping the panel's bottom edge.
 *
 * Activities is the live search (ranked suggest
 * endpoint). Stays shows the mockup's stays panel
 * (overnight / day-use pills, property field, date
 * pair, guests) and submits to /stays. Flights is
 * hosted by Travelpayouts on their own subdomain;
 * Transfers routes to its page; Packages is the only
 * presentational shell left, marked "Soon".
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import type { Country, City } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import {
  Ticket,
  Bed,
  Plane,
  Luggage,
  Car,
  Search as SearchIcon,
  MapPin,
  CalendarDays,
  Users,
  ChevronDown,
  Building,
  Globe,
  Plus,
  Minus,
  Sun,
} from 'lucide-react';
import { imageUrlFor } from '@/lib/tiqets-image';
import { useSuggestSearch } from '@/hooks/use-suggest-search';
import { useT } from '@/components/language-provider';
import { cn } from '@/lib/utils';
import { AGODA_DESTINATIONS } from '@/lib/agoda-catalog';
import { StaysDestinationField } from '@/components/stays-destination-field';

type TabId = 'activities' | 'stays' | 'flights' | 'packages' | 'transfers';

// Flight search is owned by Travelpayouts and only renders on their host.
const FLIGHTS_SEARCH_URL = 'https://flights.aafare.com/';

const TABS: Array<{ id: TabId; icon: typeof Ticket; enabled: boolean; comingSoon?: boolean }> = [
  { id: 'activities', icon: Ticket, enabled: true },
  { id: 'stays', icon: Bed, enabled: true },
  { id: 'flights', icon: Plane, enabled: true },
  { id: 'packages', icon: Luggage, enabled: false, comingSoon: true },
  { id: 'transfers', icon: Car, enabled: true },
];

/** Formats an ISO date as "12 Oct 2026". */
function formatDateLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Weekday name for an ISO date, e.g. "Monday". */
function weekdayLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { weekday: 'long' });
}

/** Tomorrow / day-after in ISO form, for the stays panel defaults. */
function isoIn(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * A date cell with the value rendered as text and
 * an invisible native picker covering the cell, so
 * the field keeps the mockup's look and the
 * browser's date picker.
 */
function DateCell({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      className={cn(
        'relative flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-5 py-3',
        'transition-shadow hover:shadow-[0_0_0_2px_rgba(59,110,255,0.15)]',
      )}
    >
      <CalendarDays className="h-[18px] w-5 shrink-0 text-[#5C6B85]" />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-[15px] font-semibold leading-tight text-[#1A2B49]">
          {value ? formatDateLabel(value) : label}
        </span>
        {value && (
          <span className="text-[13px] leading-tight text-[#5C6B85]">
            {weekdayLabel(value)}
          </span>
        )}
      </div>
      <input
        type="date"
        value={value}
        min={isoIn(0)}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
}

/** Round − / + stepper button. */
function StepperButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={children === '+' ? 'Increase' : 'Decrease'}
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors',
        disabled
          ? 'cursor-not-allowed border-[#D1D9E2] text-[#8B96A8]'
          : 'border-[#D1D9E2] text-[#1A2B49] hover:border-[#3B6EFF] hover:text-[#3B6EFF]',
      )}
    >
      {children}
    </button>
  );
}

/**
 * The activities search field: a mockup-style
 * destination box with the live suggestion list.
 */
function ActivitiesQueryField({
  t,
  value,
  onChange,
  onFocus,
  inputRef,
}: {
  t: (key: string, vars?: Record<string, string | number>) => string;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  inputRef: React.Ref<HTMLInputElement>;
}) {
  return (
    <div
      className="flex cursor-text items-center gap-[14px] rounded-[10px] bg-white px-[22px] py-4 transition-shadow hover:shadow-[0_0_0_2px_rgba(59,110,255,0.15)]"
      onClick={() => inputRef.current?.focus()}
    >
      <SearchIcon className="h-[18px] w-5 shrink-0 text-[#5C6B85]" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={t('search.whatPlaceholder')}
        aria-label={t('search.whatLookingFor')}
        className="min-w-0 flex-1 bg-transparent p-0 text-[16px] font-medium text-[#1A2B49] outline-none placeholder:font-normal placeholder:text-[#8B96A8]"
      />
    </div>
  );
}

/** Labelled box for the activities row (where / when / travelers). */
function ActivitiesField({
  icon: Icon,
  label,
  children,
  grow = 'flex-1',
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
  grow?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-w-0 cursor-text items-center gap-3 rounded-[10px] bg-white px-5 py-3 transition-shadow hover:shadow-[0_0_0_2px_rgba(59,110,255,0.15)]',
        grow,
      )}
    >
      <Icon className="h-[18px] w-5 shrink-0 text-[#5C6B85]" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-0.5 text-[11px] font-medium leading-tight tracking-[0.2px] text-[#8B96A8]">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

/**
 * Where field with live city/country autocomplete.
 * Suggestions open from the first character.
 */
function WhereField({
  icon: Icon,
  label,
  placeholder,
  t,
  grow = 'flex-1',
  onChange,
}: {
  icon: typeof MapPin;
  label: string;
  placeholder: string;
  t: (key: string, vars?: Record<string, string | number>) => string;
  grow?: string;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<{
    countries: Country[];
    cities: City[];
  }>({ countries: [], cities: [] });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useDebouncedCallback(async (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 2) {
      setResults({ countries: [], cities: [] });
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/search?query=${encodeURIComponent(trimmed)}&suggest=1`,
      );
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setResults({
        countries: data.countries || [],
        cities: data.cities || [],
      });
    } catch {
      setResults({ countries: [], cities: [] });
    } finally {
      setIsLoading(false);
    }
  }, 250);

  const handleChange = (val: string) => {
    setValue(val);
    onChange?.(val);
    search(val);
    if (val.trim().length >= 2) setIsOpen(true);
  };

  const handleSelect = (name: string) => {
    setValue(name);
    onChange?.(name);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={inputRef}
      className={cn(
        'relative flex min-w-0 cursor-text items-center gap-3 rounded-[10px] bg-white px-5 py-3 transition-shadow hover:shadow-[0_0_0_2px_rgba(59,110,255,0.15)]',
        grow,
      )}
    >
      <Icon className="h-[18px] w-5 shrink-0 text-[#5C6B85]" aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-0.5 text-[11px] font-medium leading-tight tracking-[0.2px] text-[#8B96A8]">
          {label}
        </span>
        <input
          ref={inputRef as React.Ref<HTMLInputElement>}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => value.trim().length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent p-0 text-[15px] font-semibold text-[#1A2B49] outline-none placeholder:font-normal placeholder:text-[#8B96A8]"
          aria-label={label}
          aria-expanded={isOpen}
          aria-controls="where-suggestions"
        />
      </div>
      <ChevronDown className="h-3 w-3 shrink-0 text-[#5C6B85]" aria-hidden />

      {isOpen && (value.trim().length >= 2 || isLoading) && (
        <div
          id="where-suggestions"
          className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[min(300px,45vh)] overflow-y-auto rounded-[10px] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
        >
          {isLoading && (
            <ul className="p-2" role="status" aria-label={t('search.loading')}>
              {[...Array(3)].map((_, i) => (
                <li key={i} className="flex items-center gap-4 p-3">
                  <div
                    className="h-5 w-5 rounded animate-pulse bg-slate-200"
                    aria-hidden
                  />
                  <div className="h-4 w-3/4 animate-pulse bg-slate-200 rounded" />
                </li>
              ))}
              {[...Array(3)].map((_, i) => (
                <li key={`city-${i}`} className="flex items-center gap-4 p-3">
                  <div
                    className="h-5 w-5 rounded animate-pulse bg-slate-200"
                    aria-hidden
                  />
                  <div className="h-4 w-1/2 animate-pulse bg-slate-200 rounded" />
                </li>
              ))}
            </ul>
          )}

          {!isLoading &&
            (results.countries.length > 0 || results.cities.length > 0) && (
              <ul>
                {results.countries.length > 0 && (
                  <>
                    <li className="bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                      {t('search.groupCountries')}
                    </li>
                    {results.countries.map((country) => (
                      <li key={`country-${country.id}`}>
                        <button
                          type="button"
                          onClick={() => handleSelect(country.name)}
                          className="flex w-full items-center gap-4 p-3 text-left hover:bg-slate-50"
                        >
                          <Globe
                            className="h-5 w-5 shrink-0 text-slate-500"
                            aria-hidden
                          />
                          <p className="truncate font-semibold">{country.name}</p>
                        </button>
                      </li>
                    ))}
                  </>
                )}

                {results.cities.length > 0 && (
                  <>
                    <li className="bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                      {t('search.groupCities')}
                    </li>
                    {results.cities.map((city) => (
                      <li key={`city-${city.id || city.name}`}>
                        <button
                          type="button"
                          onClick={() => handleSelect(city.name)}
                          className="flex w-full items-center gap-4 p-3 text-left hover:bg-slate-50"
                        >
                          <Building
                            className="h-5 w-5 shrink-0 text-slate-500"
                            aria-hidden
                          />
                          <p className="truncate font-semibold">{city.name}</p>
                        </button>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            )}

          {!isLoading &&
            value.trim().length >= 2 &&
            results.countries.length === 0 &&
            results.cities.length === 0 && (
              <div className="p-4 text-center text-slate-500">
                {t('search.noResults', { query: value.trim() })}
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export function HeroSearchWidget() {
  const t = useT();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabId>('activities');
  const [whereValue, setWhereValue] = useState('');
  const [whenValue, setWhenValue] = useState('');

  // ---- Activities search state ----
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('all');
  const { results, isLoading, search, reset } = useSuggestSearch();
  const queryInputRef = useRef<HTMLInputElement>(null);

  const hasResults =
    results.countries.length > 0 ||
    results.cities.length > 0 ||
    results.activities.length > 0;

  const showEmptyState = useMemo(
    () => !isLoading && query.trim().length >= 2 && !hasResults,
    [isLoading, query, hasResults],
  );

  const submitSearch = () => {
    const text = query.trim();
    // A category chip alone (no typed text) still searches: the
    // chip's label becomes the query, e.g. the Museums chip
    // searches for "Museums".
    const categoryLabel =
      category !== 'all' ? t(`search.category.${category}`).trim() : '';
    if (!text && !categoryLabel) return;
    setIsOpen(false);
    setPaxOpen(false);
    const params = new URLSearchParams({ query: text || categoryLabel });
    if (whereValue.trim()) params.set('city', whereValue.trim());
    if (whenValue) params.set('date', whenValue);
    params.set('adults', String(actAdults));
    if (actChildren > 0) params.set('children', String(actChildren));
    router.push(`/search?${params.toString()}`);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    search(value, category);
    if (value.trim().length >= 2) setIsOpen(true);
  };

  // ---- Stays panel state ----
  const [stayMode, setStayMode] = useState<'overnight' | 'dayuse'>('overnight');
  const [stayQuery, setStayQuery] = useState('');
  const [checkIn, setCheckIn] = useState(isoIn(1));
  const [checkOut, setCheckOut] = useState(isoIn(2));
  const [adults, setAdults] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [entireHomes, setEntireHomes] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const guestsRef = useRef<HTMLDivElement>(null);

  // ---- Activities travelers state ----
  const [paxOpen, setPaxOpen] = useState(false);
  const [actAdults, setActAdults] = useState(2);
  const [actChildren, setActChildren] = useState(0);
  const paxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) {
        setGuestsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (paxRef.current && !paxRef.current.contains(e.target as Node)) {
        setPaxOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const submitStays = () => {
    const params = new URLSearchParams();
    if (stayQuery.trim()) params.set('destination', stayQuery.trim());
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('adults', String(adults));
    params.set('rooms', String(rooms));
    router.push(`/stays?${params.toString()}`);
  };

  const selectTab = (id: TabId) => {
    setActiveTab(id);
    setIsOpen(false);
    reset();

    if (id === 'activities' || id === 'stays') return;

    // Flight search is hosted by Travelpayouts on their own
    // subdomain, so go there directly.
    if (id === 'flights') {
      window.location.href = FLIGHTS_SEARCH_URL;
      return;
    }

    // Everything else needs the full page width, so it gets
    // its own page with the site header.
    router.push(`/${id}`);
  };

  return (
    <div className="relative z-20 w-full">
      {/* ---------- Tabs bar ---------- */}
      <div
        role="tablist"
        aria-label={t('search.widgetLabel')}
        className="relative z-20 -mb-[22px] mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-0 rounded-[14px] bg-white p-[6px] shadow-[0_10px_30px_rgba(15,23,42,0.12)] max-lg:w-full max-lg:flex-nowrap max-lg:justify-start max-lg:overflow-x-auto max-lg:scrollbar-hide"
      >
        {TABS.map(({ id, icon: Icon, enabled, comingSoon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={active}
              aria-disabled={!enabled || undefined}
              disabled={!enabled}
              title={comingSoon ? t('search.tabComingSoon') : undefined}
              onClick={() => enabled && selectTab(id)}
              className={cn(
                'inline-flex items-center gap-[7px] whitespace-nowrap rounded-[10px] px-[18px] py-3 text-sm transition-colors max-lg:px-[14px]',
                active
                  ? 'bg-[#F0F4FF] font-bold text-[#3B6EFF]'
                  : 'font-bold text-[#5C6B85] hover:text-[#1A2B49]',
              )}
            >
              <Icon
                className={cn('h-[14px] w-[14px]', active ? 'text-[#3B6EFF]' : 'text-[#5C6B85]')}
                aria-hidden
              />
              {t(`search.tab.${id}`)}
              {comingSoon && (
                <span className="ml-1 inline-flex items-center rounded-[10px] bg-[#FFF4E0] px-[7px] py-[2px] text-[10px] font-bold uppercase tracking-[0.3px] text-[#B26B00]">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ---------- Panel ---------- */}
      <div className="relative z-10 w-full rounded-[14px] bg-[#F5F6F8] p-[52px_36px_34px] shadow-[0_18px_48px_rgba(15,23,42,0.16)] max-lg:p-[44px_24px_30px] max-sm:p-[40px_16px_26px]">

        {/* ===== Activities: the live search ===== */}
        {activeTab === 'activities' && (
          <div role="tabpanel">
            {/* Category chips — horizontally scrollable on mobile */}
            <div
              className="mb-5 flex flex-wrap gap-[10px] max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:scrollbar-hide"
              role="tablist"
              aria-label={t('search.categoryLabel')}
            >
              {(
                ['all', 'attractions', 'tours', 'cruises', 'museums', 'shows', 'dayTrips'] as const
              ).map((id) => (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  aria-selected={category === id}
                  onClick={() => {
                    setCategory(id);
                    if (query.trim().length >= 2) search(query, id);
                  }}
                   className={cn(
                     'rounded-[22px] border-[1.5px] px-[18px] py-[9px] text-[13px] font-semibold transition-colors max-lg:shrink-0',
                     category === id
                       ? 'border-[#3B6EFF] text-[#3B6EFF]'
                       : 'border-[#D1D9E2] bg-white text-[#1A2B49] hover:border-[#3B6EFF] hover:text-[#3B6EFF]',
                   )}
                >
                  {t(`search.category.${id}`)}
                </button>
              ))}
            </div>

            {/* Search field with suggestions */}
            <div className="relative mb-3">
              <ActivitiesQueryField
                t={t}
                value={query}
                onChange={handleQueryChange}
                onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
                inputRef={queryInputRef}
              />

              {isOpen && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[min(380px,55vh)] overflow-y-auto rounded-[10px] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.12)]">
                  {isLoading && (
                    <ul className="p-2" role="status" aria-label={t('search.loading')}>
                      {[...Array(3)].map((_, i) => (
                        <li key={i} className="flex items-center gap-4 p-3">
                          <div className="h-5 w-5 rounded animate-pulse bg-slate-200" aria-hidden />
                          <div className="h-4 w-3/4 animate-pulse bg-slate-200 rounded" />
                        </li>
                      ))}
                      {[...Array(3)].map((_, i) => (
                        <li key={`city-${i}`} className="flex items-center gap-4 p-3">
                          <div className="h-5 w-5 rounded animate-pulse bg-slate-200" aria-hidden />
                          <div className="h-4 w-1/2 animate-pulse bg-slate-200 rounded" />
                        </li>
                      ))}
                      {[...Array(4)].map((_, i) => (
                        <li key={`activity-${i}`} className="flex items-center gap-4 p-3">
                          <div className="h-12 w-12 rounded-md animate-pulse bg-slate-200" aria-hidden />
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="h-4 w-3/4 animate-pulse bg-slate-200 rounded" />
                            <div className="h-3 w-1/2 animate-pulse bg-slate-200 rounded" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!isLoading && hasResults && (
                    <ul>
                      {results.countries.length > 0 && (
                        <>
                          <li className="bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                            {t('search.groupCountries')}
                          </li>
                          {results.countries.map((country: Country) => (
                            <li key={`country-${country.id}`}>
                              <Link
                                href={`/country/${encodeURIComponent(country.name)}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 p-3 hover:bg-slate-50"
                              >
                                <Globe className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
                                <p className="truncate font-semibold">{country.name}</p>
                              </Link>
                            </li>
                          ))}
                        </>
                      )}

                      {results.cities.length > 0 && (
                        <>
                          <li className="bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                            {t('search.groupCities')}
                          </li>
                          {results.cities.map((city: City) => (
                            <li key={`city-${city.id || city.name}`}>
                              <Link
                                href={`/city/${encodeURIComponent(city.name)}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 p-3 hover:bg-slate-50"
                              >
                                <Building className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
                                <p className="truncate font-semibold">{city.name}</p>
                              </Link>
                            </li>
                          ))}
                        </>
                      )}

                      {results.activities.length > 0 && (
                        <>
                          <li className="bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
                            {t('search.groupActivities')}
                          </li>
                          {results.activities.map((ex) => (
                            <li key={ex.id}>
                              <button
                                onClick={() => {
                                  router.push(`/excursions/${ex.id}`);
                                  setIsOpen(false);
                                }}
                                className="flex w-full items-center gap-4 p-3 text-left hover:bg-slate-50"
                              >
                                {ex.images?.[0] && (
                                  <Image
                                    src={imageUrlFor(ex.images[0], 'mini')}
                                    alt={ex.name}
                                    width={48}
                                    height={48}
                                    className="h-12 w-12 shrink-0 rounded-md object-cover"
                                    unoptimized
                                  />
                                )}
                                <div className="min-w-0">
                                  <p className="truncate font-semibold">{ex.name}</p>
                                  <p className="truncate text-sm text-slate-500">
                                    {[ex.city, ex.country].filter(Boolean).join(', ')}
                                  </p>
                                </div>
                              </button>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  )}

                  {showEmptyState && (
                    <div className="p-4 text-center text-slate-500">
                      {t('search.noResults', { query: query.trim() })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Where / When / Travelers */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.4fr_1.4fr_1.1fr]">
              <WhereField
                icon={MapPin}
                label={t('search.where')}
                placeholder={t('search.wherePlaceholder')}
                t={t}
                grow="min-w-0"
                onChange={setWhereValue}
              />
              <ActivitiesField icon={CalendarDays} label={t('search.when')} grow="min-w-0">
                <input
                  type="date"
                  value={whenValue}
                  min={isoIn(0)}
                  onChange={(e) => setWhenValue(e.target.value)}
                  aria-label={t('search.when')}
                  className="w-full bg-transparent p-0 text-[15px] font-semibold text-[#1A2B49] outline-none"
                />
              </ActivitiesField>
              <ActivitiesField icon={Users} label={t('search.travelers')} grow="min-w-0">
                <div ref={paxRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setPaxOpen((open) => !open)}
                    aria-expanded={paxOpen}
                    className="flex w-full items-center justify-between gap-2 text-[15px] font-semibold text-[#1A2B49]"
                  >
                    <span className="truncate">
                      {actAdults} {t('search.adults').toLowerCase()}
                      {actChildren > 0 &&
                        `, ${actChildren} ${t('search.children').toLowerCase()}`}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-3 w-3 shrink-0 text-[#5C6B85] transition-transform',
                        paxOpen && 'rotate-180',
                      )}
                      aria-hidden
                    />
                  </button>

                  {paxOpen && (
                    <div className="absolute right-0 top-full z-50 mt-1.5 w-64 rounded-[10px] bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.12)]">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-[#1A2B49]">
                          {t('search.adults')}
                        </span>
                        <div className="flex items-center gap-3">
                          <StepperButton onClick={() => setActAdults((a) => Math.max(1, a - 1))} disabled={actAdults <= 1}>
                            <Minus className="h-3.5 w-3.5" />
                          </StepperButton>
                          <span className="w-6 text-center font-semibold">{actAdults}</span>
                          <StepperButton onClick={() => setActAdults((a) => Math.min(8, a + 1))} disabled={actAdults >= 8}>
                            <Plus className="h-3.5 w-3.5" />
                          </StepperButton>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-[#1A2B49]">
                          {t('search.children')}
                        </span>
                        <div className="flex items-center gap-3">
                          <StepperButton onClick={() => setActChildren((c) => Math.max(0, c - 1))} disabled={actChildren <= 0}>
                            <Minus className="h-3.5 w-3.5" />
                          </StepperButton>
                          <span className="w-6 text-center font-semibold">{actChildren}</span>
                          <StepperButton onClick={() => setActChildren((c) => Math.min(8, c + 1))} disabled={actChildren >= 8}>
                            <Plus className="h-3.5 w-3.5" />
                          </StepperButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ActivitiesField>
            </div>

            {/* Search button — overlaps the panel bottom */}
            <div className="relative z-20 mt-6 flex justify-center">
              <button
                type="button"
                onClick={submitSearch}
                className="-mb-[70px] inline-flex min-w-[420px] items-center justify-center rounded-full bg-[#3B6EFF] px-[140px] py-[8px] text-sm font-bold uppercase tracking-[1.5px] text-white shadow-[0_8px_24px_rgba(59,110,255,0.35)] transition-colors hover:bg-[#2A5FE0] active:scale-[0.98] max-lg:min-w-0 max-lg:px-[60px] max-sm:px-10"
              >
                {t('search.submit')}
              </button>
            </div>
          </div>
        )}

        {/* ===== Stays: the mockup's stays panel ===== */}
        {activeTab === 'stays' && (
          <div role="tabpanel">
            {/* Overnight / day-use pills */}
            <div className="mb-5 flex gap-[10px]">
              {(
                [
                  { id: 'overnight', label: t('search.stayOvernight') },
                  { id: 'dayuse', label: t('search.stayDayUse') },
                ] as const
              ).map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setStayMode(pill.id)}
                  aria-pressed={stayMode === pill.id}
                  className={cn(
                    'rounded-[22px] border-[1.5px] px-[18px] py-[9px] text-[13px] font-semibold transition-colors',
                    stayMode === pill.id
                      ? 'border-[#3B6EFF] bg-white text-[#3B6EFF]'
                      : 'border-[#D1D9E2] bg-white text-[#1A2B49] hover:border-[#3B6EFF] hover:text-[#3B6EFF]',
                  )}
                >
                  {pill.id === 'dayuse' && (
                    <Sun className="mr-1.5 inline h-3 w-3 align-[-1px]" aria-hidden />
                  )}
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Destination / property field */}
            <div className="mb-3 rounded-[10px] bg-white transition-shadow hover:shadow-[0_0_0_2px_rgba(59,110,255,0.15)]">
              <StaysDestinationField
                destinations={AGODA_DESTINATIONS}
                defaultValue=""
              />
            </div>

            {/* Date pair + guests */}
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[1.4fr_1.4fr_1.1fr]">
              <div className="flex cursor-pointer overflow-hidden rounded-[10px] bg-white transition-shadow hover:shadow-[0_0_0_2px_rgba(59,110,255,0.15)] sm:col-span-2">
                <DateCell
                  label={t('search.checkIn')}
                  value={checkIn}
                  onChange={(value) => {
                    setCheckIn(value);
                    if (checkOut && value >= checkOut) {
                      setCheckOut(isoIn(0));
                    }
                  }}
                />
                <div className="w-px shrink-0 bg-[#E4E9F2]" />
                <DateCell
                  label={t('search.checkOut')}
                  value={checkOut}
                  onChange={setCheckOut}
                />
              </div>

              {/* Guests */}
              <div ref={guestsRef} className="relative">
                <button
                  type="button"
                  onClick={() => setGuestsOpen((open) => !open)}
                  aria-expanded={guestsOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[10px] bg-white px-5 py-3 transition-shadow hover:shadow-[0_0_0_2px_rgba(59,110,255,0.15)]"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Users className="h-[18px] w-5 shrink-0 text-[#5C6B85]" />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-[15px] font-semibold leading-tight text-[#1A2B49]">
                        {adults} {t('search.adults').toLowerCase()}
                      </span>
                      <span className="text-[13px] leading-tight text-[#5C6B85]">
                        {rooms} {rooms === 1 ? t('search.room') : t('search.rooms')}
                      </span>
                    </span>
                  </span>
                  <ChevronDown className="h-3 w-3 shrink-0 text-[#5C6B85]" />
                </button>

                {guestsOpen && (
                  <div className="absolute right-0 top-full z-50 mt-1.5 w-64 rounded-[10px] bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.12)]">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-[#1A2B49]">
                        {t('search.adults')}
                      </span>
                      <div className="flex items-center gap-3">
                        <StepperButton onClick={() => setAdults((a) => Math.max(1, a - 1))} disabled={adults <= 1}>
                          <Minus className="h-3.5 w-3.5" />
                        </StepperButton>
                        <span className="w-6 text-center font-semibold">{adults}</span>
                        <StepperButton onClick={() => setAdults((a) => Math.min(8, a + 1))} disabled={adults >= 8}>
                          <Plus className="h-3.5 w-3.5" />
                        </StepperButton>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-[#1A2B49]">
                        {rooms === 1 ? t('search.room') : t('search.rooms')}
                      </span>
                      <div className="flex items-center gap-3">
                        <StepperButton onClick={() => setRooms((r) => Math.max(1, r - 1))} disabled={rooms <= 1}>
                          <Minus className="h-3.5 w-3.5" />
                        </StepperButton>
                        <span className="w-6 text-center font-semibold">{rooms}</span>
                        <StepperButton onClick={() => setRooms((r) => Math.min(4, r + 1))} disabled={rooms >= 4}>
                          <Plus className="h-3.5 w-3.5" />
                        </StepperButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Entire homes checkbox */}
            <label className="flex cursor-pointer items-center gap-3 py-1 text-sm text-[#1A2B49]">
              <input
                type="checkbox"
                checked={entireHomes}
                onChange={(e) => setEntireHomes(e.target.checked)}
                className="h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-[1.5px] border-[#D1D9E2] accent-[#3B6EFF]"
              />
              {t('search.entireHomes')}
            </label>

            {/* Add a flight */}
            <button
              type="button"
              onClick={() => window.location.href = FLIGHTS_SEARCH_URL}
              className="mt-2 inline-flex items-center gap-2 pb-1 text-sm font-semibold text-[#3B6EFF] transition-colors hover:text-[#2A5FE0]"
            >
              <Plus className="h-3 w-3 font-black" aria-hidden />
              {t('search.addFlight')}
            </button>

            {/* Search button — overlaps the panel bottom */}
            <div className="relative z-20 mt-6 flex justify-center">
              <button
                type="button"
                onClick={submitStays}
                className="-mb-[70px] inline-flex min-w-[420px] items-center justify-center rounded-full bg-[#3B6EFF] px-[140px] py-[8px] text-sm font-bold uppercase tracking-[1.5px] text-white shadow-[0_8px_24px_rgba(59,110,255,0.35)] transition-colors hover:bg-[#2A5FE0] active:scale-[0.98] max-lg:min-w-0 max-lg:px-[60px] max-sm:px-10"
              >
                {t('search.submit')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
