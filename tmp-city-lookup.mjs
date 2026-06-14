const TIQETS_API_KEY = process.env.TIQETS_API_KEY;
const headers = {
  Accept: 'application/json',
  ...(TIQETS_API_KEY ? { Authorization: 'Token ' + TIQETS_API_KEY } : {}),
};

(async () => {
  const res = await fetch('https://api.tiqets.com/v2/cities?page_size=200', { headers });
  const data = await res.json();
  const cities = data.cities || data || [];
  const targets = ['Kuala Lumpur', 'Bangkok', 'Singapore'];
  for (const t of targets) {
    const m = cities.find((c) => (c.name || '').toLowerCase() === t.toLowerCase());
    console.log(t + ': ' + (m ? m.id : 'not found'));
  }
})();
