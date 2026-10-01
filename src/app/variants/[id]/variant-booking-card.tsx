import Link from 'next/link';
import { CalendarDays, ChevronDown, RotateCcw } from 'lucide-react';
import { formatPrice } from '@/lib/currency';
import { VariantBookingClient } from './variant-booking-client';

export function VariantBookingCard({
  productId,
  price,
  currency,
  hasDates,
  cancellationSummary,
  importantInfo,
}: {
  productId: string;
  price: number | string;
  currency?: string;
  hasDates: boolean;
  cancellationSummary: string;
  importantInfo: string;
}) {
  return (
    <aside className="rounded-[10px] border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mb-0.5 text-sm font-medium text-slate-500">From</div>
      <div className="mb-3.5 text-[22px] font-extrabold tracking-tight text-slate-900">
        {formatPrice(price, currency)}
      </div>

      <Link
        href={`#booking-${productId}`}
        className="mb-2 flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 transition-colors hover:border-[#00B4D8]"
      >
        <span className="flex items-center gap-2.5">
          <CalendarDays className="h-[13px] w-[13px]" />
          Select a date
        </span>
        <ChevronDown className="h-3 w-3 text-slate-500" />
      </Link>

      <p className="mb-3 text-sm leading-relaxed text-slate-500">
        {hasDates
          ? 'Pick a date to see the exact price and remaining tickets.'
          : 'Dates for this option are released closer to the visit.'}
      </p>

      <div id={`booking-${productId}`}>
        <VariantBookingClient key={productId} productId={productId} />
      </div>

      <div className="mt-4 flex gap-2.5 rounded-lg bg-[#EFF7F5] p-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#4DAF8D]">
          <RotateCcw className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <h4 className="mb-0.5 text-sm font-bold text-slate-900">Cancellation policy</h4>
          <p className="text-sm leading-relaxed text-slate-600">{cancellationSummary}</p>
        </div>
      </div>

      <div className="mt-4">
        <h5 className="mb-1.5 text-sm font-bold text-slate-900">Important information</h5>
        <p className="text-sm leading-relaxed text-slate-600">{importantInfo}</p>
      </div>
    </aside>
  );
}
