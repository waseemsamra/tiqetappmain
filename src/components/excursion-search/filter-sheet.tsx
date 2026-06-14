
'use client';

import { useMemo } from 'react';
import type { Excursion, TiqetsTag } from '@/types';
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

interface TagCategoryDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    tags: TiqetsTag[];
    allExcursions: Excursion[];
    selectedTags: string[];
    onTagChange: (tagId: string) => void;
}

const CategoryItem = ({ type, imageSrc, isSelected, onSelect }: { type: TiqetsTag; imageSrc: string; isSelected: boolean; onSelect: () => void }) => (
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
        <div className="flex-grow min-w-0">
            <p className="font-semibold truncate">{type.name}</p>
            <p className="text-xs text-muted-foreground truncate">{type.type_name}</p>
        </div>
        {isSelected && (
            <div className="absolute top-2 right-2 text-primary">
                <CheckCircle className="h-5 w-5" />
            </div>
        )}
    </div>
);


export function FilterDialog({ isOpen, onOpenChange, tags = [], allExcursions, selectedTags = [], onTagChange }: TagCategoryDialogProps) {
    const tagImages = useMemo(() => {
        const imageMap = new Map<string, string>();
        (tags || []).forEach(tag => {
            const firstExcursionOfTag = allExcursions.find(ex => {
                const tagIds = Array.isArray(ex.tag_ids) ? ex.tag_ids : [];
                return tagIds.includes(tag.id);
            });
              const imageUrl = (firstExcursionOfTag?.images?.[0] && firstExcursionOfTag?.images?.[0].length > 0 ? 
                                firstExcursionOfTag?.images?.[0] : 
                                null);
            imageMap.set(tag.id, imageUrl);
        });
        return imageMap;
    }, [tags, allExcursions]);
    
    const handleApplyFilters = () => {
        onOpenChange(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl w-[90vw] h-[80vh] flex flex-col p-0">
                <DialogHeader className="p-6 pb-4 border-b">
                    <DialogTitle className="text-xl">Browse Categories</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tags.map(tag => (
                             <CategoryItem 
                                key={tag.id}
                                type={tag}
                                 imageSrc={tagImages.get(tag.id)}
                                isSelected={selectedTags.includes(tag.id)}
                                onSelect={() => onTagChange(tag.id)}
                             />
                        ))}
                    </div>
                </ScrollArea>
                 <DialogFooter className="p-6 border-t bg-background">
                     <Button className="w-full" onClick={handleApplyFilters}>Close</Button>
                 </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
