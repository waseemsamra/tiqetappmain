
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
import FaqSection from '@/components/country/faq-section';
import { Separator } from '@/components/ui/separator';
import { AttractionCard } from '@/components/attraction-card';
import { useState, useEffect, useMemo } from 'react';
import { FilterDialog } from '@/components/excursion-search/filter-sheet';
import { useAuth } from '@/app/auth-provider';
import { getWishlistIdsAction } from '@/app/actions';
import { WishlistButton } from '@/components/wishlist-button';
import { useTiqetsTags } from '@/hooks/use-tiqets-tags';

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
    cityName,
    countryName,
    user 
}: CityClientPageProps) {
    
    const [wishlistIds, setWishlistIds] = useState(new Set<string>());

    // Centralized filter state
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
    const { tags, loading: tagsLoading } = useTiqetsTags();
    
    useEffect(() => {
        if (user) {
            getWishlistIdsAction().then(ids => setWishlistIds(new Set(ids)));
        }
    }, [user]);

    const topRatedExcursions = useMemo(() => 
        [...initialExcursions].sort((a, b) => {
            const ratingA = a.rating ?? 0;
            const ratingB = b.rating ?? 0;
            return ratingB - ratingA;
        }).slice(0, 10),
    [initialExcursions]);

    const handPickedExcursions = useMemo(() => 
        [...initialExcursions].sort((a, b) => simpleHash(a.id) - simpleHash(b.id)).slice(0, 10),
    [initialExcursions]);
    
    const filteredExcursions = useMemo(() => {
        if (selectedTagIds.length === 0) return initialExcursions;
        return initialExcursions.filter(excursion => {
            const tagIds = Array.isArray(excursion.tag_ids) ? excursion.tag_ids : [];
            return tagIds.some((tid: string) => selectedTagIds.includes(tid));
        });
    }, [initialExcursions, selectedTagIds]);
    
    const renderWishlistButton = (excursion: Excursion) => {
        if (!user) return null;
        return <WishlistButton activityId={excursion.id} isInitialWishlisted={wishlistIds.has(excursion.id)} />;
    };

    // Construct hero image from excursions - use first valid image found
    const heroImage = useMemo(() => {
        // Try to find an image from top rated excursions first
        const imageFromTopRated = topRatedExcursions.find(ex => 
          ex.images && ex.images.length > 0 && ex.images[0] && ex.images[0].length > 0
        )?.images?.[0];
        
        if (imageFromTopRated) return imageFromTopRated;
        
        // Fallback to hand picked excursions
        const imageFromHandPicked = handPickedExcursions.find(ex => 
          ex.images && ex.images.length > 0 && ex.images[0] && ex.images[0].length > 0
        )?.images?.[0];
        
        if (imageFromHandPicked) return imageFromHandPicked;
        
        // Fallback to filtered excursions
        const imageFromFiltered = filteredExcursions.find(ex => 
          ex.images && ex.images.length > 0 && ex.images[0] && ex.images[0].length > 0
        )?.images?.[0];
        
        return imageFromFiltered || null; // Return null if no valid image found
    }, [topRatedExcursions, handPickedExcursions, filteredExcursions]);

     return (
         <>
         <div className="container mx-auto px-4 py-8 space-y-16">
              <header className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                 {heroImage && (
                   <Image
                     src={heroImage}
                     alt={`Things to do in ${cityName}`}
                     fill
                     className="object-cover"
                     data-ai-hint="city header"
                     unoptimized
                   />
                 )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Things to do in {cityName}</h1>
                    <p className="mt-2 text-lg max-w-2xl">
                       Explore the best attractions, tours, and experiences {cityName} has to offer.
                    </p>
                </div>
              </header>

            <section>
                 <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Categories</h2>
                    {tagsLoading && <span className="text-sm text-muted-foreground">Loading categories...</span>}
                 </div>
                 <CategoryExplorer 
                    tags={tags}
                    allTags={tags}
                    countryName={countryName}
                    cityName={cityName}
                    onShowAll={() => setIsFilterDialogOpen(true)}
                    selectedTagIds={selectedTagIds}
                    onSelectTag={(tagId) => setSelectedTagIds(prev => prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId])}
                    excursions={initialExcursions}
                 />
            </section>
            
            <section>
                <h2 className="text-3xl font-bold mb-8">Top things to do in {cityName}</h2>
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
                <AllExperiences 
                    excursions={filteredExcursions} 
                    onShowFilters={() => setIsFilterDialogOpen(true)}
                    selectedTagIds={selectedTagIds}
                    countryName={cityName}
                />
            </section>
            
             <div className="space-y-16">
        <Separator />
        <FaqSection />
            </div>

        </div>
        <FilterDialog
            isOpen={isFilterDialogOpen}
            onOpenChange={setIsFilterDialogOpen}
            tags={tags}
            allExcursions={initialExcursions}
            selectedTags={selectedTagIds}
            onTagChange={(tagId) => setSelectedTagIds(prev => prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId])}
        />
        </>
    );
}

