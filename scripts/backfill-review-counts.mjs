import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CONCURRENCY = 2;
const MAX_ATTEMPTS = 6;

/**
 * Backfills `reviewsTotal` into `public/excursions.json`.
 *
 * Tiqets exposes the real review count as `ratings.total` (15295 for the Burj
 * Khalifa, for example). `rebuild-public-cache.mjs` now writes it, but existing
 * snapshots predate that, so the cards could only render the average. This
 * fetches just the count per experience and leaves prices, images and
 * translations untouched.
 */
const filePath = join(process.cwd(), 'public', 'excursions.json');
const parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
const experiences = Array.isArray(parsed.experiences) ? parsed.experiences : [];

const headers = {
  Accept: 'application/json',
  'User-Agent': 'tiqetapp-reviews-backfill',
  ...(process.env.TIQETS_API_KEY ? { Authorization: 'Token ' + process.env.TIQETS_API_KEY } : {}),
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchReviewTotal(id) {
  const url = `https://api.tiqets.com/v2/experiences/${id}`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const res = await fetch(url, { headers });
    if (res.status === 404) return null;
    if (res.status === 429 || res.status >= 500) {
      await sleep(1000 * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 400));
      continue;
    }
    if (!res.ok) return null;

    const data = await res.json();
    const experience = data.experience || data;
    const total = experience?.ratings?.total ?? experience?.ratings?.count;
    return typeof total === 'number' ? total : null;
  }
  return null;
}

async function mapLimit(items, limit, worker) {
  const results = [];
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

const results = await mapLimit(experiences, CONCURRENCY, (experience) =>
  fetchReviewTotal(experience.id),
);

let filled = 0;
let missing = 0;
for (let i = 0; i < experiences.length; i++) {
  const total = results[i];
  if (typeof total === 'number') {
    experiences[i].reviewsTotal = total;
    filled++;
  } else {
    missing++;
  }
}

writeFileSync(filePath, `${JSON.stringify(parsed, null, 0)}\n`);
console.log(`reviewsTotal written: ${filled}, unavailable: ${missing}, total: ${experiences.length}`);
