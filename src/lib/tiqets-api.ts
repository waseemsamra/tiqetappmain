const TIQETS_API_BASE = 'https://api.tiqets.com/v2';
const TIQETS_API_KEY = process.env.TIQETS_API_KEY || 'tqat-KNZfj2r3RZ36Clpavn7zVxabeLVdCq2W';

const headers = {
  'Accept': 'application/json',
  'User-Agent': 'my user agent',
  'Authorization': `Token ${TIQETS_API_KEY}`
};

import type { Excursion, Country, City, ExcursionType, TiqetsTag } from '@/types';

export function transformTiqetsProduct(product: any): Excursion {
  const ratingValue = product.ratings?.average;
  const ratingsTotal = product.ratings?.total || product.ratings?.count || 0;
  const safeRating = typeof ratingValue === 'number' ? ratingValue : 
                   typeof ratingValue === 'string' && !isNaN(Number(ratingValue)) ? Number(ratingValue) : 0;
      
  const imageUrls = Array.isArray(product.images) 
    ? product.images.map((img: any) => img?.medium || img?.large || img?.small || img?.extra_large || '').filter(Boolean)
    : [];
  
  // For packages without images, try to get images from package_products
  if (imageUrls.length === 0 && Array.isArray(product.package_products) && product.package_products.length > 0) {
    // We'll populate these asynchronously in the calling code
    // For now, use the summary as it often contains rich info
  }

  // City and country can be at top level (products) or inside address (experiences)
  const city = product.city_name || product.address?.city_name || '';
  const country = product.country_name || product.address?.country_name || '';
  
  // Use summary for packages when description/tagline are empty
  const description = product.description || product.summary || '';
  const tagline = product.tagline || '';

  return {
    id: product.id?.toString() || '',
    name: product.title || '',
    city: city,
    country: country,
    description: description,
    price: product.from_price || product.price || 0,
    duration: product.duration || 'Not specified',
    activitytypeid: product.id?.toString() || 'default',
    excursionType: {
      id: product.id?.toString() || 'default',
      name: tagline || 'Activity'
    },
    rating: safeRating,
    images: imageUrls,
    discount: product.promo_label ? 0 : undefined,
    operatinghours: undefined,
    whatsincluded: product.whats_included || '',
    whatsnotincluded: product.whats_excluded || '',
    instructions: product.checkout_information?.usage || product.how_to_use || '',
    howtogetthere: product.venue?.address || product.address?.street || '',
    additionalinfo: product.checkout_information?.good_to_know || '',
    cancellationpolicy: product.variants?.[0]?.cancellation || '',
    status: 'active' as const,
    partner_id: null,
    reviews: [],
    product_ids: product.product_ids || [],
    reviewsTotal: ratingsTotal,
    tag_ids: Array.isArray(product.tag_ids) ? product.tag_ids.map(String) : [],
    experience_url: product.experience_url || '',
  };
}

function transformTiqetsCountry(country: any): Country {
  return {
    id: parseInt(country.id) || 0,
    name: country.name || '',
    code: country.id || '',
    currency: 'USD',
    currency_symbol: '$'
  };
}

function transformTiqetsCity(city: any): City {
  return {
    id: city.id || '',
    name: city.name || '',
    country_code: city.country_id || ''
  };
}

