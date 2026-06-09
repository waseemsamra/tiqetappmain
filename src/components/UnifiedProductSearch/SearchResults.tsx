'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { Product } from './types';
import { ProductCard } from './ProductCard';

interface SearchResultsProps {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  error: string | null;
}

export function SearchResults({ 
  products, 
  loading, 
  hasMore, 
  onLoadMore, 
  error 
}: SearchResultsProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  // Infinite scroll
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [hasMore, loading, onLoadMore]);

  useEffect(() => {
    const element = observerTarget.current;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  if (error) {
    return (
      <div className="error-state">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (loading && products.length === 0) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Searching for amazing experiences...</p>
      </div>
    );
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="empty-state">
        <p>No products found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="results-header">
        <h2>Found {products.length} experiences</h2>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="load-more-trigger">
        {loading && <div className="loading-spinner">Loading more...</div>}
        {!hasMore && products.length > 0 && (
          <div className="end-message">You've seen all experiences</div>
        )}
      </div>
    </div>
  );
}