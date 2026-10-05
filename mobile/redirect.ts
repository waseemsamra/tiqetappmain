/**
 * Mobile redirect rules.
 *
 * Detects mobile devices from the user agent and resolves the
 * correct app-store destination for the React Native app in
 * this folder (iOS vs Android).
 */

const IOS_UA = /iphone|ipad|ipod/i;
const ANDROID_UA = /android/i;
const OTHER_MOBILE_UA = /mobile|opera mini|iemobile|blackberry|windows phone/i;

export type MobilePlatform = 'ios' | 'android' | 'other';

export function detectMobilePlatform(userAgent: string | null | undefined): MobilePlatform | null {
  if (!userAgent) return null;
  if (IOS_UA.test(userAgent)) return 'ios';
  if (ANDROID_UA.test(userAgent)) return 'android';
  if (OTHER_MOBILE_UA.test(userAgent)) return 'other';
  return null;
}

export function getMobileRedirectTarget(userAgent: string | null | undefined): string | null {
  const platform = detectMobilePlatform(userAgent);
  if (!platform) return null;

  const iosUrl = process.env.MOBILE_APPLE_APP_STORE_URL;
  const androidUrl = process.env.MOBILE_GOOGLE_PLAY_URL;

  switch (platform) {
    case 'ios':
      return iosUrl || androidUrl || null;
    case 'android':
    case 'other':
      return androidUrl || iosUrl || null;
  }
}
