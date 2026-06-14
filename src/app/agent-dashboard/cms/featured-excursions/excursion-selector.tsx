
'use client';

import { useState, useTransition } from 'react';
import type { Excursion } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Star, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addOrRemoveFromFeatured } from '@/lib/user-service';
import { useToast } from '@/hooks/use-toast';

const ExcursionItem = ({ excursion, isFeatured, onToggle }: { excursion: Excursion, isFeatured: boolean, onToggle: (id: string) => void }) => {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(() => {
            onToggle(excursion.id);
        });
    }

    return (
        <Card className={cn("overflow-hidden transition-all", isFeatured && "border-2 border-primary")}>
             <div className="relative aspect-video">
                 {excursion.images?.[0] && excursion.images?.[0].length > 0 && (
                   <Image src={excursion.images[0]} alt={excursion.name} fill className="object-cover" />
                 )}
             </div>
            <CardHeader>
                <CardTitle className="line-clamp-2 text-base">{excursion.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{excursion.city}, {excursion.country}</p>
            </CardContent>
            <CardFooter>
                 <Button 
                    variant={isFeatured ? 'default' : 'outline'} 
                    className="w-full" 
                    onClick={handleToggle}
                    disabled={isPending}
                >
                    {isFeatured ? <Check className="mr-2 h-4 w-4" /> : <Star className="mr-2 h-4 w-4" />}
                    {isFeatured ? 'Featured' : 'Feature'}
                </Button>
            </CardFooter>
        </Card>
    )
}


export default function ExcursionSelector({ allExcursions, initialFeaturedIds, agentId }: { allExcursions: Excursion[], initialFeaturedIds: Set<string>, agentId: string }) {
    const { toast } = useToast();
    const [featuredIds, setFeaturedIds] = useState(initialFeaturedIds);

    const handleToggleFeature = async (excursionId: string) => {
        const result = await addOrRemoveFromFeatured(agentId, excursionId);
        
        if (result.success) {
            setFeaturedIds(prev => {
                const newSet = new Set(prev);
                if (result.isFeatured) {
                    newSet.add(excursionId);
                } else {
                    newSet.delete(excursionId);
                }
                return newSet;
            });
             toast({
                title: result.isFeatured ? 'Added to Featured' : 'Removed from Featured',
                description: result.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: result.message,
            });
        }
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allExcursions.map(excursion => (
                <ExcursionItem 
                    key={excursion.id}
                    excursion={excursion}
                    isFeatured={featuredIds.has(excursion.id)}
                    onToggle={handleToggleFeature}
                />
            ))}
        </div>
    );
}
