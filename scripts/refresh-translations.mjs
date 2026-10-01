import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CONCURRENCY = 2;
const MAX_ATTEMPTS = 6;

/**
 * Snapshots Tiqets content translations for the cached experiences.
 *
 * The homepage reads `public/excursions.json`, a static USD snapshot, so the
 * `?lang=` preference can never reach it. This writes a parallel
 * `public/excursions.translations.json` holding name/description per language,
 * which the homepage overlays onto the cached rows. English is skipped: the
 * cache is already English.
 *
 * The parameter is `lang`, not `language` -- Tiqets silently ignores
 * `?language=` and returns English, which is easy to misread as "no
 * translations available".
 */
const LANGUAGES = ['ca', 'cs', 'da', 'de', 'el', 'es', 'fr', 'it', 'ko', 'nl', 'ja', 'pl', 'pt', 'ru', 'sv', 'zh'];

const sourcePath = join(process.cwd(), 'public', 'excursions.json');
const targetPath = join(process.cwd(), 'public', 'excursions.translations.json');

const parsed = JSON.parse(readFileSync(sourcePath, 'utf-8'));
const experiences = (Array.isArray(parsed.experiences) ? parsed.experiences : [])
  .filter((e) => e && e.id != null)
  .map((e) => ({ id: String(e.id), name: e.name }));

const headers = {
  Accept: 'application/json',
  'User-Agent': 'tiqetapp-translation-refresh',
  ...(process.env.TIQETS_API_KEY ? { Authorization: 'Token ' + process.env.TIQETS_API_KEY } : {}),
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchTranslation(id, lang) {
  const url = `https://api.tiqets.com/v2/experiences/${id}?lang=${encodeURIComponent(lang)}`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const res = await fetch(url, { headers });

    if (res.status === 404) return null;
    if (res.status === 429 || res.status >= 500) {
      const backoff = 1000 * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 400);
      await sleep(backoff);
      continue;
    }
    if (!res.ok) return null;

    const data = await res.json();
    const experience = data.experience || data;
    if (!experience) return null;

    const name = typeof experience.title === 'string' ? experience.title.trim() : '';
    const description = typeof experience.description === 'string' ? experience.description.trim() : '';
    if (!name) return null;

    // Section headings on the homepage are built from the cached country and
    // city, and Tiqets translates those too ("Vereinigte Arabische Emirate").
    const address = experience.address || {};
    const country = typeof address.country_name === 'string' ? address.country_name.trim() : '';
    const city = typeof address.city_name === 'string' ? address.city_name.trim() : '';

    return { name, description, country, city };
  }

  return null;
}

async function mapLimit(items, limit, worker) {
  const results = [];
  let cursor = 0;

  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

// Preserve any languages already captured, so a partial re-run is not a
// regression. Tiqets does not necessarily translate into every language for
// every experience, so a miss is recorded as absent rather than as English.
let output = {};
try {
  output = JSON.parse(readFileSync(targetPath, 'utf-8'));
} catch {}

for (const lang of LANGUAGES) {
  const existing = output[lang] || {};
  const results = await mapLimit(experiences, CONCURRENCY, async (experience) => {
    const translation = await fetchTranslation(experience.id, lang);
    return { id: experience.id, translation, original: experience.name };
  });

  let translated = 0;
  let same = 0;
  for (const { id, translation, original } of results) {
    if (!translation) continue;
    // Store whenever anything actually changed. Plenty of experience names are
    // proper nouns ("Burj Khalifa", "Colosseum") that are identical in every
    // language, so keying on the name alone would throw away a translated
    // description.
    if (translation.name === original && !translation.description) {
      same++;
      continue;
    }
    existing[id] = translation;
    translated++;
  }

  output[lang] = existing;
  console.log(
    `${lang}: ${translated} translated, ${same} identical to English, ${experiences.length - translated - same} untranslated`,
  );
  writeFileSync(targetPath, `${JSON.stringify(output, null, 0)}\n`);
}

console.log(`\nWrote ${targetPath}`);
