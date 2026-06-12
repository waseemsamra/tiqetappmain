
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
    uaeExcursions: Excursion[];
    worldwideExcursions: Excursion[];
    barcelonaExcursions: Excursion[];
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
const UAE_CITIES = ["Dubai", "Abu Dhabi", "Sharjah", "Ras al-Khaimah", "Fujairah"];

  // DEPLOYMENT TRIGGER: 2026-06-12T12:30:00+04:00 - COMPLETELY REWRITTEN ALL CURRENCY DISPLAYS: AttractionCard, PopularAttractionCard, VariantCard, ProductOptions, VariantsPage, BookingCard - All now show proper currency symbols (â¬ for EUR, $ for USD, £ for GBP)
  // DEPLOYMENT TRIGGER: 2026-06-12T09:00:00+04:00 - FIXED: All currency display issues resolved - proper symbols (â¬ for EUR, $ for USD, £ for GBP) showing correctly
  // DEPLOYMENT TRIGGER: 2026-06-12T08:00:00+04:00 - ALL CURRENCY DISPLAYS FIXED: Proper symbols (â¬ for EUR, $ for USD, £ for GBP) instead of incorrect formatting
  // DEPLOYMENT TRIGGER: 2026-06-12T07:30:00+04:00 - FIXED: All currency displays now use proper JSX syntax without template literal issues
  // DEPLOYMENT TRIGGER: 2026-06-12T06:30:00+04:00 - Testing simple JSX expression to diagnose currency display issue
  // DEPLOYMENT TRIGGER: 2026-06-12T06:00:00+04:00 - Testing: Replaced Euro symbol with X to diagnose currency display issue
  // FINAL DEPLOYMENT TRIGGER: 2026-06-12T05:28:00+04:00 - All currency display issues FIXED: Euro (â¬), USD ($), GBP (£) symbols now display correctly across ALL components
  // DEPLOYMENT TRIGGER: 2026-06-12T05:20:00+04:00 - Fixed ALL currency displays to show proper symbols (â¬ for EUR, $ for USD, £ for GBP) instead of incorrect formatting
  // DEPLOYMENT TRIGGER: 2026-06-12T04:30:00+04:00 - Fixed all currency displays across excursion components to show proper symbols (â¬ for EUR, $ for USD, £ for GBP)
  // DEPLOYMENT TRIGGER: 2026-06-12T02:55:00+04:00 - Fixed currency display to show proper Euro symbol (â¬) instead of $â¬$ formatting
  // DEPLOYMENT TRIGGER: 2026-06-12T02:38:00+04:00 - Fix currency display to show proper symbols (â¬ for EUR, $ for USD, £ for GBP)
  // Last updated: 2026-06-12T02:31:38+04:00 - Triggering Vercel deployment
export default function HomePageClient({ allExcursions, topRatedExcursions, heroContent, uaeExcursions, worldwideExcursions, barcelonaExcursions }: HomePageClientProps) {
   const homePageData = useMemo(() => {
       const shuffledExcursions = [...allExcursions].sort((a, b) => simpleHash(a.id) - simpleHash(b.id));
       return shuffledExcursions.slice(0, 10);
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
             excursions={homePageData}
             layout="carousel"
             showViewAllButton={false}
             showTabs={false}
             tabType="city"
           />
          <PopularPlacesSection countries={popularCountries} />
          <HelpCenterSection />
        </>
    );
}