// Use city ID from API - known working city IDs for filtering
const KNOWN_CITY_IDS: Record<string, string> = {
    'barcelona': '66342',
    'rome': '71631',
    'paris': '66746',
    'milan': '71749',
    'florence': '71854',
    'venice': '71510',
    'antwerp': '60863',
    'sintra': '76496',
    'amsterdam': '75061',
    'new york': '260932',
    'dubai': '60005',
    'abu dhabi': '60013',
    'sharjah': '60007',
    'lima': '75306',
    'cusco': '75323',
    'puno': '75296',
    'arequipa': '75334',
    'aguas calientes': '261863',
    'london': '67458',
    'mexico city': '67461',
    'buenos aires': '60189',
    'ushuaia': '60210',
    'salta': '60240',
    'bariloche': '60331',
    'san carlos de bariloche': '272595',
    'palm beach': '263317',
    'nassau': '62236',
    'rio de janeiro': '61535',
    'vancouver': '62496',
    'toronto': '62492',
    'niagara falls': '62419',
    'montreal': '25',
    'calgary': '62338',
    'ottawa': '62431',
    'victoria': '62501',
    'quebec': '62516',
    'vaughan': '62499',
    'banff': '87579',
    'jasper': '322',
    'beaupre': '137139',
    'saint-constant': '62458',
    'britannia beach': '263089',
    'saint-joseph-de-la-rive': '270495',
    'richmond': '62452',
    'mississauga': '62408',
    'fort macleod': '136629',
    'brentwood bay': '263090',
    'whistler': '87924',
    'kamloops': '62382',
    'niagara-on-the-lake': '982',
    'gananoque': '269628',
    'edmonton': '62366',
    'scott': '271125',
    'cochrane': '62349',
    'lake louise': '137177',
    'golden': '136649',
    'gatineau': '62372',
    'squamish': '301',
    'sao paulo': '61533',
    'salvador': '61537',
    'manaus': '61539',
    'belem': '61541',
    'maceio': '61543',
    'curitiba': '61545',
    'porto alegre': '61547',
    'recife': '61549',
    'fortaleza': '61551',
    'sao luis': '61553',
    'florianopolis': '61555',
    'rio branco': '61557',
    'palmas': '61559',
    'campo grande': '61561',
    'goiania': '61563',
    'macapa': '61565',
    'teresina': '61567',
    'cuiaba': '61569',
    'porto velho': '61571',
    'joao pessoa': '61573',
    'aracaju': '61575',
    'natal': '61577',
    'cabo frio': '61579',
};

// Get all available cities from API
let cachedCities: any[] = [];
export async function getAvailableCities(): Promise<any[]> {
  if (cachedCities.length > 0) return cachedCities;
  
  try {
    const response = await fetch(`${TIQETS_API_BASE}/cities?page_size=100`, { method: 'GET', headers });
    if (response.ok) {
      const data = await response.json();
      cachedCities = data.cities || data || [];
      return cachedCities;
    }
  } catch (e) {
    console.error('Failed to fetch cities:', e);
  }
  return [];
}

export async function fetchTiqetsTags(): Promise<TiqetsTag[]> {
  try {
    const response = await fetch(`${TIQETS_API_BASE}/tags?page_size=200`, { method: 'GET', headers });
    if (!response.ok) return [];
    const data = await response.json();
    const tags = (data.tags || data || []) as any[];
    return tags.map(tag => ({
      id: String(tag.id ?? ''),
      name: tag.name || '',
      type_name: tag.type_name || '',
      type_id: String(tag.type_id ?? ''),
      type_group_name: tag.type_group_name ?? null,
    }));
  } catch (e) {
    console.error('Failed to fetch tags:', e);
    return [];
  }
}

