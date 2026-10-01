import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CURRENCY = 'USD';
const CONCURRENCY = 2;
const MAX_ATTEMPTS = 6;

const filePath = join(process.cwd(), 'public', 'excursions.json');
const parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
const experiences = Array.isArray(parsed.experiences) ? parsed.experiences : [];

const headers = {
  Accept: 'application/json',
  'User-Agent': 'tiqetapp-cache-refresh',
  ...(process.env.TIQETS_API_KEY ? { Authorization: 'Token ' + process.env.TIQETS_API_KEY } : {}),
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithCurrency(url) {
  const target = url + (url.includes('?') ? '&' : '?') + 'currency=' + CURRENCY;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const res = await fetch(target, { headers });
    if (res.status === 404) return null;
    if (res.status === 429 || res.status >= 500) {
      const backoff = 1000 * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 400);
      await sleep(backoff);
      continue;
    }
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    return data.experience || data.product || data;
  }

  throw new Error('rate limited after ' + MAX_ATTEMPTS + ' attempts');
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

/**
 * Venue experiences often carry no `from_price`; the real "from" price lives on
 * the cheapest child product, so fall back to that.
 */
async function resolveUsdPrice(id, productIds) {
  const experience = await fetchWithCurrency('https://api.tiqets.com/v2/experiences/' + id);
  if (!experience) return null;

  if (typeof experience.from_price === 'number') {
    return { price: experience.from_price, currency: experience.currency || CURRENCY };
  }

  const ids = Array.isArray(productIds) && productIds.length ? productIds : experience.product_ids;
  if (!Array.isArray(ids) || ids.length === 0) return null;

  let cheapest = null;
  for (const productId of ids) {
    try {
      const product = await fetchWithCurrency('https://api.tiqets.com/v2/products/' + productId);
      const price = product && typeof product.price === 'number' ? product.price : null;
      if (price !== null && (cheapest === null || price < cheapest)) cheapest = price;
    } catch (error) {
      console.error('    product ' + productId + ' failed: ' + error.message);
    }
  }

  return cheapest === null ? null : { price: cheapest, currency: CURRENCY };
}

async function main() {
  let updated = 0;
  let unchanged = 0;
  let failed = 0;

  await mapLimit(experiences, CONCURRENCY, async (experience) => {
    try {
      const resolved = await resolveUsdPrice(experience.id, experience.product_ids);
      if (!resolved) {
        failed++;
        return;
      }
      const usdPrice = resolved.price;
      if (usdPrice === experience.price && experience.currency === CURRENCY) {
        unchanged++;
        return;
      }
      experience.original_price = experience.original_price ?? experience.price;
      experience.original_currency = experience.original_currency ?? (experience.currency || 'EUR');
      experience.price = usdPrice;
      experience.currency = CURRENCY;
      updated++;
    } catch (error) {
      failed++;
      console.error('  ' + experience.id + ' failed: ' + error.message);
    }
  });

  parsed.experiences = experiences;
  writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
  console.log(
    'updated ' + updated + ', already USD ' + unchanged + ', failed ' + failed + ', total ' + experiences.length
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
