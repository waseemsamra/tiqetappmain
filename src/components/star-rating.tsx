import { Star } from 'lucide-react';

/** 15295 -> "15,295". Exact figures, matching how Tiqets presents them. */
export function formatReviewCount(count: number): string {
  return count.toLocaleString('en-US');
}

/**
 * Star rating plus the real review count from Tiqets.
 *
 * The count comes from `ratings.total` on the Content API, surfaced as
 * `Excursion.reviewsTotal` by `transformTiqetsProduct` and cached in
 * `public/excursions.json`. It renders nothing when absent, so experiences
 * without reviews degrade to the average alone.
 */
export function StarRating({
  rating,
  reviewCount,
  className = '',
}: {
  rating: number | undefined;
  reviewCount?: number;
  className?: string;
}) {
  const value = Number(rating || 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Star
        className={`h-4 w-4 ${value >= 3 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} sm:hidden`}
      />
      <Star
        className={`h-4 w-4 ${value >= 1 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} hidden sm:inline-flex`}
      />
      <Star
        className={`h-4 w-4 ${value >= 2 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} hidden sm:inline-flex`}
      />
      <Star
        className={`h-4 w-4 ${value >= 3 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} hidden sm:inline-flex`}
      />
      <Star
        className={`h-4 w-4 ${value >= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} hidden sm:inline-flex`}
      />
      <Star
        className={`h-4 w-4 ${value >= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} hidden sm:inline-flex`}
      />
      <span className="text-xs font-bold text-gray-800">{value.toFixed(1)}</span>
      {typeof reviewCount === 'number' && reviewCount > 0 && (
        <span className="text-xs text-gray-500" title={`${reviewCount.toLocaleString()} reviews`}>
          ({formatReviewCount(reviewCount)})
        </span>
      )}
    </div>
  );
}
