'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import type { Excursion } from '@/types';
import { cn } from '@/lib/utils';

const StarRating = ({ rating }: { rating: number | undefined }) => (
    <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <span className="text-sm font-bold text-gray-800">{Number(rating || 0).toFixed(1)}</span>
    </div>
);

export const AttractionCard = ({ excursion, wishlistButton, rank, layout = 'vertical' }: { excursion: Excursion, wishlistButton?: React.ReactNode, rank?: number, layout?: 'horizontal' | 'vertical' }) => (
    <div className={cn(
        "rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group h-full bg-white relative border border-gray-200/80",
        layout === 'horizontal' 
            ? 'flex flex-row sm:flex-col'
            : 'flex flex-col'
    )}>
        {rank && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold z-10 text-sm">
                #{rank}
            </div>
        )}
        
        <Link href={`/excursions/${excursion.id}`} className={cn(
            "block h-full",
            layout === 'horizontal' ? 'flex flex-row sm:flex-col w-full' : 'flex flex-col'
        )}>
            <div className={cn(
                "relative overflow-hidden",
                layout === 'horizontal' 
                    ? 'w-2/5 min-w-[120px] sm:w-full sm:h-48'
                    : 'w-full h-48'
            )}>
                <Image 
                    src={excursion.images?.[0] || 'https://placehold.co/400x300.png'} 
                    alt={excursion.name} 
                    fill
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
                    data-ai-hint="attraction"
                />
            </div>
            
            <div className={cn(
                "flex flex-col flex-grow",
                layout === 'horizontal' ? 'p-3 sm:p-4' : 'p-4'
            )}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{excursion.city}</p>
                <h3 className="text-base font-bold text-gray-900 mt-1 group-hover:text-primary transition-colors line-clamp-2">{excursion.name.split(':')[0]}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{excursion.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4">
                    <StarRating rating={excursion.rating} />
                    <div className="text-right">
                        <span className="text-xs text-gray-500">From</span>
                        <p className="font-bold text-lg text-gray-900">${Number(excursion.price || 0).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </Link>
        
        {/* Wrapping wishlist button to stop event propagation */}
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