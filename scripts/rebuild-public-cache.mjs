import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';

const filePath = './public/excursions.json';
const raw = readFileSync(filePath, 'utf-8');
const parsed = JSON.parse(raw);
const existing = Array.isArray(parsed.experiences) ? parsed.experiences : [];
const existingIds = new Set(existing.map((e) => String(e.id)));

async function fetchJson(url) {
  const headers = {
    Accept: 'application/json',
    ...(process.env.TIQETS_API_KEY ? { Authorization: 'Token ' + process.env.TIQETS_API_KEY } : {}),
  };
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

async function fetchAllPages(baseUrl) {
  const allItems = [];
  let page = 1;
  while (true) {
    const data = await fetchJson(baseUrl + '&page=' + page);
    const items = data.experiences || data.products || data.items || [];
    if (items.length === 0) break;
    allItems.push(...items);
    if (items.length < 100) break;
    page++;
  }
  return allItems;
}

async function main() {
  const ids = {
    'Dubai': '60005',
    'Abu Dhabi': '60013',
    'Sharjah': '60007',
    'Ras al-Khaimah': '60003',
    'Fujairah': '1526',
    'Barcelona': '66342',
    'Rome': '71631',
    'Paris': '66746',
    'New York': '260932',
    'Amsterdam': '75061',
    'Singapore': '78125',
    'Kuala Lumpur': '74416',
    'Bangkok': '78586',
  };

  let added = 0;
  for (const [city, cityId] of Object.entries(ids)) {
    console.log('Fetching ' + city);
    const expItems = await fetchAllPages('https://api.tiqets.com/v2/experiences?city_id=' + cityId + '&page_size=100');
    const prodItems = await fetchAllPages('https://api.tiqets.com/v2/products?city_id=' + cityId + '&page_size=100');
    const allItems = [...expItems, ...prodItems];

    const newItems = allItems.filter((e) => !existingIds.has(String(e.id)));
    console.log('  ' + city + ': ' + newItems.length + ' new (exp=' + expItems.length + ', prod=' + prodItems.length + ')');

    for (const e of newItems) {
      existingIds.add(String(e.id));
      existing.push({
        id: e.id,
        name: e.title || '',
        city: e.address?.city_name || city,
        country: e.address?.country_name || '',
        description: e.description || '',
        price: Number(e.from_price || e.price || 0),
        duration: e.duration || 'Not specified',
        rating: Number(e.ratings?.average || 0),
        images: Array.isArray(e.images)
          ? e.images.map((img) => {
              if (typeof img === 'string') return img;
              return img?.medium || img?.large || img?.small || img?.extra_large || '';
            }).filter(Boolean)
          : [],
        product_ids: Array.isArray(e.product_ids) ? e.product_ids : [],
        experience_url: e.experience_url || '',
        product_groups: []
      });
    }
    added += newItems.length;
  }

  parsed.experiences = existing;
  writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
  console.log('Done. Added ' + added + ', total ' + existing.length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
