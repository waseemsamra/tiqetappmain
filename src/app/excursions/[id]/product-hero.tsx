'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

interface ProductHeroProps {
  images: string[];
  title: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

export const ProductHero = ({ images, title, description, rating, reviews }: ProductHeroProps) => {
    const heroImage = (images && images[0] && images[0].length > 0 ? images[0] : null);
    return (
      <>
        {heroImage && (
          <div className="relative w-full h-[60vh] max-h-[500px] rounded-xl overflow-hidden">
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end gap-4">
              <div className="flex-1 min-w-0">
                {rating !== undefined && (
                  <div className="flex items-center gap-2 text-sm text-white mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-bold">{Number(rating || 0).toFixed(1)}({reviews || 0} reviews)</span>
                  </div>
                )}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg leading-tight">
                  {title} Tickets
                </h1>
              </div>
              {description && (
                <div className="hidden sm:block max-w-xs flex-shrink-0 text-right">
                  <p className="text-white text-xs md:text-sm drop-shadow-lg line-clamp-3">
                    {description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
};