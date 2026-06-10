import { fetchTiqetsProducts } from '@/lib/tiqets-api';
import { notFound } from 'next/navigation';
import CountryClientPage from './country-client-page';
import type { Country, Excursion } from '@/types';

export const revalidate = 3600;

const COUNTRY_DATA: Record<string, { id: string; name: string }> = {
    // Americas
    'Peru': { id: '50174', name: 'Peru' },
    'Aruba': { id: '50013', name: 'Aruba' },
    'Costa Rica': { id: '50049', name: 'Costa Rica' },
    'Mexico': { id: '50157', name: 'Mexico' },
    'Argentina': { id: '50009', name: 'Argentina' },
    'United States': { id: '50233', name: 'United States' },
    'Canada': { id: '50037', name: 'Canada' },
    'Colombia': { id: '50048', name: 'Colombia' },
    'Brazil': { id: '50030', name: 'Brazil' },
    'Bahamas': { id: '50031', name: 'Bahamas' },
    'Dominican Republic': { id: '50060', name: 'Dominican Republic' },
    'Jamaica': { id: '50111', name: 'Jamaica' },
    'Puerto Rico': { id: '50182', name: 'Puerto Rico' },
    'Ecuador': { id: '50062', name: 'Ecuador' },
    'Belize': { id: '50036', name: 'Belize' },
    'Guatemala': { id: '50090', name: 'Guatemala' },
    
    // EMEA
    'Italy': { id: '50109', name: 'Italy' },
    'Spain': { id: '50067', name: 'Spain' },
    'France': { id: '50074', name: 'France' },
    'Netherlands': { id: '50166', name: 'The Netherlands' },
    'The Netherlands': { id: '50166', name: 'The Netherlands' },
    'United Arab Emirates': { id: '50001', name: 'United Arab Emirates' },
    'Bosnia and Herzegovina': { id: '50016', name: 'Bosnia and Herzegovina' },
    'Israel': { id: '50102', name: 'Israel' },
    'Turkey': { id: '50225', name: 'Turkey' },
    'Qatar': { id: '50187', name: 'Qatar' },
    'Bulgaria': { id: '50021', name: 'Bulgaria' },
    'Germany': { id: '50056', name: 'Germany' },
    'Hungary': { id: '50099', name: 'Hungary' },
    'Croatia': { id: '50097', name: 'Croatia' },
    'Estonia': { id: '50063', name: 'Estonia' },
    'Ireland': { id: '50101', name: 'Ireland' },
    'Belgium': { id: '50019', name: 'Belgium' },
    'Iceland': { id: '50108', name: 'Iceland' },
    'Greece': { id: '50088', name: 'Greece' },
    'Monaco': { id: '50138', name: 'Monaco' },
    'Portugal': { id: '50184', name: 'Portugal' },
    'Romania': { id: '50189', name: 'Romania' },
    'Russia': { id: '50191', name: 'Russia' },
    'Malta': { id: '50153', name: 'Malta' },
    'Slovenia': { id: '50201', name: 'Slovenia' },
    'Latvia': { id: '50135', name: 'Latvia' },
    'Lithuania': { id: '50133', name: 'Lithuania' },
    'Norway': { id: '50167', name: 'Norway' },
    'Denmark': { id: '50058', name: 'Denmark' },
    'Czech Republic': { id: '50055', name: 'Czech Republic' },
    'Poland': { id: '50179', name: 'Poland' },
    'Finland': { id: '50069', name: 'Finland' },
    'Switzerland': { id: '50042', name: 'Switzerland' },
    'Austria': { id: '50011', name: 'Austria' },
    'Sweden': { id: '50198', name: 'Sweden' },
    'Andorra': { id: '50004', name: 'Andorra' },
    'Egypt': { id: '50064', name: 'Egypt' },
    'Jordan': { id: '50112', name: 'Jordan' },
    'Kenya': { id: '50114', name: 'Kenya' },
    'United Kingdom': { id: '50076', name: 'United Kingdom' },
    'Luxembourg': { id: '50134', name: 'Luxembourg' },
    'Morocco': { id: '50137', name: 'Morocco' },
    'Serbia': { id: '50190', name: 'Serbia' },
    'Slovakia': { id: '50203', name: 'Slovakia' },
    'Tanzania': { id: '50229', name: 'Tanzania' },
    'South Africa': { id: '50247', name: 'South Africa' },
    
    // APAC
    'India': { id: '50104', name: 'India' },
    'Indonesia': { id: '50100', name: 'Indonesia' },
    'Japan': { id: '50113', name: 'Japan' },
    'Singapore': { id: '50199', name: 'Singapore' },
    'South Korea': { id: '50121', name: 'South Korea' },
    'Australia': { id: '50012', name: 'Australia' },
    'New Zealand': { id: '50014', name: 'New Zealand' },
    'Taiwan': { id: '50228', name: 'Taiwan' },
    'Thailand': { id: '50218', name: 'Thailand' },
    'China': { id: '50047', name: 'China' },
    'Vietnam': { id: '50241', name: 'Vietnam' },
    'Malaysia': { id: '50158', name: 'Malaysia' },
    'Cambodia': { id: '50116', name: 'Cambodia' },
};

