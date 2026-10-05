
import { type NextRequest, NextResponse } from 'next/server';
import { readVisitorCountry, VISITOR_COUNTRY_COOKIE } from '@/lib/visitor-country';
import { getMobileRedirectTarget } from '../mobile/redirect';
import { getDesktopRedirectTarget } from '../desktop/redirect';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Device-based routing between the two code folders:
  // - mobile browsers  -> /m mobile page (mobile/redirect.ts)
  // - desktop browsers -> full web app (desktop/redirect.ts)
  // API and Next.js internal paths are never redirected.
  const isInternal =
    url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/');
  const forceDesktop =
    request.cookies.get('force_desktop')?.value === 'true' ||
    url.searchParams.get('desktop') === '1';

  if (!isInternal) {
    const mobileTarget = getMobileRedirectTarget(
      request.headers.get('user-agent'),
      url.pathname,
      forceDesktop
    );
    if (mobileTarget) {
      return NextResponse.redirect(new URL(mobileTarget, request.url), 302);
    }

    const desktopTarget = getDesktopRedirectTarget(
      request.headers.get('user-agent'),
      url.pathname,
      forceDesktop
    );
    if (desktopTarget) {
      return NextResponse.redirect(new URL(desktopTarget, request.url), 301);
    }
  }

  // Expose the pathname to the root layout so chrome-less
  // pages (the /m mobile page) can skip the desktop
  // header/footer.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', url.pathname);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Check for referral code in query params
  const refCode = url.searchParams.get('ref');

  if (refCode) {
    response.cookies.set('referral_code', refCode, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  // Desktop view toggle: ?desktop=1 pins the desktop site
  // for a week, ?mobile=1 clears it.
  if (url.searchParams.get('desktop') === '1') {
    response.cookies.set('force_desktop', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  } else if (url.searchParams.get('mobile') === '1') {
    response.cookies.set('force_desktop', '', {
      path: '/',
      maxAge: 0,
    });
  }

  // Remember the visitor's country so the homepage can lead with destinations
  // in their own country. Headers are only available here in the edge runtime, so
  // the value is persisted as a cookie for the page to read.
  const geoCountry = readVisitorCountry(request.headers);
  if (geoCountry) {
    response.cookies.set(VISITOR_COUNTRY_COOKIE, geoCountry, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    response.headers.set('x-visitor-country', geoCountry);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
