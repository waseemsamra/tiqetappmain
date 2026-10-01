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

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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

// Only Activities and Transfers are live. The rest stay in the strip as
// disabled placeholders so the roadmap is visible without offering dead ends.
const TABS: Array<{ id: TabId; icon: typeof Ticket; enabled: boolean }> = [
  { id: 'activities', icon: Ticket, enabled: true },
  { id: 'stays', icon: Bed, enabled: false },
  { id: 'flights', icon: Plane, enabled: true },
  { id: 'packages', icon: Luggage, enabled: false },
  { id: 'transfers', icon: Car, enabled: true },
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

  const handleQueryChange = (value: string) => {
    setQuery(value);
    search(value);
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
        className="flex items-end justify-center gap-1 overflow-x-auto rounded-t-[13px] border-b border-slate-200 px-6 pb-0 pt-[22px]"
      >
        {TABS.map(({ id, icon: Icon, enabled }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={active}
              aria-disabled={!enabled || undefined}
              disabled={!enabled}
              title={enabled ? undefined : t('search.tabComingSoon')}
              onClick={() => enabled && selectTab(id)}
              className={cn(
                'relative flex min-w-[100px] flex-col items-center gap-2 rounded-t-lg border-2 border-b-0 px-5 pb-4 pt-3 transition-colors',
                !enabled && 'cursor-not-allowed opacity-45',
                active
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-900',
                enabled && !active && 'hover:bg-slate-50',
              )}
            >
              <Icon
                className={cn('h-7 w-7', active ? 'text-primary' : 'text-slate-900')}
                aria-hidden
              />
              <span
                className={cn(
                  'whitespace-nowrap text-sm tracking-[-0.1px]',
                  active ? 'font-bold' : 'font-semibold',
                )}
              >
                {t(`search.tab.${id}`)}
              </span>
              {/* Covers the strip border so the active tab joins the panel. */}
              {active && <span className="absolute -bottom-px left-0 right-0 h-[3px] bg-white" />}
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
          <div className="mb-[18px] flex flex-wrap gap-2">
            {(
              ['all', 'attractions', 'tours', 'cruises', 'museums', 'shows', 'dayTrips'] as const
            ).map((id) => (
              <Chip key={id} active={category === id} onClick={() => setCategory(id)}>
                {t(`search.category.${id}`)}
              </Chip>
            ))}
          </div>

          {/* Stacks on small screens. Wrapping instead would let the sibling
              fields squeeze `flex-[2]` down to zero width, which hid the
              search input entirely on phones. */}
          <div className="flex items-stretch gap-2.5 max-lg:flex-col">
            <div className="relative min-w-0 flex-[2]">
              <Field
                icon={SearchIcon}
                label={t('search.whatLookingFor')}
                value={query}
                placeholder={t('search.whatPlaceholder')}
                onChange={handleQueryChange}
                onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
                inputRef={queryInputRef}
                grow="flex-2"
              />

              {/* Suggestions render under the field, inside the widget. */}
              {isOpen && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-[min(380px,55vh)] overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.12)]">
                  {isLoading && (
                    <div className="p-4 text-center text-sm text-slate-500">{t('search.loading')}</div>
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
                              <Link
                                href={`/excursions/${ex.id}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 p-3 hover:bg-slate-50"
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
                              </Link>
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

            <Field icon={MapPin} label={t('search.where')} value={t('search.anywhere')} grow="flex-1" />
            <Field icon={CalendarDays} label={t('search.when')} value={t('search.anyDate')} grow="flex-1" />
            <Field icon={Users} label={t('search.travelers')} value={t('search.twoAdults')} grow="flex-1" />

            <SearchButton
              label={t('search.submit')}
              onClick={submitSearch}
              className="min-w-[110px] max-lg:basis-full"
            />
          </div>
        </div>
      )}




    </div>
  );
}