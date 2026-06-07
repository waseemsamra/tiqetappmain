
'use client';

import { useMemo } from 'react';
import type { Excursion, ExcursionType } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface FilterDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    excursionTypes: ExcursionType[];
    allExcursions: Excursion[];
    selectedExcursionTypes: string[];
    onExcursionTypeChange: (typeId: string) => void;
}

const CategoryItem = ({ type, imageSrc, isSelected, onSelect }: { type: ExcursionType; imageSrc: string; isSelected: boolean; onSelect: () => void }) => (
    <div
        className={cn(
            "relative flex items-center gap-4 p-3 rounded-lg cursor-pointer border-2 transition-all",
            isSelected ? "border-primary bg-primary/5" : "border-transparent bg-muted/50 hover:bg-muted"
        )}
        onClick={onSelect}
    >
        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
            <Image
                src={imageSrc}
                alt={type.name}
                fill
                className="object-cover"
                data-ai-hint="attraction"
            />
        </div>
        <div className="flex-grow">
            <p className="font-semibold">{type.name}</p>
        </div>
        {isSelected && (
            <div className="absolute top-2 right-2 text-primary">
                <CheckCircle className="h-5 w-5" />
            </div>
        )}
    </div>
);


export function FilterDialog({ isOpen, onOpenChange, excursionTypes, allExcursions, selectedExcursionTypes, onExcursionTypeChange }: FilterDialogProps) {
    const router = useRouter();

    const typeImages = useMemo(() => {
        const imageMap = new Map<string, string>();
        excursionTypes.forEach(type => {
            const firstExcursionOfType = allExcursions.find(ex => ex.activitytypeid === type.id);
            const imageUrl = firstExcursionOfType?.images?.[0] || 'https://picsum.photos/128/128';
            imageMap.set(type.id, imageUrl);
        });
        return imageMap;
    }, [excursionTypes, allExcursions]);
    
    const handleApplyFilters = () => {
        onOpenChange(false);
        // The parent page will now be responsible for handling the filtered results.
        // No navigation happens here anymore.
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl w-[90vw] h-[80vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-4 border-b">
                    <DialogTitle className="text-xl">Filter by Category</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {excursionTypes.map(type => (
                             <CategoryItem 
                                key={type.id}
                                type={type}
                                imageSrc={typeImages.get(type.id)!}
                                isSelected={selectedExcursionTypes.includes(type.id)}
                                onSelect={() => onExcursionTypeChange(type.id)}
                             />
                        ))}
                    </div>
                </ScrollArea>
                 <DialogFooter className="p-6 border-t bg-background">
                     <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
