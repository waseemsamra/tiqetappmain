
'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Excursion, HeroContent } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AttractionCard } from '@/components/attraction-card';
import { WishlistButton } from '@/components/wishlist-button';

import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const CityTab = ({ city, image, isActive, onClick }: { city: string, image: string, isActive: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick} 
        className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-muted relative shrink-0"
    >
        <Image src={image} alt={city} width={40} height={40} className="rounded-full object-cover border-2 border-transparent group-hover:border-primary" />
        <span className={cn("font-medium", isActive ? 'text-primary' : 'text-foreground')}>{city}</span>
        {isActive && <div className="absolute bottom-[-17px] left-0 w-full h-0.5 bg-primary rounded-full" />}
    </button>
);


interface AttractionListingSectionProps {
    title: string;
    excursions: Excursion[];
    showViewAllButton?: boolean;
    layout?: 'carousel' | 'grid';
    user?: any;
    wishlistIds?: Set<string>;
    showTabs?: boolean;
    tabType?: 'country' | 'city' | undefined;
    maxTabs?: number;
}

export default function AttractionListingSection({ title, excursions, showViewAllButton = true, layout = 'carousel', user = null, wishlistIds = new Set(), showTabs = true, tabType, maxTabs }: AttractionListingSectionProps) {
    const cities = useMemo(() => {
        const cityMap = new Map<string, { name: string, image: string }>();
        excursions.forEach(ex => {
            if (!cityMap.has(ex.city)) {
                cityMap.set(ex.city, { name: ex.city, image: ex.images?.[0] || 'https://placehold.co/40x40.png' });
            }
        });
        const allCities = Array.from(cityMap.values());
        // If maxTabs is set, limit to first N cities
        return maxTabs ? allCities.slice(0, maxTabs) : allCities;
    }, [excursions, maxTabs]);

    const [activeCity, setActiveCity] = useState<string | null>(cities.length > 0 ? cities[0].name : null);
    
    const filteredExcursions = useMemo(() => {
        if (showTabs && activeCity && layout === 'carousel') {
             return excursions.filter(ex => ex.city === activeCity);
        }
        return excursions;
    }, [activeCity, excursions, layout, showTabs]);

    const renderGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {excursions.map((excursion) => (
                <div key={excursion.id} className="h-full">
                   <AttractionCard 
                        excursion={excursion} 
                        wishlistButton={user ? <WishlistButton activityId={excursion.id} isInitialWishlisted={wishlistIds.has(excursion.id)} /> : undefined}
                    />
               </div>
           ))}
       </div>
    );

    const renderCarousel = () => (
      <div className="relative">
        <Carousel 
            opts={{ align: "start", loop: false }}
            className="w-full"
        >
            {showTabs && cities.length > 1 && (
                <div className="flex items-center gap-4 border-b overflow-x-auto pb-4 mb-4">
                    {cities.map(city => (
                        <CityTab 
                            key={city.name} 
                            city={city.name} 
                            image={city.image}
                            isActive={activeCity === city.name}
                            onClick={() => setActiveCity(city.name)}
                        />
                    ))}
                </div>
            )}
            
            <CarouselContent className="-ml-4">
                {filteredExcursions.map((excursion) => (
                    <CarouselItem key={excursion.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3 pl-4">
                       <div className="h-full py-4">
                         <AttractionCard 
                            excursion={excursion} 
                            wishlistButton={user ? <WishlistButton activityId={excursion.id} isInitialWishlisted={wishlistIds.has(excursion.id)} /> : undefined}
                         />
                       </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
<CarouselPrevious className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
              <CarouselNext className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
        </Carousel>
      </div>
    );
    
    if (!excursions || excursions.length === 0) {
        return null; // Don't render the section if there are no excursions
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 text-left mb-4 md:mb-0">
                    {title}
                </h2>
            </div>
            
            {layout === 'grid' ? renderGrid() : renderCarousel()}

            {showViewAllButton && layout === 'carousel' && (
                <div className="mt-8 text-left">
                    <Link href={`/city/${encodeURIComponent(activeCity || '')}`}>
                        <Button variant="outline">
                            Explore {activeCity || 'All'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

