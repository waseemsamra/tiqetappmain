
'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const topThingsToDo = [
    "Acropolis of Athens", "Alhambra", "Amsterdam Canal Cruises", "Burj Khalifa", 
    "Casa Batlló", "Colosseum", "Disneyland® Paris", "Doge's Palace", "Duomo di Milano", 
    "Edge NYC", "Eiffel Tower", "Keukenhof", "Kew Gardens", "London Eye", "Louvre Museum", 
    "Moco Museum Amsterdam", "Mount Vesuvius", "National Palace of Pena & Park", 
    "New York City Cards", "Oceanogràfic de Valencia", "Palace of Versailles", 
    "Park Güell", "Pompeii", "SUMMIT One Vanderbilt", "Sagrada Familia", 
    "Seine River Cruises", "St. Peter's Basilica", "Tower of London", "Van Gogh Museum", 
    "Vatican Museums"
];

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

const renderLinks = (items: string[], type: 'query' | 'city' | 'country') => (
    <div className="flex flex-wrap gap-2 sm:gap-3">
        {items.map(item => (
            <Button key={item} variant="outline" asChild className="rounded-full bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-sm sm:text-base px-3 py-2 min-w-[120px] flex-1 sm:flex-none">
                <Link href={`/search?${type}=${encodeURIComponent(item)}`}>
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
                    <TabsList className="flex flex-wrap gap-1 bg-gray-200/70 p-1 rounded-lg">
                        <TabsTrigger value="things-to-do" className="px-4 py-2 text-sm">Top Things to Do</TabsTrigger>
                        <TabsTrigger value="destinations" className="px-4 py-2 text-sm">Top Destinations</TabsTrigger>
                        <TabsTrigger value="categories" className="px-4 py-2 text-sm">Top Categories</TabsTrigger>
                    </TabsList>
                    <TabsContent value="things-to-do" className="bg-white p-6 rounded-b-lg border border-t-0">
                        {renderLinks(topThingsToDo, 'query')}
                    </TabsContent>
                    <TabsContent value="destinations" className="bg-white p-6 rounded-b-lg border border-t-0">
                        {renderLinks(topDestinations, 'city')}
                    </TabsContent>
                    <TabsContent value="categories" className="bg-white p-6 rounded-b-lg border border-t-0">
                        {renderLinks(topCategories, 'query')}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
