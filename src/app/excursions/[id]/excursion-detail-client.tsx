'use client';

import { useMemo, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Sparkles, Star } from 'lucide-react';
import type { Excursion, ExcursionVariant } from '@/types';
import { StarRating } from '@/components/star-rating';
import { imageUrlFor } from '@/lib/tiqets-image';
import { formatPrice } from '@/lib/currency';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { TourLanguageFilter } from '@/components/tour-language-filter';
import { LanguageProvider, useT } from '@/components/language-provider';
import { filterVariantsByLanguage } from '@/lib/tour-language';
import { DateStrip } from './detail/date-strip';
import type { AvailableDate } from './detail/date-strip';
import { OptionCard, ComboCard } from './detail/option-card';
import { ReviewsSection } from './detail/reviews-section';
import type { Review, ProductRating } from './detail/reviews-section';
import { buildFaqItems } from './detail/faq';
import { Accordion, buildOverviewItems } from './detail/accordions';
import type { AccordionItem } from './detail/accordions';

type AuthUser = { id: string; email?: string } | null;

export type RelatedItem = {
  id: string;
  name: string;
  city: string;
  description: string;
  price: number;
  currency?: string;
  rating?: number;
  reviewsTotal?: number;
  images?: string[];
};

function remainingFor(dates: AvailableDate[], selected: string | null): number | null {
  if (!selected) return null;
  const match = dates.find((d) => d.date === selected);
  return match ? match.availability : null;
}

/**
 * Products that bundle several experiences.
 *
 * Tiqets' `is_package` is the only trustworthy signal. A title heuristic gets
 * this badly wrong: plenty of single-attraction tickets contain "+" purely for
 * an included drink or souvenir, and those do not belong in a combinations row.
 */
function isCombo(variant: ExcursionVariant): boolean {
  return variant.is_package === true;
}

export default function ExcursionDetailClient(props: {
  excursion: Excursion & { reviewsTotal?: number };
  user: AuthUser | null;
  language: string;
  dates?: AvailableDate[];
  reviews?: Review[];
  productRatings?: ProductRating[];
  alsoBought?: RelatedItem[];
  topThings?: RelatedItem[];
  nearbyCities?: string[];
}) {
  // The UI catalogue is ours, not Tiqets', so it needs the language context.
  return (
    <LanguageProvider language={props.language}>
      <ExcursionDetailContent {...props} />
    </LanguageProvider>
  );
}

