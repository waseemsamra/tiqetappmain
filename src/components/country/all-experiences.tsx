'use client';

import { useState } from 'react';
import type { Excursion } from '@/types';
import { Button } from '@/components/ui/button';
import { AttractionCard } from '@/components/attraction-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const INITIAL_VISIBLE_COUNT = 20;
const LOAD_MORE_COUNT = 20;

export function AllExperiences({ excursions, onShowFilters, selectedExcursionTypes, countryName }: { excursions: Excursion[], onShowFilters: () => void, selectedExcursionTypes: string[], countryName: string }) {
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    const excursionsToShow = excursions.slice(0, visibleCount);
    const canLoadMore = visibleCount < excursions.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + LOAD_MORE_COUNT);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold">All Experiences in {countryName}</h2>
                    <p className="text-gray-500 mt-1">{excursions.length} options</p>
                </div>
            </div>

            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                    {excursionsToShow.map(ex => (
                        <CarouselItem key={ex.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                            <div className="h-full py-4">
                                <AttractionCard excursion={ex} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
            </Carousel>

            {canLoadMore && (
                <div className="text-center mt-12">
                    <Button onClick={handleLoadMore} size="lg">
                        Load More Experiences
                    </Button>
                </div>
            )}
        </div>
    );
}