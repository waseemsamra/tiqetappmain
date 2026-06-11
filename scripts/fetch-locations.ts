import https from 'https';

const API_KEY = process.env.TIQETS_API_KEY;
if (!API_KEY) {
  console.error('Missing TIQETS_API_KEY');
  process.exit(1);
}

async function fetchJSON(path) {
  const url = new URL('https://api.tiqets.com' + path);
  const res = await fetch(url, {
    headers: { Authorization: `Token ${API_KEY}`, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Tiqets error ${res.status} for ${path}`);
  return res.json();
}

async function main() {
  const countriesData = await fetchJSON('/v2/countries?page=1&page_size=100');
  const countries = (countriesData.countries || []).map((c) => ({
    id: String(c.id || ''),
    name: c.name || '',
    code: '',
    currency: '',
    currency_symbol: '',
  }));

  const cities = [];
  for (const country of countries.slice(0, 10)) {
    try {
      const citiesData = await fetchJSON(`/v2/cities?country_id=${encodeURIComponent(country.id)}`);
      for (const c of citiesData.cities || []) {
        cities.push({
          id: String(c.id || ''),
          name: c.name || '',
          country_code: String(c.country_code || ''),
          country_name: country.name || '',
        });
      }
    } catch {}
  }

  const out = JSON.stringify({ countries, cities }, null, 2);
  process.stdout.write(out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
