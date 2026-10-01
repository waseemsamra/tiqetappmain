'use client';

/**
 * Transfer results for the homepage main area.
 *
 * The search inputs live in the Transfers tab of the hero widget; results are
 * rendered here so the result list is not crammed into the hero. The API is
 * not credentialed yet, so until then this shows the tracked Intui landing
 * link rather than a blank panel.
 */

import { useEffect, useState } from 'react';
import { ArrowUpRight, Bus, Car, Loader2 } from 'lucide-react';
import { useT } from '@/components/language-provider';
import type { TransferQuery, TransferSearchResult } from '@/lib/intui-transfers';

export function TransfersResults({
  query,
  onEditSearch,
}: {
  query: TransferQuery;
  onEditSearch: () => void;
}) {
  const t = useT();
  const [state, setState] = useState<{
    status: 'idle' | 'loading' | 'done' | 'error';
    data?: TransferSearchResult;
  }>({ status: 'idle' });

  // The user already submitted this query from the Transfers tab, so run it as
  // soon as the panel mounts rather than making them press Search twice.
  useEffect(() => {
    let cancelled = false;

    async function run() {
      setState({ status: 'loading' });
      try {
        const url = new URLSearchParams({
          airportCode: query.airportCode,
          arrivalDate: query.arrivalDate,
          arrivalTime: query.arrivalTime,
          adults: String(query.adults ?? 1),
        });
        // Forward the return leg and the child/infant counts; the API prices
        // them, so dropping them would under-quote a family transfer.
        if (query.departureDate) url.set('departureDate', query.departureDate);
        if (query.departureTime) url.set('departureTime', query.departureTime);
        if (query.children) url.set('children', String(query.children));
        if (query.infants) url.set('infants', String(query.infants));
        if (query.hotelName && query.hotelAddress) {
          url.set('hotelName', query.hotelName);
          url.set('hotelAddress', query.hotelAddress);
        }
        const response = await fetch(`/api/transfers?${url.toString()}`);
        if (!response.ok) throw new Error(String(response.status));
        const data = (await response.json()) as TransferSearchResult;
        if (!cancelled) setState({ status: 'done', data });
      } catch {
        if (!cancelled) setState({ status: 'error' });
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [query]);

  if (state.status === 'loading' || state.status === 'idle') {
    return (
      <div className="flex items-center justify-center gap-2 rounded-[12px] border border-slate-200 px-6 py-12 text-slate-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-[14px]">{t('search.loading')}</span>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="rounded-[12px] border border-red-200 bg-red-50 px-6 py-10 text-center text-[14px] text-red-700">
        {t('search.transfersSearchFailed')}
      </div>
    );
  }

  const { offers, bookingUrl } = state.data ?? {
    offers: [],
    bookingUrl: '',
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[14px] text-slate-600">
          <span className="font-medium text-slate-900">
            {query.airportCode}
          </span>
          <span className="ml-2 text-slate-500">
            {query.arrivalDate} &middot; {query.arrivalTime}
          </span>
        </p>
        <button
          type="button"
          onClick={onEditSearch}
          className="text-[13px] font-medium text-slate-600 underline underline-offset-2 hover:text-slate-900"
        >
          {t('search.editSearch')}
        </button>
      </div>

      {offers.length > 0 ? (
        <ul className="flex flex-col gap-2.5">
          {offers.map((offer) => (
            <li
              key={offer.productId || offer.routeName}
              className="flex items-center justify-between gap-4 rounded-[10px] border border-slate-200 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-[15px] font-medium text-slate-900">
                  {offer.routeName || offer.productType}
                </p>
                <p className="mt-0.5 text-[13px] text-slate-500">
                  {[
                    offer.productType,
                    offer.transferMinutes
                      ? `${offer.transferMinutes} min`
                      : '',
                    offer.perPerson ? t('search.perPerson') : '',
                    offer.maxPax ? `${offer.maxPax} pax` : '',
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <p className="text-[15px] font-semibold text-slate-900">
                  {offer.totalPrice} {offer.currency}
                </p>
                {offer.bookingUrl && (
                  <a
                    href={offer.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-[13px] font-semibold text-slate-900 underline underline-offset-2"
                  >
                    {t('search.book')}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-[12px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <Bus className="mx-auto h-6 w-6 text-slate-400" />
          <p className="mt-3 text-[14px] text-slate-600">
            {t('search.transfersComingSoon')}
          </p>
        </div>
      )}

      {/* Works today without API credentials, and keeps affiliate attribution. */}
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-900 underline underline-offset-4"
      >
        {t('search.continueOnIntui')}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
