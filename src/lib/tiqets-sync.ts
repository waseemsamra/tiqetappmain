import type { Excursion } from '@/types';

const TIQETS_API_BASE = 'https://api.tiqets.com/v2';
const TIQETS_API_KEY = process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W';

const HEADERS = {
  'Accept': 'application/json',
  'User-Agent': 'my user agent',
  'Authorization': `Token ${TIQETS_API_KEY}`
};

const HELICOPTER_KEYWORDS = [
  'helicopter', 'chopper', 'air tour', 'flightseeing',
  'aerial tour', 'heli', 'rotor', 'aircraft', 'skyline',
  'scenic flight', 'seaplane', 'aerial adventure'
];

export type CachedProduct = {
  tiqets_product_id: string;
  title: string;
  description?: string;
  tagline?: string;
  city_id?: string;
  city_name?: string;
  country_name?: string;
  price?: number;
  currency?: string;
  duration?: string;
  rating?: number;
  reviews_total?: number;
  image_url?: string;
  experience_url?: string;
  search_keywords: string[];
};

// Known city IDs for helicopter tours
const TARGET_CITIES = [
  { name: 'Dubai', id: '60005' },
  { name: 'New York', id: '260932' },
  { name: 'London', id: '67458' },
  { name: 'Amsterdam', id: '75061' }
];

export async function syncTiqetsProducts() {
  const allProducts: CachedProduct[] = [];
  const helicopterProducts: CachedProduct[] = [];

  for (const city of TARGET_CITIES) {
    console.log(`Syncing ${city.name}...`);
    const cityProducts = await fetchProductsForCity(city.id, city.name);
    allProducts.push(...cityProducts);
    
    // Filter for helicopter tours
    const helicopters = cityProducts.filter(isHelicopterTour);
    helicopterProducts.push(...helicopters);
    
    // Rate limit protection
    await sleep(500);
  }

  // Store in local database/memory cache
  await storeCachedProducts(allProducts, helicopterProducts);
  
  return {
    totalProducts: allProducts.length,
    helicopterTours: helicopterProducts.length,
    cities: TARGET_CITIES.length
  };
}

async function fetchProductsForCity(cityId: string, cityName: string): Promise<CachedProduct[]> {
  const products: CachedProduct[] = [];
  let page = 1;
  const pageSize = 100;
  
  // Try experiences endpoint first
  while (true) {
    try {
      const resp = await fetch(
        `${TIQETS_API_BASE}/experiences?city_id=${cityId}&page_size=${pageSize}&page=${page}`,
        { method: 'GET', headers: HEADERS }
      );
      
      if (!resp.ok) break;
      
      const data = await resp.json();
      const batch = (data.experiences || data.products || data.items || []);
      
      for (const exp of batch) {
        const productIds = exp.product_ids || [];
        if (productIds.length > 0) {
          // This is a venue with multiple products - fetch each product
          for (const productId of productIds) {
            const product = await fetchProductById(productId);
            if (product) {
              product.city_id = exp.city_id?.toString() || cityId;
              product.city_name = exp.city_name || cityName;
              product.country_name = exp.country_name;
              products.push(product);
            }
          }
        } else {
          // This might be a standalone product
          const product: CachedProduct = {
            tiqets_product_id: exp.id?.toString() || '',
            title: exp.title || '',
            description: exp.description || exp.tagline || '',
            tagline: exp.tagline,
            city_id: exp.city_id?.toString() || cityId,
            city_name: exp.city_name || cityName,
            country_name: exp.country_name,
            price: exp.from_price || exp.price,
            currency: exp.currency,
            duration: exp.duration,
            rating: exp.ratings?.average,
            reviews_total: exp.ratings?.total,
            image_url: extractFirstImageUrl(exp.images),
            experience_url: exp.experience_url,
            search_keywords: extractKeywords(exp)
          };
          if (product.tiqets_product_id) {
            products.push(product);
          }
        }
      }
      
      if (batch.length < pageSize) break;
      page++;
    } catch (e) {
      console.error(`Error fetching experiences for city ${cityId}:`, e);
      break;
    }
  }
  
  // Also try products endpoint
  page = 1;
  while (true) {
    try {
      const resp = await fetch(
        `${TIQETS_API_BASE}/products?city_id=${cityId}&page_size=${pageSize}&page=${page}`,
        { method: 'GET', headers: HEADERS }
      );
      
      if (!resp.ok) break;
      
      const data = await resp.json();
      const batch = (data.products || data.experiences || data.items || []);
      
      for (const prod of batch) {
        const product: CachedProduct = {
          tiqets_product_id: prod.id?.toString() || '',
          title: prod.title || '',
          description: prod.description || prod.tagline || prod.summary || '',
          tagline: prod.tagline,
          city_id: prod.city_id?.toString() || cityId,
          city_name: prod.city_name || cityName,
          country_name: prod.country_name,
          price: prod.price || prod.from_price,
          currency: prod.currency,
          duration: prod.duration,
          rating: prod.ratings?.average,
          reviews_total: prod.ratings?.total,
          image_url: extractFirstImageUrl(prod.images),
          experience_url: prod.experience_url || prod.product_url,
          search_keywords: extractKeywords(prod)
        };
        if (product.tiqets_product_id) {
          // Avoid duplicates
          if (!products.find(p => p.tiqets_product_id === product.tiqets_product_id)) {
            products.push(product);
          }
        }
      }
      
      if (batch.length < pageSize) break;
      page++;
    } catch (e) {
      console.error(`Error fetching products for city ${cityId}:`, e);
      break;
    }
  }
  
  return products;
}

