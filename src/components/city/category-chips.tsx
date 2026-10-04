'use client';

/**
 * Shared category chips row — the layout from the
 * city page (public/categories.html): a horizontal
 * scroll row on small screens, then a 2 / 3 / 7
 * column grid of image cards. Used by the city page
 * showcase and the category page pill row so both
 * pages render the exact same chips.
 */

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { categoryPath } from '@/lib/category-pages';
import { imageUrlFor } from '@/lib/tiqets-image';

export type CategoryChip = {
  name: string;
  image: string;
  /** Explicit URL slug (subcategories); derived from the name when omitted. */
  slug?: string;
  /** Shown as "N experiences" under the name when provided. */
  count?: number;
};

export function CategoryChips({
  cityName,
  items,
  extra,
}: {
  cityName: string;
  items: CategoryChip[];
  /** Extra tile rendered after the chips (e.g. "More categories"). */
  extra?: ReactNode;
}) {
  return (
    <div className="flex snap-x snap-proximity gap-3 overflow-x-auto pb-4 min-[481px]:grid min-[481px]:grid-cols-2 min-[481px]:gap-4 min-[481px]:overflow-visible min-[769px]:grid-cols-3 min-[1101px]:grid-cols-7 min-[1101px]:gap-5">
      {items.map((cat) => (
        <Link
          key={cat.slug || cat.name}
          href={
            cat.slug
              ? `/city/${encodeURIComponent(cityName)}/category/${cat.slug}`
              : categoryPath(cityName, cat.name)
          }
          className="group mx-auto flex w-[150px] shrink-0 snap-start flex-col items-start text-left transition-transform duration-200 hover:-translate-y-[3px] min-[481px]:w-[90%]"
        >
          <div className="relative mb-3.5 w-full overflow-hidden rounded-xl bg-[#F0F0F0] aspect-[4/3]">
            <Image
              src={imageUrlFor(cat.image, 'card')}
              alt={cat.name}
              fill
              sizes="(min-width:1101px) 14vw, (min-width:769px) 25vw, 40vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              unoptimized
            />
          </div>
          <span className="text-[15px] font-bold leading-snug text-[#1A202C]">
            {cat.name}
          </span>
          {cat.count !== undefined && (
            <span className="text-[11px] leading-snug text-[#718096]">
              {cat.count} {cat.count === 1 ? 'experience' : 'experiences'}
            </span>
          )}
        </Link>
      ))}
      {extra}
    </div>
  );
}
