import { Check, X, MapPin, Clock } from 'lucide-react';

/**
 * Splits Tiqets' `whats_included` / `whats_excluded` into list items.
 *
 * The field arrives as `* item` lines separated by newlines. Commas are only
 * treated as separators when the whole value is a single unbulleted line:
 * splitting on commas unconditionally would shred an item like "audio guide app
 * with commentary, maps, tips & more" into meaningless fragments.
 */
export function toBulletList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((line) => cleanBullet(line)).filter(Boolean);
  }
  if (typeof value !== 'string' || !value.trim()) return [];

  const text = value.replace(/\r\n/g, '\n').trim();
  const lines = text
    .split('\n')
    .map((line) => cleanBullet(line))
    .filter(Boolean);

  if (lines.length > 1) return lines;
  return [text]
    .flatMap((line) => line.split(/(?<![.;])\s*,\s*/))
    .map((part) => cleanBullet(part))
    .filter(Boolean);
}

function cleanBullet(line: string): string {
  return line.trim().replace(/^\s*[*-]\s*/, '').replace(/^[-•]\s*/, '').trim();
}

export function BulletSection({ heading, items, kind }: { heading: string; items: string[]; kind: 'check' | 'cross' }) {
  if (items.length === 0) return null;
  const Icon = kind === 'check' ? Check : X;
  const color = kind === 'check' ? 'text-[#4DAF8D]' : 'text-[#E53E3E]';
  return (
    <div className="mb-5 last:mb-0">
      <h4 className="mb-3 text-base font-bold text-slate-900">{heading}</h4>
      <ul className="flex flex-col gap-2">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="flex items-start gap-3 text-base leading-relaxed text-slate-600">
            <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${color}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Paragraph({ children }: { children: string }) {
  return (
    <p className="whitespace-pre-line text-base leading-[1.7] text-slate-600">{children}</p>
  );
}

export function MeetingPoint({
  address,
  lat,
  lng,
}: {
  address?: string;
  lat?: number | null;
  lng?: number | null;
}) {
  if (!address && lat == null && lng == null) return null;

  const hasCoords = typeof lat === 'number' && typeof lng === 'number';
  const mapUrl = hasCoords
    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    : address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      : null;

  return (
    <div className="flex items-start gap-3">
      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-900" />
      <div className="min-w-0">
        <h4 className="mb-0.5 text-base font-bold text-slate-900">Starting point</h4>
        {address && mapUrl ? (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-base text-slate-600 underline-offset-2 hover:underline">
            {address}
          </a>
        ) : (
          <p className="text-base text-slate-600">{address}</p>
        )}
      </div>
    </div>
  );
}

export function DurationLine({ duration }: { duration?: string }) {
  if (!duration || duration === 'Not specified') return null;
  return (
    <span className="flex items-start gap-2.5 text-base">
      <Clock className="mt-0.5 h-3.5 w-3.5 w-[16px] shrink-0 text-center text-slate-900" />
      <span>
        <span className="mb-px block text-sm font-normal text-slate-500">Duration</span>
        <span className="text-base font-semibold text-slate-900">{duration}</span>
      </span>
    </span>
  );
}
