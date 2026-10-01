import { Star, ThumbsUp, Languages } from 'lucide-react';
import type { VariantReview } from './variant-review-data';
import { formatReviewDate, ratingBreakdown } from './variant-review-data';

function Stars({ value, className = '' }: { value: number; className?: string }) {
  const rounded = Math.round(value);
  return (
    <span className={`flex items-center gap-0.5 text-[#F6B93B] ${className}`} aria-label={`${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${star <= rounded ? 'fill-current' : 'text-slate-300'}`}
        />
      ))}
    </span>
  );
}

export function ReviewSummary({
  rating,
  reviewsTotal,
  reviews,
}: {
  rating?: number;
  reviewsTotal?: number;
  reviews: VariantReview[];
}) {
  const total = reviewsTotal || 0;
  const withText = reviews.filter((review) => review.body);
  const tiqetsCount = reviews.filter((review) => review.source === 'Tiqets').length;
  const providerCount = total - tiqetsCount;
  const breakdown = ratingBreakdown(reviews, total);

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">Ratings &amp; reviews</h2>

      {(tiqetsCount > 0 || providerCount > 0) && (
        <div className="mb-5 flex flex-wrap items-center gap-6 text-base">
          {tiqetsCount > 0 && (
            <span className="flex items-center gap-2 text-slate-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00B4D8] text-sm font-bold text-white">
                T
              </span>
              <strong className="font-semibold">Tiqets</strong>
              <span className="text-slate-600">({tiqetsCount})</span>
            </span>
          )}
          {providerCount > 0 && (
            <span className="flex items-center gap-2 text-slate-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                <Star className="h-3 w-3" />
              </span>
              <strong className="font-semibold">Provider</strong>
              <span className="text-slate-600">({providerCount.toLocaleString()})</span>
            </span>
          )}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-start gap-8">
        <div>
          <div className="text-4xl font-extrabold leading-none tracking-tight text-slate-900">
            {(rating || 0).toFixed(1)}
          </div>
          <Stars value={rating || 0} className="my-1.5" />
          <div className="text-sm text-slate-500">
            {total > 0
              ? `${total.toLocaleString()} verified customer review${total === 1 ? '' : 's'}`
              : 'No reviews yet'}
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="flex w-full max-w-sm flex-1 flex-col gap-1.5 pt-1">
            {breakdown.map((row) => (
              <div key={row.stars} className="flex items-center gap-2.5 text-sm text-slate-500">
                <span className="w-2.5 text-right">{row.stars}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <span
                    className="block h-full rounded-full bg-[#F6B93B]"
                    style={{ width: `${row.percent}%` }}
                  />
                </span>
                <span className="w-8 text-right text-slate-600">{row.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {reviews.length > 0 && (
        <>
          <div className="mb-4 flex items-center justify-between border-y border-slate-200 py-3 text-sm text-slate-600">
            <span>
              {reviews.length} review{reviews.length === 1 ? '' : 's'} shown, most recent
              first
            </span>
            <span>Sort: Most relevant first</span>
          </div>

          <div className="flex flex-col gap-4">
            {withText.map((review) => (
              <article key={review.id} className="max-w-2xl rounded-lg bg-slate-50 p-5">
                <div className="mb-3 flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-base font-bold text-white">
                    {(review.author || 'A').trim().charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-bold text-slate-900">
                      {review.author || 'Tiqets customer'}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1 text-[#4DAF8D]">
                        <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current" aria-hidden>
                          <path d="M10 1a9 9 0 100 18 9 9 0 000-18zm4.7 6.9l-5.1 5.2a.9.9 0 01-1.3 0L5.6 10.4a.9.9 0 111.3-1.3l1.9 1.9 4.4-4.5a.9.9 0 111.5 1.4z" />
                        </svg>
                        Verified customer
                      </span>
                      {review.date && <span>{formatReviewDate(review.date)}</span>}
                      {review.travelerType && (
                        <span className="capitalize">· {review.travelerType.replace(/_/g, ' ')}</span>
                      )}
                    </div>
                  </div>
                </div>

                <Stars value={review.rating || 0} className="mb-2" />
                <p className="mb-3 text-base leading-relaxed text-slate-700">{review.body}</p>

                {review.categories.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                    {review.categories.map((category) => (
                      <span key={category.label}>
                        {category.label}: <span className="font-semibold text-slate-700">{category.value}</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-slate-500">
                  {review.language && review.language !== 'en' && (
                    <span className="inline-flex items-center gap-1.5">
                      <Languages className="h-3 w-3" />
                      Original language: {review.language.toUpperCase()}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <ThumbsUp className="h-3 w-3" />
                    Helpful? 0
                  </span>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
