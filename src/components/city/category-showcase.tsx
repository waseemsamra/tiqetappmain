'use client';

/**
 * City category showcase — design-first pass, hardcoded
 * to match public/categories.html: a row of small
 * rectangular category chips (6 + a "More categories"
 * chip) and a "Discover" modal with the full category
 * grid and interests. Click behaviour on the chips
 * comes later.
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORY_IMAGES } from '@/lib/category-images';
import { categoryPath } from '@/lib/category-pages';
import { CategoryChips } from '@/components/city/category-chips';
import type {
  CategoryItem,
  DestinationCategories,
} from '@/lib/city-categories';

const img = (id: string, w = 400) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

/** Real Tiqets picture per category; falls back to a stock photo. */
const catImage = (name: string) =>
  CATEGORY_IMAGES[name.toLowerCase()] ||
  img('photo-1546412414-e1885259563a', 300);

/** Fallback for destinations we have no extracted data for. */
const DEFAULT_CATEGORIES: DestinationCategories = {
  categories: [
    'Attractions',
    'Food & Drinks',
    'City Tours',
    'Cruises & Boat Tours',
    'Nature & Wildlife',
    'Museums',
    'Aviation Activities',
    'City Cards & Passes',
    'Games & Entertainment',
    'Historical & Archaeological Sites',
    'Shows & Theatres',
    'Transfers',
    'Travel Services',
    'Trips & Excursions',
    'Water Activities',
  ].map((name) => ({ name, image: catImage(name) })),
  interests: [
    'Adventure seekers',
    'Architecture admirers',
    'Hidden Gems',
    'Nature lovers',
    'Nightlife seekers',
    'Sport fanatics',
  ].map((name) => ({ name, image: catImage(name) })),
};

/** Stacked-ticket tile icon from the mockup. */
function MoreCategoriesIcon({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <rect x="8" y="18" width="44" height="34" rx="4" fill="#F5D76E" stroke="#3B5A8C" strokeWidth="2" />
      <rect x="14" y="12" width="44" height="34" rx="4" fill="#FFF9E6" stroke="#3B5A8C" strokeWidth="2" />
      <rect x="22" y="22" width="28" height="4" rx="1" fill="#3B5A8C" opacity="0.25" />
      <path d="M30 30 L42 30 L36 40 Z" fill="#F5D76E" stroke="#3B5A8C" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function CategoryShowcase({
  cityName = 'Dubai',
  data,
}: {
  cityName?: string;
  data?: DestinationCategories;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { categories, interests } = data ?? DEFAULT_CATEGORIES;
  const rowCategories = categories.slice(0, 6);
  /** Tiqets' own modal lists every category alphabetically. */
  const modalCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const modalInterests = [...interests].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const visibleModalCategories = expanded
    ? modalCategories
    : modalCategories.slice(0, 12);
  const hasExtraCategories = modalCategories.length > 12;

  return (
    <>
      {/* Category cards — horizontally scrollable row on
          mobile, rectangular image cards grid above:
          7 across on desktop, 3 on tablet, 2 on small
          screens — sized 10% down */}
      <CategoryChips
        cityName={cityName}
        items={rowCategories}
        extra={
          // More categories — opens the discover modal
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group mx-auto flex w-[150px] shrink-0 flex-col items-start text-left transition-transform duration-200 hover:-translate-y-[3px] min-[481px]:w-[90%]"
          >
            <div className="mb-3.5 flex w-full items-center justify-center rounded-xl bg-[#FFF9E6] aspect-[4/3]">
              <MoreCategoriesIcon className="h-14 w-14" />
            </div>
            <span className="text-[15px] font-bold leading-snug text-[#1A202C]">
              More categories
            </span>
          </button>
        }
      />

      {/* Discover modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[1000] flex animate-in fade-in-0 duration-200 items-start justify-center overflow-y-auto bg-[rgba(15,23,42,0.5)] px-[10px] pb-[10px] pt-5 backdrop-blur-sm min-[481px]:px-5 min-[481px]:pb-5 min-[481px]:pt-[60px]"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-[1400px] animate-in fade-in-0 slide-in-from-bottom-5 duration-300 rounded-xl bg-white shadow-[0_24px_64px_rgba(15,23,42,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-4 py-4 min-[769px]:px-5 min-[769px]:py-5 min-[1101px]:px-8 min-[1101px]:pt-6 min-[1101px]:pb-5">
              <h2 className="text-xl font-bold tracking-[-0.4px] text-[#1F355F] min-[769px]:text-2xl">
                Discover {cityName}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#1A202C] transition-colors hover:bg-[#F7FAFC]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 pb-10 min-[769px]:p-5 min-[769px]:pb-10 min-[1101px]:p-8 min-[1101px]:pb-10">
              {/* Categories */}
              <section className="mb-10">
                <h3 className="mb-[22px] text-base font-bold tracking-[-0.2px] text-[#1F355F] min-[1101px]:text-lg">
                  Categories
                </h3>
                <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-6 md:gap-y-3 min-[1101px]:grid-cols-3 min-[1101px]:gap-x-8 min-[1101px]:gap-y-3.5">
                  {visibleModalCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={categoryPath(cityName, cat.name)}
                      className="flex min-w-0 items-center gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-[#F7FAFC]"
                    >
                      <div className="relative h-12 w-[72px] shrink-0 overflow-hidden rounded-lg bg-[#F0F0F0] min-[769px]:h-[52px]">
                        <Image
                          src={cat.image}
                          alt=""
                          fill
                          sizes="72px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="text-sm font-semibold leading-snug text-[#1A202C] min-[1101px]:text-[15px]">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>

                {hasExtraCategories && (
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="mt-[18px] inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A202C] underline underline-offset-4 transition-colors hover:text-[#3b82f6]"
                  >
                    {expanded ? 'Show less' : 'Show more'}
                    <ChevronDown
                      className={cn(
                        'h-3 w-3 transition-transform duration-300',
                        expanded && 'rotate-180',
                      )}
                    />
                  </button>
                )}
              </section>

              {/* Interests */}
              <section>
                <h3 className="mb-[22px] text-base font-bold tracking-[-0.2px] text-[#1F355F] min-[1101px]:text-lg">
                  Interests
                </h3>
                <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-6 md:gap-y-3 min-[1101px]:grid-cols-3 min-[1101px]:gap-x-8 min-[1101px]:gap-y-3.5">
                    {modalInterests.map((cat) => (
                    <Link
                      key={cat.name}
                      href={categoryPath(cityName, cat.name)}
                      className="flex min-w-0 items-center gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-[#F7FAFC]"
                    >
                      <div className="relative h-12 w-[72px] shrink-0 overflow-hidden rounded-lg bg-[#F0F0F0] min-[769px]:h-[52px]">
                        <Image
                          src={cat.image}
                          alt=""
                          fill
                          sizes="72px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <span className="text-sm font-semibold leading-snug text-[#1A202C] min-[1101px]:text-[15px]">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
