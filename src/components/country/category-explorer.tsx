
'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, Layers } from 'lucide-react';
import type { TiqetsTag, Excursion } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Category {
  id: string;
  name: string;
  type_name: string;
  experienceCount: number;
  image: string;
}

const CategoryCard = ({ category, countryName, cityName, isSelected, onSelect }: { category: Category; countryName: string; cityName?: string; isSelected?: boolean; onSelect?: () => void; }) => {
    const searchQuery = cityName
        ? `city=${encodeURIComponent(cityName)}&query=${encodeURIComponent(category.name)}`
        : `country=${encodeURIComponent(countryName)}&query=${encodeURIComponent(category.name)}`;

    return (
        <div className="group relative">
            <Link href={`/search?${searchQuery}`} className="block">
                <div className="relative rounded-lg overflow-hidden h-24">
                    <Image src={category.image} alt={category.name} fill className="object-cover unoptimized" data-ai-hint="attraction" />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-2 left-3 text-white">
                        <h3 className="font-bold">{category.name}</h3>
                        {category.experienceCount > 0 && <p className="text-sm font-medium">{category.experienceCount} experiences</p>}
                    </div>
                </div>
            </Link>
            {typeof isSelected === 'boolean' && (
                <button onClick={onSelect} className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5">
                    {isSelected ? <X className="h-4 w-4" /> : <Layers className="h-4 w-4" />}
                </button>
            )}
        </div>
    );
};

type CategoryExplorerProps = {
    tags: TiqetsTag[];
    allTags: TiqetsTag[];
    countryName: string;
    cityName?: string;
    onShowAll: () => void;
    selectedTagIds: string[];
    onSelectTag: (tagId: string) => void;
    excursions: Excursion[];
};

const EXCLUDED_GROUPS = new Set([
  'Experience characteristics',
  'Product characteristics',
]);

export const CategoryExplorer = ({ tags, allTags, countryName, cityName, onShowAll, selectedTagIds, onSelectTag, excursions }: CategoryExplorerProps) => {
    const tagCounts = useMemo(() => {
        const counts = new Map<string, number>();
        excursions.forEach(ex => {
            const ids = (ex as any).tag_ids || [];
            ids.forEach((tid: string) => counts.set(tid, (counts.get(tid) || 0) + 1));
        });
        return counts;
    }, [excursions]);

    const tagImages = useMemo(() => {
        const images = new Map<string, string>();
        excursions.forEach(ex => {
            const ids = (ex as any).tag_ids || [];
            ids.forEach((tid: string) => {
                if (!images.has(tid) && ex.images?.[0]) images.set(tid, ex.images[0]);
            });
        });
        return images;
    }, [excursions]);

    const uniqueTags = useMemo(() => {
        const seen = new Set<string>();
        return tags.filter(tag => {
            const key = `${tag.type_name}::${tag.name}`;
            if (seen.has(key)) return false;
            seen.add(key);
            const group = tag.type_group_name || tag.type_name || '';
            if (EXCLUDED_GROUPS.has(group)) return false;
            return true;
        });
    }, [tags]);

    const sortedTags = useMemo(() => {
        return [...uniqueTags].sort((a, b) => (tagCounts.get(b.id) || 0) - (tagCounts.get(a.id) || 0));
    }, [uniqueTags, tagCounts]);

    const initialCategories = sortedTags.slice(0, 12).map(tag => ({
        id: tag.id,
        name: tag.name,
        type_name: tag.type_name,
        experienceCount: tagCounts.get(tag.id) || 0,
        image: tagImages.get(tag.id) || `https://picsum.photos/seed/${encodeURIComponent(tag.name)}/400/300`,
    }));

    return (
        <div className="relative">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
                <CarouselContent className="-ml-4">
                    {initialCategories.map(cat => (
                        <CarouselItem key={cat.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/6 pl-4">
                            <CategoryCard 
                                category={cat} 
                                countryName={countryName} 
                                cityName={cityName}
                                isSelected={selectedTagIds.includes(cat.id)}
                                onSelect={() => onSelectTag(cat.id)}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
                <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
            </Carousel>
            <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={onShowAll} className="gap-2">
                    <Layers className="h-4 w-4" />
                    Browse all categories
                </Button>
            </div>
        </div>
    )
}
