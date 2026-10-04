/**
 * Gradual Tiqets -> Supabase crawler.
 *
 * Walks the whole catalogue A to Z:
 *   /countries -> /cities?country_id= -> /experiences?city_id=
 * and ingests up to DAILY_LIMIT new tours per run — each with
 * its variants and tag links — so the local copy grows
 * gradually instead of hammering the API.
 *
 * Progress lives in scripts/.tiqets-crawl-state.json and the
 * crawled rows in public/tiqets-crawl.json, so runs are
 * resumable and idempotent. Rows are also upserted into the
 * Supabase tables from
 * supabase/migrations/20261004000000_tiqets_local_copy.sql
 * (best effort: rows stay in the crawl file until Supabase
 * is reachable).
 *
 * Run daily: node scripts/crawl-tiqets.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const DAILY_LIMIT = 100;
const STATE_PATH = 'scripts/.tiqets-crawl-state.json';
const CRAWL_PATH = 'public/tiqets-crawl.json';
const REQUEST_DELAY_MS = 150;

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf-8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
    }),
);
const key = env.TIQETS_API_KEY;
if (!key) {
  console.error('TIQETS_API_KEY missing from .env.local');
  process.exit(1);
}

const headers = {
  Accept: 'application/json',
  'User-Agent': 'my user agent',
  Authorization: `Token ${key}`,
};
const BASE = 'https://api.tiqets.com/v2';

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchJson(url, options = {}) {
  const res = await fetch(url, { headers, ...options });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

/** All pages of a paginated endpoint. */
async function fetchAllPages(path, extract) {
  const out = [];
  let page = 1;
  for (;;) {
    const sep = path.includes('?') ? '&' : '?';
    const data = await fetchJson(
      `${BASE}/${path}${sep}page_size=100&page=${page}`,
    );
    const items = extract(data);
    out.push(...items);
    if (items.length < 100) break;
    page++;
    await sleep(REQUEST_DELAY_MS);
  }
  return out;
}

// ---- state ----
function loadState() {
  if (existsSync(STATE_PATH)) {
    try {
      return JSON.parse(readFileSync(STATE_PATH, 'utf-8'));
    } catch {
      // fall through to a fresh state
    }
  }
  return {
    countries: null,
    countryIdx: 0,
    cities: null,
    cityIdx: 0,
    page: 1,
    ingestedIds: [],
    ingestedTotal: 0,
    lastRun: null,
    done: false,
  };
}

function saveState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function loadCrawl() {
  if (existsSync(CRAWL_PATH)) {
    try {
      return JSON.parse(readFileSync(CRAWL_PATH, 'utf-8'));
    } catch {
      // fall through to a fresh store
    }
  }
  return { at: Date.now(), tours: [] };
}

function saveCrawl(crawl) {
  writeFileSync(CRAWL_PATH, JSON.stringify(crawl));
}

