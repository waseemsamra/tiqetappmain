'use client';

/**
 * Stays search bar.
 *
 * Agoda-style single row: a destination field
 * that searches cities and property names, a
 * check-in / check-out pill with a divider, a
 * guests dropdown (room / adult / children
 * steppers) and the search button. Everything
 * submits as a GET to /stays.
 */

import { useEffect, useRef, useState } from 'react';
import {
  CalendarDays,
  ChevronDown,
  Minus,
  Plus,
  Search as SearchIcon,
  Users,
} from 'lucide-react';
import { StaysDestinationField } from '@/components/stays-destination-field';
import type { AgodaDestination } from '@/lib/agoda-catalog';
import { cn } from '@/lib/utils';

/** Hover ring shared by every field in the bar. */
const FIELD_RING =
  'transition-shadow hover:shadow-[0_0_0_2px_rgba(83,146,249,0.35)]';

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
        FIELD_RING,
      )}
    >
      <CalendarDays className="h-[18px] w-5 shrink-0 text-[#5C6B85]" />
      <div className="flex min-w-0 flex-col">
        {value ? (
          <span className="truncate text-[15px] font-semibold leading-tight text-[#1A2B49]">
            {formatDateLabel(value)}
          </span>
        ) : (
          <span className="truncate text-[15px] font-semibold leading-tight text-[#1A2B49]">
            {label}
          </span>
        )}
        {value && (
          <span className="text-[12px] leading-tight text-[#8B96A8]">
            {weekdayLabel(value)}
          </span>
        )}
      </div>
      <input
        type="date"
        value={value}
        min={new Date().toISOString().slice(0, 10)}
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
  plus = false,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  plus?: boolean;
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
        plus
          ? 'border-[#5392F9] text-[#5392F9] hover:bg-[#F0F5FF]'
          : 'border-[#E8EDF2] text-[#5C6B85] hover:border-[#5392F9] hover:text-[#5392F9] hover:bg-[#F0F5FF]',
        disabled &&
          'cursor-not-allowed opacity-35 hover:border-[#E8EDF2] hover:bg-transparent hover:text-[#5C6B85]',
      )}
    >
      {children}
    </button>
  );
}

