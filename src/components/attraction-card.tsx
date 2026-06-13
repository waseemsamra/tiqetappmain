"use client";

import { Excursion } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AttractionCardProps {
    excursion: Excursion;
    wishlistButton?: React.ReactNode;
    rank?: number;
    layout?: 'horizontal' | 'vertical';
}

export const AttractionCard = ({ excursion, wishlistButton, rank, layout = 'vertical' }: AttractionCardProps) => (
    <div className={cn(
        "rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group h-full bg-white relative border border-gray-200/80",
        layout === 'horizontal' ? 'flex flex-row' : 'flex flex-col'
    )}>
        {rank && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold z-10 text-sm">
                #{rank}
            </div>
        )}
        
        {/* Image section - changes based on layout */}
        <div className={cn(
            "relative overflow-hidden bg-gray-100",
            layout === 'horizontal' 
                ? 'w-2/5 min-w-[120px] aspect-square' // Image on left for horizontal
                : 'w-full aspect-video' // Full width for vertical
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
            "flex-1",
            layout === 'horizontal' ? 'p-3' : 'p-4'
        )}>
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <h3 className={cn(
                        "font-semibold line-clamp-2",
                        layout === 'horizontal' ? 'text-sm mb-1' : 'text-lg mb-2'
                    )}>
                        {excursion.name}
                    </h3>
                    {layout === 'horizontal' ? (
                        <>
                            <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                                {excursion.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="text-primary font-bold text-sm">
                                    ${excursion.price}
                                </div>
                                {wishlistButton && (
                                    <div className="ml-2">
                                        {wishlistButton}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {excursion.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="text-primary font-bold">
                                    ${excursion.price}
                                </div>
                                {wishlistButton && (
                                    <div className="ml-2">
                                        {wishlistButton}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
);