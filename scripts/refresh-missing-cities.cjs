import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';

const filePath = './public/excursions.json';
const raw = readFileSync(filePath, 'utf-8');
const parsed = JSON.parse(raw);
const existing = Array.isArray(parsed.experiences) ? parsed.experiences : [];
const existingIds = new Set(existing.map((e: any) => String(e.id)));

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      ...(process.env.TIQETS_API_KEY ? { Authorization: `Token ${process.env.TIQETS_API_KEY}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function main() {
  let added = 0;
  for (const city of ['Singapore', 'Kuala Lumpur', 'Bangkok']) {
    console.log(`Fetching ${city}...`);
    const data = await fetchJson(`https://api.tiqets.com/v2/experiences?city_id=${city === 'Singapore' ? '78125' : city === 'Kuala Lumpur' ? '74416' : '78586'}&page_size=100`);
    const items = (data.experiences || data.products || data.items || []);
    const newItems = items.filter((e: any) => !existingIds.has(String(e.id)));
    console.log(`  ${city}: ${newItems.length} new`);
    existing.push(...newItems);
    newItems.forEach((e: any) => existingIds.add(String(e.id)));
    added += newItems.length;
  }
  parsed.experiences = existing;
  writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
  console.log(`Done. Added ${added}, total ${existing.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
