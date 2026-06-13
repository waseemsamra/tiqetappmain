

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import type { Excursion, ExcursionType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount?: number }) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
        ))}
        <span className="text-sm font-bold text-gray-800">{rating.toFixed(1)}</span>
    </div>
);


export const ExcursionCard = ({ excursion, wishlistButton }: { excursion: Excursion, wishlistButton?: React.ReactNode | null }) => {
    const typeName = excursion.excursionType?.name || 'Excursion';
    const cityName = excursion.city || 'Unknown City';
    const countryName = excursion.country || 'Unknown Country';
    
    return (
        <Card className="overflow-hidden h-full flex flex-col rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group relative">
            {wishlistButton && (
                <div className="absolute top-3 right-3 z-10">
                    {wishlistButton}
                </div>
            )}
            <Link href={`/excursions/${excursion.id}`} className="block h-full flex flex-col">
                <div className="relative aspect-[4/3]">
                     <Image
                     src={excursion.images?.[0] && excursion.images?.[0].length > 0 ? excursion.images?.[0] : 'https://placehold.co/400x300.png'}
                     alt={excursion.name}
                     fill
                     className="object-cover group-hover:scale-105 transition-transform duration-300"
                     data-ai-hint="attraction"
                     />
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-base leading-snug group-hover:text-primary transition-colors mt-1 line-clamp-2">{excursion.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {cityName}, {countryName}
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                        <StarRating rating={excursion.rating} />
                        <div className="text-right">
                        <span className="text-xs text-gray-500">From</span>
                        <p className="font-bold text-lg text-gray-900">${excursion.price.toFixed(2)}</p>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};