/** Room / adult / children steppers in a dropdown. */
function GuestsDropdown({
  adults,
  children,
  rooms,
  onChange,
}: {
  adults: number;
  children: number;
  rooms: number;
  onChange: (v: { adults: number; children: number; rooms: number }) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const row = (
    label: string,
    sub: string,
    value: number,
    min: number,
    max: number,
    onStep: (next: number) => void,
  ) => (
    <div className="flex items-center justify-between gap-4 border-b border-[#E8EDF2] py-3.5 last:border-b-0">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[15px] font-semibold leading-tight text-[#1A2B49]">
          {label}
        </span>
        {sub && (
          <span className="text-[12px] leading-tight text-[#5C6B85]">
            {sub}
          </span>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <StepperButton
          onClick={() => onStep(Math.max(min, value - 1))}
          disabled={value <= min}
        >
          <Minus className="h-3 w-3" />
        </StepperButton>
        <span className="min-w-5 text-center text-[15px] font-semibold text-[#1A2B49]">
          {value}
        </span>
        <StepperButton
          onClick={() => onStep(Math.min(max, value + 1))}
          plus
        >
          <Plus className="h-3 w-3" />
        </StepperButton>
      </div>
    </div>
  );

  return (
    <div ref={wrapRef} className="relative min-w-0 flex-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          'flex h-full min-w-[210px] w-full cursor-pointer items-center gap-3 rounded-[10px] bg-white px-5 py-3 text-left',
          FIELD_RING,
        )}
      >
        <Users className="h-[18px] w-5 shrink-0 text-[#5C6B85]" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[15px] font-semibold leading-tight text-[#1A2B49]">
            {adults} adult{adults === 1 ? '' : 's'}
          </span>
          <span className="text-[12px] leading-tight text-[#8B96A8]">
            {rooms} room{rooms === 1 ? '' : 's'}
          </span>
        </span>
        <ChevronDown
          className={cn(
            'h-3 w-3 shrink-0 text-[#5C6B85] transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-[340px] max-w-[calc(100vw-2rem)] rounded-xl bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.18),0_4px_12px_rgba(15,23,42,0.08)]">
          {/* Room — the "+" carries the black
              tooltip from the reference bar. */}
          <div className="flex items-center justify-between gap-4 border-b border-[#E8EDF2] py-3.5">
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[15px] font-semibold leading-tight text-[#1A2B49]">
                Room
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <StepperButton
                onClick={() =>
                  onChange({ adults, children, rooms: Math.max(1, rooms - 1) })
                }
                disabled={rooms <= 1}
              >
                <Minus className="h-3 w-3" />
              </StepperButton>
              <span className="min-w-5 text-center text-[15px] font-semibold text-[#1A2B49]">
                {rooms}
              </span>
              <span className="group relative">
                <StepperButton
                  onClick={() =>
                    onChange({
                      adults,
                      children,
                      rooms: Math.min(20, rooms + 1),
                    })
                  }
                  plus
                >
                  <Plus className="h-3 w-3" />
                </StepperButton>
                <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 w-[230px] -translate-y-1/2 rounded-lg bg-[#1E293B] px-4 py-3 text-left text-[12px] font-medium leading-snug text-white opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-opacity group-hover:opacity-100">
                  Search for 1 room to see all multi-bedroom properties that can
                  fit your entire group
                </span>
              </span>
            </div>
          </div>
          {row(
            'Adult',
            'Ages 18 or above',
            adults,
            1,
            36,
            (n) => onChange({ adults: n, children, rooms }),
          )}
          {row(
            'Children',
            'Ages 0-17',
            children,
            0,
            35,
            (n) => onChange({ adults, children: n, rooms }),
          )}
        </div>
      )}
    </div>
  );
}

export function StaysSearchBar({
  destinations,
  defaultDestination,
  defaultCheckIn,
  defaultCheckOut,
  defaultAdults,
  defaultChildren,
}: {
  destinations: AgodaDestination[];
  defaultDestination: string;
  defaultCheckIn: string;
  defaultCheckOut: string;
  defaultAdults: number;
  defaultChildren: number;
}) {
  const [checkIn, setCheckIn] = useState(defaultCheckIn);
  const [checkOut, setCheckOut] = useState(defaultCheckOut);
  const [adults, setAdults] = useState(defaultAdults);
  const [children, setChildren] = useState(defaultChildren);
  const [rooms, setRooms] = useState(1);

  return (
    <form
      method="get"
      action="/stays"
      className="mx-auto flex max-w-[1400px] flex-col gap-2.5 rounded-[10px] bg-white p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.15)] lg:flex-row lg:items-stretch lg:gap-2.5 lg:rounded-md lg:p-0"
    >
      <StaysDestinationField
        destinations={destinations}
        defaultValue={defaultDestination}
      />

      {/* Check-in / check-out pill */}
      <div
        className={cn(
          'flex rounded-[10px] bg-white lg:flex-none',
          FIELD_RING,
        )}
      >
        <DateCell label="Check-in" value={checkIn} onChange={setCheckIn} />
        <div className="my-2.5 w-px shrink-0 bg-[#E8EDF2]" />
        <DateCell label="Check-out" value={checkOut} onChange={setCheckOut} />
      </div>

      <GuestsDropdown
        adults={adults}
        children={children}
        rooms={rooms}
        onChange={({ adults: a, children: c, rooms: r }) => {
          setAdults(a);
          setChildren(c);
          setRooms(r);
        }}
      />

      <input type="hidden" name="checkIn" value={checkIn} />
      <input type="hidden" name="checkOut" value={checkOut} />
      <input type="hidden" name="adults" value={adults} />
      <input type="hidden" name="children" value={children} />
      {/* The Agoda API prices per room, so the room
          count is a UI-level filter only. */}
      <input type="hidden" name="rooms" value={rooms} />

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-[10px] bg-[#5392F9] px-10 py-3 text-[15px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#3772CE] active:scale-[0.98] lg:rounded-none"
      >
        <SearchIcon className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}