// ---- Supabase upsert ----
async function supabaseUpsert(table, rows) {
  if (!supabaseUrl || !supabaseKey) return false;
  const rest = `${supabaseUrl}/rest/v1`;
  for (let i = 0; i < rows.length; i += 500) {
    const chunk = rows.slice(i, i + 500);
    const res = await fetch(`${rest}/${table}?onConflict=id`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify(chunk),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${table}: ${res.status} ${text.slice(0, 200)}`);
    }
  }
  return true;
}

const today = () => new Date().toISOString().slice(0, 10);

const state = loadState();
const crawl = loadCrawl();
const ingestedSet = new Set(state.ingestedIds);

// Reset the daily budget on a new day.
if (state.lastRun !== today()) {
  state.lastRun = today();
}
let todayCount = 0;

// 1. Tags (refreshed on every run).
const tagsData = await fetchJson(`${BASE}/tags?page_size=200`);
const rawTags = tagsData.tags || tagsData || [];
const tagRows = rawTags.map((t) => ({
  id: String(t.id ?? ''),
  name: t.name || '',
  type_name: t.type_name || '',
  type_id: String(t.type_id ?? ''),
  type_group_name: t.type_group_name ?? null,
}));

// 2. Discover countries once, starting the walk at
//    Dubai so the local copy begins there and then
//    spreads gradually through the whole catalogue.
if (!state.countries) {
  const countries = await fetchAllPages('countries', (d) => d.countries || d.items || []);
  console.log(`discovered ${countries.length} countries`);

  const uae = countries.find((c) =>
    (c.name || '').toLowerCase().includes('united arab emirates'),
  );
  let seeded = false;
  if (uae) {
    const cities = await fetchAllPages(
      `cities?country_id=${uae.id}`,
      (d) => d.cities || d.items || [],
    );
    const dubai = cities.find((c) => (c.name || '').toLowerCase() === 'dubai');
    if (dubai) {
      // Dubai first, then the rest of the catalogue.
      state.countries = [
        uae,
        ...countries.filter((c) => String(c.id) !== String(uae.id)),
      ];
      state.cities = [
        dubai,
        ...cities.filter((c) => String(c.id) !== String(dubai.id)),
      ];
      state.countryIdx = 0;
      state.cityIdx = 0;
      state.page = 1;
      console.log(
        `starting with Dubai (city ${dubai.id}; ${cities.length} cities in the UAE)`,
      );
      seeded = true;
      saveState(state);
    }
  }
  if (!seeded) {
    state.countries = countries;
    saveState(state);
  }
}

// 3. Walk countries -> cities -> experiences, ingesting
//    up to DAILY_LIMIT new tours.
const newTours = [];
const newVariants = [];

while (todayCount < DAILY_LIMIT && !state.done) {
  if (state.countryIdx >= state.countries.length) {
    state.done = true;
    break;
  }
  const country = state.countries[state.countryIdx];

  if (!state.cities) {
    try {
      state.cities = await fetchAllPages(
        `cities?country_id=${country.id}`,
        (d) => d.cities || d.items || [],
      );
    } catch {
      state.cities = [];
    }
    state.cityIdx = 0;
    state.page = 1;
    saveState(state);
  }

  if (state.cityIdx >= state.cities.length) {
    state.countryIdx++;
    state.cities = null;
    saveState(state);
    continue;
  }

  const city = state.cities[state.cityIdx];
  let pageData;
  try {
    pageData = await fetchJson(
      `${BASE}/experiences?city_id=${city.id}&page_size=100&page=${state.page}`,
    );
  } catch {
    pageData = { experiences: [] };
  }
  const experiences = pageData.experiences || pageData.products || pageData.items || [];

  if (experiences.length === 0) {
    // End of this city's catalogue.
    state.cityIdx++;
    state.page = 1;
    saveState(state);
    continue;
  }

  for (const item of experiences) {
    if (todayCount >= DAILY_LIMIT) break;
    const id = String(item.id);
    if (ingestedSet.has(id)) continue;

    // Full tour detail (tag_ids, variants list, content).
    let detail = item;
    try {
      const d = await fetchJson(`${BASE}/experiences/${id}`);
      detail = d.experience || d.product || d;
    } catch {
      // list shape is good enough if the detail call fails
    }
    await sleep(REQUEST_DELAY_MS);

    const productIds = Array.isArray(detail.product_ids)
      ? detail.product_ids.map(String)
      : [];

    // Variant details (child products) with their own tags.
    const variants = [];
    for (const pid of productIds) {
      try {
        const v = await fetchJson(`${BASE}/products/${pid}`);
        const product = v.product || v;
        variants.push({
          id: String(pid),
          title: product.title || '',
          tag_ids: Array.isArray(product.tag_ids) ? product.tag_ids.map(String) : [],
          from_price: Number(product.from_price || product.price || 0),
          payload: product,
        });
      } catch {
        // variant unavailable; skip it
      }
      await sleep(REQUEST_DELAY_MS);
    }

    const tour = {
      id,
      name: detail.title || item.title || '',
      city: detail.city_name || detail.address?.city_name || city.name || '',
      country: detail.country_name || detail.address?.country_name || country.name || '',
      tag_ids: Array.isArray(detail.tag_ids) ? detail.tag_ids.map(String) : [],
      product_ids: productIds,
      variants,
      payload: detail,
    };

    newTours.push(tour);
    ingestedSet.add(id);
    state.ingestedIds.push(id);
    state.ingestedTotal++;
    todayCount++;
  }

  // Advance the page cursor; a short page means the city is done.
  if (experiences.length < 100) {
    state.cityIdx++;
    state.page = 1;
  } else {
    state.page++;
  }
  saveState(state);
}

// 4. Persist the crawl file (source of truth until
//    Supabase is reachable).
crawl.at = Date.now();
crawl.tours.push(...newTours);
saveCrawl(crawl);

console.log(
  `ingested ${todayCount} new tours today (${state.ingestedTotal} total, ` +
    `${crawl.tours.length} in local copy)`,
);

// 5. Push the local copy into Supabase (best effort).
try {
  await supabaseUpsert('tiqets_tags', tagRows);
  const tourRows = crawl.tours.map((t) => ({
    id: t.id,
    name: t.name,
    city: t.city,
    country: t.country,
    description: t.payload?.description || t.payload?.summary || '',
    price: Number(t.payload?.from_price || t.payload?.price || 0),
    currency: t.payload?.currency || 'USD',
    duration: t.payload?.duration || null,
    rating: Number(t.payload?.ratings?.average || 0),
    reviews_total: Number(t.payload?.ratings?.total || 0),
    images: Array.isArray(t.payload?.images)
      ? (t.payload.images.map((img) => (typeof img === 'string' ? img : img.url)).filter(Boolean))
      : [],
    product_ids: t.product_ids,
    tag_ids: t.tag_ids,
    experience_url: t.payload?.experience_url || null,
    payload: t.payload,
  }));
  const variantRows = [];
  for (const t of crawl.tours) {
    for (const v of t.variants || []) {
      variantRows.push({
        id: v.id,
        tour_id: t.id,
        tag_ids: v.tag_ids,
        payload: v.payload,
      });
    }
  }
  await supabaseUpsert('tiqets_tours', tourRows);
  await supabaseUpsert('tiqets_variants', variantRows);
  console.log(`supabase: ${tourRows.length} tours, ${variantRows.length} variants, ${tagRows.length} tags upserted`);
} catch (error) {
  console.warn(`supabase unreachable, rows kept in ${CRAWL_PATH}:`, error.message);
}

saveState(state);
