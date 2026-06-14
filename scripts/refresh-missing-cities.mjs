import('dotenv/config').then(() => {
  const fs = require('fs');
  const path = require('path');

  const filePath = path.resolve('public/excursions.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
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

  async function main() {
    let added = 0;
    const ids = {
      'Singapore': '78125',
      'Kuala Lumpur': '74416',
      'Bangkok': '78586',
    };
    for (const [city, cityId] of Object.entries(ids)) {
      console.log('Fetching ' + city + '...');
      const data = await fetchJson('https://api.tiqets.com/v2/experiences?city_id=' + cityId + '&page_size=100');
      const items = data.experiences || data.products || data.items || [];
      const newItems = items.filter((e) => !existingIds.has(String(e.id)));
      console.log('  ' + city + ': ' + newItems.length + ' new');
      existing.push(...newItems);
      newItems.forEach((e) => existingIds.add(String(e.id)));
      added += newItems.length;
    }
    parsed.experiences = existing;
    fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
    console.log('Done. Added ' + added + ', total ' + existing.length);
  }

  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
});
