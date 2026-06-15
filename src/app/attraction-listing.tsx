"use client";
import { useMemo, useState } from 'react';
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
        {image && image.length > 0 && (
            <Image src={image} alt={city} width={40} height={40} className="rounded-full object-cover border-2 border-transparent group-hover:border-primary" unoptimized />
        )}
        <span className={cn("font-medium", isActive ? 'text-primary' : 'text-foreground')}>{city}</span>
        {isActive && <div className="absolute bottom-[-17px] left-0 w-full h-0.5 bg-primary rounded-full" />}
    </button>
);

const CountryTab = ({ country, isActive, onClick }: { country: string, isActive: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick} 
        className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-muted relative shrink-0"
    >
        <span className={cn("font-medium", isActive ? 'text-primary' : 'text-foreground')}>{country}</span>
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
    tabs?: string[];
}

export default function AttractionListingSection({
    title,
    excursions,
    showViewAllButton = true,
    layout = 'carousel',
    user = null,
    wishlistIds = new Set(),
    showTabs = true,
    tabType,
    maxTabs,
    tabs
}: AttractionListingSectionProps) {
    const cities = useMemo(() => {
        if (tabs && tabType === 'city') {
            const lowerNameToTab = new Map(tabs.map(n => [n.toLowerCase(), n]));
            return tabs.map(name => {
                const lower = name.toLowerCase();
                const match = excursions.find(ex => (ex.city || '').toLowerCase().includes(lower));
                return {
                    name,
                    image: match?.images?.[0] && match.images?.[0].length > 0 ? match.images?.[0] : null,
                };
            });
        }
        const cityMap = new Map<string, { name: string, image: string }>();
        excursions.forEach(ex => {
            if (!cityMap.has(ex.city)) {
                cityMap.set(ex.city, { 
                    name: ex.city, 
                    image: (ex.images?.[0] && ex.images?.[0].length > 0 ? ex.images?.[0] : null) 
                });
            }
        });
        const allCities = Array.from(cityMap.values());
        return maxTabs ? allCities.slice(0, maxTabs) : allCities;
    }, [excursions, maxTabs, tabs, tabType]);

    const countries = useMemo(() => {
        if (tabs && tabType === 'country') {
            const lowerNameToTab = new Map(tabs.map(n => [n.toLowerCase(), n]));
            return tabs.map(name => {
                const lower = name.toLowerCase();
                const match = excursions.find(ex => (ex.country || '').toLowerCase().includes(lower));
                return {
                    name,
                    image: match?.images?.[0] && match.images?.[0].length > 0 ? match.images?.[0] : null,
                };
            });
        }
        const countryMap = new Map<string, { name: string, image: string }>();
        excursions.forEach(ex => {
            if (!countryMap.has(ex.country)) {
                countryMap.set(ex.country, { 
                    name: ex.country, 
                    image: (ex.images?.[0] && ex.images?.[0].length > 0 ? ex.images?.[0] : null) 
                });
            }
        });
        const allCountries = Array.from(countryMap.values());
        return maxTabs ? allCountries.slice(0, maxTabs) : allCountries;
    }, [excursions, maxTabs, tabs, tabType]);

    const [activeTab, setActiveTab] = useState<string | null>(
        tabType === 'country' 
            ? (countries.length > 0 ? countries[0].name : null)
            : (cities.length > 0 ? cities[0].name : null)
    );

    const filteredExcursions = useMemo(() => {
        if (showTabs && activeTab) {
            if (tabType === 'country') {
                return excursions.filter(ex => (ex.country || '').toLowerCase().includes(activeTab.toLowerCase()));
            }
            return excursions.filter(ex => (ex.city || '').toLowerCase().includes(activeTab.toLowerCase()));
        }
        return excursions;
    }, [activeTab, excursions, showTabs, tabType]);

    const renderGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExcursions.map((excursion) => (
                <div key={excursion.id} className="h-full">
                    <AttractionCard
                        excursion={excursion}
                        wishlistButton={user ? <WishlistButton activityId={excursion.id} isInitialWishlisted={wishlistIds.has(excursion.id)} /> : undefined}
                        layout="horizontal"
                    />
                </div>
            ))}
        </div>
    );

    const renderCarousel = () => {
        const carouselKey = showTabs && activeTab ? activeTab : 'all';
        return (
            <div className="relative">
                <Carousel
                    key={carouselKey}
                    opts={{ align: "start", loop: false }}
                    className="w-full"
                >
                    {showTabs && tabs && tabs.length > 1 && tabType === 'city' && (
                        <div className="flex items-center gap-4 border-b overflow-x-auto pb-4 mb-4">
                            {cities.map(city => (
                                <CityTab
                                    key={city.name}
                                    city={city.name}
                                    image={city.image}
                                    isActive={activeTab === city.name}
                                    onClick={() => setActiveTab(city.name as string)}
                                />
                            ))}
                        </div>
                    )}

                    {showTabs && tabs && tabs.length > 1 && tabType === 'country' && (
                        <div className="flex items-center gap-4 border-b overflow-x-auto pb-4 mb-4">
                            {countries.map(country => (
                                <CountryTab
                                    key={country.name}
                                    country={country.name}
                                    isActive={activeTab === country.name}
                                    onClick={() => setActiveTab(country.name as string)}
                                />
                            ))}
                        </div>
                    )}

                    <CarouselContent className="-ml-4">
                        {filteredExcursions.map((excursion) => (
                            <CarouselItem key={excursion.id} className="pl-4 basis-[90%] lg:basis-1/3 xl:basis-1/3">
                                <div className="h-full py-4">
                                    <AttractionCard
                                        excursion={excursion}
                                        wishlistButton={user ? <WishlistButton activityId={excursion.id} isInitialWishlisted={wishlistIds.has(excursion.id)} /> : undefined}
                                        layout="horizontal"
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
    };

    if (!excursions || excursions.length === 0) {
        return null;
    }

    const getExploreUrl = () => {
        if (tabType === 'country') {
            return `/country/${encodeURIComponent(activeTab || '')}`;
        }
        return `/city/${encodeURIComponent(activeTab || '')}`;
    };

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
                    <Link href={getExploreUrl()}>
                        <Button variant="outline" className="w-full md:w-auto">
                            Explore {activeTab || 'All'} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
