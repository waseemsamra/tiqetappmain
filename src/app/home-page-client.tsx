
'use client';

import { useState, useEffect, useMemo } from 'react';
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

// City IDs for Tiqets API (known working cities)
const TARGET_CITIES = ['Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam'];

// UAE cities for the United Arab Emirates section
const UAE_CITIES = ['Dubai', 'Abu Dhabi', 'Sharjah'];

// Additional cities for tabs (stub data since API doesn't have them)
const ADDITIONAL_TAB_CITIES: string[] = [];

// Stub data for cities without Tiqets data
const STUB_EXCURSIONS: Record<string, Excursion[]> = {};

// Get city-specific excursions for homepage sections
const getCityExcursions = (allExcursions: Excursion[], cityName: string) => {
  // First try to get from API
  const apiExcursions = allExcursions.filter(ex => ex.city.toLowerCase() === cityName.toLowerCase())
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 10);
  
  // If no API data, use stub data
  if (apiExcursions.length === 0 && STUB_EXCURSIONS[cityName]) {
    return STUB_EXCURSIONS[cityName];
  }
  
  return apiExcursions;
};

export default function HomePageClient({ allExcursions, topRatedExcursions, heroContent }: HomePageClientProps) {
    const homePageData = useMemo(() => {
        const shuffledExcursions = [...allExcursions].sort((a, b) => simpleHash(a.id) - simpleHash(b.id));
        return {
            mostPopular: shuffledExcursions.slice(0, 8),
            handPicked: shuffledExcursions.slice(8, 18),
        }
    }, [allExcursions]);

    // Get city-specific excursions for tabs
    const allTabCities = [...TARGET_CITIES, ...UAE_CITIES, ...ADDITIONAL_TAB_CITIES];
    const cityExcursions: Record<string, Excursion[]> = {};
    allTabCities.forEach(city => {
      cityExcursions[city] = useMemo(() => getCityExcursions(allExcursions, city), [allExcursions]);
    });

    // Combined excursions for "Best places worldwide"
    const worldwideExcursions = useMemo(() => {
        const combined = TARGET_CITIES.flatMap(city => cityExcursions[city] || []);
        return combined.slice(0, 50);
    }, [cityExcursions]);

    // UAE excursions
    const uaeExcursions = useMemo(() => {
        return UAE_CITIES.flatMap(city => cityExcursions[city] || []).slice(0, 50);
    }, [cityExcursions]);

    const popularCountries = useMemo(() => {
        const countryCounts = allExcursions.reduce((acc, ex) => {
            acc[ex.country] = (acc[ex.country] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        return Object.keys(countryCounts)
            .sort((a, b) => countryCounts[b] - countryCounts[a])
            .slice(0, 8);
    }, [allExcursions]);
        
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
      />
      <AttractionListingSection
        title="Best places to visit worldwide"
        excursions={worldwideExcursions}
        showTabs={true}
        maxTabs={5}
        tabType="city"
      />
      <AttractionListingSection
        title="Top 10 things to do in Barcelona"
        excursions={cityExcursions['Barcelona'] || []}
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
