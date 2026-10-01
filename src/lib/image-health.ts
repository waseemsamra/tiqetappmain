/**
 * Picks the first image that actually exists on the CDN.
 *
 * Tiqets delists assets without removing them from the snapshot, so a cached
 * first image can 404 while the same experience's later images are fine. Tab
 * rows and hero surfaces must not show a broken image, so each candidate is
 * checked once and the results are cached.
 *
 * The check is a HEAD request per candidate, bounded by `maxCandidates` and
 * memoised per URL, so it costs nothing on repeat renders.
 */

const HEALTH_TTL_MS = 60 * 60 * 1000;
const healthCache = new Map<string, { at: number; ok: boolean }>();

/** Runs the probes with a small concurrency window rather than all at once. */
async function probeAll(urls: string[]): Promise<void> {
  let cursor = 0;
  const now = Date.now();

  async function worker() {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      try {
        const response = await fetch(url, { method: 'HEAD' });
        healthCache.set(url, { at: now, ok: response.ok });
      } catch {
        // Treat an unreachable CDN as unusable so a broken URL is skipped, but
        // do not cache it: a transient network failure must not stick.
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(4, urls.length) }, worker));
}

export async function firstAvailableImage(
  images: string[] | undefined,
  maxCandidates = 4,
): Promise<string | undefined> {
  const candidates = (images || []).filter(Boolean).slice(0, maxCandidates);
  if (candidates.length === 0) return undefined;

  const now = Date.now();
  const pending = candidates.filter((url) => {
    const hit = healthCache.get(url);
    if (hit && now - hit.at < HEALTH_TTL_MS) return false;
    healthCache.delete(url);
    return true;
  });

  if (pending.length > 0) await probeAll(pending);

  return candidates.find((url) => healthCache.get(url)?.ok);
}

/**
 * Resolves one usable image per city from a set of experiences.
 *
 * Returns a map keyed by city so a tab row can show a real picture even when an
 * experience's first image has been delisted.
 */
export async function cityCoverImages(
  excursions: Array<{ city?: string; images?: string[] }>,
): Promise<Map<string, string>> {
  // Candidates are pooled per city rather than taken from the first matching
  // experience: every image of one experience can be delisted while the city's
  // other experiences still have working ones.
  const byCity = new Map<string, string[]>();
  for (const excursion of excursions) {
    const city = excursion.city || '';
    if (!city) continue;
    const existing = byCity.get(city);
    const images = excursion.images || [];
    if (!images.length) continue;
    byCity.set(city, existing ? [...existing, ...images] : [...images]);
  }

  const entries = await Promise.all(
    [...byCity.entries()].map(
      async ([city, images]) => [city, await firstAvailableImage(images, 6)] as const,
    ),
  );

  const result = new Map<string, string>();
  for (const [city, url] of entries) {
    if (url) result.set(city, url);
  }
  return result;
}

/**
 * Replaces delisted images on cached experiences with the live ones.
 *
 * A cached image is kept when it resolves. When every candidate 404s, the
 * experience is re-read from the API once and its current images are used, so a
 * snapshot that outlives its assets still renders a real picture instead of a
 * broken card.
 */
export async function repairDeadImages<T extends { id: string; images?: string[] }>(
  excursions: T[],
  fetchLiveImages: (id: string) => Promise<string[]>,
  maxCandidates = 4,
): Promise<T[]> {
  // Probe the candidates of every row first, so an API call is only spent on
  // experiences whose images really are gone.
  await Promise.all(excursions.map((e) => firstAvailableImage(e.images, maxCandidates)));

  const stillBroken = excursions.filter(
    (e) =>
      (e.images || []).filter(Boolean).length > 0 &&
      !firstAvailableImageSync(e.images, maxCandidates),
  );

  if (stillBroken.length === 0) return excursions;

  const refreshed = new Map<string, string[]>();
  await Promise.all(
    stillBroken.map(async (e) => {
      const live = await fetchLiveImages(e.id);
      if (live.length > 0) refreshed.set(e.id, live);
    }),
  );

  if (refreshed.size === 0) return excursions;

  return excursions.map((e) => {
    const live = refreshed.get(e.id);
    // Live images lead the list so the card's first image is the current one.
    return live ? { ...e, images: [...live, ...(e.images || [])] } : e;
  });
}

/** Synchronous read of an already-probed candidate list. */
function firstAvailableImageSync(images: string[] | undefined, maxCandidates: number): string | undefined {
  const candidates = (images || []).filter(Boolean).slice(0, maxCandidates);
  return candidates.find((url) => healthCache.get(url)?.ok);
}
