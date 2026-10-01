 
import { type NextRequest, NextResponse } from 'next/server';
import { readVisitorCountry, VISITOR_COUNTRY_COOKIE } from '@/lib/visitor-country';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Check for referral code in query params
  const url = request.nextUrl.clone();
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
