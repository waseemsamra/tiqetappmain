const TIQETS_IMGIX_HOST = 'aws-tiqets-cdn.imgix.net';

export const IMAGE_SIZES = {
  mini: { w: 128, h: 128 },
  thumb: { w: 240, h: 240 },
  avatar: { w: 320, h: 240 },
  list: { w: 640, h: 480 },
  card: { w: 800, h: 600 },
  gallery: { w: 1200, h: 900 },
  hero: { w: 1920, h: 1080 },
  og: { w: 1200, h: 630 },
} as const;

export type ImageSizeName = keyof typeof IMAGE_SIZES;

/**
 * Picks the highest resolution variant the Tiqets API offers for an image entry.
 * Order matters: extra_large (1284px) > large (500px) > medium (250px) > small (128px).
 */
export function pickTiqetsImageUrl(img: unknown): string {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img !== 'object') return '';
  const record = img as Record<string, unknown>;
  const candidates = [record.extra_large, record.large, record.medium, record.small];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.length > 0) return candidate;
  }
  return '';
}

export function pickTiqetsImageUrls(images: unknown): string[] {
  if (!Array.isArray(images)) return [];
  return images.map(pickTiqetsImageUrl).filter((url) => url.length > 0);
}

export function pickFirstTiqetsImageUrl(images: unknown): string | undefined {
  return pickTiqetsImageUrls(images)[0];
}

/** The asset path without the imgix query string, used to detect duplicates. */
function tiqetsAssetKey(url: string): string {
  return url.split('?')[0];
}

/** Rough pixel area of an imgix rendition, so the largest copy wins a merge. */
function tiqetsArea(url: string): number {
  const width = Number(url.match(/[?&]w=(\d+)/)?.[1] || 0);
  const height = Number(url.match(/[?&]h=(\d+)/)?.[1] || 0);
  return width * height;
}

/**
 * Merges image lists from several Tiqets sources (product, parent experience,
 * venue) keeping one entry per underlying asset at the highest resolution
 * available. Order of first appearance is preserved.
 */
export function mergeTiqetsImageUrls(...lists: (string[] | undefined)[]): string[] {
  const best = new Map<string, string>();
  for (const list of lists) {
    for (const url of list || []) {
      if (!url) continue;
      const key = tiqetsAssetKey(url);
      const existing = best.get(key);
      if (!existing || tiqetsArea(url) > tiqetsArea(existing)) {
        best.set(key, url);
      }
    }
  }
  return [...best.values()];
}

function currentTiqetsWidth(url: URL): number | undefined {
  const raw = url.searchParams.get('w');
  if (!raw) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

function buildSizedUrl(url: URL, w: number, h: number): string {
  url.searchParams.set('auto', 'format,compress');
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('crop', 'entropy');
  url.searchParams.set('q', '75');
  url.searchParams.set('w', String(w));
  url.searchParams.set('h', String(h));
  return url.toString();
}

/**
 * Requests a specific rendition from the Tiqets imgix CDN.
 * imgix re-renders from the original asset, so a stored thumbnail URL can always
 * be upgraded to a larger size (and a large one trimmed for small surfaces).
 * Non-Tiqets URLs (e.g. locally uploaded images) are returned untouched.
 */
export function tiqetsImageSize(url: string | null | undefined, size: ImageSizeName): string {
  if (!url) return '';

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }
  if (parsed.hostname !== TIQETS_IMGIX_HOST) return url;

  const { w, h } = IMAGE_SIZES[size];
  const existingWidth = currentTiqetsWidth(parsed);
  if (existingWidth === w && parsed.searchParams.get('h') === String(h)) return url;

  return buildSizedUrl(parsed, w, h);
}

/**
 * Resolves an image URL for a specific surface: upgrades a low resolution Tiqets
 * rendition when the requested size is larger, and returns the URL unchanged
 * for any other host.
 */
export function imageUrlFor(url: string | null | undefined, size: ImageSizeName): string {
  return tiqetsImageSize(url, size);
}
