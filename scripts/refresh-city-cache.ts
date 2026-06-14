import 'dotenv/config';
import { fetchTiqetsProducts } from './src/lib/tiqets-api.ts';
import { readFileSync, writeFileSync } from 'fs';

const cities = ['Singapore', 'Kuala Lumpur', 'Bangkok'];

async function main() {
  const filePath = './public/excursions.json';
  const raw = readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(raw);
  const existing = Array.isArray(parsed.experiences) ? parsed.experiences : [];

  const existingIds = new Set(existing.map((e: any) => String(e.id)));

  for (const city of cities) {
    console.log(`Fetching ${city}...`);
    const results = await fetchTiqetsProducts({ city_name: city });
    const newItems = results.filter((e: any) => !existingIds.has(String(e.id)));
    console.log(`  ${city}: ${results.length} total, ${newItems.length} new`);
    existing.push(...newItems);
    newItems.forEach((e: any) => existingIds.add(String(e.id)));
  }

  parsed.experiences = existing;
  writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
  console.log(`Done. Total experiences: ${existing.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
