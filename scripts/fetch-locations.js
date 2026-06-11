const https = require('https');
const fs = require('fs');
const path = require('path');

const key = process.env.TIQETS_API_KEY;
if (!key) {
  console.error('TIQETS_API_KEY missing');
  process.exit(1);
}

function req(p) {
  return new Promise((resolve, reject) => {
    https.get({
      hostname: 'api.tiqets.com',
      path: '/v2' + p,
      headers: { Authorization: 'Token ' + key, Accept: 'application/json' }
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); }
        catch (e) { reject(new Error('Invalid JSON from ' + p)); }
      });
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  let countries = [];
  let page = 1;
  while (true) {
    const data = await req('/countries?page=' + page + '&page_size=100');
    const batch = data.countries || [];
    countries = countries.concat(batch);
    if (batch.length < 100 || countries.length >= (data.pagination && data.pagination.total)) break;
    page++;
  }

  const mapped = countries.map((c) => ({
    id: String(c.id || ''),
    name: c.name || '',
    code: c.code || '',
    currency: '',
    currency_symbol: ''
  }));

  // Fetch cities for all countries in batches of 10 with 1s delay
  const allCities = [];
  for (let i = 0; i < mapped.length; i += 10) {
    const batch = mapped.slice(i, i + 10);
    for (const country of batch) {
      try {
        const cdata = await req('/cities?country_id=' + encodeURIComponent(country.id));
        const list = cdata.cities || [];
        for (const city of list) {
          allCities.push({
            id: String(city.id || ''),
            name: city.name || '',
            country_code: country.code || '',
            country_name: country.name || ''
          });
        }
      } catch {}
    }
    if (i + 10 < mapped.length) await sleep(1000);
  }

  const out = { countries: mapped, cities: allCities };
  const outPath = path.join(process.cwd(), 'public', 'locations.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf-8');
  console.log('Wrote', mapped.length, 'countries and', allCities.length, 'cities to', outPath);
})().catch((e) => { console.error(e); process.exit(1); });
