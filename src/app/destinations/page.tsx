import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { Globe, MapPin } from 'lucide-react';

export const revalidate = 0;

export default async function DestinationsPage() {
    let regions: { name: string; countries: string[] }[] = [];
    try {
        const configPath = join(process.cwd(), 'public', 'destinations-config.json');
        const configRaw = readFileSync(configPath, 'utf-8');
        const configParsed = JSON.parse(configRaw);
        regions = Array.isArray(configParsed.regions) ? configParsed.regions : [];
    } catch {}

    const regionsWithCountries = regions
        .map(({ name, countries }) => ({
            region: name,
            countries: (countries || []).filter(Boolean),
        }))
        .filter(region => region.countries.length > 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex items-center gap-3 mb-4">
                        <Globe className="h-10 w-10 text-primary" />
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                            All Destinations
                        </h1>
                    </div>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Explore our curated selection of destinations across the globe. 
                        Discover unforgettable experiences in every corner of the world.
                    </p>
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 gap-16">
                    {regionsWithCountries.map(({ region, countries }) => (
                        <section key={region}>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    {region}
                                </h2>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {countries.map(name => (
                                    <Link
                                        key={name}
                                        href={`/country/${encodeURIComponent(name)}`}
                                        className="group relative flex items-center justify-between px-5 py-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                                    >
                                        <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">
                                            {name}
                                        </span>
                                        <svg 
                                            className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {regionsWithCountries.length === 0 && (
                    <div className="text-center py-20">
                        <Globe className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-600 mb-2">No destinations available</h3>
                        <p className="text-muted-foreground">Check back soon for exciting new destinations.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
