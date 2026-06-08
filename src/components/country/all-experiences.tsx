'use client';

import { useState } from 'react';
import type { Excursion } from '@/types';
import { Button } from '@/components/ui/button';
import { AttractionCard } from '@/components/attraction-card';

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {excursionsToShow.map(ex => (
                    <AttractionCard key={ex.id} excursion={ex} />
                ))}
            </div>

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