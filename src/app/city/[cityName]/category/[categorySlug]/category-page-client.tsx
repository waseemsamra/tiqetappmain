'use client';

/**
 * Category page — converted from public/attraction-page.html.
 * Shows one category's products for one city:
 * hero, related category pills, top picks, the full
 * product grid, hand-picked cards, more categories,
 * an explore band and the country's cities.
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronDown } from 'lucide-react';
import { imageUrlFor } from '@/lib/tiqets-image';
import { CategoryChips } from '@/components/city/category-chips';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CAROUSEL_OPTS } from '@/lib/carousel-opts';
import type { Excursion } from '@/types';

export type RelatedCategory = {
  name: string;
  image: string;
  slug: string;
  count: number;
};

interface CategoryPageClientProps {
  cityName: string;
  countryName: string;
  category: string;
  slug: string;
  heroImage: string;
  products: Excursion[];
  pills: RelatedCategory[];
  relatedCategories: RelatedCategory[];
  cities: string[];
}

const formatPrice = (ex: Excursion) => {
  const price = Number(ex.price || 0);
  if (!price) return null;
  return `${ex.currency || ''} ${price.toFixed(2)}`.trim();
};

/** Bestseller for well-reviewed popular products. */
const badgeFor = (ex: Excursion) => {
  const rating = Number(ex.rating || 0);
  const reviews = Number(ex.reviewsTotal || 0);
  if (ex.discount !== undefined) return 'Sale';
  if (rating >= 4.5 && reviews >= 100) return 'Bestseller';
  return null;
};

const badgeClass = (badge: string) =>
  badge === 'Sale'
    ? 'bg-[#E23F3F] text-white'
    : badge === 'Bestseller'
      ? 'bg-[#F5A623] text-white'
      : 'bg-[#4DAF8D] text-white';

