'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { formatPrice } from '@/lib/currency';
import { useT } from '@/components/language-provider';

export type AvailableDate = {
  date: string;
  price: number | null;
  currency: string | null;
  availability: number | null;
  timeslots: number;
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function parseDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function toKey(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

/**
 * Month grid over the dates Tiqets actually returned.
 *
 * Only months with at least one available date are reachable, so the calendar
 * never shows a dead month. Days without availability render disabled rather
 * than being hidden, which keeps the grid readable.
 */
function CalendarModal({
  dates,
  selected,
  fromCurrency,
  onSelect,
  onClose,
}: {
  dates: AvailableDate[];
  selected: string | null;
  fromCurrency?: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}) {
  const byDate = useMemo(() => new Map(dates.map((d) => [d.date, d])), [dates]);
  const months = useMemo(() => {
    const keys = [...new Set(dates.map((d) => d.date.slice(0, 7)))].sort();
    return keys.map((key) => {
      const [y, m] = key.split('-').map(Number);
      return { key, year: y, month: m - 1 };
    });
  }, [dates]);

  const [monthIndex, setMonthIndex] = useState(0);

  // Lock body scroll and close on Escape while the modal is open.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const view = months[Math.min(monthIndex, months.length - 1)];
  if (!view) return null;

  // Monday-first offset, matching how the month actually starts.
  const firstWeekday = (new Date(view.year, view.month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const cells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Choose a date"
        onClick={onClose}
      >
        <div
          className="w-full max-w-md rounded-xl bg-white p-4 shadow-xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">
              {MONTHS[view.month]} {view.year}
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close calendar"
              className="rounded p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-0.5 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase text-gray-400">
            {WEEKDAYS_SHORT.map((day, i) => (
              <span key={`${day}-${i}`}>{day}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, index) => {
              if (day === null) return <span key={`pad-${index}`} />;
              const key = toKey(new Date(view.year, view.month, day));
              const entry = byDate.get(key);
              const soldOut = !entry || entry.availability === 0;
              const isSelected = selected === key;

              return (
                <button
                  key={key}
                  type="button"
                  disabled={soldOut}
                  onClick={() => {
                    onSelect(key);
                    onClose();
                  }}
                  aria-pressed={isSelected}
                  className={`flex h-9 flex-col items-center justify-center rounded-lg border text-xs transition ${
                    isSelected
                      ? 'border-gray-900 bg-gray-900 font-bold text-white'
                      : soldOut
                        ? 'cursor-not-allowed border-transparent text-gray-300 line-through'
                        : 'border-gray-200 text-gray-900 hover:border-primary hover:bg-muted'
                  }`}
                >
                  <span>{day}</span>
                  {entry && entry.price != null && !soldOut && (
                    <span className={`text-[10px] ${isSelected ? 'text-white/75' : 'text-gray-500'}`}>
                      {formatPrice(entry.price, entry.currency || fromCurrency)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {months.length > 1 && (
            <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-2">
              <button
                type="button"
                disabled={monthIndex === 0}
                onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
                className="rounded p-1.5 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-[11px] text-gray-500">
                {monthIndex + 1} / {months.length}
              </span>
              <button
                type="button"
                disabled={monthIndex >= months.length - 1}
                onClick={() => setMonthIndex((i) => Math.min(months.length - 1, i + 1))}
                className="rounded p-1.5 text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-30"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
}

/**
 * Date picker backed by the Availability API.
 *
 * The strip spans the full section width and always shows the "more dates"
 * control, which opens a month calendar. Every chip carries the real per-date
 * price Tiqets returned for that day, in the visitor's own currency, plus
 * remaining capacity.
 */
export function DateStrip({
  dates,
  selected,
  onSelect,
  optionCount,
  fromPrice,
  fromCurrency,
}: {
  dates: AvailableDate[];
  selected: string | null;
  onSelect: (date: string) => void;
  optionCount: number;
  fromPrice: number;
  fromCurrency?: string;
}) {
  const t = useT();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const chips = dates.slice(0, 9);
  const mobileChips = dates.slice(0, 4);

  const first = useMemo(() => parseDate(dates[0]?.date || ''), [dates]);
  const monthLabel = first ? `${MONTHS[first.getMonth()]} ${first.getFullYear()}` : 'Upcoming dates';

  if (dates.length === 0) return null;

  return (
    <section className="mb-6 w-full rounded-xl border border-gray-200 bg-white p-5" id="check-availability">
      <h2 className="mb-1 text-base font-bold text-gray-900">{t('detail.checkAvailability')}</h2>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{monthLabel}</p>

      {/* Full-width row: the four day chips on mobile, nine on desktop plus the calendar trigger. */}
      <div className="mb-3.5 flex w-full items-stretch gap-2 border-b border-gray-200 pb-3.5 overflow-x-auto scrollbar-hide pb-3.5">
        {mobileChips.map((day) => {
          const parsed = parseDate(day.date);
          const soldOut = day.availability === 0;
          const isSelected = selected === day.date;

          return (
            <button
              key={day.date}
              type="button"
              disabled={soldOut}
              onClick={() => onSelect(day.date)}
              aria-pressed={isSelected}
              aria-label={`${day.date}${soldOut ? ' sold out' : ''}`}
              className={`min-w-0 flex-1 rounded-lg border px-1 py-2 text-center transition shrink-0 sm:min-w-[0] sm:flex-1 ${
                isSelected
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : soldOut
                    ? 'cursor-not-allowed border-gray-200 bg-muted text-gray-300 line-through'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-primary'
              }`}
            >
              <span className={`mb-1 block text-xs font-semibold uppercase tracking-wider ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                {parsed ? WEEKDAYS[parsed.getDay()] : '--'}
              </span>
              <span className="mb-1 block text-lg font-bold leading-none">
                {parsed ? parsed.getDate() : '--'}
              </span>
              <span className={`block text-xs ${isSelected ? 'text-white/75' : 'text-gray-600'}`}>
                {day.price != null ? formatPrice(day.price, day.currency || fromCurrency) : '--'}
              </span>
            </button>
          );
        })}

        {/* Desktop-only: show 5 more chips (5-9) */}
        <div className="hidden sm:flex sm:items-stretch sm:gap-2">
          {chips.slice(4).map((day) => {
            const parsed = parseDate(day.date);
            const soldOut = day.availability === 0;
            const isSelected = selected === day.date;

            return (
              <button
                key={day.date}
                type="button"
                disabled={soldOut}
                onClick={() => onSelect(day.date)}
                aria-pressed={isSelected}
                aria-label={`${day.date}${soldOut ? ' sold out' : ''}`}
                className={`min-w-0 flex-1 rounded-lg border px-1 py-2 text-center transition ${
                  isSelected
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : soldOut
                      ? 'cursor-not-allowed border-gray-200 bg-muted text-gray-300 line-through'
                      : 'border-gray-200 bg-white text-gray-900 hover:border-primary'
                }`}
              >
                <span className={`mb-1 block text-xs font-semibold uppercase tracking-wider ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                  {parsed ? WEEKDAYS[parsed.getDay()] : '--'}
                </span>
                <span className="mb-1 block text-lg font-bold leading-none">
                  {parsed ? parsed.getDate() : '--'}
                </span>
                <span className={`block text-xs ${isSelected ? 'text-white/75' : 'text-gray-600'}`}>
                  {day.price != null ? formatPrice(day.price, day.currency || fromCurrency) : '--'}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setCalendarOpen(true)}
          className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-gray-300 bg-white px-1 py-2 text-center transition-colors hover:border-primary hover:bg-muted shrink-0 sm:min-w-[0] sm:flex-1"
        >
          <CalendarDays className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold leading-tight text-gray-600">{t('detail.moreDates')}</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-600">
        <span>
          <strong className="font-bold text-gray-900">{t('detail.options', { count: optionCount })}</strong>
          {fromPrice > 0 && (
            <span className="ml-1.5 text-gray-500">
              &bull; {t('detail.from')} {formatPrice(fromPrice, fromCurrency)}
            </span>
          )}
        </span>
        <span className="flex cursor-pointer items-center gap-1.5 font-medium">
          {t('detail.sortBy')} <ChevronDown className="h-2.5 w-2.5" />
        </span>
      </div>

      {calendarOpen && (
        <CalendarModal
          dates={dates}
          selected={selected}
          fromCurrency={fromCurrency}
          onSelect={onSelect}
          onClose={() => setCalendarOpen(false)}
        />
      )}
    </section>
  );
}