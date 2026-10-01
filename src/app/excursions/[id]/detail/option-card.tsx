'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Heart, Info, Ticket } from 'lucide-react';
import type { Excursion, ExcursionVariant } from '@/types';
import { StarRating } from '@/components/star-rating';
import { WishlistButton } from '@/components/wishlist-button';
import { imageUrlFor } from '@/lib/tiqets-image';
import { formatPrice } from '@/lib/currency';
import { useT } from '@/components/language-provider';

type TagTone = 'bestseller' | 'guide' | 'likely' | 'attraction';

const TONE_CLASS: Record<TagTone, string> = {
  bestseller: 'bg-[#F4C430] text-[#1A202C]',
  guide: 'bg-[#4DAF8D] text-white',
  likely: 'bg-[#E5F2FF] text-[#1E4B8F]',
  attraction: 'bg-[#8B6BC8] text-white',
};

/**
 * Badges are derived from real product data, never invented.
 *
 * `promo_label` is Tiqets' own merchandising field and is null for most
 * products in this catalog, so the remaining badges come from factual flags and
 * from live remaining capacity.
 */
function tagsFor(
  variant: ExcursionVariant,
  remaining: number | null,
  t: (key: string, vars?: Record<string, string | number>) => string,
): Array<{ label: string; tone: TagTone }> {
  const tags: Array<{ label: string; tone: TagTone }> = [];

  if (variant.promo_label) {
    tags.push({ label: variant.promo_label, tone: 'bestseller' });
  } else if (variant.skip_line) {
    tags.push({ label: t('detail.skipLine'), tone: 'attraction' });
  }

  if (typeof remaining === 'number' && remaining > 0 && remaining <= 5) {
    tags.push({ label: t('detail.onlyLeft', { count: remaining }), tone: 'likely' });
  }

  if (variant.audio_guide_languages && variant.audio_guide_languages.length > 0) {
    tags.push({ label: t('detail.audioGuide'), tone: 'guide' });
  }

  return tags.slice(0, 2);
}

function bulletList(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/[\r\n]+/)
    .map((line) => line.replace(/^\s*[*\-•]\s*/, '').trim())
    .filter(Boolean)
    .slice(0, 4);
}

export function OptionCard({
  variant,
  excursion,
  remaining,
  selectedDate,
}: {
  variant: ExcursionVariant;
  excursion: Excursion;
  remaining: number | null;
  selectedDate: string;
}) {
  const t = useT();
  const image = imageUrlFor(
    (variant.images && variant.images[0]) || (excursion.images && excursion.images[0]),
    'card',
  );
  const title = variant.name || excursion.name;
  const price = Number(variant.price || 0);
  const tags = tagsFor(variant, remaining, t);
  const included = bulletList(variant.whats_included);
  const cancellable = Boolean(variant.cancellation && variant.cancellation.window);

  const href = selectedDate
    ? `/variants/${variant.id}?date=${encodeURIComponent(selectedDate)}`
    : `/variants/${variant.id}`;

  return (
    <article className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized
          />
        )}
        {tags.length > 0 && (
          <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${TONE_CLASS[tag.tone]}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
        {/* Sits above the stretched title link so it stays independently clickable. */}
        <div className="absolute right-3 top-3 z-10">
          <WishlistButton activityId={variant.id} />
        </div>
      </div>

      {/* Typography mirrors the homepage cards exactly: text-xs eyebrow,
          text-base title, text-sm body, font-bold price. */}
      <div className="flex grow flex-col p-3 sm:p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {excursion.city}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-[40px] text-base font-bold text-gray-900 transition-colors group-hover:text-primary">
          {/* `after` covers the whole card, so the image, price and body all navigate. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </h3>

        {typeof remaining === 'number' && remaining > 0 ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#4DAF8D]">
            <CheckCircle2 className="h-3 w-3" />
            {t('detail.availableOnDate')}
          </p>
        ) : (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
            <Info className="h-3 w-3" />
            {t('detail.selectDate')}
          </p>
        )}

        {(cancellable || variant.instant_ticket_delivery) && (
          <p className="mt-1 text-xs text-gray-500">
            {[
              variant.instant_ticket_delivery ? t('detail.instantConfirmation') : null,
              cancellable ? t('detail.freeCancellation', { hours: variant.cancellation?.window }) : null,
            ]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}

        {included.length > 0 && (
          <ul className="mt-2 mb-3 space-y-1">
            {included.slice(0, 2).map((line) => (
              <li key={line} className="flex items-start gap-1.5 text-sm text-gray-600">
                <Ticket className="mt-1 h-3 w-3 shrink-0 text-[#4DAF8D]" />
                <span className="line-clamp-1">{line}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <StarRating rating={variant.rating ?? excursion.rating} reviewCount={variant.reviewsTotal ?? excursion.reviewsTotal} />
          <div className="text-right">
            <span className="block text-xs text-gray-500 sm:inline md:block">{t('detail.from')}</span>
            <p className="font-bold text-gray-900">
              {price > 0 ? formatPrice(price, variant.currency) : t('detail.checkDates')}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Combo card used by the "hand-picked combinations" row. */
export function ComboCard({
  variant,
  excursion,
  remaining,
}: {
  variant: ExcursionVariant;
  excursion: Excursion;
  remaining: number | null;
}) {
  const image = imageUrlFor(
    (variant.images && variant.images[0]) || (excursion.images && excursion.images[0]),
    'card',
  );
  const t = useT();
  const included = bulletList(variant.whats_included);
  const price = Number(variant.price || 0);

  return (
    <article className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        {image && (
          <Image
            src={image}
            alt={variant.name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized
          />
        )}
        <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm">
          <Heart className="h-3 w-3 fill-[#E53E3E] text-[#E53E3E]" />
          {t('detail.combo')}
        </span>
        <span className="absolute bottom-3 left-1/2 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-900 shadow">
          +
        </span>
      </div>

      <div className="flex grow flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 text-base font-bold text-gray-900 transition-colors group-hover:text-primary">
          <Link
            href={`/variants/${variant.id}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {variant.name}
          </Link>
        </h3>
        {included.length > 0 && (
          <ul className="mt-2 mb-3 space-y-1">
            {included.slice(0, 2).map((line) => (
              <li key={line} className="flex items-start gap-1.5 text-sm text-gray-600">
                <CheckCircle2 className="mt-1 h-3 w-3 shrink-0 text-[#4DAF8D]" />
                <span className="line-clamp-1">{line}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-center justify-between pt-4">
          <StarRating rating={variant.rating ?? excursion.rating} reviewCount={variant.reviewsTotal ?? excursion.reviewsTotal} />
          <div className="text-right">
            <span className="block text-xs text-gray-500 sm:inline md:block">{t('detail.from')}</span>
            <p className="font-bold text-gray-900">
              {price > 0 ? formatPrice(price, variant.currency) : t('detail.checkDates')}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
