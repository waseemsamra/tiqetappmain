'use client';

import { useState } from 'react';
import type { SearchFilters } from './types';

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  onSearch: () => void;
}

export function SearchBar({ filters, onFiltersChange, onSearch }: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(filters.query);

  const handleSearch = () => {
    onFiltersChange({ query: localQuery });
    onSearch();
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search by city, country, or excursion..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          🔍 Search
        </button>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${filters.type === 'all' ? 'active' : ''}`}
          onClick={() => onFiltersChange({ type: 'all' })}
        >
          All
        </button>
        <button
          className={`filter-tab ${filters.type === 'city' ? 'active' : ''}`}
          onClick={() => onFiltersChange({ type: 'city' })}
        >
          Cities
        </button>
        <button
          className={`filter-tab ${filters.type === 'country' ? 'active' : ''}`}
          onClick={() => onFiltersChange({ type: 'country' })}
        >
          Countries
        </button>
        <button
          className={`filter-tab ${filters.type === 'excursion' ? 'active' : ''}`}
          onClick={() => onFiltersChange({ type: 'excursion' })}
        >
          Excursions
        </button>
      </div>

      <div className="category-filters">
        <select
          onChange={(e) => onFiltersChange({ category: e.target.value as any })}
          value={filters.category || ''}
          className="category-select"
        >
          <option value="">All Categories</option>
          <option value="excursion">Excursions</option>
          <option value="attraction">Attractions</option>
          <option value="tour">Tours</option>
        </select>

        <div className="price-filters">
          <input
            type="number"
            placeholder="Min Price"
            onChange={(e) => onFiltersChange({ minPrice: parseInt(e.target.value) || undefined })}
            className="price-input"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max Price"
            onChange={(e) => onFiltersChange({ maxPrice: parseInt(e.target.value) || undefined })}
            className="price-input"
          />
        </div>
      </div>
    </div>
  );
}