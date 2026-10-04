
'use client';

import { useMemo } from 'react';
import type { Excursion, HeroContent } from '@/types';
import HeroSection from '@/components/hero-section';
import AttractionListingSection from '@/app/attraction-listing';
import FeatureCards from '@/components/feature-cards';
import HelpCenterSection from '@/components/help-center-section';
import PopularPlacesSection from '@/components/popular-places';
import { LanguageProvider, useT } from '@/components/language-provider';

interface HomePageClientProps {
    allExcursions: Excursion[];
    topRatedExcursions: Excursion[];
    heroContent: HeroContent;
    /** Experiences in the visitor's own country; falls back to the UAE. */
    featuredExcursions: Excursion[];
    /** Already-translated heading, e.g. "Best places to visit in Singapore". */
    featuredTitle: string;
    /** Cities with inventory in that country, used for the tab row. */
    featuredCities: string[];
    /** City to working cover image; a delisted image resolves to a live one. */
    cityImages?: Map<string, string>;
    worldwideExcursions: Excursion[];
    topCityExcursions: Excursion[];
    topCityName: string;
    /** UI language code from the visitor's cookie, e.g. `de`. */
    language: string;
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

const TARGET_CITIES = ['Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam', 'Singapore', 'Kuala Lumpur', 'Bangkok'];

function HomeSections({ 
    allExcursions, 
    topRatedExcursions, 
    heroContent, 
    featuredExcursions,
    featuredTitle,
    featuredCities,
    cityImages,
    worldwideExcursions, 
    topCityExcursions, 
    topCityName
}: HomePageClientProps) {
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

    const t = useT();

    return (
        <div className="home-compact">
            <HeroSection content={heroContent} />
            <FeatureCards />
            <AttractionListingSection
                title={featuredTitle}
                excursions={featuredExcursions}
                showTabs={true}
                maxTabs={5}
                tabType="city"
                tabs={featuredCities}
                cityImages={cityImages}
            />
            <AttractionListingSection
                title={t('home.bestPlacesWorldwide')}
                excursions={worldwideExcursions}
                showTabs={true}
                tabType="city"
                tabs={TARGET_CITIES}
                cityImages={cityImages}
            />
            <AttractionListingSection
                title={t('home.topThingsInCity', { city: topCityName })}
                excursions={topCityExcursions}
                layout="carousel"
                showViewAllButton={false}
                showTabs={false}
            />
                <AttractionListingSection
                 title={t('home.mostPopular')}
                 excursions={homePageData}
                 layout="grid"
                 showViewAllButton={false}
                 showTabs={false}
                 tabType="city"
               />
            <PopularPlacesSection countries={popularCountries} />
            <HelpCenterSection />
        </div>
    );
}

export default function HomePageClient(props: HomePageClientProps) {
    return (
        <LanguageProvider language={props.language}>
            <HomeSections {...props} />
        </LanguageProvider>
    );
}