function ExcursionDetailContent({
  excursion,
  user,
  dates,
  reviews = [],
  productRatings = [],
  alsoBought = [],
  topThings = [],
  nearbyCities = [],
}: {
  excursion: Excursion & { reviewsTotal?: number };
  user: AuthUser | null;
  language: string;
  dates?: AvailableDate[];
  reviews?: Review[];
  productRatings?: ProductRating[];
  alsoBought?: RelatedItem[];
  topThings?: RelatedItem[];
  nearbyCities?: string[];
}) {
  const t = useT();
  const router = useRouter();
  const { addRecentlyViewed } = useRecentlyViewed();
  const [languageCode, setLanguageCode] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleNavClick = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  useMemo(() => {
    addRecentlyViewed(excursion.id);
    return null;
  }, [excursion.id, addRecentlyViewed]);

  const allVariants = useMemo(() => excursion.variants || [], [excursion.variants]);
  const languageFiltered = useMemo(
    () => filterVariantsByLanguage(allVariants, languageCode),
    [allVariants, languageCode],
  );

  const regular = useMemo(() => languageFiltered.filter((v) => !isCombo(v)), [languageFiltered]);
  const combos = useMemo(() => languageFiltered.filter(isCombo), [languageFiltered]);

  const cheapest = useMemo(() => {
    const priced = regular.filter((v) => Number(v.price || 0) > 0);
    if (priced.length === 0) return null;
    return priced.reduce((min, v) => (Number(v.price) < Number(min.price) ? v : min));
  }, [regular]);

  const remaining = remainingFor(dates || [], selectedDate);
  const heroImage = imageUrlFor(excursion.images && excursion.images[0], 'hero');
  const title = t('detail.tickets', { name: excursion.name });

  const overviewItems: AccordionItem[] = buildOverviewItems(
    (excursion as any).tagline || excursion.description || '',
    cheapest || regular[0],
    excursion,
    t,
    excursion.name,
  );

  const faqItems = useMemo(
    () =>
      buildFaqItems(cheapest || regular[0], {
        duration: excursion.duration,
        address: ((excursion as any).howtogetthere as string | undefined) || excursion.address,
      }, t),
    [cheapest, regular, excursion.duration, excursion.address, t],
  );

  // `howtogetthere` and `address` hold the same place in different code paths,
  // so the location is only added once even if both are populated.
  const whereTo =
    ((excursion as any).howtogetthere as string | undefined) || excursion.address;

  const aboutItems: AccordionItem[] = [
    ...(excursion.duration && !/^not specified$/i.test(excursion.duration.trim())
      ? [{ key: 'duration', title: t('detail.duration'), body: excursion.duration, icon: 'clock' as const }]
      : []),
    ...(whereTo
      ? [{
        key: 'where',
        title: t('detail.howToGetThere'),
        body: String(whereTo),
        icon: 'route' as const,
      }]
      : []),
    ...((excursion as any).whatsincluded
      ? [{
        key: 'included',
        title: t('detail.included'),
        body: String((excursion as any).whatsincluded),
        icon: 'ticket' as const,
      }]
      : []),
  ];

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 pb-16">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-3.5 text-xs text-gray-500">
        {excursion.country && <Link href={`/country/${excursion.country}`} className="hover:text-[#00B4D8]">{excursion.country}</Link>}
        {excursion.city && (
          <>
            <ChevronRight className="h-3 w-3 text-gray-400" />
            <span>{excursion.city}</span>
          </>
        )}
        <ChevronRight className="h-3 w-3 text-gray-400" />
        <span className="text-gray-600">{excursion.name}</span>
      </nav>

      {/* Hero */}
      <section className="relative mb-6 h-[300px] w-full overflow-hidden rounded-xl bg-[#1A202C]">
        {heroImage && (
          <Image
            src={heroImage}
            alt={excursion.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-75"
            unoptimized
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/65 to-transparent p-8 text-white">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <Star className="h-3.5 w-3.5 fill-[#F6B93B] text-[#F6B93B]" />
            <span>{Number(excursion.rating || 0).toFixed(1)}</span>
            {typeof excursion.reviewsTotal === 'number' && excursion.reviewsTotal > 0 && (
              <span className="font-normal opacity-85">({excursion.reviewsTotal.toLocaleString('en-US')} reviews)</span>
            )}
          </div>
          <h1 className="mb-2.5 text-[34px] font-extrabold leading-tight tracking-tight">{title}</h1>
          {(excursion as any).tagline && (
            <p className="max-w-[620px] text-sm leading-relaxed opacity-95">{String((excursion as any).tagline)}</p>
          )}
        </div>
        {excursion.rating && excursion.rating >= 4.5 && (
          <span className="absolute left-5 top-5 flex items-center rounded bg-white px-3 py-1.5 text-xs font-bold text-gray-900 shadow">
            <span className="mr-1.5">👑</span>{t('detail.topRated')}
          </span>
        )}
      </section>

      {/* Availability */}
      <DateStrip
        dates={dates || []}
        selected={selectedDate}
        onSelect={setSelectedDate}
        optionCount={regular.length}
        fromPrice={cheapest ? Number(cheapest.price) : 0}
        fromCurrency={cheapest?.currency}
      />

      {/* Tour language */}
      <div className="mb-6" id="ticket-options">
        <TourLanguageFilter variants={allVariants} onFilter={setLanguageCode} targetId="ticket-options" />
      </div>

      {/* Options */}
      {regular.length > 0 ? (
        <div className="mb-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regular.map((variant) => (
              <OptionCard
                key={variant.id}
                variant={variant}
                excursion={excursion}
                remaining={remaining}
                selectedDate={selectedDate || ''}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="mb-12 text-center text-sm text-gray-500">
          {allVariants.length === 0
            ? t('detail.noOptions')
            : t('detail.noOptionsLang')}
        </p>
      )}

      {/* Combos */}
      {combos.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-1.5 text-[22px] font-bold tracking-tight text-gray-900">{t('detail.combos')}</h2>
          <p className="mb-5 text-sm text-gray-500">
            Combine this experience with other favourites. Some things are better together.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {combos.map((variant) => (
              <ComboCard key={variant.id} variant={variant} excursion={excursion} remaining={remaining} />
            ))}
          </div>
        </section>
      )}

      {/* Overview */}
      {overviewItems.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold tracking-tight text-gray-900">{t('detail.overview', { name: excursion.name })}</h2>
          <Accordion items={overviewItems} />
        </section>
      )}

      {/* Ratings & reviews */}
      {excursion.rating && (
        <ReviewsSection
          score={Number(excursion.rating)}
          reviewsTotal={Number(excursion.reviewsTotal || 0)}
          reviews={reviews}
          productRatings={productRatings}
        />
      )}

      {/* About */}
      {aboutItems.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-5 text-[22px] font-bold tracking-tight text-gray-900">{t('detail.about', { name: excursion.name })}</h2>
          <Accordion items={aboutItems} />
        </section>
      )}

      {/* Frequently asked questions */}
      {faqItems.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold tracking-tight text-gray-900">
            {excursion.name} {t('detail.faq')}
          </h2>
          <Accordion items={faqItems} />
        </section>
      )}

      {/* Customers also bought */}
      {alsoBought.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-[22px] font-bold tracking-tight text-gray-900">
            {t('detail.alsoBought', { name: excursion.name })}
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {alsoBought.map((item) => (
              <article key={item.id} className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg" onClick={() => handleNavClick(`/excursions/${item.id}`)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleNavClick(`/excursions/${item.id}`); } }}>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  {item.images?.[0] && (
                    <Image
                      src={imageUrlFor(item.images[0], 'card')}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>
                {/* Same type scale as the homepage cards: text-xs eyebrow, text-base title,
                    text-sm body, font-bold price. */}
                <div className="flex grow flex-col p-3 sm:p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{item.city}</p>
                  <h3 className="mt-1 line-clamp-2 min-h-[40px] text-base font-bold text-gray-900 transition-colors group-hover:text-primary">
                    {item.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.description}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <StarRating rating={item.rating} reviewCount={item.reviewsTotal} />
                    <div className="text-right">
                      <span className="block text-xs text-gray-500 sm:inline md:block">{t('detail.from')}</span>
                      <p className="font-bold text-gray-900">
                        {Number(item.price || 0) > 0
                          ? formatPrice(Number(item.price), item.currency)
                          : '--'}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Top things to do */}
      {topThings.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-[22px] font-bold tracking-tight text-gray-900">
            <Sparkles className="h-4 w-4 text-[#00B4D8]" />
            {t('detail.topThings', { city: excursion.city })}
          </h2>
          <div className="flex flex-wrap gap-x-5 gap-y-2.5">
            {topThings.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(`/excursions/${item.id}`)}
                className="relative pr-5 text-xs font-medium text-gray-600 after:absolute after:right-1 after:top-[-1px] after:text-sm after:text-gray-400 hover:text-[#00B4D8] hover:after:text-[#00B4D8]"
              >
                {item.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Cities */}
      {nearbyCities.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-[22px] font-bold tracking-tight text-gray-900">
            {t('detail.citiesIn', { country: excursion.country })}
          </h2>
          <div className="flex flex-wrap gap-x-5 gap-y-2.5">
            {nearbyCities.map((city) => (
              <Link
                key={city}
                href={`/city/${city.replace(/\s+/g, '-')}`}
                className="text-xs font-medium text-gray-600 hover:text-[#00B4D8]"
              >
                {city}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
