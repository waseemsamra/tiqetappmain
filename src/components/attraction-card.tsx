"use client";

import { Excursion } from '@/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Star, MapPin } from 'lucide-react';

interface AttractionCardProps {
    excursion: Excursion;
    wishlistButton?: React.ReactNode;
    rank?: number;
    layout?: 'horizontal' | 'vertical';
}

export const AttractionCard = ({ excursion, wishlistButton, rank, layout = 'vertical' }: AttractionCardProps) => {
    return (
        <div className={cn(
            "rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group h-full bg-white relative border border-gray-200/80",
            layout === 'horizontal' 
                ? 'flex flex-row sm:flex-col' // Mobile: horizontal, Desktop: vertical
                : 'flex flex-col'
        )}>
            {rank && (
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold z-10 text-sm">
                    #{rank}
                </div>
            )}
            
            {/* Image section */}
            <div className={cn(
                "relative overflow-hidden bg-gray-100",
                layout === 'horizontal' 
                    ? 'w-2/5 min-w-[120px] sm:w-full sm:aspect-video aspect-square'
                    : 'w-full aspect-video'
            )}>
                {excursion.images?.[0] && (
                    <Image
                        src={excursion.images[0]}
                        alt={excursion.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}
            </div>
            
            {/* Content section */}
            <div className={cn(
                "flex flex-col flex-1",
                layout === 'horizontal' ? 'p-3 sm:p-4' : 'p-4'
            )}>
                {/* Location */}
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
                    <MapPin className="h-3 w-3" />
                    <span>{excursion.city}, {excursion.country}</span>
                </div>
                
                {/* Title */}
                <h3 className={cn(
                    "font-semibold line-clamp-2 mb-2",
                    layout === 'horizontal' ? 'text-sm sm:text-lg' : 'text-lg'
                )}>
                    {excursion.name}
                </h3>
                
                {/* Rating and Reviews */}
                {excursion.rating && (
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold ml-1">{excursion.rating}</span>
                        </div>
                        {excursion.reviewCount && (
                            <span className="text-sm text-gray-500">
                                ({excursion.reviewCount} reviews)
                            </span>
                        )}
                    </div>
                )}
                
                {/* Description */}
                <p className={cn(
                    "text-gray-600 line-clamp-2 mb-3",
                    layout === 'horizontal' ? 'hidden sm:block text-sm' : 'text-sm'
                )}>
                    {excursion.description}
                </p>
                
                {/* Price and Wishlist - removed originalPrice */}
                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-primary font-bold text-lg">
                            ${excursion.price}
                        </span>
                    </div>
                    {wishlistButton && (
                        <div className="ml-2">
                            {wishlistButton}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};