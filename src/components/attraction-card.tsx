'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import type { Excursion } from '@/types';

const StarRating = ({ rating }: { rating: number | undefined }) => (
    <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <span className="text-sm font-bold text-gray-800">{Number(rating || 0).toFixed(1)}</span>
    </div>
);


export const AttractionCard = ({ excursion, wishlistButton, rank, layout = 'vertical' }: { excursion: Excursion, wishlistButton?: React.ReactNode, rank?: number, layout?: 'horizontal' | 'vertical' }) => (
    <div className={`rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${layout === 'horizontal' ? 'flex-row' : 'flex-col'} group h-full bg-white relative border border-gray-200/80`}>
          {rank && (
               <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold z-10 text-sm">
                  #{rank}
              </div>
          )}
          <Link href={`/excursions/${excursion.id}`} className="block h-full flex flex-col">
              <div className="relative w-full h-48 overflow-hidden">
                  <Image 
                      src={excursion.images?.[0] || 'https://placehold.co/400x300.png'} 
                      alt={excursion.name} 
                      fill
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
                      data-ai-hint="attraction"
                  />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{excursion.city}</p>
                  <h3 className="text-base font-bold text-gray-900 mt-1 group-hover:text-primary transition-colors line-clamp-2">{excursion.name.split(':')[0]}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{excursion.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4">
                       <StarRating rating={excursion.rating} />
                      <div className="text-right">
                          <span className="text-xs text-gray-500">From</span>
                          <p className="font-bold text-lg text-gray-900">\${Number(excursion.price || 0).toFixed(2)}</p>
                      </div>
                  </div>
              </div>
          </Link>
      );
  );
