
'use client';

import { useState, useMemo, useEffect, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Excursion, ExcursionType } from '@/types';
import { ExcursionCard } from '@/components/excursion-search/excursion-card';
import { ExcursionListCard } from '@/components/excursion-search/excursion-list-card';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../auth-provider';
import { getWishlistIdsAction } from '../actions';
import { WishlistButton } from '@/components/wishlist-button';
import { FilterDialog } from '@/components/excursion-search/filter-sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { UniversalSearch } from '@/components/universal-search';


interface SearchClientPageProps {
    allExcursionTypes: ExcursionType[];
}

const INITIAL_VISIBLE_COUNT = 20;
const LOAD_MORE_COUNT = 20;

const LoadMoreButton = ({ visibleCount, totalCount, onLoadMore }: { visibleCount: number; totalCount: number; onLoadMore: () => void }) => {
    if (visibleCount >= totalCount) return null;
    return (
        <div className="text-center mt-12">
            <Button onClick={onLoadMore} size="lg">
                Load More ({totalCount - visibleCount} remaining)
            </Button>
        </div>
    );
};


export default function SearchClientPage({
    allExcursionTypes,
}: SearchClientPageProps) {
    const { session } = useAuth();
    const user = session?.user;
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // State for UI controls
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    
    // State for data and filtering
    const [allExcursions, setAllExcursions] = useState<Excursion[]>([]);
    const [selectedExcursionTypes, setSelectedExcursionTypes] = useState<string[]>([]);
    const [wishlistIds, setWishlistIds] = useState(new Set<string>());
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
    
    // Loading and transition state
    const [isSearching, startSearchTransition] = useTransition();

    const fetchExcursions = async (params: URLSearchParams) => {
        startSearchTransition(async () => {
            try {
                const response = await fetch(`/api/search?${params.toString()}`);
                if (!response.ok) throw new Error('Search failed');
                const data = await response.json();
                const activities = Array.isArray(data.activities) ? data.activities : [];
                setAllExcursions(activities);
            } catch (error) {
                console.error(error);
                setAllExcursions([]);
            }
        });
    };

    // Effect to initialize search from URL parameters
    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString());
        fetchExcursions(currentParams);
        
        const typeParam = searchParams.get('type');
        const typesToSelect = typeParam ? [typeParam] : [];
        setSelectedExcursionTypes(typesToSelect);
        
        setVisibleCount(INITIAL_VISIBLE_COUNT);

    }, [searchParams]);


    useEffect(() => {
        if (user) {
            getWishlistIdsAction().then(ids => setWishlistIds(new Set(ids)));
        }
    }, [user]);

    const handleFilterChange = (typeId: string) => {
        const newSelection = new Set(selectedExcursionTypes);
        if (newSelection.has(typeId)) {
            newSelection.delete(typeId);
        } else {
            newSelection.add(typeId);
        }
        const newTypesArray = Array.from(newSelection);
        setSelectedExcursionTypes(newTypesArray);

        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('types');
        newTypesArray.forEach(t => currentParams.append('types', t));

        fetchExcursions(currentParams);
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    };

    const visibleExcursions = useMemo(() => {
        return allExcursions.slice(0, visibleCount);
    }, [allExcursions, visibleCount]);

    const hasMore = visibleCount < allExcursions.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, allExcursions.length));
    };

    return (
        <>
            <div className="flex justify-center mb-8">
                 <UniversalSearch />
            </div>

            <main>
                 <div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                        <p className="text-muted-foreground">
                            {isSearching ? 'Searching...' : `${allExcursions.length} results found.`}
                        </p>
                        <div className="flex items-center gap-2 self-end">
                             <Button variant="outline" className="w-full md:w-auto" onClick={() => setIsFilterDialogOpen(true)}>
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                Filters
                            </Button>
                            <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('grid')}>
                                <LayoutGrid className="h-5 w-5" />
                            </Button>
                            <Button variant={layout === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('list')}>
                                <List className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                    {isSearching ? (
                                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                   <Skeleton className="h-48 w-full" />
                                   <Skeleton className="h-4 w-3/4" />
                                   <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : visibleExcursions.length > 0 ? (
                        <>
                            {layout === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {visibleExcursions.map(excursion => (
                                        <ExcursionCard
                                            key={excursion.id}
                                            excursion={excursion}
                                            wishlistButton={user ? <WishlistButton activityId={excursion.id} isInitialWishlisted={wishlistIds.has(excursion.id)} /> : null}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {visibleExcursions.map(excursion => (
                                        <ExcursionListCard
                                            key={excursion.id}
                                            excursion={excursion}
                                            wishlistButton={user ? <WishlistButton activityId={excursion.id} isInitialWishlisted={wishlistIds.has(excursion.id)} /> : null}
                                        />
                                    ))}
                                </div>
                            )}
                            <LoadMoreButton
                                visibleCount={visibleCount}
                                totalCount={allExcursions.length}
                                onLoadMore={handleLoadMore}
                            />
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-semibold">No Excursions Found</h2>
                            <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </main>
            <FilterDialog
                isOpen={isFilterDialogOpen}
                onOpenChange={setIsFilterDialogOpen}
                excursionTypes={allExcursionTypes}
                allExcursions={allExcursions}
                selectedExcursionTypes={selectedExcursionTypes}
                onExcursionTypeChange={handleFilterChange}
            />
        </>
    );
}
