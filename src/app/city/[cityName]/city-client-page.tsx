
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
import { CAROUSEL_OPTS } from '@/lib/carousel-opts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryShowcase } from '@/components/city/category-showcase';
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
import { CITY_HERO_IMAGES } from '@/lib/hero-images';
import type { DestinationCategories } from '@/lib/city-categories';

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
    categories?: DestinationCategories;
    user: User | null;
}

/** Interest tabs for the "recommended for" section
    (Tiqets interest tag ids). */
const RECOMMENDED_TABS = [
    { id: 'adventure', label: 'Adventure seekers', tagId: '1191' },
    { id: 'entertainment', label: 'Entertainment enthusiasts', tagId: '1195' },
    { id: 'art', label: 'Art lovers', tagId: '1193' },
] as const;

type RecommendedTabId = (typeof RECOMMENDED_TABS)[number]['id'];

export default function CityClientPage({ 
    initialExcursions,
    allExcursionTypes,
    cityName,
    countryName,
    categories,
    user 
}: CityClientPageProps) {
    
    const [wishlistIds, setWishlistIds] = useState(new Set<string>());
    const [recommendedTab, setRecommendedTab] = useState<RecommendedTabId>('adventure');

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

    // Experiences for the selected "recommended for"
    // interest tab — nine per tab.
    const recommendedExcursions = useMemo(() => {
        const tab = RECOMMENDED_TABS.find((t) => t.id === recommendedTab);
        if (!tab) return [];
        return initialExcursions
            .filter((ex) => (Array.isArray(ex.tag_ids) ? ex.tag_ids : []).includes(tab.tagId))
            .slice(0, 9);
    }, [initialExcursions, recommendedTab]);
    
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

    // Construct hero image: the city's official Tiqets art first,
    // then the first valid image found among its excursions.
    const heroImage = useMemo(() => {
        const official = CITY_HERO_IMAGES[cityName.toLowerCase()];
        if (official) return official;

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
              <CategoryShowcase cityName={cityName} data={categories} />
            </section>
            
            <section>
                <h2 className="text-3xl font-bold mb-8">Top things to do in {cityName}</h2>
                 <Carousel opts={CAROUSEL_OPTS} className="w-full">
                    <CarouselContent className="-ml-4">
                        {topRatedExcursions.map((ex, index) => (
                             <CarouselItem key={ex.id} className="pl-4 basis-[90%] lg:basis-1/3 xl:basis-1/3">
                                 <div className="h-full py-4">
                                     <AttractionCard excursion={ex} rank={index+1} wishlistButton={renderWishlistButton(ex)} layout="horizontal" />
                                 </div>
                             </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                    <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                </Carousel>
            </section>
            
             <section>
                 <h2 className="text-3xl font-bold mb-8">Experiences in {cityName} recommended for</h2>
                 {/* Interest tabs */}
                 <div className="mb-8 flex flex-wrap gap-2">
                     {RECOMMENDED_TABS.map((tab) => (
                         <button
                             key={tab.id}
                             type="button"
                             onClick={() => setRecommendedTab(tab.id)}
                             className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                                 recommendedTab === tab.id
                                     ? 'bg-primary text-primary-foreground'
                                     : 'bg-[#F0F0F0] text-[#1A202C] hover:bg-[#E2E8F0]'
                             }`}
                         >
                             {tab.label}
                         </button>
                     ))}
                 </div>
                 {recommendedExcursions.length > 0 && (
                     <Carousel opts={CAROUSEL_OPTS} className="w-full">
                         <CarouselContent className="-ml-4">
                             {recommendedExcursions.map((ex, index) => (
                                 <CarouselItem key={ex.id} className="pl-4 basis-[85%] min-[481px]:basis-1/2 min-[769px]:basis-1/3 min-[1101px]:basis-1/4">
                                     <div className="h-full py-4">
                                         <AttractionCard excursion={ex} rank={index + 1} wishlistButton={renderWishlistButton(ex)} />
                                     </div>
                                 </CarouselItem>
                             ))}
                         </CarouselContent>
                         <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden min-[1101px]:flex" />
                         <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden min-[1101px]:flex" />
                     </Carousel>
                 )}
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

