'use client';

/**
 * Tabbed hero search.
 *
 * The Activities tab is the live search: it uses the same ranked suggest
 * endpoint as the standalone bar. The other four tabs are presentational
 * shells — their fields are local state and submit nowhere, because no
 * stays/flights/packages/transfers inventory exists to search yet.
 *
 * Only the Activities surface owns translated copy. The other tabs deliberately
 * reuse those same keys rather than adding a second vocabulary per tab, so
 * enabling one tab later needs no translation work.
 */

import { useMemo, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import type { Country, City } from '@/types';
type HomeTabId = 'activities' | 'stays' | 'flights' | 'packages' | 'transfers';
import Image from 'next/image';
import Link from 'next/link';
import {
  Ticket,
  Bed,
  Plane,
  Luggage,
  Car,
  Clock,
  Search as SearchIcon,
  MapPin,
  CalendarDays,
  Users,
  ChevronDown,
  Building,
  Globe,
} from 'lucide-react';
import { imageUrlFor } from '@/lib/tiqets-image';
import { useSuggestSearch } from '@/hooks/use-suggest-search';
import { useT } from '@/components/language-provider';
import { cn } from '@/lib/utils';

type TabId = HomeTabId;


// Flight search is owned by Travelpayouts and only renders on their host.
const FLIGHTS_SEARCH_URL = 'https://flights.aafare.com/';

// Only Activities, Flights, and Transfers are live. Stays/Packages show as
// "Coming soon" badges in the tab strip so the roadmap is visible without
// offering dead ends.
const TABS: Array<{ id: TabId; icon: typeof Ticket; enabled: boolean; comingSoon?: boolean; color: string }> = [
  { id: 'activities', icon: Ticket, enabled: true, color: '#3b82f6' },      // blue
  { id: 'stays', icon: Bed, enabled: false, comingSoon: true, color: '#8b5cf6' }, // purple
  { id: 'flights', icon: Plane, enabled: true, color: '#06b6d4' },         // cyan
  { id: 'packages', icon: Luggage, enabled: false, comingSoon: true, color: '#f59e0b' }, // amber
  { id: 'transfers', icon: Car, enabled: true, color: '#10b981' },         // emerald
];

/**
 * A labelled search field.
 *
 * Clicking anywhere in the box focuses the input, and the label sits above the
 * value rather than as a placeholder so the control keeps its identity once
 * filled.
 */
function Field({
  icon: Icon,
  label,
  value,
  placeholder,
  onChange,
  onFocus,
  inputRef,
  grow = 'flex-1',
  readOnlySelect = false,
}: {
  icon: typeof Ticket;
  label: string;
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  grow?: 'flex-1' | 'flex-1-5' | 'flex-2';
  /** Presentational fields render a value and a chevron instead of an input. */
  readOnlySelect?: boolean;
}) {
  return (
    <div
      className={cn(
        'group flex min-w-0 cursor-text items-center gap-3 rounded-[10px] border-[1.5px] border-slate-200 bg-white px-4 py-3 transition-colors',
        'hover:border-slate-300 focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/10',
        grow,
      )}
      onClick={() => !readOnlySelect && inputRef?.current?.focus()}
    >
      <Icon className="h-[17px] w-5 shrink-0 text-slate-800" aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-0.5 text-[11px] font-medium leading-tight tracking-[0.2px] text-slate-500">
          {label}
        </span>
        {readOnlySelect ? (
          <span className="truncate whitespace-nowrap text-[15px] font-semibold leading-tight tracking-[-0.2px] text-slate-900">
            {value}
          </span>
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={onFocus}
            placeholder={placeholder}
            aria-label={label}
            className="w-full truncate bg-transparent p-0 text-[15px] font-semibold leading-tight tracking-[-0.2px] text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
          />
        )}
      </div>
      {readOnlySelect && (
        <ChevronDown className="h-3 w-3 shrink-0 text-slate-600" aria-hidden />
      )}
    </div>
  );
}

function WhereField({
  icon: Icon,
  label,
  placeholder,
  t,
  grow = 'flex-1',
}: {
  icon: typeof MapPin;
  label: string;
  placeholder: string;
  t: (key: string, vars?: Record<string, string | number>) => string;
  grow?: 'flex-1' | 'flex-1-5' | 'flex-2';
}) {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<{ countries: Country[]; cities: City[] }>({ countries: [], cities: [] });
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
      const res = await fetch(`/api/search?query=${encodeURIComponent(trimmed)}&suggest=1`);
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
    search(val);
    if (val.trim().length >= 2) setIsOpen(true);
  };

  const handleSelect = (type: 'country' | 'city', name: string) => {
    setValue(name);
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
        'group flex min-w-0 cursor-text items-center gap-3 rounded-[10px] border-[1.5px] border-slate-200 bg-white px-4 py-3 transition-colors',
        'hover:border-slate-300 focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/10',
        grow,
      )}
    >
      <Icon className="h-[17px] w-5 shrink-0 text-slate-800" aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-0.5 text-[11px] font-medium leading-tight tracking-[0.2px] text-slate-500">
          {label}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => value.trim().length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent p-0 text-[15px] font-semibold leading-tight tracking-[-0.2px] text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
          aria-label={label}
          aria-expanded={isOpen}
          aria-controls="where-suggestions"
        />
      </div>
      <ChevronDown className="h-3 w-3 shrink-0 text-slate-600" aria-hidden />

      {isOpen && (value.trim().length >= 2 || isLoading) && (
        <div
          id="where-suggestions"
          className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[min(300px,45vh)] overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.12)]"
        >
          {isLoading && (
            <ul className="p-2" role="status" aria-label={t('search.loading')}>
              {[...Array(3)].map((_, i) => (
                <li key={i} className="flex items-center gap-4 p-3">
                  <div className="h-5 w-5 rounded animate-pulse bg-slate-200" aria-hidden />
                  <div className="h-4 w-3/4 animate-pulse bg-slate-200 rounded" aria-hidden />
                </li>
              ))}
              {[...Array(3)].map((_, i) => (
                <li key={`city-${i}`} className="flex items-center gap-4 p-3">
                  <div className="h-5 w-5 rounded animate-pulse bg-slate-200" aria-hidden />
                  <div className="h-4 w-1/2 animate-pulse bg-slate-200 rounded" aria-hidden />
                </li>
              ))}
            </ul>
          )}
          {!isLoading && (results.countries.length > 0 || results.cities.length > 0) && (
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
                        onClick={() => handleSelect('country', country.name)}
                        className="flex w-full items-center gap-4 p-3 text-left hover:bg-slate-50"
                      >
                        <Globe className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
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
                        onClick={() => handleSelect('city', city.name)}
                        className="flex w-full items-center gap-4 p-3 text-left hover:bg-slate-50"
                      >
                        <Building className="h-5 w-5 shrink-0 text-slate-500" aria-hidden />
                        <p className="truncate font-semibold">{city.name}</p>
                      </button>
                    </li>
                  ))}
                </>
              )}
            </ul>
          )}
          {!isLoading && !isLoading && results.countries.length === 0 && results.cities.length === 0 && value.trim().length >= 2 && (
            <div className="p-4 text-center text-slate-500">
              {t('search.noResults', { query: value.trim() })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


function DateField({
  icon: Icon,
  label,
  grow = 'flex-1',
}: {
  icon: typeof CalendarDays;
  label: string;
  grow?: 'flex-1' | 'flex-1-5' | 'flex-2';
}) {
  const [value, setValue] = useState('');
  const today = new Date().toISOString().split('T')[0];

  return (
    <div
      className={cn(
        'group flex min-w-0 cursor-text items-center gap-3 rounded-[10px] border-[1.5px] border-slate-200 bg-white px-4 py-3 transition-colors',
        'hover:border-slate-300 focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/10',
        grow,
      )}
    >
      <Icon className="h-[17px] w-5 shrink-0 text-slate-800" aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-0.5 text-[11px] font-medium leading-tight tracking-[0.2px] text-slate-500">
          {label}
        </span>
        <input
          type="date"
          min={today}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent p-0 text-[15px] font-semibold leading-tight tracking-[-0.2px] text-slate-900 outline-none"
          aria-label={label}
        />
      </div>
    </div>
  );
}


function TravelersField({
  icon: Icon,
  label,
  adultsLabel,
  childrenLabel,
  infantsLabel,
  infantNote,
  grow = 'flex-1',
}: {
  icon: typeof Users;
  label: string;
  adultsLabel: string;
  childrenLabel: string;
  infantsLabel: string;
  infantNote: string;
  grow?: 'flex-1' | 'flex-1-5' | 'flex-2';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [counts, setCounts] = useState({ adults: 2, children: 0, infants: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const total = counts.adults + counts.children + counts.infants;
  const displayValue = `${counts.adults} adult${counts.adults !== 1 ? 's' : ''}${counts.children > 0 ? `, ${counts.children} child${counts.children !== 1 ? 'ren' : ''}` : ''}${counts.infants > 0 ? `, ${counts.infants} infant${counts.infants !== 1 ? 's' : ''}` : ''}`;

  const increment = (type: 'adults' | 'children' | 'infants') => {
    const max = type === 'adults' ? 8 : type === 'children' ? 8 : counts.adults;
    if (counts[type] < max) {
      setCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  const decrement = (type: 'adults' | 'children' | 'infants') => {
    const min = type === 'adults' ? 1 : 0;
    if (counts[type] > min) {
      setCounts(prev => ({ ...prev, [type]: prev[type] - 1 }));
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'group flex min-w-0 cursor-text items-center gap-3 rounded-[10px] border-[1.5px] border-slate-200 bg-white px-4 py-3 transition-colors',
        'hover:border-slate-300 focus-within:border-primary focus-within:ring-[3px] focus-within:ring-primary/10',
        grow,
      )}
    >
      <Icon className="h-[17px] w-5 shrink-0 text-slate-800" aria-hidden />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="mb-0.5 text-[11px] font-medium leading-tight tracking-[0.2px] text-slate-500">
          {label}
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left bg-transparent p-0 text-[15px] font-semibold leading-tight tracking-[-0.2px] text-slate-900 outline-none"
          aria-label={label}
          aria-expanded={isOpen}
          aria-controls="travelers-dropdown"
        >
          {displayValue}
        </button>
      </div>
      <ChevronDown className="h-3 w-3 shrink-0 text-slate-600" aria-hidden />

      {isOpen && (
        <div
          id="travelers-dropdown"
          className="absolute left-0 right-0 top-full z-50 mt-1.5 rounded-lg border border-slate-200 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.12)] p-4 min-w-[220px]"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-900">{t('search.adults')}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => decrement('adults')} disabled={counts.adults <= 1} className="h-8 w-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">−</button>
                <span className="w-10 text-center font-semibold">{counts.adults}</span>
                <button type="button" onClick={() => increment('adults')} disabled={counts.adults >= 8} className="h-8 w-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">+</button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-900">{t('search.children')}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => decrement('children')} disabled={counts.children <= 0} className="h-8 w-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">−</button>
                <span className="w-10 text-center font-semibold">{counts.children}</span>
                <button type="button" onClick={() => increment('children')} disabled={counts.children >= 8} className="h-8 w-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">+</button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-900">{t('search.infants')}</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => decrement('infants')} disabled={counts.infants <= 0} className="h-8 w-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">−</button>
                <span className="w-10 text-center font-semibold">{counts.infants}</span>
                <button type="button" onClick={() => increment('infants')} disabled={counts.infants >= counts.adults} className="h-8 w-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">+</button>
              </div>
            </div>
            <p className="text-xs text-slate-500">{t('search.infantNote')}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function SearchButton({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-[10px] bg-primary px-7 text-[15px] font-bold tracking-[-0.2px] text-white transition-colors hover:bg-primary/90 active:scale-[0.98]',
        className,
      )}
    >
      <SearchIcon className="h-[13px] w-[13px]" aria-hidden />
      {label}
    </button>
  );
}

const Chip = ({
  active,
  onClick,
  children,
  icon: Icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: typeof Ticket;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      'flex items-center gap-[7px] whitespace-nowrap rounded-full border-[1.5px] px-3.5 py-[7px] text-[13px] transition-colors',
      active
        ? 'border-primary bg-primary font-semibold text-white'
        : 'border-slate-200 bg-white font-medium text-slate-600 hover:border-primary hover:text-primary',
    )}
  >
    {Icon && <Icon className="h-3 w-3" aria-hidden />}
    {children}
  </button>
);

export function HeroSearchWidget() {
  const t = useT();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabId>('activities');
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('all');


  const { results, isLoading, search, reset } = useSuggestSearch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const queryInputRef = useRef<HTMLInputElement>(null);

  const hasResults =
    results.countries.length > 0 || results.cities.length > 0 || results.activities.length > 0;

  const showEmptyState = useMemo(
    () => !isLoading && query.trim().length >= 2 && !hasResults,
    [isLoading, query, hasResults],
  );

  const submitSearch = () => {
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/search?query=${encodeURIComponent(query.trim())}`);
  };



  const selectTab = (id: TabId) => {
    setIsOpen(false);
    reset();

    // Activities searches inline here.
    if (id === 'activities') return;

    // Flight search is hosted by Travelpayouts on their own subdomain, so go
    // there directly instead of bouncing through our /flights redirect.
    if (id === 'flights') {
      window.location.href = FLIGHTS_SEARCH_URL;
      return;
    }

    // Everything else needs the full page width, so it gets its own page with
    // the site header.
    router.push(`/${id}`);
  };

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    search(value, category);
    if (value.trim().length >= 2) setIsOpen(true);
  };

  // The shell tabs have no search of their own yet, so their Search button
  // falls back to the Activities results rather than doing nothing.
  return (
    <div
      ref={wrapperRef}
      // `relative z-20` lifts the widget and its dropdown above the sections
      // that follow it in the page. No `overflow-hidden`: it would clip the
      // suggestion list, which deliberately extends past the widget's bounds.
      className="relative z-20 w-full max-w-[1200px] rounded-[14px] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.12)]"
    >
      {/* ---------- Tab strip ---------- */}
      <div
        role="tablist"
        aria-label={t('search.widgetLabel')}
        className="flex gap-1 overflow-x-auto rounded-t-[13px] border-b border-slate-200 px-6 pb-0"
      >
        {TABS.map(({ id, icon: Icon, enabled, comingSoon, color }) => {
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
                'relative flex min-w-[100px] h-[72px] flex-col items-center justify-end gap-2 rounded-t-lg border-b-2 transition-colors',
                comingSoon && 'relative',
                !enabled && !comingSoon && 'cursor-not-allowed opacity-45',
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-900 hover:border-slate-300',
                enabled && !active && !comingSoon && 'hover:bg-slate-50',
                comingSoon && 'hover:bg-slate-50',
              )}
            >
              <Icon
                className={cn('h-7 w-7', comingSoon ? 'opacity-50' : '')}
                aria-hidden
                style={{ color: active ? 'hsl(var(--primary))' : color }}
              />
              <span
                className={cn(
                  'whitespace-nowrap text-sm tracking-[-0.1px] pb-3',
                  active ? 'font-bold' : 'font-semibold',
                )}
              >
                {t(`search.tab.${id}`)}
              </span>
              {comingSoon && (
                <span className="absolute top-2 right-2 text-[9px] font-bold text-white bg-amber-500 px-1.5 rounded-full">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ---------- Activities: the live search ---------- */}
      {activeTab === 'activities' && (
        <div
          role="tabpanel"
          className="animate-[fadeIn_.3s_cubic-bezier(.16,1,.3,1)] rounded-b-[13px] px-8 pb-7 pt-6"
        >
          {/* Category chips - horizontal scroll */}
          <div
            className="mb-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
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
                  'flex-shrink-0 whitespace-nowrap rounded-full border-[1.5px] px-4 py-2 text-sm transition-colors',
                  category === id
                    ? 'border-primary bg-primary font-semibold text-white'
                    : 'border-slate-200 bg-white font-medium text-slate-600 hover:border-primary hover:text-primary',
                )}
              >
                {t(`search.category.${id}`)}
              </button>
            ))}
          </div>

          {/* Search form row - aligned with chips above */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <div className="relative min-w-0 flex-1">
              <Field
                icon={SearchIcon}
                label={t('search.whatLookingFor')}
                value={query}
                placeholder={t('search.whatPlaceholder')}
                onChange={handleQueryChange}
                onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
                inputRef={queryInputRef}
                grow="flex-1"
              />

              {/* Suggestions render under the field, inside the widget. */}
              {isOpen && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[min(380px,55vh)] overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.12)]">
{isLoading && (
            <ul className="p-2" role="status" aria-label={t('search.loading')}>
              {[...Array(3)].map((_, i) => (
                <li key={i} className="flex items-center gap-4 p-3">
                  <div className="h-5 w-5 rounded animate-pulse bg-slate-200" aria-hidden />
                  <div className="h-4 w-3/4 animate-pulse bg-slate-200 rounded" aria-hidden />
                </li>
              ))}
              {[...Array(3)].map((_, i) => (
                <li key={`city-${i}`} className="flex items-center gap-4 p-3">
                  <div className="h-5 w-5 rounded animate-pulse bg-slate-200" aria-hidden />
                  <div className="h-4 w-1/2 animate-pulse bg-slate-200 rounded" aria-hidden />
                </li>
              ))}
              {[...Array(4)].map((_, i) => (
                <li key={`activity-${i}`} className="flex items-center gap-4 p-3">
                  <div className="h-12 w-12 rounded-md animate-pulse bg-slate-200" aria-hidden />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="h-4 w-3/4 animate-pulse bg-slate-200 rounded" aria-hidden />
                    <div className="h-3 w-1/2 animate-pulse bg-slate-200 rounded" aria-hidden />
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
                          {results.countries.map((country) => (
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
                          {results.cities.map((city) => (
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
                                  handleNavClick(`/excursions/${ex.id}`);
                                  setIsOpen(false);
                                }}
                                className="flex w-full items-center gap-4 p-3 hover:bg-slate-50 text-left"
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

            {/* Where, When, Travelers, Search - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <WhereField
                icon={MapPin}
                label={t('search.where')}
                placeholder={t('search.wherePlaceholder')}
                t={t}
                grow="flex-1"
              />
              <DateField
                icon={CalendarDays}
                label={t('search.when')}
                grow="flex-1"
              />
              <TravelersField
                icon={Users}
                label={t('search.travelers')}
                adultsLabel={t('search.adults')}
                childrenLabel={t('search.children')}
                infantsLabel={t('search.infants')}
                infantNote={t('search.infantNote')}
                grow="flex-1"
              />

              <SearchButton
                label={t('search.submit')}
                onClick={submitSearch}
                className="min-h-[46px]"
              />
            </div>
          </div>
        </div>
      )}




    </div>
  );
}