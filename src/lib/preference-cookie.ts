/**
 * Request-scoped preference lookup.
 *
 * `next/headers` is required lazily rather than imported at the top level: this
 * module is pulled into the client bundle through `@/app/actions`, and a static
 * `next/headers` import there breaks the build. Outside a request scope (client
 * bundle, build scripts) the read simply fails and callers fall back to defaults.
 */

export function readPreferenceCookie(name: string): string | undefined {
  try {
    // Resolved at runtime so bundlers do not treat it as a client-side import.
    const { cookies } = require('next/headers') as typeof import('next/headers');
    return cookies().get(name)?.value;
  } catch {
    return undefined;
  }
}
