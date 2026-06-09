'use client';

import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { useProductSearch } from './useProductSearch';
import type { SearchFilters } from './types';

interface UnifiedProductSearchProps {
  initialFilters?: Partial<SearchFilters>;
  className?: string;
}

export function UnifiedProductSearch({ 
  initialFilters, 
  className = '' 
}: UnifiedProductSearchProps) {
  const {
    results,
    loading,
    error,
    hasMore,
    filters,
    updateFilters,
    loadMore,
    searchProducts,
  } = useProductSearch(initialFilters);

  return (
    <div className={`unified-product-search ${className}`}>
      <div className="search-header">
        <h1>Discover Amazing Experiences</h1>
        <p>Find and book excursions, attractions, and tours worldwide</p>
      </div>
      
      <SearchBar
        filters={filters}
        onFiltersChange={updateFilters}
        onSearch={() => searchProducts(filters, 1)}
      />
      
      <SearchResults
        products={results}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        error={error}
      />
    </div>
  );
}

export type { Product, SearchFilters, SearchResponse } from './types';
export { useProductSearch } from './useProductSearch';