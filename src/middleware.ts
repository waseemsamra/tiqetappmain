 
import { type NextRequest, NextResponse } from 'next/server';
import { readVisitorCountry, VISITOR_COUNTRY_COOKIE } from '@/lib/visitor-country';
import { getMobileRedirectTarget } from '../mobile/redirect';
import { getDesktopRedirectTarget } from '../desktop/redirect';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Device-based routing between the two code folders:
  // - mobile devices  -> React Native app store links (mobile/ folder)
  // - desktop browsers -> Next.js web app (desktop/ folder rules)
  // Guarded by MOBILE_REDIRECT_ENABLED so the web app keeps
  // working on mobile during development. Env vars are inlined
  // at build time, so changing them requires a rebuild.
  if (process.env.MOBILE_REDIRECT_ENABLED === 'true') {
    const mobileTarget = getMobileRedirectTarget(request.headers.get('user-agent'));
    if (mobileTarget) {
      return NextResponse.redirect(mobileTarget, 302);
    }
    const desktopTarget = getDesktopRedirectTarget(url.pathname);
    if (desktopTarget) {
      return NextResponse.redirect(new URL(desktopTarget, request.url), 301);
    }
  }

  const response = NextResponse.next({
    request: {
      headers: request.headers,
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

  // Remember the visitor's country so the homepage can lead with destinations in
  // their own country. Headers are only available here in the edge runtime, so
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
