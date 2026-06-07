import { getCountries } from "@/app/actions";
import Link from 'next/link';

// Manually define regions for each country as this data is not in the database.
const countryToRegion: Record<string, 'americas' | 'emea' | 'apac'> = {
    'Argentina': 'americas', 'Aruba': 'americas', 'Bahamas': 'americas', 'Brazil': 'americas',
    'Canada': 'americas', 'Colombia': 'americas', 'Costa Rica': 'americas', 'Dominican Republic': 'americas',
    'Jamaica': 'americas', 'Mexico': 'americas', 'Peru': 'americas', 'Puerto Rico': 'americas',
    'United States': 'americas',

    'Austria': 'emea', 'Belgium': 'emea', 'Croatia': 'emea', 'Czech Republic': 'emea',
    'Denmark': 'emea', 'Egypt': 'emea', 'Estonia': 'emea', 'Finland': 'emea',
    'France': 'emea', 'Germany': 'emea', 'Greece': 'emea', 'Hungary': 'emea',
    'Iceland': 'emea', 'Ireland': 'emea', 'Italy': 'emea', 'Jordan': 'emea',
    'Kenya': 'emea', 'Latvia': 'emea', 'Lithuania': 'emea', 'Luxembourg': 'emea',
    'Malta': 'emea', 'Monaco': 'emea', 'Morocco': 'emea', 'Norway': 'emea',
    'Poland': 'emea', 'Portugal': 'emea', 'Qatar': 'emea', 'Romania': 'emea',
    'Serbia': 'emea', 'Slovakia': 'emea', 'Slovenia': 'emea', 'South Africa': 'emea',
    'Spain': 'emea', 'Sweden': 'emea', 'Switzerland': 'emea', 'Tanzania': 'emea',
    'The Netherlands': 'emea', 'Turkey': 'emea', 'United Kingdom': 'emea',

    'Australia': 'apac', 'Cambodia': 'apac', 'China': 'apac', 'India': 'apac',
    'Indonesia': 'apac', 'Japan': 'apac', 'Malaysia': 'apac', 'New Zealand': 'apac',
    'Singapore': 'apac', 'South Korea': 'apac', 'Taiwan': 'apac', 'Thailand': 'apac',
    'United Arab Emirates': 'emea', // Added to EMEA as per general classification
};


const RegionSection = ({ title, countries }: { title: string, countries: { name: string }[] }) => {
    if (countries.length === 0) return null;
    
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b">{title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
                {countries.map(country => (
                    <Link key={country.name} href={`/country/${encodeURIComponent(country.name)}`} className="text-lg text-primary hover:underline">
                        {country.name}
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default async function DestinationsPage() {
    const allCountries = await getCountries();

    const regions = allCountries.reduce((acc, country) => {
        const region = countryToRegion[country.name] || 'emea'; // Default to EMEA if unclassified
        if (!acc[region]) {
            acc[region] = [];
        }
        acc[region].push(country);
        return acc;
    }, {} as Record<string, { name: string }[]>);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold tracking-tight mb-12">All Destinations</h1>
            
            <div className="space-y-12">
                <RegionSection title="North and South America" countries={regions.americas || []} />
                <RegionSection title="Europe, the Middle East and Africa" countries={regions.emea || []} />
                <RegionSection title="Asia-Pacific" countries={regions.apac || []} />
            </div>
        </div>
    );
}