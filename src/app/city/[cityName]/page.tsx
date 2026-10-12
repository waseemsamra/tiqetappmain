
import { searchExcursionsAction, getExcursionTypes } from '@/app/actions';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import CityClientPage from './city-client-page';
import { CITY_CATEGORIES } from '@/lib/city-categories';
import { Suspense } from 'react';
import { CITY_TO_COUNTRY_ID } from '@/lib/tiqets-api';

export const revalidate = 3600;

export default async function CityPage({ params }: { params: { cityName: string } }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const cityName = decodeURIComponent(params.cityName);
    // Normalize slug to match CITY_TO_COUNTRY_ID keys (e.g., "mexico-city" -> "mexico city")
    const normalizedCityName = cityName.toLowerCase().replace(/-/g, ' ');
    const countryId = CITY_TO_COUNTRY_ID[normalizedCityName];

    const [cityExcursions, allExcursionTypes] = await Promise.all([
        searchExcursionsAction({ city: cityName, countryId }),
        getExcursionTypes()
    ]);
    
    if (cityExcursions.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-4xl font-bold mb-4">Explore {cityName}</h1>
                <p className="text-muted-foreground text-lg">No excursions available in this city yet. Check back soon!</p>
            </div>
        )
    }

    const countryName = cityExcursions[0]?.country || '';

    return (
        <CityClientPage
            initialExcursions={cityExcursions}
            allExcursionTypes={allExcursionTypes}
            cityName={cityName}
            countryName={countryName}
            categories={CITY_CATEGORIES[cityName.toLowerCase()]}
            user={user}
        />
    );
}
