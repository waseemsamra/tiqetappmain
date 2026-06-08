import { getCountries } from "@/app/actions";
import Link from 'next/link';

// Countries to show on destinations page (filtered list)
const countriesToShow = [
    // North and South America
    'Argentina', 'Aruba', 'Bahamas', 'Brazil', 'Canada', 'Colombia', 
    'Costa Rica', 'Dominican Republic', 'Jamaica', 'Mexico', 'Peru', 
    'Puerto Rico', 'United States',
    
    // Europe, the Middle East and Africa
    'Austria', 'Belgium', 'Croatia', 'Czech Republic', 'Denmark', 'Egypt',
    'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland',
    'Ireland', 'Italy', 'Jordan', 'Kenya', 'Latvia', 'Lithuania', 'Luxembourg',
    'Malta', 'Monaco', 'Morocco', 'Norway', 'Poland', 'Portugal', 'Qatar',
    'Romania', 'Serbia', 'Slovakia', 'Slovenia', 'South Africa', 'Spain', 'Sweden',
    'Switzerland', 'Tanzania', 'The Netherlands', 'Turkey', 'United Kingdom',
    'United Arab Emirates',
    
    // Asia-Pacific
    'Australia', 'Cambodia', 'China', 'India', 'Indonesia', 'Japan', 'Malaysia',
    'Singapore', 'South Korea', 'Taiwan', 'Thailand', 'Vietnam',
];

const CountrySection = ({ countries }: { countries: { name: string }[] }) => {
    if (countries.length === 0) return null;
    
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6 pb-4 border-b">All Destinations</h2>
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
    
    // Filter to only show countries in our list
    const filteredCountries = allCountries.filter(country => 
        countriesToShow.includes(country.name)
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold tracking-tight mb-12">All Destinations</h1>
            <CountrySection countries={filteredCountries} />
        </div>
    );
}