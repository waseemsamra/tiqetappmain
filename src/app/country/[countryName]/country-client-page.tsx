'use client';

import type { Excursion, ExcursionType, Country, City } from '@/types';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { AllExperiences } from '@/components/country/all-experiences';
import { CitiesSection } from '@/components/country/cities-section';
import { useState, useEffect, useMemo } from 'react';
import { FilterDialog } from '@/components/excursion-search/filter-sheet';
import { useAuth } from '@/app/auth-provider';
import { getWishlistIdsAction } from '@/app/actions';
import { WishlistButton } from '@/components/wishlist-button';
import { AttractionCard } from '@/components/attraction-card';

type User = { id: string; email?: string } | null;

interface CityWithExcursionCount extends City {
    excursionCount: number;
}

interface CountryClientPageProps {
    initialExcursions: Excursion[];
    allExcursionTypes: ExcursionType[];
    countryDetails: Country;
    cities: City[];
    user: User | null;
}

export default function CountryClientPage({
    initialExcursions,
    allExcursionTypes,
    countryDetails,
    cities,
    user
}: CountryClientPageProps) {
    const [wishlistIds, setWishlistIds] = useState(new Set<string>());

    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [selectedExcursionTypes, setSelectedExcursionTypes] = useState<string[]>([]);
    
    const countryName = countryDetails.name;

    useEffect(() => {
        if (user) {
            getWishlistIdsAction().then(ids => setWishlistIds(new Set(ids)));
        }
    }, [user]);

    // Count excursions per city
    const citiesWithCounts: CityWithExcursionCount[] = useMemo(() => {
        const counts = initialExcursions.reduce((acc, ex) => {
            const city = ex.city;
            if (city) {
                acc[city] = (acc[city] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);
        
        return cities.map(city => ({
            ...city,
            excursionCount: counts[city.name] || 0
        })).filter(city => counts[city.name] > 0);
    }, [initialExcursions, cities]);

    const activeExcursionTypes = useMemo(() => {
        const typeMap = new Map<string, ExcursionType>();
        initialExcursions.forEach(ex => {
            if (ex.excursionType) {
                typeMap.set(ex.excursionType.id, ex.excursionType);
            }
        });
        return Array.from(typeMap.values());
    }, [initialExcursions]);

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

    const heroImage = countryDetails.heroImage || 'https://aws-tiqets-cdn.imgix.net/images/content/b3f321f3770643ada7b10a1ac63ae6dd.jpg';

    return (
        <>
            <div className="container mx-auto px-4 py-8 space-y-16">
                {/* Hero Section - Small, Concise */}
                <header className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-8">
                    <Image 
                        src={heroImage}
                        alt={`Explore ${countryName}`} 
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h1 className="text-2xl md:text-3xl font-bold">Things to Do in {countryName}</h1>
                        <p className="text-sm md:text-base mt-1 opacity-90">
                            Explore {initialExcursions.length} top attractions and experiences
                        </p>
                    </div>
                </header>

                {/* Best Places to Visit - Cities with excursion counts */}
                <CitiesSection 
                    countryName={countryName} 
                    cities={citiesWithCounts}
                />

                {/* All Experiences */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold">All Experiences in {countryName}</h2>
                        <p className="text-gray-500 mt-2">{initialExcursions.length} options</p>
                    </div>
                    <AllExperiences
                        excursions={filteredExcursions}
                        onShowFilters={() => setIsFilterDialogOpen(true)}
                        selectedExcursionTypes={selectedExcursionTypes}
                        countryName={countryName}
                    />
                </section>
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