// Known city names for countries where country-level API doesn't return data
const KNOWN_CITY_IDS_FOR_COUNTRY: Record<string, string> = {
    'United Kingdom': 'london',
    'Mexico': 'mexico city',
};

export default async function CountryPage({ params }: { params: { countryName: string } }) {
    const countryName = decodeURIComponent(params.countryName);
    const countryInfo = COUNTRY_DATA[countryName];
    
    let countryExcursions: Excursion[] = [];
    
    // First try direct country API call with pagination (most reliable)
    if (countryInfo) {
        try {
            const TIQETS_API_BASE = 'https://api.tiqets.com/v2';
            const TIQETS_API_KEY = process.env.TIQETS_API_KEY;
            const headers = {
                'Accept': 'application/json',
                'User-Agent': 'my user agent',
                'Authorization': `Token ${TIQETS_API_KEY}`
            };
            
            // Fetch all pages of experiences
            let allExperiences: any[] = [];
            let page = 1;
            let hasMore = true;
            
            while (hasMore) {
                const response = await fetch(`${TIQETS_API_BASE}/experiences?country_id=${countryInfo.id}&page=${page}&page_size=100`, { method: 'GET', headers });
                if (response.ok) {
                    const data = await response.json();
                    const experiences = data.experiences || [];
                    allExperiences = allExperiences.concat(experiences);
                    
                    const pagination = data.pagination || {};
                    if (experiences.length < 100 || (pagination.total && allExperiences.length >= pagination.total)) {
                        hasMore = false;
                    } else {
                        page++;
                    }
                } else {
                    hasMore = false;
                }
            }
            
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
            countryExcursions = allExperiences.map(transformTiqetsProduct);
        } catch (e) {
            console.error(`Failed to fetch ${countryName} excursions:`, e);
        }
    }
    
    // Also try fetching via fetchTiqetsProducts with country_id for additional data
    if (countryInfo && countryExcursions.length === 0) {
        try {
            countryExcursions = await fetchTiqetsProducts({ country_id: countryInfo.id });
        } catch (e) {
            // Continue
        }
    }
    
    // Also filter from all products (for countries not in API or partial coverage)
    if (countryExcursions.length === 0) {
        const allExcursions = await fetchTiqetsProducts();
        countryExcursions = allExcursions.filter(ex => 
            ex.country.toLowerCase() === countryName.toLowerCase()
        );
    }
    
    // Fallback: fetch from known cities within this country
    if (countryExcursions.length === 0 && KNOWN_CITY_IDS_FOR_COUNTRY[countryName]) {
        const cityName = KNOWN_CITY_IDS_FOR_COUNTRY[countryName];
        try {
            const cityExcursions = await fetchTiqetsProducts({ city_name: cityName });
            countryExcursions = cityExcursions;
        } catch (e) {
            console.error(`Failed to fetch ${countryName} excursions from known cities:`, e);
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