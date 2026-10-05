/**
 * Mobile redirect rules (web).
 *
 * Mobile browsers are redirected to the /m mobile page.
 * Desktop browsers keep the full Next.js web app.
 * `forceDesktop` (from the force_desktop cookie or the
 * ?desktop=1 param) lets mobile users opt into the
 * desktop site. Set MOBILE_REDIRECT_ENABLED=false to
 * disable the redirect entirely.
 */

const MOBILE_UA = /android|iphone|ipad|ipod|mobile|opera mini|iemobile|blackberry|windows phone/i;

export function isMobileUserAgent(userAgent: string | null | undefined): boolean {
  return !!userAgent && MOBILE_UA.test(userAgent);
}

export function getMobileRedirectTarget(
  userAgent: string | null | undefined,
  pathname: string,
  forceDesktop = false
): string | null {
  if (forceDesktop) return null;
  if (process.env.MOBILE_REDIRECT_ENABLED === 'false') return null;
  if (!isMobileUserAgent(userAgent)) return null;
  if (pathname === '/m' || pathname.startsWith('/m/')) return null;
  return '/m';
}
