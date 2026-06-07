import { fetchTiqetsProducts } from '@/lib/tiqets-api';
import { notFound } from 'next/navigation';
import CountryClientPage from './country-client-page';
import type { Country } from '@/types';

export const revalidate = 3600;

const COUNTRY_DATA: Record<string, { id: string; name: string }> = {
    'Peru': { id: '50174', name: 'Peru' },
    'Italy': { id: '50109', name: 'Italy' },
    'Spain': { id: '50177', name: 'Spain' },
    'France': { id: '50159', name: 'France' },
    'Netherlands': { id: '50185', name: 'Netherlands' },
    'United Arab Emirates': { id: '50195', name: 'United Arab Emirates' },
    'India': { id: '50104', name: 'India' },
    'Japan': { id: '50113', name: 'Japan' },
    'South Korea': { id: '50121', name: 'South Korea' },
    'Bosnia and Herzegovina': { id: '50016', name: 'Bosnia and Herzegovina' },
    'Indonesia': { id: '50100', name: 'Indonesia' },
    'Israel': { id: '50102', name: 'Israel' },
};

export default async function CountryPage({ params }: { params: { countryName: string } }) {
    const countryName = decodeURIComponent(params.countryName);
    const countryInfo = COUNTRY_DATA[countryName];
    
    let countryExcursions = [];
    
    // Fetch all products and filter by country
    const allExcursions = await fetchTiqetsProducts();
    countryExcursions = allExcursions.filter(ex => 
        ex.country.toLowerCase() === countryName.toLowerCase()
    );
    
    // If country-specific fetch returns nothing, try direct API call
    if (countryExcursions.length === 0 && countryInfo) {
        try {
            const TIQETS_API_BASE = 'https://api.tiqets.com/v2';
            const TIQETS_API_KEY = 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W';
            const headers = {
                'Accept': 'application/json',
                'User-Agent': 'my user agent',
                'Authorization': `Token ${TIQETS_API_KEY}`
            };
            
            const response = await fetch(`${TIQETS_API_BASE}/experiences?country_id=${countryInfo.id}&page_size=100`, { method: 'GET', headers });
            if (response.ok) {
                const data = await response.json();
                const experiences = data.experiences || [];
                const transformTiqetsProduct = (product: any) => ({
                    id: product.id?.toString() || '',
                    name: product.title || '',
                    city: product.address?.city_name || '',
                    country: product.address?.country_name || countryName,
                    description: product.description || '',
                    price: product.from_price || product.price || 0,
                    duration: product.duration || 'Not specified',
                    images: Array.isArray(product.images) 
                        ? product.images.map((img: any) => img?.medium || img?.large || '').filter(Boolean)
                        : [],
                    rating: product.ratings?.average || undefined,
                    excursionType: { id: product.id?.toString() || '', name: product.tagline || 'Activity' },
                    status: 'active' as const,
                    product_ids: [],
                });
                countryExcursions = experiences.map(transformTiqetsProduct);
            }
        } catch (e) {
            console.error('Failed to fetch Peru excursions:', e);
        }
    }
    
    if (countryExcursions.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-4xl font-bold mb-4">Explore {countryName}</h1>
                <p className="text-muted-foreground text-lg">No excursions available in this country yet. Check back soon!</p>
            </div>
        );
    }
    
    // Get unique cities with counts from excursions
    const citiesMap = new Map<string, number>();
    countryExcursions.forEach(ex => {
        if (ex.city) {
            citiesMap.set(ex.city, (citiesMap.get(ex.city) || 0) + 1);
        }
    });
    
    const cities = Array.from(citiesMap.entries()).map(([name, count]) => ({ 
        id: name.toLowerCase().replace(/\s+/g, '-'), 
        name, 
        excursionCount: count,
        country_code: ''
    }));
    
    const countryDetails = countryInfo || {
        id: 'unknown',
        name: countryName,
    };

    return (
        <CountryClientPage
            initialExcursions={countryExcursions}
            allExcursionTypes={[]}
            countryDetails={countryDetails}
            cities={cities}
            user={null}
        />
    );
}