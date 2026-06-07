
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, SlidersHorizontal, Layers } from 'lucide-react';

interface Category {
  name: string;
  experienceCount: number;
  image: string;
}

const CategoryCard = ({ category, countryName, cityName }: { category: Category, countryName: string, cityName?: string }) => {
    const searchQuery = cityName
        ? `city=${encodeURIComponent(cityName)}&query=${encodeURIComponent(category.name)}`
        : `country=${encodeURIComponent(countryName)}&query=${encodeURIComponent(category.name)}`;

    return (
        <Link href={`/search?${searchQuery}`} className="block group">
            <div className="relative rounded-lg overflow-hidden h-24">
                <Image src={category.image} alt={category.name} fill className="object-cover" data-ai-hint="attraction" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-2 left-3 text-white">
                    <h3 className="font-bold">{category.name}</h3>
                    <p className="text-sm">{category.experienceCount} experiences</p>
                </div>
            </div>
        </Link>
    );
};

export const CategoryExplorer = ({ categories, countryName, cityName, onShowAll }: { categories: Category[], countryName: string, cityName?: string, onShowAll: () => void }) => {
    const initialCategories = categories.slice(0, 5);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {initialCategories.map(cat => (
                <CategoryCard key={cat.name} category={cat} countryName={countryName} cityName={cityName} />
            ))}
             <button onClick={onShowAll} className="group flex flex-col items-center justify-center bg-muted/50 rounded-lg p-4 text-center hover:bg-muted transition-colors">
                 <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                    <Layers className="h-6 w-6" />
                </div>
                <span className="font-bold mt-2 text-primary">More Categories</span>
            </button>
        </div>
    )
}
