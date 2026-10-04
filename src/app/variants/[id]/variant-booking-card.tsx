'use client';

import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Only one booking client may be in the DOM at
          a time: the Tiqets engine initializes every
          div[data-tiqets-widget] it finds, so rendering
          both viewports' clients stacks two checkout
          modals that each need closing. */}
      {!isMobile && (
        <aside className="hidden md:block rounded-[10px] border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sticky top-24">
          <div className="mb-0.5 text-sm font-medium text-slate-500">From</div>
          <div className="mb-3.5 text-[22px] font-extrabold tracking-tight text-slate-900">
            {formatPrice(price, currency)}
          </div>

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
      )}

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] p-4 safe-area-inset-bottom">
          <div className="mx-auto max-w-[1280px] flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500">From</span>
              <span className="text-xl font-extrabold text-slate-900">
                {formatPrice(price, currency)}
              </span>
            </div>
            <VariantBookingClient key={`${productId}-mobile`} productId={productId} />
          </div>
        </div>
      )}
    </>
  );
}