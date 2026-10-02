'use client';

import Image from 'next/image';
import { StarRating } from "@/components/star-rating";
import { Star, MapPin } from 'lucide-react';
import type { Excursion } from '@/types';
import { cn } from '@/lib/utils';
import { imageUrlFor } from '@/lib/tiqets-image';
import { formatPrice } from '@/lib/currency';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';


export const AttractionCard = ({ excursion, wishlistButton, rank, layout = 'vertical' }: { excursion: Excursion, wishlistButton?: React.ReactNode, rank?: number, layout?: 'horizontal' | 'vertical' }) => {
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleClick = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      setIsNavigating(true);
      router.push(`/excursions/${excursion.id}`);
    }, [excursion.id, router]);

    return (
        <div className={cn(
            "rounded-xl shadow-md transition-all duration-100 overflow-hidden group h-full bg-white relative border border-gray-200/80",
            isNavigating ? 'opacity-60 scale-[0.99]' : 'hover:shadow-lg hover:-translate-y-0.5',
            layout === 'horizontal' 
                ? 'flex flex-row sm:flex-col'
                : 'flex flex-col'
        )} onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(e as unknown as React.MouseEvent); } }}>
            {rank && (
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold z-10 text-sm">
                    #{rank}
                </div>
            )}
            
            <div className={cn(
                "block h-full",
                layout === 'horizontal' ? 'flex flex-row sm:flex-col w-full' : 'flex flex-col'
            )}>
                <div className={cn(
                    "relative overflow-hidden",
                    layout === 'horizontal' 
                        ? 'w-2/5 min-w-[120px] sm:w-full sm:h-48'
                        : 'w-full h-48'
                )}>
          {excursion.images?.[0] && excursion.images?.[0].length > 0 && (
                            <Image 
                              src={imageUrlFor(excursion.images?.[0], 'card')} 
                              alt={excursion.name} 
                              fill
                              className={`object-cover w-full h-full transition-transform duration-300 ${isNavigating ? 'scale-100' : 'group-hover:scale-105'}`} 
                              data-ai-hint="attraction"
                              unoptimized
                            />
                          )}
                </div>
                
                <div className={cn(
                    "flex flex-col flex-grow",
                    layout === 'horizontal' ? 'p-3 sm:p-4' : 'p-4'
                )}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{excursion.city}</p>
                    <h3 className="text-base font-bold text-gray-900 mt-1 group-hover:text-primary transition-colors line-clamp-2">{excursion.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{excursion.description}</p>
                    
                    {/* Responsive alignment */}
                    <div className={cn(
                        "flex flex-wrap items-center justify-between gap-2 mt-auto pt-3",
                        layout === 'horizontal' 
                            ? "items-center"
                            : "items-center"
                    )}>
                        <div className={cn(
                            layout === 'horizontal' 
                                ? "sm:flex sm:items-center"
                                : "flex items-center"
                        )}>
                            <StarRating rating={excursion.rating} reviewCount={excursion.reviewsTotal} />
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xs text-gray-500 hidden sm:inline">From</span>
                            <p className="text-sm font-bold text-gray-900">{formatPrice(excursion.price, excursion.currency)}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {wishlistButton && (
                <div 
                    className="absolute top-2 right-2 z-20"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {wishlistButton}
                </div>
            )}
        </div>
    );
};