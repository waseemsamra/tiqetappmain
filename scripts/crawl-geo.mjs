/**
 * Builds the local copy of the Tiqets geography:
 * every country and every city, with the ids Tiqets
 * maintains. Saved to public/tiqets-geo.json and
 * upserted into tiqets_countries / tiqets_cities
 * (best effort — rows stay local until Supabase is
 * reachable).
 *
 * Run: node scripts/crawl-geo.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const GEO_PATH = 'public/tiqets-geo.json';
const REQUEST_DELAY_MS = 100;

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

async function fetchJson(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

/** All pages of a paginated endpoint. */
async function fetchAllPages(path, extract) {
  const out = [];
  let page = 1;
  for (;;) {
    const sep = path.includes('?') ? '&' : '?';
    const data = await fetchJson(`${BASE}/${path}${sep}page_size=100&page=${page}`);
    const items = extract(data);
    out.push(...items);
    if (items.length < 100) break;
    page++;
    await sleep(REQUEST_DELAY_MS);
  }
  return out;
}

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

// 1. Countries
const countries = await fetchAllPages('countries', (d) => d.countries || d.items || []);
console.log(`countries: ${countries.length}`);

// 2. Cities, country by country
const cities = [];
for (let i = 0; i < countries.length; i++) {
  const country = countries[i];
  try {
    const list = await fetchAllPages(
      `cities?country_id=${country.id}`,
      (d) => d.cities || d.items || [],
    );
    cities.push(
      ...list.map((city) => ({
        ...city,
        country_id: String(country.id),
      })),
    );
  } catch (error) {
    console.warn(`cities for ${country.name} failed:`, error.message);
  }
  if (i % 25 === 0) {
    console.log(`countries: ${i}/${countries.length}, cities so far: ${cities.length}`);
  }
}

writeFileSync(
  GEO_PATH,
  JSON.stringify({ at: Date.now(), countries, cities }),
);
console.log(
  `saved ${countries.length} countries, ${cities.length} cities -> ${GEO_PATH}`,
);

// 3. Supabase (best effort)
try {
  await supabaseUpsert(
    'tiqets_countries',
    countries.map((c) => ({
      id: String(c.id),
      name: c.name || '',
      payload: c,
    })),
  );
  await supabaseUpsert(
    'tiqets_cities',
    cities.map((c) => ({
      id: String(c.id),
      country_id: String(c.country_id || ''),
      name: c.name || '',
      payload: c,
    })),
  );
  console.log('supabase: geography upserted');
} catch (error) {
  console.warn(`supabase unreachable, geography kept in ${GEO_PATH}:`, error.message);
}
