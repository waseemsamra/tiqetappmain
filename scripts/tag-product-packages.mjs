import { readFileSync, writeFileSync } from 'node:fs';

/**
 * Tags each cached product with `is_package`.
 *
 * Tiqets exposes `is_package` (and `package_products`) on the product detail
 * endpoint, and that is the only reliable way to tell a real multi-experience
 * bundle from a single ticket that happens to include a drink. Titles are not
 * usable: many non-package products contain "+" for an added snack or souvenir.
 *
 * The flag is static, unlike price and availability, so caching it is safe.
 */

const CONCURRENCY = 5;
const filePath = 'public/excursions.json';
const token = process.env.TIQETS_API_KEY;

if (!token) {
  console.error('TIQETS_API_KEY is not set.');
  process.exit(1);
}

const parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
const experiences = parsed.experiences || [];

const ids = [
  ...new Set(experiences.flatMap((e) => (e.product_ids || []).map(String))),
];
console.log(`tagging ${ids.length} products across ${experiences.length} experiences`);

async function mapLimit(items, limit, run) {
  const results = [];
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await run(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const results = await mapLimit(ids, CONCURRENCY, async (id) => {
  try {
    const response = await fetch(`https://api.tiqets.com/v2/products/${id}`, {
      headers: { Authorization: `Token ${token}` },
    });
    if (!response.ok) return [id, null];
    const data = await response.json();
    const product = data.product || data;
    const isPackage =
      product.is_package === true ||
      (Array.isArray(product.package_products) && product.package_products.length > 0);
    return [id, isPackage];
  } catch {
    return [id, null];
  }
});

const flags = new Map(results.filter(([, value]) => value !== null));
let unavailable = 0;
for (const [, value] of results) if (value === null) unavailable++;

let tagged = 0;
for (const experience of experiences) {
  if (!Array.isArray(experience.product_groups)) continue;
  for (const group of experience.product_groups) {
    for (const product of group.products || []) {
      const isPackage = flags.get(String(product.id));
      if (isPackage === undefined) continue;
      product.is_package = isPackage;
      tagged++;
    }
  }
}

writeFileSync(filePath, `${JSON.stringify(parsed, null, 0)}\n`);
console.log(`tagged ${tagged} products; ${unavailable} unavailable`);

const target = experiences.find((e) => String(e.id) === '145628');
if (target) {
  const products = (target.product_groups || []).flatMap((g) => g.products || []);
  const packages = products.filter((p) => p.is_package).map((p) => p.title);
  console.log(`145628: ${packages.length} packages of ${products.length} products`);
  for (const title of packages) console.log(`  - ${title}`);
}
