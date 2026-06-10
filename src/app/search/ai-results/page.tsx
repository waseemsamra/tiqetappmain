
'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Excursion } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ExcursionCard } from '@/components/excursion-search/excursion-card';
import { Button } from '@/components/ui/button';

const EXCURSIONS_PER_PAGE = 20;

const PaginationControls = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void; }) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
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


function AISearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const [allExcursions, setAllExcursions] = useState<Excursion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('AI Recommendations');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        const fetchResults = async () => {
            try {
                let url;
                if (lat && lon) {
                    setTitle('Finding attractions near you...');
                    url = `/api/ai-search?lat=${lat}&lon=${lon}`;
                } else if (query) {
                    setTitle(`Searching for: "${query}"`);
                    url = `/api/ai-search?query=${encodeURIComponent(query)}`;
                } else {
                    setError('Please provide a search query or location.');
                    setLoading(false);
                    return;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch AI results.');
                }
                const result = await response.json();

                if (result.excursions && result.excursions.length > 0) {
                    setAllExcursions(result.excursions);
                    const newTitle = result.locationName 
                        ? `AI Recommendations for ${result.locationName}`
                        : `AI Recommendations for "${query}"`;
                    setTitle(newTitle);
                } else {
                    setAllExcursions([]);
                    // Keep the title, but the results component will show "No results found"
                }

            } catch (err) {
                console.error(err);
                const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
                setError(errorMessage);
                setAllExcursions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
        setCurrentPage(1);

    }, [query, lat, lon]);

    const totalPages = Math.ceil(allExcursions.length / EXCURSIONS_PER_PAGE);

    const paginatedExcursions = useMemo(() => {
        const start = (currentPage - 1) * EXCURSIONS_PER_PAGE;
        const end = start + EXCURSIONS_PER_PAGE;
        return allExcursions.slice(start, end);
    }, [allExcursions, currentPage]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
                <p className="text-muted-foreground mb-8">Our AI is finding the best matches for you...</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="space-y-4">
                           <Skeleton className="h-48 w-full" />
                           <Skeleton className="h-4 w-3/4" />
                           <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
             <div className="text-center py-16">
                <h2 className="text-2xl font-semibold">Search Failed</h2>
                <p className="text-muted-foreground mt-2">{error}</p>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <h1 className="text-3xl font-bold tracking-tight mb-8">{title}</h1>
              {allExcursions.length > 0 ? (
                <>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {paginatedExcursions.map(excursion => (
                            <ExcursionCard
                                key={excursion.id}
                                excursion={excursion}
                            />
                        ))}
                    </div>
                    <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
              ) : (
                 <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold">No Excursions Found</h2>
                    <p className="text-muted-foreground mt-2">Our AI couldn't find a match for your search. Please try a different query.</p>
                </div>
              )}
        </div>
    );
}


export default function AIResultsPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <AISearchResults />
    </Suspense>
  );
}
