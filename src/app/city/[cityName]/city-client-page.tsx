
'use client';

import type { Excursion, ExcursionType } from '@/types';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryExplorer } from '@/components/country/category-explorer';
import { AllExperiences } from '@/components/country/all-experiences';
import { FaqSection } from '@/components/country/faq-section';
import { Separator } from '@/components/ui/separator';
import { AttractionCard } from '@/components/attraction-card';
import { useState, useEffect, useMemo } from 'react';
import { FilterDialog } from '@/components/excursion-search/filter-sheet';
import { useAuth } from '@/app/auth-provider';
import { getWishlistIdsAction } from '@/app/actions';
import { WishlistButton } from '@/components/wishlist-button';

type User = { id: string; email?: string } | null;

// Simple hash function for deterministic "shuffling" to avoid hydration errors.
const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

interface CityClientPageProps {
    initialExcursions: Excursion[];
    allExcursionTypes: ExcursionType[];
    cityName: string;
    countryName: string;
    user: User | null;
}

export default function CityClientPage({ 
    initialExcursions,
    allExcursionTypes,
    cityName,
    countryName,
    user 
}: CityClientPageProps) {
    
    const [wishlistIds, setWishlistIds] = useState(new Set<string>());

    // Centralized filter state
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [selectedExcursionTypes, setSelectedExcursionTypes] = useState<string[]>([]);
    
    useEffect(() => {
        if (user) {
            getWishlistIdsAction().then(ids => setWishlistIds(new Set(ids)));
        }
    }, [user]);

    const activeExcursionTypes = useMemo(() => {
        const typeMap = new Map<string, ExcursionType>();
        initialExcursions.forEach(ex => {
            if (ex.excursionType) {
                typeMap.set(ex.excursionType.id, ex.excursionType);
            }
        });
        return Array.from(typeMap.values());
    }, [initialExcursions]);

    const topRatedExcursions = useMemo(() => 
        [...initialExcursions].sort((a, b) => b.rating - a.rating).slice(0, 10),
    [initialExcursions]);

    const recommendationTabs = useMemo(() => {
        const typeCounts = initialExcursions.reduce((acc, ex) => {
            const typeName = ex.excursionType?.name;
            if (typeName && !typeName.includes('+')) {
                acc[typeName] = (acc[typeName] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const sortedTypes = Object.keys(typeCounts)
            .sort((a, b) => typeCounts[b] - typeCounts[a])
            .slice(0, 3);
        
        return sortedTypes.map(typeName => {
            const excursionsInType = initialExcursions.filter(ex => ex.excursionType.name === typeName);
            const tabName = typeName;

            return {
                name: tabName,
                value: typeName.toLowerCase().replace(/ /g, '-'),
                excursions: excursionsInType.sort((a, b) => simpleHash(a.id) - simpleHash(b.id)).slice(0, 10),
            }
        }).filter(tab => tab.excursions.length > 0);
    }, [initialExcursions]);

    const handPickedExcursions = useMemo(() => 
        [...initialExcursions].sort((a, b) => simpleHash(a.id) - simpleHash(b.id)).slice(0, 10),
    [initialExcursions]);
    
    const categoriesMap: Map<string, { name: string; excursions: Excursion[] }> = useMemo(() => {
        const map = new Map();
        initialExcursions.forEach(ex => {
            if (ex.excursionType) {
                if (!map.has(ex.excursionType.name)) {
                    map.set(ex.excursionType.name, { name: ex.excursionType.name, excursions: [] });
                }
                map.get(ex.excursionType.name)!.excursions.push(ex);
            }
        });
        return map;
    }, [initialExcursions]);

    const categories = useMemo(() => 
        Array.from(categoriesMap.values()).map(cat => ({
            name: cat.name,
            experienceCount: cat.excursions.length,
            image: cat.excursions[0]?.images[0] || 'https://placehold.co/400x300.png',
        })),
    [categoriesMap]);
    
    const handleExcursionTypeChange = (typeId: string) => {
        setSelectedExcursionTypes(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(typeId)) {
                newSelection.delete(typeId);
            } else {
                newSelection.add(typeId);
            }
            return Array.from(newSelection);
        });
    };
    
    const filteredExcursions = useMemo(() => {
        if (selectedExcursionTypes.length === 0) {
            return initialExcursions;
        }
        return initialExcursions.filter(excursion => 
            selectedExcursionTypes.includes(excursion.activitytypeid)
        );
    }, [initialExcursions, selectedExcursionTypes]);

    const renderWishlistButton = (excursion: Excursion) => {
        if (!user) return null;
        return <WishlistButton activityId={excursion.id} isInitialWishlisted={wishlistIds.has(excursion.id)} />;
    };

    return (
        <>
        <div className="container mx-auto px-4 py-8 space-y-16">
            <header className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                <Image 
                  src="https://picsum.photos/seed/12/1200/400" 
                  alt={`Things to do in ${cityName}`} 
                  fill 
                  className="object-cover"
                  data-ai-hint="city skyline"
                 />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Things to do in {cityName}</h1>
                    <p className="mt-2 text-lg max-w-2xl">
                       Explore the best attractions, tours, and experiences {cityName} has to offer.
                    </p>
                </div>
            </header>

            <section>
                 <CategoryExplorer 
                    categories={categories} 
                    countryName={countryName}
                    cityName={cityName}
                    onShowAll={() => setIsFilterDialogOpen(true)}
                 />
            </section>
            
            <section>
                <h2 className="text-3xl font-bold mb-8">Top 10 things to do</h2>
                 <Carousel opts={{ align: "start", loop: false }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {topRatedExcursions.map((ex, index) => (
                             <CarouselItem key={ex.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                                <div className="h-full py-4">
                                    <AttractionCard excursion={ex} rank={index+1} wishlistButton={renderWishlistButton(ex)} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                    <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                </Carousel>
            </section>
            
             <section>
                <h2 className="text-3xl font-bold mb-8">Experiences in {cityName} recommended for you</h2>
                 {recommendationTabs.length > 0 && (
                    <Tabs defaultValue={recommendationTabs[0].value} className="w-full">
                        <TabsList>
                            {recommendationTabs.map(tab => (
                                <TabsTrigger key={tab.value} value={tab.value}>{tab.name}</TabsTrigger>
                            ))}
                        </TabsList>
                        {recommendationTabs.map(tab => (
                            <TabsContent key={tab.value} value={tab.value} className="pt-6">
                                <Carousel opts={{ align: "start" }} className="w-full">
                                    <CarouselContent className="-ml-4">
                                        {tab.excursions.map(ex => (
                                            <CarouselItem key={ex.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                                                <div className="h-full py-4"><AttractionCard excursion={ex} wishlistButton={renderWishlistButton(ex)} /></div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                                    <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                                </Carousel>
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </section>
            
            <section>
                <h2 className="text-3xl font-bold mb-8">Hand-picked combinations in {cityName}</h2>
                 <Carousel opts={{ align: "start", loop: false }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {handPickedExcursions.map(ex => (
                             <CarouselItem key={ex.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                                <div className="h-full py-4">
                                    <AttractionCard excursion={ex} wishlistButton={renderWishlistButton(ex)} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                    <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                </Carousel>
            </section>

            <section>
                <AllExperiences 
                    excursions={filteredExcursions} 
                    onShowFilters={() => setIsFilterDialogOpen(true)}
                    selectedExcursionTypes={selectedExcursionTypes}
                    countryName={cityName}
                />
            </section>
            
             <div className="space-y-16">
                <Separator />
                <FaqSection countryName={cityName} />
            </div>

        </div>
        <FilterDialog
            isOpen={isFilterDialogOpen}
            onOpenChange={setIsFilterDialogOpen}
            excursionTypes={activeExcursionTypes}
            allExcursions={initialExcursions}
            selectedExcursionTypes={selectedExcursionTypes}
            onExcursionTypeChange={handleExcursionTypeChange}
        />
        </>
    );
}
