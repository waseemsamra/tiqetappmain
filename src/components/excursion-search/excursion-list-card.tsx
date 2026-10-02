'use client';

import Image from 'next/image';
import { StarRating } from "@/components/star-rating";
import { MapPin } from 'lucide-react';
import type { Excursion, ExcursionType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { imageUrlFor } from '@/lib/tiqets-image';
import { formatPrice } from '@/lib/currency';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';


export const ExcursionListCard = ({ excursion, wishlistButton }: { excursion: Excursion, wishlistButton?: React.ReactNode | null }) => {
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
        <Card className={`overflow-hidden rounded-xl shadow-md transition-all duration-100 ${isNavigating ? 'opacity-60 scale-[0.99]' : 'hover:shadow-lg hover:-translate-y-0.5'} group relative`} onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(e as unknown as React.MouseEvent); } }}>
             {wishlistButton && (
                <div className="absolute top-3 right-3 z-10">
                    {wishlistButton}
                </div>
            )}
            <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3 aspect-video md:aspect-auto">
                      {excursion.images?.[0] && excursion.images?.[0].length > 0 ? (
                        <Image
                          src={imageUrlFor(excursion.images?.[0], 'list')}
                          alt={excursion.name}
                          fill
                          className={`object-cover transition-transform duration-300 ${isNavigating ? 'scale-100' : 'group-hover:scale-105'}`}
                          data-ai-hint="attraction"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                          No image
                        </div>
                      )}
                </div>
                <div className="flex flex-col flex-grow p-4 md:w-2/3">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{typeName}</p>
                    <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors mt-1 line-clamp-2">{excursion.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {cityName}, {countryName}
                    </p>
                    <div className="mt-auto pt-4 flex items-end justify-between">
                        <StarRating rating={excursion.rating} reviewCount={excursion.reviewsTotal} />
                        <div className="text-right">
                            <span className="text-xs text-gray-500">From</span>
                            <p className="font-bold text-2xl text-gray-900">{formatPrice(excursion.price, excursion.currency)}</p>
                            <Button size="sm" className="mt-2" onClick={(e) => { e.stopPropagation(); handleClick(e); }}>View Details</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};