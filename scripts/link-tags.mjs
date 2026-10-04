/**
 * Updates the local copy with Tiqets tags and links
 * every local activity — and each of its variants —
 * to its tags:
 *
 *   1. GET /tags              -> public/tags.json
 *   2. GET /experiences/{id}  -> tag_ids in public/excursions.json
 *   3. GET /products/{id}     -> variants.<id>.tag_ids in
 *      public/excursions.json
 *
 * Run: node scripts/link-tags.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

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

// 1. Tags
const tagsRes = await fetch(`${BASE}/tags?page_size=200`, { headers });
if (!tagsRes.ok) {
  console.error('tags request failed:', tagsRes.status);
  process.exit(1);
}
const tagsData = await tagsRes.json();
const rawTags = tagsData.tags || tagsData || [];
const tags = rawTags.map((t) => ({
  id: String(t.id ?? ''),
  name: t.name || '',
  type_name: t.type_name || '',
  type_id: String(t.type_id ?? ''),
  type_group_name: t.type_group_name ?? null,
}));
mkdirSync('public', { recursive: true });
writeFileSync('public/tags.json', JSON.stringify({ at: Date.now(), tags }, null, 2));
console.log(`tags: ${tags.length} -> public/tags.json`);

// 2. Activity <-> tag links, plus the same
// links for each activity's variants (child products).
const snapshot = JSON.parse(readFileSync('public/excursions.json', 'utf-8'));
const experiences = Array.isArray(snapshot) ? snapshot : snapshot.experiences;
const variants = {};
let linked = 0;
let variantsLinked = 0;

const fetchTagIds = async (endpoint, id) => {
  try {
    const res = await fetch(`${BASE}/${endpoint}/${id}`, { headers });
    if (!res.ok) return null;
    const data = await res.json();
    const product = data.experience || data.product || data;
    return Array.isArray(product.tag_ids) ? product.tag_ids.map(String) : null;
  } catch {
    return null;
  }
};

const batchSize = 10;
for (let i = 0; i < experiences.length; i += batchSize) {
  const batch = experiences.slice(i, i + batchSize);
  await Promise.all(
    batch.map(async (ex) => {
      const tagIds = await fetchTagIds('experiences', ex.id);
      if (tagIds) {
        ex.tag_ids = tagIds;
        linked++;
      }
      const productIds = Array.isArray(ex.product_ids) ? ex.product_ids : [];
      await Promise.all(
        productIds.map(async (pid) => {
          const variantTagIds = await fetchTagIds('products', pid);
          if (variantTagIds) {
            variants[String(pid)] = { tag_ids: variantTagIds };
            variantsLinked++;
          }
        }),
      );
    }),
  );
}
if (Array.isArray(snapshot)) {
  writeFileSync('public/excursions.json', JSON.stringify(snapshot, null, 2));
} else {
  snapshot.experiences = experiences;
  snapshot.variants = variants;
  writeFileSync('public/excursions.json', JSON.stringify(snapshot, null, 2));
}
console.log(`activities linked with tag_ids: ${linked}/${experiences.length} -> public/excursions.json`);
console.log(`variants linked with tag_ids: ${variantsLinked} -> public/excursions.json (variants)`);
