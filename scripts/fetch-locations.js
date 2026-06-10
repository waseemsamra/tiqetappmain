import https from 'https';
import fs from 'fs';
import path from 'path';

const API_KEY = process.env.TIQETS_API_KEY || '';
const API_BASE = 'https://api.tiqets.com/v2';

const cacheDir = path.join(process.cwd(), '..', 'cache');
const outFile = path.join(cacheDir, 'locations.json');

if (!API_KEY) {
  console.error('Missing TIQETS_API_KEY');
  process.exit(1);
}

function req(path) {
  return new Promise((resolve, reject) => {
    https.get({
      hostname: 'api.tiqets.com',
      path: `/v2${path}`,
      headers: { Authorization: `Token ${API_KEY}`, Accept: 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ ok: res.statusCode === 200, status: res.statusCode, data: JSON.parse(data) }); }
        catch (e) { reject(new Error('Invalid JSON')); }
      });
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  fs.mkdirSync(cacheDir, { recursive: true });
  const { data } = await req('/locations/countries');
  const countries = (data?.countries || []).map((c) => ({
    id: String(c.id || c.code || ''),
    name: c.name || '',
    code: c.code || '',
    currency: c.currency,
    currency_symbol: c.currency_symbol
  }));

  const cities = [];
  for (let i = 0; i < countries.length; i += 10) {
    const batch = countries.slice(i, i + 10);
    for (const country of batch) {
      try {
        const r = await req(`/locations/cities?country_code=${encodeURIComponent(country.code.toUpperCase())}`);
        for (const c of (r.data?.cities || [])) {
          cities.push({
            id: String(c.id || ''),
            name: c.name || '',
            country_code: (c.country_code || country.code).toLowerCase(),
            country_name: c.country_name || country.name
          });
        }
      } catch (e) {}
    }
    await sleep(1000);
  }

  const out = { countries, cities };
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2), 'utf-8');
  console.log(`Wrote ${countries.length} countries and ${cities.length} cities to ${outFile}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
