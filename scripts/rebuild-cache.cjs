const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'excursions.json');
const raw = fs.readFileSync(filePath, 'utf-8');
const parsed = JSON.parse(raw);
const existing = Array.isArray(parsed.experiences) ? parsed.experiences : [];
const existingIds = new Set(existing.map((e) => String(e.id)));

const cachePath = path.join(process.cwd(), 'cache', 'experiences.json');
const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));

for (const ex of cacheData) {
  const id = String(ex.id);
  if (!existingIds.has(id)) {
    existingIds.add(id);
    existing.push({
      id: ex.id,
      name: ex.title || ex.name,
      city: ex.city_name || ex.city,
      country: ex.country_name || ex.country,
      description: ex.description,
      price: ex.price,
      duration: ex.duration,
      rating: ex.rating,
      images: ex.image_url ? [ex.image_url] : [],
      product_ids: ex.product_ids || [],
      experience_url: ex.experience_url || '',
      product_groups: []
    });
  }
}

const out = { experiences: existing };
fs.writeFileSync(filePath, JSON.stringify(out, null, 2), 'utf-8');
console.log('Wrote ' + existing.length + ' experiences');
