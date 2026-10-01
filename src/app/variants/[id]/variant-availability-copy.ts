import type { TiqetsAvailability } from '@/lib/tiqets-api';

/**
 * A short, honest availability line for the booking card.
 *
 * Tiqets has no opening-hours endpoint for products. The Availability feed is
 * the only verified source of bookable timeslots, so this describes what is
 * actually bookable rather than inventing a schedule.
 */
export function availabilitySummary(availability: TiqetsAvailability | null): string | null {
  if (!availability || availability.dates.length === 0) return null;

  const days = availability.dates.filter((day) => (day.availability ?? 0) > 0);
  if (days.length === 0) return 'Currently sold out for the published dates.';

  const today = new Date().toISOString().slice(0, 10);
  const first = days[0];
  const label = first.date === today ? 'today' : first.date;
  return `Available from ${label} across ${days.length} published date${days.length === 1 ? '' : 's'}.`;
}

/**
 * "Open today: 09:30 - 19:30" from the availability feed.
 *
 * Tiqets exposes no opening-hours endpoint for products. The bookable timeslot
 * window on the nearest date with availability is the closest verified
 * equivalent, so this reports that rather than inventing a schedule. The end
 * time is the last slot's start plus the product duration, matching how Tiqets
 * presents its own closing time.
 */
export function openingHoursLabel(
  availability: TiqetsAvailability | null,
  durationMinutes = 0,
): string | null {
  if (!availability || availability.dates.length === 0) return null;

  const bookable = availability.dates.filter(
    (day) => (day.availability ?? 0) > 0 && day.firstTime && day.lastTime,
  );
  if (bookable.length === 0) return null;

  // Use the most frequently published window rather than today's remaining
  // slots or the widest day: once a morning slot sells out, today's feed starts
  // later, which would understate the real opening time, while outlier days would
  // overstate the closing time. The mode is the schedule Tiqets itself shows.
  const openTime = mode(bookable.map((day) => day.firstTime));
  const closeStart = mode(bookable.map((day) => day.lastTime));

  const closeTime = addMinutes(closeStart, durationMinutes);
  const window = closeTime ? `${openTime} - ${closeTime}` : `${openTime} - ${closeStart}`;

  const today = new Date().toISOString().slice(0, 10);
  const isOpenToday = bookable.some((day) => day.date === today);
  return isOpenToday ? `Open today: ${window}` : `Open ${bookable[0].date}: ${window}`;
}

/** Most common value in a list; ties break toward the earlier time. */
function mode(values: string[]): string {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  let best = values[0];
  let bestCount = 0;
  for (const [value, count] of counts) {
    if (count > bestCount || (count === bestCount && value < best)) {
      best = value;
      bestCount = count;
    }
  }
  return best;
}

/** Adds minutes to an `HH:MM` string, returning `HH:MM` or '' when unparseable. */
function addMinutes(time: string, minutes: number): string {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) return '';
  const total = Number(match[1]) * 60 + Number(match[2]) + (minutes || 0);
  const hours = Math.floor(total / 60) % 24;
  const rest = total % 60;
  return `${String(hours).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}

/**
 * Formats Tiqets' `duration` ("01:15") as a readable span ("1h 15mins").
 * Returns null for missing or unusable values.
 */
export function formatDuration(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim());
  if (!match) return value.trim();

  const totalMinutes = Number(match[1]) * 60 + Number(match[2]);
  if (totalMinutes <= 0) return null;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const mins = `${minutes}min${minutes === 1 ? '' : 's'}`;
  return hours === 0 ? mins : `${hours}h ${mins}`;
}

/**
 * Cancellation summary built from the product's `cancellation` block.
 *
 * `before_timeslot` with a `window` in hours means a full refund up to that many
 * hours ahead. Any other policy value is reported verbatim rather than guessed at.
 */
export function cancellationSummary(cancellation: any): string {
  const policy = cancellation?.policy;
  const window = typeof cancellation?.window === 'number' ? cancellation.window : null;

  if (policy === 'before_timeslot' && window != null) {
    if (window >= 24) {
      const days = Math.round(window / 24);
      return `Cancel for free until ${days} day${days === 1 ? '' : 's'} before your visit date and get a full refund.`;
    }
    return `Cancel for free until ${window} hours before your visit date and get a full refund.`;
  }
  if (policy === 'no_cancellation') {
    return 'This ticket cannot be cancelled or refunded.';
  }
  if (typeof policy === 'string' && policy.trim()) {
    return policy.replace(/_/g, ' ').replace(/^\w/, (char) => char.toUpperCase()) + '.';
  }
  return 'See the supplier website for the cancellation policy.';
}

/**
 * Formats `advance_arrival_time`, which Tiqets sends as an `H:MM:SS` duration
 * (e.g. `0:15:00` for fifteen minutes) rather than a clock time.
 */
export function formatAdvanceArrival(value: string | null | undefined): string | null {
  if (!value || typeof value !== 'string') return null;
  const parts = value.split(':').map(Number);
  if (parts.some((part) => Number.isNaN(part))) return null;

  const [hours, minutes] = parts;
  const totalMinutes = hours * 60 + minutes;
  if (!Number.isFinite(totalMinutes) || totalMinutes <= 0) return null;

  if (totalMinutes < 60) return `${totalMinutes} minutes`;
  const hoursPart = Math.floor(totalMinutes / 60);
  const minutesPart = totalMinutes % 60;
  return minutesPart === 0
    ? `${hoursPart} hour${hoursPart === 1 ? '' : 's'}`
    : `${hoursPart}h ${minutesPart}m`;
}
