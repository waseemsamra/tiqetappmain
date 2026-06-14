import { readFileSync, writeFileSync } from 'fs';

const filePath = './public/excursions.json';
const raw = readFileSync(filePath, 'utf-8');
const parsed = JSON.parse(raw);
const all = Array.isArray(parsed.experiences) ? parsed.experiences : [];

const targetCities = [
  'Dubai', 'Abu Dhabi', 'Sharjah', 'Ras al-Khaimah', 'Fujairah',
  'Barcelona', 'Rome', 'Paris', 'New York', 'Amsterdam',
  'Singapore', 'Kuala Lumpur', 'Bangkok'
];

const cityBuckets: Record<string, any[]> = {};
for (const ex of all) {
  const city = ex.city || ex.city_name || '';
  const match = targetCities.find(c => city.toLowerCase().includes(c.toLowerCase()));
  if (match) {
    if (!cityBuckets[match]) cityBuckets[match] = [];
    if (cityBuckets[match].length < 10) {
      cityBuckets[match].push(ex);
    }
  }
}

const trimmed = [];
for (const city of targetCities) {
  const bucket = cityBuckets[city] || [];
  if (bucket.length === 0) {
    console.warn(city + ': 0 items (will be empty tab)');
  } else if (bucket.length < 10) {
    console.warn(city + ': only ' + bucket.length + ' items');
  } else {
    console.log(city + ': ' + bucket.length + ' items');
  }
  trimmed.push(...bucket);
}

parsed.experiences = trimmed;
writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf-8');
console.log('Total written: ' + trimmed.length);
