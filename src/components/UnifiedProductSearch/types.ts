export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: string;
  location: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  category: 'excursion' | 'attraction' | 'tour';
  imageUrl: string;
  rating: number;
  reviewCount: number;
  tiqetsProductId: string;
}

export interface SearchFilters {
  query: string;
  type: 'all' | 'city' | 'country' | 'excursion';
  category?: 'excursion' | 'attraction' | 'tour';
  minPrice?: number;
  maxPrice?: number;
}

export interface SearchResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
}