export default function CategoryPageClient({
  cityName,
  countryName,
  category,
  slug,
  heroImage,
  products,
  pills,
  relatedCategories,
  cities,
}: CategoryPageClientProps) {
  const [visible, setVisible] = useState(9);

  const topPicks = [...products]
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    .slice(0, 10);
  const handPicked = [...products]
    .sort(
      (a, b) =>
        Number(b.rating || 0) * Number(b.reviewsTotal || 0) -
        Number(a.rating || 0) * Number(a.reviewsTotal || 0),
    )
    .slice(0, 3);
  const visibleProducts = products.slice(0, visible);
  const moreSites = relatedCategories.slice(0, 2);

  return (
    <div className="container mx-auto px-4 pb-16">
      {/* Hero */}
      <div className="relative mb-7 h-[180px] overflow-hidden rounded-[14px] bg-[#2D3A5C] sm:h-[240px] lg:h-[320px]">
        {heroImage && (
          <Image
            src={heroImage}
            alt={`${category} in ${cityName}`}
            fill
            sizes="100vw"
            className="object-cover"
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <h1 className="absolute bottom-4 left-4 z-10 text-2xl font-extrabold tracking-[-0.8px] text-white drop-shadow-md sm:bottom-6 sm:left-6 sm:text-3xl lg:bottom-8 lg:left-9 lg:text-[36px]">
          {category} in {cityName}
        </h1>
      </div>

      {/* Category chips — same row layout as the city page */}
      {pills.length > 0 && (
        <div className="mb-12">
          <CategoryChips cityName={cityName} items={pills} />
        </div>
      )}

      {/* Top picks */}
      {topPicks.length > 0 && (
        <section className="mb-13">
          <h2 className="mb-5 text-xl font-bold tracking-[-0.4px] text-[#1A202C] sm:text-2xl">
            Top 10 {category}
          </h2>
          <Carousel opts={CAROUSEL_OPTS} className="w-full">
            <CarouselContent className="-ml-4">
              {topPicks.map((ex, index) => (
                <CarouselItem
                  key={ex.id}
                  className="pl-4 basis-[85%] min-[481px]:basis-1/2 min-[769px]:basis-1/3 min-[1101px]:basis-1/4"
                >
                  <div className="h-full py-4">
                    <Link
                      key={ex.id}
                      href={`/excursions/${ex.id}`}
                      className="group relative flex h-full flex-col transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="relative mb-3.5 aspect-[16/11] overflow-hidden rounded-[14px] bg-[#F0F0F0]">
                        <Image
                          src={imageUrlFor(ex.images?.[0], 'card')}
                          alt={ex.name}
                          fill
                          sizes="(min-width:1101px) 25vw, (min-width:769px) 33vw, 85vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                          unoptimized
                        />
                        <span className="absolute left-3 top-3 z-10 rounded bg-white px-2 py-1 text-xs font-bold text-[#1A202C] shadow">
                          #{index + 1}
                        </span>
                      </div>
                      <h3 className="mb-1.5 text-[17px] font-bold leading-snug text-[#1A202C]">
                        {ex.name}
                      </h3>
                      <p className="mb-2.5 line-clamp-2 text-[13px] leading-relaxed text-[#4A5568]">
                        {ex.description || ex.excursionType?.name}
                      </p>
                      <div className="mt-auto flex items-center gap-1.5 text-xs text-[#4A5568]">
                        <Star className="h-3 w-3 fill-[#F6B93B] text-[#F6B93B]" />
                        <span className="font-bold text-[#1A202C]">
                          {Number(ex.rating || 0).toFixed(1)}
                        </span>
                        <span className="text-[#718096]">
                          ({Number(ex.reviewsTotal || 0).toLocaleString()} reviews)
                        </span>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden min-[1101px]:flex" />
            <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden min-[1101px]:flex" />
          </Carousel>
        </section>
      )}

      {/* All products */}
      <section className="mb-13">
        <div className="mb-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="mb-0 text-xl font-bold tracking-[-0.4px] text-[#1A202C] sm:text-2xl">
            All {category} in {cityName}
          </h2>
          <div className="flex cursor-default items-center gap-2 text-[13px] text-[#4A5568]">
            Most relevant first <ChevronDown className="h-2.5 w-2.5" />
          </div>
        </div>

        <div className="mb-4 flex items-center gap-1.5 text-[13px] text-[#4A5568]">
          <strong>{products.length}</strong> options
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4 lg:gap-5">
          {visibleProducts.map((ex) => {
            const badge = badgeFor(ex);
            const price = formatPrice(ex);
            return (
              <Link
                key={ex.id}
                href={`/excursions/${ex.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F0F0F0]">
                  <Image
                    src={imageUrlFor(ex.images?.[0], 'card')}
                    alt={ex.name}
                    fill
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    unoptimized
                  />
                  {badge && (
                    <span
                      className={`absolute left-2.5 top-2.5 z-10 rounded px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide ${badgeClass(badge)}`}
                    >
                      {badge}
                    </span>
                  )}
                </div>
                <div className="flex grow flex-col p-3.5 pb-4">
                  <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.8px] text-[#718096]">
                    {ex.city || cityName}
                  </div>
                  <h3 className="mb-3 line-clamp-2 min-h-[40px] text-[15px] font-bold leading-snug text-[#1A202C]">
                    {ex.name}
                  </h3>
                  <div className="mt-auto flex items-end justify-between border-t border-[#E2E8F0] pt-3">
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 fill-[#F6B93B] text-[#F6B93B]" />
                      <span className="font-bold text-[#1A202C]">
                        {Number(ex.rating || 0).toFixed(1)}
                      </span>
                      <span className="text-[#718096]">
                        ({Number(ex.reviewsTotal || 0)})
                      </span>
                    </div>
                    {price && (
                      <div className="text-right text-xs leading-tight">
                        <span className="block text-[10px] text-[#718096]">
                          From
                        </span>
                        <span className="text-base font-extrabold text-[#1A202C]">
                          {price}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {products.length > visible && (
          <div className="py-4 text-center">
            <div className="mb-2 text-[11px] text-[#718096]">
              Showing {visible} of {products.length} items
            </div>
            <button
              type="button"
              onClick={() => setVisible((v) => v + 9)}
              className="text-[13px] font-semibold text-[#1A202C] underline underline-offset-4 transition-colors hover:text-[#00B4D8]"
            >
              Show more
            </button>
          </div>
        )}
      </section>

      {/* Hand-picked */}
      {handPicked.length > 0 && (
        <section className="mb-13">
          <h2 className="mb-1 text-xl font-bold tracking-[-0.4px] text-[#1A202C] sm:text-2xl">
            Hand-picked combinations in {cityName}
          </h2>
          <p className="mb-5 text-[13px] text-[#718096]">
            Combine {cityName} favorites. Some things are better together.
          </p>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {handPicked.map((ex) => {
              const badge = badgeFor(ex);
              const price = formatPrice(ex);
              return (
                <Link
                  key={ex.id}
                  href={`/excursions/${ex.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F0F0F0]">
                    <Image
                      src={imageUrlFor(ex.images?.[0], 'card')}
                      alt={ex.name}
                      fill
                      sizes="(min-width:1024px) 33vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                    {badge && (
                      <span
                        className={`absolute left-2.5 top-2.5 z-10 rounded px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide ${badgeClass(badge)}`}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                  <div className="flex grow flex-col p-3.5 pb-4">
                    <h3 className="mb-2.5 text-[15px] font-bold leading-snug text-[#1A202C]">
                      {ex.name}
                    </h3>
                    <ul className="mb-3 flex flex-col gap-1">
                      <li className="flex items-start gap-1.5 text-xs leading-relaxed text-[#4A5568]">
                        <span className="mt-px shrink-0 text-[11px] font-bold text-[#4DAF8D]">
                          ✓
                        </span>
                        {ex.excursionType?.name || ex.name}
                      </li>
                      {ex.duration && ex.duration !== 'Not specified' && (
                        <li className="flex items-start gap-1.5 text-xs leading-relaxed text-[#4A5568]">
                          <span className="mt-px shrink-0 text-[11px] font-bold text-[#4DAF8D]">
                            ✓
                          </span>
                          {ex.duration}
                        </li>
                      )}
                    </ul>
                    <div className="mt-auto flex items-end justify-between border-t border-[#E2E8F0] pt-2.5">
                      <span className="text-[10px] font-medium text-[#718096]">
                        New
                      </span>
                      {price && (
                        <div className="text-right text-xs leading-tight">
                          <span className="block text-[10px] text-[#718096]">
                            from
                          </span>
                          <span className="text-base font-extrabold text-[#E23F3F]">
                            {price}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* More categories — horizontal scroll row on
          mobile, 2-column grid from sm up */}
      {moreSites.length > 0 && (
        <section className="mb-14">
          <h2 className="mb-5 text-xl font-bold tracking-[-0.4px] text-[#1A202C] sm:text-2xl">
            More Site &amp; Attractions in {cityName}
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-4 sm:grid sm:max-w-[400px] sm:grid-cols-2 sm:gap-5 sm:overflow-visible">
            {moreSites.map((cat) => (
              <Link
                key={cat.slug}
                href={`/city/${encodeURIComponent(cityName)}/category/${cat.slug}`}
                className="group w-[240px] shrink-0 snap-start transition-transform duration-300 hover:-translate-y-[3px] sm:w-auto"
              >
                <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-[#F0F0F0]">
                  <Image
                    src={imageUrlFor(cat.image, 'pill')}
                    alt={cat.name}
                    fill
                    sizes="(min-width:640px) 33vw, 240px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    unoptimized
                  />
                </div>
                <div className="text-sm font-bold leading-snug text-[#1A202C]">
                  {cat.name}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Explore CTA */}
      <div className="relative mb-14 overflow-hidden rounded-[14px] bg-gradient-to-br from-[#1A2B49] to-[#2D3A5C] px-8 py-14 text-center">
        <div className="relative z-10">
          <h2 className="mb-5 text-lg font-bold tracking-[-0.4px] text-white sm:text-xl lg:text-[28px]">
            Explore the best things to do in {cityName}
          </h2>
          <Link
            href={`/city/${encodeURIComponent(cityName)}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#3B6EFF] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2A5FE0]"
          >
            See all experiences
          </Link>
        </div>
      </div>

      {/* Cities in country */}
      {cities.length > 0 && (
        <section className="mb-14">
          <h3 className="mb-4 text-lg font-bold tracking-[-0.2px] text-[#1A202C]">
            Cities in {countryName}
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/city/${encodeURIComponent(city)}`}
                className="rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-[13px] font-medium text-[#1A202C] transition-colors hover:border-[#1A202C] hover:bg-[#F7FAFC]"
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
