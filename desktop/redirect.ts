/**
 * Desktop redirect rules.
 *
 * Desktop browsers always get the full Next.js web app. These
 * rules only normalise legacy desktop paths so old URLs land
 * on the correct page.
 */

const DESKTOP_PATH_REDIRECTS: Record<string, string> = {
  '/index.html': '/',
  '/home': '/',
  '/main': '/',
};

export function getDesktopRedirectTarget(pathname: string): string | null {
  return DESKTOP_PATH_REDIRECTS[pathname] ?? null;
}
