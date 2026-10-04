'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MapPin, Search as SearchIcon } from 'lucide-react';
import type { AgodaDestination } from '@/lib/agoda-catalog';

/**
 * Searchable destination field.
 *
 * One field searches destinations, cities and
 * property names: the submitted text resolves to
 * a destination when it matches one, to a hotel
 * when it is purely numeric, and otherwise acts
 * as a property-name filter over the merged
 * search of every destination.
 */
export function StaysDestinationField({
  destinations,
  defaultValue,
  onChange,
}: {
  destinations: AgodaDestination[];
  defaultValue: string;
  /** Notifies the parent of every value change so the
      search submit can forward what was entered. */
  onChange?: (value: string) => void;
}) {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const update = (value: string) => {
    setQuery(value);
    onChange?.(value);
  };

  /**
   * The field ships pre-filled with the selected
   * destination's "Name, Country" display string.
   * That idle state lists every destination, so the
   * dropdown is usable straight away instead of
   * opening on "No matching destination".
   */
  const idle = destinations.some(
    (d) =>
      `${d.name}, ${d.country}`.toLowerCase() === query.trim().toLowerCase(),
  );

  const matches = destinations.filter((d) => {
    if (idle || !query.trim()) return true;
    const q = query.trim().toLowerCase();
    const name = d.name.toLowerCase();
    const country = d.country.toLowerCase();
    return (
      name.includes(q) ||
      country.includes(q) ||
      d.slug.toLowerCase().includes(q) ||
      // Match in both directions: the field ships
      // pre-filled with the "Name, Country" display
      // string, which must still match its own
      // destination.
      q.includes(name) ||
      q.includes(country)
    );
  });

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const pick = (d: AgodaDestination) => {
    update(`${d.name}, ${d.country}`);
    setOpen(false);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && matches.length > 0) {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => (h + 1) % matches.length);
    } else if (e.key === 'ArrowUp' && matches.length > 0) {
      e.preventDefault();
      setHighlight((h) => (h - 1 + matches.length) % matches.length);
    } else if (
      e.key === 'Enter' &&
      open &&
      matches.length > 0 &&
      // An idle, pre-filled field submits the form
      // instead of re-picking the current destination.
      !idle
    ) {
      e.preventDefault();
      pick(matches[Math.min(highlight, matches.length - 1)]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex min-w-0 flex-1 items-center gap-3 rounded-[10px] bg-white px-5 py-3.5 transition-shadow hover:shadow-[0_0_0_2px_rgba(83,146,249,0.35)]"
    >
      <SearchIcon className="h-[18px] w-5 shrink-0 text-[#5C6B85]" />
      <input
        ref={inputRef}
        name="destination"
        type="text"
        value={query}
        onChange={(e) => {
          update(e.target.value);
          setHighlight(0);
          setOpen(true);
        }}
        onFocus={(e) => {
          setOpen(true);
          setHighlight(0);
          // Select the pre-filled text so typing replaces it.
          e.target.select();
        }}
        onKeyDown={onKeyDown}
        placeholder="Enter a destination or property"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-label="Destination"
        autoComplete="off"
        className="w-full min-w-0 text-[16px] font-semibold text-[#1A2B49] outline-none placeholder:font-normal placeholder:text-[#94A3B8]"
      />
      <ChevronDown className="h-3 w-3 shrink-0 text-[#5C6B85]" />
      {open && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-3 max-h-[280px] overflow-y-auto rounded-xl bg-white py-1.5 shadow-[0_12px_32px_rgba(15,23,42,0.18),0_4px_12px_rgba(15,23,42,0.08)]">
          {matches.length === 0 ? (
            <li className="px-5 py-3 text-[14px] text-[#8B96A8]">
              No matching destination — Search filters properties instead
            </li>
          ) : (
            matches.map((d, i) => (
              <li key={d.slug}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(d);
                  }}
                  onMouseEnter={() => setHighlight(i)}
                  className={`flex w-full items-center gap-3 px-5 py-3 text-left text-[14px] ${
                    i === highlight ? 'bg-[#F0F5FF]' : ''
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#E23F3F]" />
                  <span className="font-semibold text-[#1A2B49]">{d.name}</span>
                  <span className="text-[#8B96A8]">{d.country}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