async function fetchProductById(productId: string): Promise<CachedProduct | null> {
  try {
    const resp = await fetch(`${TIQETS_API_BASE}/products/${productId}`, {
      method: 'GET',
      headers: HEADERS
    });
    
    if (!resp.ok) return null;
    
    const data = await resp.json();
    const product = data.product || data;
    
    return {
      tiqets_product_id: product.id?.toString() || productId,
      title: product.title || '',
      description: product.description || product.tagline || product.summary || '',
      tagline: product.tagline,
      city_id: product.city_id?.toString(),
      city_name: product.city_name,
      country_name: product.country_name,
      price: product.price || product.from_price,
      currency: product.currency,
      duration: product.duration,
      rating: product.ratings?.average,
      reviews_total: product.ratings?.total,
      image_url: extractFirstImageUrl(product.images),
      experience_url: product.experience_url || product.product_url,
      search_keywords: extractKeywords(product)
    };
  } catch (e) {
    console.error(`Error fetching product ${productId}:`, e);
    return null;
  }
}

function isHelicopterTour(product: CachedProduct): boolean {
  const searchText = `${product.title} ${product.description || ''} ${product.tagline || ''}`.toLowerCase();
  return HELICOPTER_KEYWORDS.some(kw => searchText.includes(kw.toLowerCase()));
}

function extractKeywords(product: any): string[] {
  const text = `${product.title || ''} ${product.description || ''} ${product.tagline || ''}`.toLowerCase();
  const words = text.match(/\b[a-z]{4,}\b/g) || [];
  return [...new Set(words)];
}

function extractFirstImageUrl(images: any[]): string | undefined {
  if (!images || !images.length) return undefined;
  return images[0]?.large || images[0]?.medium || images[0]?.small || images[0]?.extra_large;
}

async function storeCachedProducts(products: CachedProduct[], helicopterProducts: CachedProduct[]) {
  // For now, we store in memory - in production, this would write to PostgreSQL
  // The data is available for immediate use
  console.log(`Processed ${products.length} products, found ${helicopterProducts.length} helicopter tours`);
  
  // Export to JSON for caching (can be used until DB is set up)
  const cacheData = {
    timestamp: new Date().toISOString(),
    total_products: products.length,
    products: products.filter(p => p.city_name && p.title),
    helicopter_tours: helicopterProducts
  };
  
  // In production, write to database here
  return cacheData;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Export for API use
export async function getCachedHelicopterTours(): Promise<CachedProduct[]> {
  // Check if cache exists
  // If not, sync
  // Return cached results
  return [];
}