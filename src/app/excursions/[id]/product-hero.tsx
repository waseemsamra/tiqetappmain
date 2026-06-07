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
  const heroImage = images?.[0] || 'https://placehold.co/1200x600.png?text=Image+Not+Available';
  return (
    <div className="relative w-full h-[60vh] max-h-[500px] rounded-xl overflow-hidden">
      <Image
        src={heroImage}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div>
          {rating !== undefined && (
            <div className="flex items-center gap-2 text-sm text-white mb-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-bold">{rating.toFixed(1)}({reviews || 0} reviews)</span>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
            {title} Tickets
          </h1>
        </div>
        
        {description && (
          <div className="max-w-xs text-right">
            <p className="text-white text-xs md:text-sm drop-shadow-lg line-clamp-3">
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};