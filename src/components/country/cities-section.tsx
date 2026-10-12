'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CityWithCount {
    name: string;
    excursionCount: number;
}

interface CitiesSectionProps {
    countryName: string;
    cities: CityWithCount[];
    cityImages?: Record<string, string>;
}

// Normalize city name for clean URLs: remove parentheticals, replace spaces with hyphens
function cityUrlSlug(name: string): string {
    return name.toLowerCase()
        .replace(/\([^)]*\)/g, '')  // Remove (CA), (US), etc.
        .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric with hyphen
        .replace(/-+/g, '-')  // Collapse multiple hyphens
        .replace(/^-|-$/g, '');  // Trim leading/trailing hyphens
}

export function CitiesSection({ countryName, cities, cityImages = {} }: CitiesSectionProps) {
    if (!cities || cities.length === 0) {
        return null;
    }

    return (
        <section className="mb-16">
            <div className="relative max-w-[1400px] mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#2c3e50]">
                    Best Places to Visit in {countryName}
                </h2>
                
                <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
                    {cities.map((city, index) => {
                        const imageUrl = cityImages[city.name];
                        
                        return (
                            <Link
                                key={city.name}
                                href={`/city/${cityUrlSlug(city.name)}`}
                                className="flex-none snap-center flex flex-col w-[200px] md:w-[240px] lg:w-[280px]"
                                style={{ scrollSnapAlign: 'center' }}
                            >
                                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 mb-3">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            alt={city.name}
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                            sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 280px"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <span className="text-gray-400 text-sm">{city.name}</span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-[#2c3e50] text-lg mb-1">{city.name}</h3>
                                <p className="text-sm text-[#7f8c9f]">
                                    {city.excursionCount} {city.excursionCount === 1 ? 'experience' : 'experiences'}
                                </p>
                            </Link>
                        );
                    })}
                </div>

                {/* Next Arrow Overlay */}
                <button
                    className="absolute right-[-25px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#34495e] text-white flex items-center justify-center shadow-lg hover:bg-[#2c3e50] transition-colors z-10 hidden lg:block"
                    aria-label="Next cities"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                </button>
            </div>
        </section>
    );
}