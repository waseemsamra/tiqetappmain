'use client';

import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface CityWithCount {
    name: string;
    excursionCount: number;
}

interface CitiesSectionProps {
    countryName: string;
    cities: CityWithCount[];
}

export function CitiesSection({ countryName, cities }: CitiesSectionProps) {
    if (!cities || cities.length === 0) {
        return null;
    }

    return (
        <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Best Places to Visit in {countryName}</h2>
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="-ml-4">
                    {cities.map(city => (
                        <CarouselItem key={city.name} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <Link 
                                href={`/city/${encodeURIComponent(city.name)}`}
                                className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow bg-white h-full"
                            >
                                <span className="font-semibold text-gray-900 text-center">{city.name}</span>
                                <span className="text-sm text-gray-500 mt-1">
                                    {city.excursionCount} {city.excursionCount === 1 ? 'excursion' : 'excursions'}
                                </span>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
            </Carousel>
        </section>
    );
}