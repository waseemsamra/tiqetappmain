import { promises as fs } from 'fs';
import { join } from 'path';

const CACHE_DIR = join(process.cwd(), 'cache');
const PRODUCTS_CACHE_FILE = join(CACHE_DIR, 'products.json');
const HELICOPTER_CACHE_FILE = join(CACHE_DIR, 'helicopter-tours.json');
const VARIANTS_CACHE_FILE = join(CACHE_DIR, 'variants.json');
const EXPERIENCES_CACHE_FILE = join(CACHE_DIR, 'experiences.json');

const HELICOPTER_KEYWORDS = [
  'helicopter', 'chopper', 'air tour', 'flightseeing',
  'aerial tour', 'heli', 'rotor', 'aircraft', 'skyline',
  'scenic flight', 'seaplane', 'aerial adventure', 'plane tour'
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
  product_ids?: string[];
  whatsincluded?: string;
  whatsnotincluded?: string;
  cancellationpolicy?: string;
};

export type CachedVariant = {
  product_id: string;
  experience_id: string;
  title: string;
  price?: number;
  duration?: string;
  description?: string;
  image_url?: string;
};

const TARGET_CITIES = [
  { name: 'Dubai', id: '60005' },
  { name: 'New York', id: '260932' },
  { name: 'London', id: '67458' },
  { name: 'Amsterdam', id: '75061' },
  { name: 'Paris', id: '66746' },
  { name: 'Barcelona', id: '66342' }
];

// Ensure cache directory exists
async function initCache() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  } catch (e) {}
}

