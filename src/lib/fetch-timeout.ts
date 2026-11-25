/**
 * Wraps a fetch call with a timeout. If the request doesn't complete within
 * `ms` milliseconds, it aborts and returns the fallback value (or throws if
 * no fallback is given).
 */
export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit & { timeoutMs?: number },
  fallback?: any,
): Promise<any> {
  const timeoutMs = init?.timeoutMs ?? 5000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(input, { ...init, signal: controller.signal });
    return response;
  } catch (err) {
    if (fallback !== undefined) return fallback;
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
