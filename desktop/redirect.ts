/**
 * Desktop redirect rules.
 *
 * Desktop browsers always get the full Next.js web app:
 * - legacy desktop paths are normalised to their new URLs
 * - desktop (or forced-desktop) visitors on the /m mobile
 *   page are sent back to the desktop home
 */

import { isMobileUserAgent } from '../mobile/redirect';

const DESKTOP_PATH_REDIRECTS: Record<string, string> = {
  '/index.html': '/',
  '/home': '/',
  '/main': '/',
};

export function getDesktopRedirectTarget(
  userAgent: string | null | undefined,
  pathname: string,
  forceDesktop = false
): string | null {
  const legacy = DESKTOP_PATH_REDIRECTS[pathname];
  if (legacy) return legacy;

  const onMobilePage = pathname === '/m' || pathname.startsWith('/m/');
  if (onMobilePage && (forceDesktop || !isMobileUserAgent(userAgent))) {
    return '/';
  }
  return null;
}