// Load cached data
async function loadCache<T>(file: string): Promise<T[]> {
  try {
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// Save cached data
async function saveCache<T>(file: string, data: T[]) {
  await initCache();
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
}

export async function syncTiqetsProducts() {
  await initCache();
  
  const allProducts: CachedProduct[] = [];
  const helicopterProducts: CachedProduct[] = [];
  const allVariants: CachedVariant[] = [];
  const allExperiences: any[] = [];

  for (const city of TARGET_CITIES) {
    console.log(`Syncing ${city.name}...`);
    const cityProducts = await fetchProductsForCity(city.id, city.name, allVariants, allExperiences);
    
    for (const product of cityProducts) {
      if (!allProducts.find(p => p.tiqets_product_id === product.tiqets_product_id)) {
        allProducts.push(product);
      }
      
      if (isHelicopterTour(product) && 
          !helicopterProducts.find(p => p.tiqets_product_id === product.tiqets_product_id)) {
        helicopterProducts.push(product);
      }
    }
    
    await sleep(500);
  }

  await saveCache(PRODUCTS_CACHE_FILE, allProducts);
  await saveCache(HELICOPTER_CACHE_FILE, helicopterProducts);
  await saveCache(VARIANTS_CACHE_FILE, allVariants);
  await saveCache(EXPERIENCES_CACHE_FILE, allExperiences);
  
  console.log(`Sync complete: ${allProducts.length} products, ${helicopterProducts.length} helicopter tours, ${allVariants.length} variants, ${allExperiences.length} experiences`);
  
  return {
    totalProducts: allProducts.length,
    helicopterTours: helicopterProducts.length,
    cities: TARGET_CITIES.length,
    variants: allVariants.length,
    experiences: allExperiences.length
  };
}

async function fetchProductsForCity(cityId: string, cityName: string, variantsArray: CachedVariant[], experiencesArray: any[]): Promise<CachedProduct[]> {
  const products: CachedProduct[] = [];
  const pageSize = 100;

  // Try experiences endpoint
  for (let page = 1; page <= 3; page++) {
    try {
      const resp = await fetch(
        `https://api.tiqets.com/v2/experiences?city_id=${cityId}&page_size=${pageSize}&page=${page}`,
        { method: 'GET', headers: { 'Accept': 'application/json', 'Authorization': `Token ${process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W'}`, 'User-Agent': 'my user agent' } }
      );
      
      if (!resp.ok) break;
      
      const data = await resp.json();
      const batch = (data.experiences || data.products || data.items || []);
      
      for (const exp of batch) {
        // Store full experience data
        experiencesArray.push({
          id: exp.id?.toString(),
          title: exp.title,
          description: exp.description,
          tagline: exp.tagline,
          city_id: exp.city_id?.toString(),
          city_name: exp.city_name,
          country_name: exp.country_name,
          price: exp.from_price || exp.price,
          currency: exp.currency,
          duration: exp.duration,
          rating: exp.ratings?.average,
          reviews_total: exp.ratings?.total,
          image_url: extractFirstImageUrl(exp.images),
          experience_url: exp.experience_url,
          product_ids: exp.product_ids || []
        });

        // Add the main experience to products
        const product: CachedProduct = {
          tiqets_product_id: `exp-${exp.id?.toString() || ''}`,
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
          product_ids: exp.product_ids || [] as any
        };
        if (product.tiqets_product_id) {
          products.push(product);
        }
        
        // Fetch variants/products linked to this experience
        const productIds = exp.product_ids || [];
        const experienceId = exp.id?.toString() || '';
        
        for (let j = 0; j < productIds.length; j++) {
          const productId = productIds[j];
          const variant = await fetchProductById(productId);
          if (variant) {
            // Add to products cache
            const variantProduct: CachedProduct = {
              tiqets_product_id: variant.id?.toString() || productId,
              title: variant.title || exp.title || '',
              description: variant.description || exp.description || exp.tagline || '',
              tagline: variant.tagline || exp.tagline,
              city_id: exp.city_id?.toString() || cityId,
              city_name: exp.city_name || cityName,
              country_name: exp.country_name,
              price: variant.price || exp.from_price || exp.price,
              currency: variant.currency || exp.currency,
              duration: variant.duration || exp.duration,
              rating: exp.ratings?.average,
              reviews_total: exp.ratings?.total,
              image_url: variant.image_urls?.[0] || extractFirstImageUrl(exp.images),
              experience_url: exp.experience_url
            };
            if (variantProduct.tiqets_product_id) {
              products.push(variantProduct);
            }
            
            // Also add to variants array with experience_id link
            variantsArray.push({
              product_id: variant.id?.toString() || productId,
              experience_id: experienceId,
              title: variant.title || exp.title || '',
              price: variant.price || exp.from_price,
              duration: variant.duration || exp.duration,
              description: variant.description || exp.tagline || '',
              image_url: variant.image_urls?.[0] || extractFirstImageUrl(exp.images)
            });
          }
          // Rate limit: 150ms between variant requests
          if (j < productIds.length - 1) {
            await sleep(150);
          }
        }
      }
      
      if (batch.length < pageSize) break;
    } catch (e) {
      console.error(`Error fetching experiences:`, e);
      break;
    }
  }

  // Try products endpoint
  for (let page = 1; page <= 3; page++) {
    try {
      const resp = await fetch(
        `https://api.tiqets.com/v2/products?city_id=${cityId}&page_size=${pageSize}&page=${page}`,
        { method: 'GET', headers: { 'Accept': 'application/json', 'Authorization': `Token ${process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W'}`, 'User-Agent': 'my user agent' } }
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
          experience_url: prod.experience_url || prod.product_url
        };
        if (product.tiqets_product_id) {
          // Avoid duplicates
          if (!products.find(p => p.tiqets_product_id === product.tiqets_product_id)) {
            products.push(product);
          }
        }
      }
      
      if (batch.length < pageSize) break;
    } catch (e) {
      console.error(`Error fetching products:`, e);
      break;
    }
  }

  return products;
}

async function fetchProductById(productId: string): Promise<any | null> {
  try {
    const resp = await fetch(
      `https://api.tiqets.com/v2/products/${productId}`,
      { method: 'GET', headers: { 'Accept': 'application/json', 'Authorization': `Token ${process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W'}`, 'User-Agent': 'my user agent' } }
    );
    
    if (!resp.ok) return null;
    
    const data = await resp.json();
    const product = data.product || data;
    
    return {
      id: product.id,
      title: product.title || '',
      description: product.tagline || product.description || '',
      price: product.price || product.from_price,
      currency: product.currency,
      duration: product.duration,
      image_urls: product.images ? product.images.map((img: any) => img?.medium || img?.large || img?.small).filter(Boolean) : []
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

function extractFirstImageUrl(images: any[]): string | undefined {
  if (!images || !images.length) return undefined;
  return images[0]?.large || images[0]?.medium || images[0]?.small || images[0]?.extra_large;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Get variants for specific experience from cache
export async function getVariantsForExperience(experienceId: string): Promise<any[]> {
  const variants = await loadCache<CachedVariant>(VARIANTS_CACHE_FILE);
  
  // Find all variants for this experience
  return variants
    .filter(v => v.experience_id === experienceId)
    .map(v => ({
      id: v.product_id,
      name: v.title,
      price: v.price || 0,
      duration: v.duration || '',
      description: v.description || '',
      images: v.image_url ? [v.image_url] : []
    }));
}

// Get experience from cache by ID
export async function getExperienceByIdFromCache(id: string): Promise<any | null> {
  const experiences = await loadCache<any>(EXPERIENCES_CACHE_FILE);
  const exp = experiences.find((e: any) => e.id === id);
  
  if (!exp) return null;
  
  // Transform cached experience to Excursion type
  return {
    id: exp.id,
    name: exp.title,
    city: exp.city_name || '',
    country: exp.country_name || '',
    description: exp.description || '',
    price: exp.price || 0,
    duration: exp.duration || 'Not specified',
    activitytypeid: exp.id,
    excursionType: { id: exp.id, name: exp.tagline || 'Activity' },
    rating: exp.rating || 0,
    images: exp.image_url ? [exp.image_url] : [],
    whatsincluded: exp.whatsincluded || '',
    whatsnotincluded: exp.whatsnotincluded || '',
    cancellationpolicy: exp.cancellationpolicy || '',
    product_ids: exp.product_ids || [],
    reviews: [],
    reviewsTotal: exp.reviews_total || 0,
    experience_url: exp.experience_url || ''
  };
}

// Search functions
export async function searchProducts(query: string, type: 'all' | 'helicopter' = 'all') {
  const lowerQuery = query.toLowerCase();
  
  const products = type === 'helicopter' 
    ? await loadCache<CachedProduct>(HELICOPTER_CACHE_FILE)
    : await loadCache<CachedProduct>(PRODUCTS_CACHE_FILE);

  return products.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description?.toLowerCase().includes(lowerQuery) ||
    p.city_name?.toLowerCase().includes(lowerQuery) ||
    p.country_name?.toLowerCase().includes(lowerQuery) ||
    p.tagline?.toLowerCase().includes(lowerQuery)
  ).sort((a, b) => (b.rating || 0) - (a.rating || 0));
}

export async function getHelicopterTours() {
  const tours = await loadCache<CachedProduct>(HELICOPTER_CACHE_FILE);
  return tours.sort((a, b) => (a.price || 0) - (b.price || 0));
}