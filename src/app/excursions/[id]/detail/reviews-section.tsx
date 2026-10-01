'use client';

import { Star } from 'lucide-react';
import { StarRating } from '@/components/star-rating';
import { useT } from '@/components/language-provider';

export type Review = {
  id: number;
  author: string | null;
  rating: number | null;
  date: string | null;
  source: string | null;
  body: string;
  /** Which ticket the reviewer booked, so the rating is attributable. */
  ticketTitle?: string;
};

export type ProductRating = {
  title: string;
  rating: number;
  reviewsTotal: number;
};

function formatReviewDate(value: string | null): string | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return `${match[1]}-${match[2]}-${match[3]}`;
}

/** Initial shown when Tiqets returns no author name. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < Math.round(value) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </span>
  );
}

/**
 * Real customer reviews.
 *
 * Every field here comes from Tiqets' `/products/{id}/reviews`. Reviews with no
 * body are dropped upstream because an empty card is worse than fewer cards.
 * Nothing is synthesised, and no avatar images are shown because Tiqets does not
 * supply them.
 */
export function ReviewsSection({
  score,
  reviewsTotal,
  reviews,
  productRatings,
}: {
  score: number;
  reviewsTotal: number;
  reviews: Review[];
  productRatings: ProductRating[];
}) {
  const t = useT();

  return (
    <section className="mb-12">
      <h2 className="mb-5 text-base font-bold text-gray-900">{t('detail.ratings')}</h2>

      <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 pb-6">
        <div>
          <div className="text-4xl font-bold leading-none tracking-tight text-gray-900">
            {score.toFixed(1)}
          </div>
          <div className="my-1.5 flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.round(score) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500">
            {t('detail.customerRatings', { count: reviewsTotal.toLocaleString('en-US') })}
          </p>
        </div>

        {productRatings.length > 0 && (
          <div className="min-w-[220px] grow space-y-2">
            {productRatings.slice(0, 4).map((item) => (
              <div key={item.title} className="flex items-center justify-between gap-3 text-xs">
                <span className="line-clamp-1 text-gray-600" title={item.title}>
                  {item.title}
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span className="h-1 w-16 overflow-hidden rounded-full bg-gray-200">
                    <span
                      className="block h-full rounded-full bg-yellow-400"
                      style={{ width: `${(item.rating / 5) * 100}%` }}
                    />
                  </span>
                  <span className="font-semibold text-gray-800">{item.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({item.reviewsTotal.toLocaleString('en-US')})</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stacked in one column, capped at roughly half the row so longer written
          reviews stay readable without stretching across the full section. */}
      {reviews.length > 0 && (
        <ul className="mt-6 flex w-full max-w-2xl flex-col gap-4">
          {reviews.map((review) => (
            <li
              key={`${review.id}`}
              className="flex w-full flex-col rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-gray-600">
                  {review.author ? initials(review.author) : 'T'}
                </span>
                <div className="min-w-0 grow">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {review.author || t('detail.verifiedCustomer')}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Stars value={review.rating || 0} />
                    {formatReviewDate(review.date) && <span>{formatReviewDate(review.date)}</span>}
                  </div>
                </div>
              </div>

              <p className="mb-2 text-sm leading-relaxed text-gray-700">{review.body}</p>

              {review.ticketTitle && (
                <p className="mt-auto truncate border-t border-gray-100 pt-2 text-xs text-gray-500">
                  {review.ticketTitle}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      {reviews.length === 0 && (
        <p className="mt-6 text-sm text-gray-500">{t('detail.noReviewText')}</p>
      )}

      <p className="mt-4 text-xs text-gray-400">
        {t('detail.reviewsSource', { source: 'Tiqets' })}
      </p>
    </section>
  );
}

export { StarRating };