export async function fetchTiqetsCountries(): Promise<Country[]> {
  let allCountries: any[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${TIQETS_API_BASE}/countries?page=${page}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error(`Tiqets API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const countries = data.countries || data || [];
    allCountries = allCountries.concat(countries);

    const pagination = data.pagination || {};
    if (countries.length < 10 || allCountries.length >= (pagination.total || 0)) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allCountries.map(transformTiqetsCountry);
}

export async function fetchTiqetsProducts(params: Record<string, string> = {}): Promise<Excursion[]> {
  const allExcursions: Excursion[] = [];

  // If city filter is specified, fetch by city_id
  if (params.city_name) {
    const cityNameLower = params.city_name.toLowerCase();
    
    // Check if we have a known city ID
    if (KNOWN_CITY_IDS[cityNameLower]) {
      const cityId = KNOWN_CITY_IDS[cityNameLower];
      
      // Try experiences endpoint first with pagination
      try {
        const experiences: any[] = [];
        for (let page = 1; page <= 5; page++) {
          const response = await fetch(`${TIQETS_API_BASE}/experiences?city_id=${cityId}&page_size=100&page=${page}`, { method: 'GET', headers });
          if (response.ok) {
            const data = await response.json();
            const products = data.experiences || data.products || data.items || [];
            experiences.push(...products);
            if (products.length < 100) break;
          } else {
            break;
          }
        }
        if (experiences.length > 0) {
          return experiences.map(transformTiqetsProduct);
        }
      } catch (e) {
        // Continue to fallback
      }
      
      // Try products endpoint (for cities like New York that only have products)
      try {
        const products: any[] = [];
        for (let page = 1; page <= 5; page++) {
          const response = await fetch(`${TIQETS_API_BASE}/products?city_id=${cityId}&page_size=100&page=${page}`, { method: 'GET', headers });
          if (response.ok) {
            const data = await response.json();
            const items = data.products || data.experiences || data.items || [];
            products.push(...items);
            if (items.length < 100) break;
          } else {
            break;
          }
        }
        if (products.length > 0) {
          return products.map(transformTiqetsProduct);
        }
      } catch (e) {
        // Continue to fallback
      }
    }
    const cities = await getAvailableCities();
    let match = cities.find(c => c.name && c.name.toLowerCase() === cityNameLower);
    if (!match) {
      const countryCodes: Record<string, string> = {
        'argentina': '50009', 'canada': '50037', 'brazil': '50030',
        'peru': '50174', 'colombia': '50048', 'mexico': '50157',
        'united states': '50233', 'spain': '50067', 'france': '50074',
        'italy': '50109', 'united kingdom': '50076', 'germany': '50056',
        'netherlands': '50166', 'australia': '50012', 'japan': '50113',
        'singapore': '50199', 'south korea': '50121', 'india': '50104',
        'indonesia': '50100', 'thailand': '50218', 'china': '50047',
        'vietnam': '50241', 'malaysia': '50158', 'cambodia': '50116',
        'taiwan': '50228', 'new zealand': '50014', 'united arab emirates': '50001',
        'egypt': '50064', 'turkey': '50225', 'morocco': '50137',
        'south africa': '50247', 'qatar': '50187', 'jordan': '50112',
        'kenya': '50114', 'tanzania': '50229', 'austria': '50011',
        'belgium': '50019', 'croatia': '50097', 'czech republic': '50055',
        'denmark': '50058', 'estonia': '50063', 'finland': '50069',
        'greece': '50088', 'hungary': '50099', 'ireland': '50101',
        'iceland': '50108', 'latvia': '50135', 'lithuania': '50133',
        'luxembourg': '50134', 'malta': '50153', 'monaco': '50138',
        'norway': '50167', 'poland': '50179', 'portugal': '50184',
        'romania': '50189', 'serbia': '50190', 'slovakia': '50203',
        'slovenia': '50201', 'sweden': '50198', 'switzerland': '50042',
        'bahamas': '50031', 'dominican republic': '50060', 'jamaica': '50111',
        'puerto rico': '50182', 'aruba': '50013', 'costa rica': '50049',
        'ecuador': '50062', 'belize': '50036', 'guatemala': '50090',
        'bosnia and herzegovina': '50016', 'israel': '50102', 'bulgaria': '50021',
        'russia': '50191', 'andorra': '50004',
      };
      for (const [countryName, countryId] of Object.entries(countryCodes)) {
        try {
          const resp = await fetch(`${TIQETS_API_BASE}/experiences?country_id=${countryId}&page_size=100`, { method: 'GET', headers });
          if (resp.ok) {
            const data = await resp.json();
            const products = data.experiences || data.products || data.items || [];
            const filtered = products.filter((e: any) => {
              const city = (e.address?.city_name || e.city_name || '').toLowerCase();
              return city === cityNameLower;
            });
            if (filtered.length > 0) {
              return filtered.map(transformTiqetsProduct);
            }
          }
        } catch (e) {}
      }
    }
  } else if (params.country_id || params.country_name) {
     // Try to fetch by country filter - use country_id first for better reliability
     const countryFilter = params.country_id || params.country_name;
     try {
       const response = await fetch(`${TIQETS_API_BASE}/experiences?country_id=${countryFilter}&page_size=100`, { method: 'GET', headers });
       if (response.ok) {
         const data = await response.json();
         const products = data.experiences || data.products || data.items || [];
         if (products.length > 0) {
           return products.map(transformTiqetsProduct);
         }
       }
     } catch (e) {
       // Continue to fallback
     }
   } else {
    // Fetch from multiple cities to get variety for homepage - use Promise.all for speed
    // Prioritize UAE cities to ensure they appear in the first 50 results
    const cityPromises = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Barcelona', 'Rome', 'Paris', 'New York', 'London', 'Amsterdam', 'Madrid', 'Lisbon', 'Berlin', 'Vienna', 'Prague', 'Budapest', 'Athens', 'Copenhagen', 'Stockholm', 'Oslo', 'Helsinki', 'Dublin', 'Edinburgh', 'Munich', 'Frankfurt', 'Hamburg', 'Milan', 'Venice', 'Florence', 'Naples', 'Porto', 'Valencia', 'Seville', 'Nice', 'Lyon', 'Salzburg', 'Krakow', 'Warsaw', 'Thessaloniki', 'Tallinn', 'Riga', 'Vilnius', 'Manchester', 'Liverpool', 'Brussels', 'Antwerp', 'Rotterdam', 'Zurich', 'Geneva', 'Bern', 'Cologne'].map(async (city) => {
      const cityId = KNOWN_CITY_IDS[city.toLowerCase()];
      if (!cityId) {
        return [];
      }
      
// Try experiences first
       try {
         const response = await fetch(`${TIQETS_API_BASE}/experiences?city_id=${cityId}&page_size=100`, { method: 'GET', headers });
         if (response.ok) {
           const data = await response.json();
           const products = data.experiences || data.products || data.items || [];
           if (products.length > 0) {
             return products.map(transformTiqetsProduct);
           }
         }
       } catch (e) {
         // Continue
       }
       
       // Try products for cities like New York and standalone products like helicopter tours
       try {
         const response = await fetch(`${TIQETS_API_BASE}/products?city_id=${cityId}&page_size=100`, { method: 'GET', headers });
         if (response.ok) {
           const data = await response.json();
           const products = data.products || data.experiences || data.items || [];
           return products.map(transformTiqetsProduct);
         }
       } catch (e) {
         return [];
       }
      
      return [];
    });
    
    const results = await Promise.all(cityPromises);
    for (let i = 0; i < results.length; i++) {
      allExcursions.push(...results[i]);
    }
    
    if (allExcursions.length > 0) {
      return allExcursions.slice(0, 100);
    }
  }
  
  throw new Error('Tiqets API: Failed to fetch products from any endpoint');
}

export async function fetchTiqetsProductVariants(productIds: string[]): Promise<any[]> {
  if (!productIds || productIds.length === 0) return [];
  
  const variantPromises = productIds.map(async (id) => {
    try {
      const response = await fetch(`${TIQETS_API_BASE}/products/${id}`, { method: 'GET', headers });
      if (response.ok) {
        const data = await response.json();
        const product = data.product || data;
        if (product) {
          let imageUrls = Array.isArray(product.images) 
            ? product.images.map((img: any) => img?.medium || img?.large || img?.small || img?.extra_large || '').filter(Boolean)
            : [];
          
          // Fetch images from venue experience if product has no images
          if (imageUrls.length === 0 && product.venue?.id) {
            try {
              const venueResponse = await fetch(`${TIQETS_API_BASE}/experiences/${product.venue.id}`, { method: 'GET', headers });
              if (venueResponse.ok) {
                const venueData = await venueResponse.json();
                const venueImages = venueData.experience?.images || [];
                if (venueImages.length > 0) {
                  imageUrls = venueImages.map((img: any) => img?.medium || img?.large || img?.small || '').filter(Boolean);
                }
              }
            } catch (e) {}
          }
          
          return {
            id: product.id?.toString() || '',
            name: product.title || product.name || '',
            price: product.price || product.from_price || 0,
            duration: product.duration || '',
            description: product.tagline || product.description || '',
            images: imageUrls,
          };
        }
      }
    } catch (e) {
    }
    return null;
  });
  
  const results = await Promise.all(variantPromises);
  return results.filter(v => v !== null);
}

export async function fetchTiqetsProductById(id: string): Promise<Excursion | null> {
  const endpoints = [`${TIQETS_API_BASE}/experiences/${id}`, `${TIQETS_API_BASE}/products/${id}`];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, { method: 'GET', headers });
      if (response.ok) {
        const data = await response.json();
        const product = data.experience || data.product || data;
        if (product) {
          // For products without images, search for parent experience
          let imageUrls = Array.isArray(product.images) 
            ? product.images.map((img: any) => img?.medium || img?.large || img?.small || img?.extra_large || '').filter(Boolean)
            : [];
          
          // Also fetch additional data from venue experience for products
          let venueData = null;
          const venueId = product.venue?.id;
          if (venueId) {
            try {
              const venueResponse = await fetch(`${TIQETS_API_BASE}/experiences/${venueId}`, { method: 'GET', headers });
              if (venueResponse.ok) {
                const venueResult = await venueResponse.json();
                venueData = venueResult.experience || venueResult;
              }
            } catch (e) {}
          }
          
          // For products without images, search for parent experience that contains this product
          if (imageUrls.length === 0) {
            // Get city from product to find matching experience
            const productCityId = product.city_id;
            
            // Try venue/experience first
            if (venueId) {
              try {
                const venueResponse = await fetch(`${TIQETS_API_BASE}/experiences/${venueId}`, { method: 'GET', headers });
                if (venueResponse.ok) {
                  const venueData2 = await venueResponse.json();
                  const venueImages = venueData2.experience?.images || [];
                  if (venueImages.length > 0) {
                    imageUrls = venueImages.map((img: any) => img?.medium || img?.large || img?.small || '').filter(Boolean);
                  }
                }
              } catch (e) {}
            }
            
            // Fallback: search for experiences in the same city that contain this product
            if (imageUrls.length === 0 && productCityId) {
              try {
                const expSearchResponse = await fetch(`${TIQETS_API_BASE}/experiences?product_id=${id}&city_id=${productCityId}`, { method: 'GET', headers });
                if (expSearchResponse.ok) {
                  const searchData = await expSearchResponse.json();
                  const experiences = searchData.experiences || [];
                  if (experiences.length > 0) {
                    const expImages = experiences[0].images || [];
                    imageUrls = expImages.map((img: any) => img?.medium || img?.large || img?.small || '').filter(Boolean);
                  }
                }
              } catch (e) {}
            }
            
            // Fallback: search all experiences with this product
            if (imageUrls.length === 0) {
              try {
                const expSearchResponse = await fetch(`${TIQETS_API_BASE}/experiences?product_id=${id}`, { method: 'GET', headers });
                if (expSearchResponse.ok) {
                  const searchData = await expSearchResponse.json();
                  const experiences = searchData.experiences || [];
                  for (const exp of experiences) {
                    if (Array.isArray(exp.images) && exp.images.length > 0) {
                      imageUrls = exp.images.map((img: any) => img?.medium || img?.large || img?.small || '').filter(Boolean);
                      break;
                    }
                  }
                }
              } catch (e) {}
            }
          }
          
          const transformed = transformTiqetsProduct(product);
          
          // Merge venue data for opening hours and cancellation if product doesn't have it
          const openingHours = transformed.operatinghours || venueData?.opening_times?.map((ot: any) => `${ot.from_time} - ${ot.to_time}`).join('\n') || '';
          const cancellation = transformed.cancellationpolicy || venueData?.variants?.[0]?.cancellation || '';
          
          return {
            ...transformed,
            images: imageUrls,
            operatinghours: openingHours,
            cancellationpolicy: cancellation,
          };
        }
      }
      if (response.status === 404) continue;
    } catch (e) {
      continue;
    }
  }
  
  return null;
}

export async function fetchTiqetsCities(countryId?: string): Promise<City[]> {
  let url = `${TIQETS_API_BASE}/cities`;
  if (countryId) {
    url = `${url}?country=${countryId}`;
  }
  const response = await fetch(url, {
    method: 'GET',
    headers
  });

  if (!response.ok) {
    throw new Error(`Tiqets API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return (data.cities || data || []).map(transformTiqetsCity);
}

export async function fetchTiqetsCityById(cityId: string): Promise<City | null> {
  const response = await fetch(`${TIQETS_API_BASE}/cities/${cityId}`, {
    method: 'GET',
    headers
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Tiqets API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const city = data.city || data;
  return city ? transformTiqetsCity(city) : null;
}