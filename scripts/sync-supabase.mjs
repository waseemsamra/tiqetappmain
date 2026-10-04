/**
 * Syncs the local copy into Supabase:
 *
 *   public/tags.json       -> tiqets_tags
 *   public/excursions.json -> tiqets_tours + tiqets_variants
 *
 * Uses the service role key (bypasses RLS) and upserts,
 * so re-running is idempotent. Tables come from
 * supabase/migrations/20261004000000_tiqets_local_copy.sql.
 *
 * Run: node scripts/sync-supabase.mjs
 */
import { readFileSync } from 'node:fs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required');
  process.exit(1);
}

const rest = `${url}/rest/v1`;
const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const CHUNK = 500;

async function upsert(table, rows, onConflict = 'id') {
  let inserted = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const res = await fetch(
      `${rest}/${table}?onConflict=${onConflict}`,
      {
        method: 'POST',
        headers: {
          ...headers,
          Prefer: 'resolution=merge-duplicates',
        },
        body: JSON.stringify(chunk),
      },
    );
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${table} chunk ${i}: ${res.status} ${text.slice(0, 200)}`);
    }
    inserted += chunk.length;
  }
  return inserted;
}

// 1. Tags
const tagsFile = JSON.parse(readFileSync('public/tags.json', 'utf-8'));
const tags = Array.isArray(tagsFile) ? tagsFile : tagsFile.tags;
const tagRows = tags.map((t) => ({
  id: String(t.id),
  name: t.name || '',
  type_name: t.type_name || '',
  type_id: String(t.type_id ?? ''),
  type_group_name: t.type_group_name ?? null,
}));
const tagsCount = await upsert('tiqets_tags', tagRows);
console.log(`tiqets_tags: ${tagsCount} rows upserted`);

// 2. Tours + variants
const snapshot = JSON.parse(readFileSync('public/excursions.json', 'utf-8'));
const experiences = Array.isArray(snapshot) ? snapshot : snapshot.experiences;
const variantLinks = (snapshot.variants || {});

const tourRows = experiences.map((ex) => ({
  id: String(ex.id),
  name: ex.name || '',
  city: ex.city || '',
  country: ex.country || '',
  description: ex.description || '',
  price: Number(ex.price || 0),
  currency: ex.currency || 'USD',
  duration: ex.duration || null,
  rating: Number(ex.rating || 0),
  reviews_total: Number(ex.reviewsTotal || 0),
  images: Array.isArray(ex.images) ? ex.images : [],
  product_ids: Array.isArray(ex.product_ids) ? ex.product_ids.map(String) : [],
  tag_ids: Array.isArray(ex.tag_ids) ? ex.tag_ids.map(String) : [],
  experience_url: ex.experience_url || null,
  payload: ex,
}));

const variantRows = [];
for (const ex of experiences) {
  const productIds = Array.isArray(ex.product_ids) ? ex.product_ids.map(String) : [];
  for (const pid of productIds) {
    const link = variantLinks[pid];
    if (!link) continue;
    variantRows.push({
      id: String(pid),
      tour_id: String(ex.id),
      tag_ids: Array.isArray(link.tag_ids) ? link.tag_ids.map(String) : [],
      payload: link,
    });
  }
}

const toursCount = await upsert('tiqets_tours', tourRows);
console.log(`tiqets_tours: ${toursCount} rows upserted`);

const variantsCount = await upsert('tiqets_variants', variantRows);
console.log(`tiqets_variants: ${variantsCount} rows upserted`);
