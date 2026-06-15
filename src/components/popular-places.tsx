
'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import topThingsToDoData from '@/../public/top-things-to-do.json';

const topThingsToDo = topThingsToDoData.topThingsToDo;

const topDestinations = [
    "Amsterdam", "Barcelona", "Dubai", "Florence", "Las Vegas", "Lisbon", 
    "London", "Madrid", "Milan", "New York", "Paris", "Rome", 
    "San Francisco", "Venice", "Vienna"
];

const topCategories = [
    "Attractions in Cancún", "Attractions in Dubai", "Attractions in London",
    "Attractions in Dublin", "Attractions in Singapore", "Attractions in Orlando",
    "Attractions in San Diego", "Attractions in New York", "City Cards & Passes in Barcelona",
    "City Tours in London", "Cruises & Boat Tours in Chicago", "Cruises & Boat Tours in Amsterdam",
    "Historical & Archaeological Sites in Dublin", "Museums in New York", "Museums in Paris",
    "Museums in Rome", "Shows & Theatres in London", "Shows & Theatres in New York",
    "Trips & Excursions in Las Vegas", "Water Activities in Dubai"
];

const renderLinks = (items: Array<{name: string, slug: string, id: number}>, type: 'query' | 'city' | 'country') => (
    <div className="flex flex-wrap gap-2 sm:gap-3">
        {items.map(item => (
            <Button key={item.id} variant="outline" asChild className="rounded-full bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-sm sm:text-base px-3 py-2 min-w-[120px] flex-1 sm:flex-none">
                <Link href={`/excursions/${item.id}`}>
                    {item.name}
                </Link>
            </Button>
        ))}
    </div>
);

const renderDestinationLinks = (items: string[]) => (
    <div className="flex flex-wrap gap-2 sm:gap-3">
        {items.map(item => (
            <Button key={item} variant="outline" asChild className="rounded-full bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-sm sm:text-base px-3 py-2 min-w-[120px] flex-1 sm:flex-none">
                <Link href={`/search?city=${encodeURIComponent(item)}`}>
                    {item}
                </Link>
            </Button>
        ))}
    </div>
);

const renderCategoryLinks = (items: string[]) => (
    <div className="flex flex-wrap gap-2 sm:gap-3">
        {items.map(item => (
            <Button key={item} variant="outline" asChild className="rounded-full bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-sm sm:text-base px-3 py-2 min-w-[120px] flex-1 sm:flex-none">
                <Link href={`/search?query=${encodeURIComponent(item)}`}>
                    {item}
                </Link>
            </Button>
        ))}
    </div>
);

export default function PopularPlacesSection({ countries }: { countries: string[] }) {
    return (
        <div className="bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-gray-900 text-left mb-8">
                    Discover our most popular places to visit
                </h2>

                <Tabs defaultValue="things-to-do" className="w-full">
                    <TabsList className="flex gap-1 bg-gray-200/70 p-1 rounded-lg overflow-x-auto">
                        <TabsTrigger value="things-to-do" className="px-4 py-2 text-sm whitespace-nowrap">Top Things to Do</TabsTrigger>
                        <TabsTrigger value="destinations" className="px-4 py-2 text-sm whitespace-nowrap">Top Destinations</TabsTrigger>
                        <TabsTrigger value="categories" className="px-4 py-2 text-sm whitespace-nowrap">Top Categories</TabsTrigger>
                    </TabsList>
                    <TabsContent value="things-to-do" className="bg-white p-6 rounded-b-lg border border-t-0">
                        {renderLinks(topThingsToDo, 'query')}
                    </TabsContent>
                    <TabsContent value="destinations" className="bg-white p-6 rounded-b-lg border border-t-0">
                        {renderDestinationLinks(topDestinations)}
                    </TabsContent>
                    <TabsContent value="categories" className="bg-white p-6 rounded-b-lg border border-t-0">
                        {renderCategoryLinks(topCategories)}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
