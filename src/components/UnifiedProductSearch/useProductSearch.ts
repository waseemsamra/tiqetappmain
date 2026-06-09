import { useState, useEffect, useCallback } from 'react';
import type { Product, SearchFilters, SearchResponse } from './types';

export function useProductSearch(initialFilters?: Partial<SearchFilters>) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: 'all',
    ...initialFilters,
  });
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const searchProducts = useCallback(async (searchFilters: SearchFilters, pageNum = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        query: searchFilters.query,
        type: searchFilters.type,
        page: pageNum.toString(),
        limit: '20',
        ...(searchFilters.category && { category: searchFilters.category }),
        ...(searchFilters.minPrice && { minPrice: searchFilters.minPrice.toString() }),
        ...(searchFilters.maxPrice && { maxPrice: searchFilters.maxPrice.toString() }),
      });

      const response = await fetch(`/api/search?${params}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data: SearchResponse = await response.json();
      
      if (pageNum === 1) {
        setResults(data.products);
      } else {
        setResults(prev => [...prev, ...data.products]);
      }
      
      setHasMore(data.hasMore);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (!filters.query) {
      setResults([]);
      return;
    }
    
    const timer = setTimeout(() => {
      if (filters.query.length >= 2) {
        searchProducts(filters, 1);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [filters, searchProducts]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      searchProducts(filters, page + 1);
    }
  }, [loading, hasMore, page, filters, searchProducts]);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  }, []);

  return {
    results,
    loading,
    error,
    hasMore,
    filters,
    updateFilters,
    loadMore,
    searchProducts,
  };
}