'use client';

import Image from 'next/image';
import { StarRating } from "@/components/star-rating";
import { MapPin } from 'lucide-react';
import type { Excursion, ExcursionType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { imageUrlFor } from '@/lib/tiqets-image';
import { formatPrice } from '@/lib/currency';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';


export const ExcursionCard = ({ excursion, wishlistButton }: { excursion: Excursion, wishlistButton?: React.ReactNode | null }) => {
    const typeName = excursion.excursionType?.name || 'Excursion';
    const cityName = excursion.city || 'Unknown City';
    const countryName = excursion.country || 'Unknown Country';
    const router = useRouter();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleClick = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      setIsNavigating(true);
      router.push(`/excursions/${excursion.id}`);
    }, [excursion.id, router]);

    return (
        <Card className={`overflow-hidden h-full flex flex-col rounded-xl shadow-md transition-all duration-100 ${isNavigating ? 'opacity-60 scale-[0.99]' : 'hover:shadow-lg hover:-translate-y-0.5'} group relative`} onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(e as unknown as React.MouseEvent); } }}>
            {wishlistButton && (
                <div className="absolute top-3 right-3 z-10">
                    {wishlistButton}
                </div>
            )}
             <div className="relative aspect-[4/3]">
                  {excursion.images?.[0] && excursion.images?.[0].length > 0 && (
                    <Image
                    src={imageUrlFor(excursion.images?.[0], 'card')}
                    alt={excursion.name}
                    fill
                    className={`object-cover transition-transform duration-300 ${isNavigating ? 'scale-100' : 'group-hover:scale-105'}`}
                    data-ai-hint="attraction"
                    unoptimized
                    />
                  )}
             </div>
            <CardContent className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors mt-1 line-clamp-2">{excursion.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {cityName}, {countryName}
                </p>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                    <StarRating rating={excursion.rating} reviewCount={excursion.reviewsTotal} />
                    <div className="text-right">
                    <span className="text-xs text-gray-500">From</span>
                    <p className="font-bold text-lg text-gray-900">{formatPrice(excursion.price, excursion.currency)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};