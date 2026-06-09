
'use client';

import { useMemo } from 'react';
import type { Excursion, HeroContent } from '@/types';
import HeroSection from '@/components/hero-section';
import AttractionListingSection from '@/app/attraction-listing';
import FeatureCards from '@/components/feature-cards';
import HelpCenterSection from '@/components/help-center-section';
import PopularPlacesSection from '@/components/popular-places';

interface HomePageClientProps {
    allExcursions: Excursion[];
    topRatedExcursions: Excursion[];
    heroContent: HeroContent;
}

const simpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
    }
    return hash;
};

const TARGET_CITIES = ['Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam'];
const UAE_CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah'];

export default function HomePageClient({ allExcursions, topRatedExcursions, heroContent }: HomePageClientProps) {
    const homePageData = useMemo(() => {
        const shuffledExcursions = [...allExcursions].sort((a, b) => simpleHash(a.id) - simpleHash(b.id));
        return {
            mostPopular: shuffledExcursions.slice(0, 8),
            handPicked: shuffledExcursions.slice(8, 18),
        }
    }, [allExcursions]);

    const popularCountries = useMemo(() => {
        const countryCounts = allExcursions.reduce((acc, ex) => {
            acc[ex.country] = (acc[ex.country] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        return Object.keys(countryCounts)
            .sort((a, b) => countryCounts[b] - countryCounts[a])
            .slice(0, 8);
    }, [allExcursions]);

    // Group excursions by city, ensuring we have at least some for each target city
    const cityExcursions = useMemo(() => {
        const grouped: Record<string, Excursion[]> = {};
        TARGET_CITIES.forEach(city => {
            grouped[city] = allExcursions.filter(ex => ex.city.toLowerCase() === city.toLowerCase()).slice(0, 10);
        });
        return grouped;
    }, [allExcursions]);

    const uaeCityExcursions = useMemo(() => {
        const grouped: Record<string, Excursion[]> = {};
        UAE_CITIES.forEach(city => {
            grouped[city] = allExcursions.filter(ex => ex.city.toLowerCase() === city.toLowerCase()).slice(0, 10);
        });
        return grouped;
    }, [allExcursions]);
    
    const barcelonaExcursions = useMemo(() => {
        return allExcursions.filter(ex => ex.city.toLowerCase() === 'barcelona').slice(0, 10);
    }, [allExcursions]);
    
    // Combine all target city excursions for worldwide section
    const worldwideExcursions = useMemo(() => {
        return TARGET_CITIES.flatMap(city => cityExcursions[city] || []).slice(0, 50);
    }, [cityExcursions]);

    // Combine all UAE city excursions
    const uaeExcursions = useMemo(() => {
        return UAE_CITIES.flatMap(city => uaeCityExcursions[city] || []).slice(0, 50);
    }, [uaeCityExcursions]);
    
    return (
        <>
          <HeroSection content={heroContent} />
          <FeatureCards />
          <AttractionListingSection
            title="Best places to visit in United Arab Emirates"
            excursions={uaeExcursions}
            showTabs={true}
            maxTabs={5}
            tabType="city"
            tabs={UAE_CITIES}
          />
          <AttractionListingSection
            title="Best places to visit worldwide"
            excursions={worldwideExcursions}
            showTabs={true}
            maxTabs={5}
            tabType="city"
            tabs={TARGET_CITIES}
          />
          <AttractionListingSection
            title="Top 10 things to do in Barcelona"
            excursions={barcelonaExcursions}
            layout="carousel"
            showViewAllButton={false}
            showTabs={false}
          />
           <AttractionListingSection
            title="Most popular things to do"
            excursions={homePageData.mostPopular}
            layout="grid"
            showViewAllButton={false}
            showTabs={false}
            tabType="city"
          />
          <PopularPlacesSection countries={popularCountries} />
          <HelpCenterSection />
        </>
    );
}
