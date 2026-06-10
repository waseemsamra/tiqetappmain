
'use client';

import { useState, useMemo, useEffect, useTransition } from 'react';
import type { Excursion, ExcursionType } from '@/types';
import { ExcursionCard } from '@/components/excursion-search/excursion-card';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { getWishlistIdsAction } from '@/app/actions';
import { WishlistButton } from '@/components/wishlist-button';
import { FilterDialog } from '@/components/excursion-search/filter-sheet';
import { Skeleton } from '@/components/ui/skeleton';

type User = { id: string; email?: string } | null;

interface TopSearchedClientPageProps {
    initialExcursions: Excursion[];
    allExcursionTypes: ExcursionType[];
    user: User | null;
}

const EXCURSIONS_PER_PAGE = 50;

const PaginationControls = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void; }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex items-center justify-center mt-8 space-x-2">
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
           {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button 
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
           ))}
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
    );
};


export default function TopSearchedClientPage({
    initialExcursions,
    allExcursionTypes,
    user,
}: TopSearchedClientPageProps) {
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [selectedExcursionTypes, setSelectedExcursionTypes] = useState<string[]>([]);
    const [wishlistIds, setWishlistIds] = useState(new Set<string>());
    const [currentPage, setCurrentPage] = useState(1);
    
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
        setSelectedExcursionTypes(Array.from(newSelection));
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredExcursions = useMemo(() => {
        if (selectedExcursionTypes.length === 0) {
            return initialExcursions;
        }
        return initialExcursions.filter(excursion => 
            selectedExcursionTypes.includes(excursion.activitytypeid)
        );
    }, [initialExcursions, selectedExcursionTypes]);

    const totalPages = Math.ceil(filteredExcursions.length / EXCURSIONS_PER_PAGE);
    
    const paginatedExcursions = useMemo(() => {
        const start = (currentPage - 1) * EXCURSIONS_PER_PAGE;
        const end = start + EXCURSIONS_PER_PAGE;
        return filteredExcursions.slice(start, end);
    }, [filteredExcursions, currentPage]);

    return (
        <>
             <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight">Top Rated Experiences</h1>
                <p className="mt-2 text-lg text-muted-foreground">Discover the most popular and highest-rated excursions available.</p>
            </div>
            
            <main>
                 <div>
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-muted-foreground">
                            {filteredExcursions.length} results found.
                        </p>
                         <Button variant="outline" className="w-full md:w-auto" onClick={() => setIsFilterDialogOpen(true)}>
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Filter by Category
                        </Button>
                    </div>
                     {paginatedExcursions.length > 0 ? (
                        <>
                             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                {paginatedExcursions.map(excursion => (
                                    <ExcursionCard
                                        key={excursion.id}
                                        excursion={excursion}
                                        wishlistButton={user ? <WishlistButton activityId={excursion.id} isInitialWishlisted={wishlistIds.has(excursion.id)} /> : null}
                                    />
                                ))}
                            </div>
                            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </>
                    ) : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg">
                            <h2 className="text-2xl font-semibold">No Excursions Found</h2>
                            <p className="text-muted-foreground mt-2">Try adjusting your filters to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </main>
            <FilterDialog
                isOpen={isFilterDialogOpen}
                onOpenChange={setIsFilterDialogOpen}
                excursionTypes={allExcursionTypes}
                allExcursions={initialExcursions}
                selectedExcursionTypes={selectedExcursionTypes}
                onExcursionTypeChange={handleFilterChange}
            />
        </>
    );
}

    