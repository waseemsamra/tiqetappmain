'use client';

import Image from 'next/image';
import { StarRating } from "@/components/star-rating";
import type { Excursion, ExcursionVariant } from '@/types';
import { Star } from 'lucide-react';
import { imageUrlFor } from '@/lib/tiqets-image';
import { formatPrice } from '@/lib/currency';

interface VariantCardProps {
  variant: ExcursionVariant;
  excursion: Excursion;
}


export const VariantCard = ({ variant, excursion }: VariantCardProps) => {
    const variantImage = variant.images && variant.images[0] && variant.images[0].length > 0 ? imageUrlFor(variant.images[0], 'card') : null;
    const excursionImage = excursion.images && excursion.images[0] && excursion.images[0].length > 0 ? imageUrlFor(excursion.images[0], 'card') : null;
    const title = variant.name || excursion.name;

    return (
      <a
        href={`/variants/${variant.id}`}
        className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col group h-full bg-white relative border border-gray-200/80"
      >
        {(variantImage || excursionImage) && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={variantImage || excursionImage}
              alt={title}
              fill
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              data-ai-hint="attraction"
              unoptimized
            />
          </div>
        )}
        <div className="p-4 flex-col flex-grow">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{excursion.city}</p>
          <h3 className="text-base font-bold text-gray-900 mt-1 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{variant.description || excursion.description}</p>
          <div className="flex items-center justify-between mt-auto pt-4">
            <StarRating
              rating={variant.rating ?? excursion.rating}
              reviewCount={variant.reviewsTotal ?? excursion.reviewsTotal}
            />
            <div className="text-right">
              <span className="text-xs text-gray-500">From</span>
              <p className="font-bold text-lg text-gray-900">
                {variant.price ? formatPrice(variant.price, variant.currency) : 'Unavailable'}
              </p>
            </div>
          </div>
        </div>
      </a>
    );
};
