import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as TiqetsApi from '@/lib/tiqets-api';

export const revalidate = 3600;

/** How long the local tag copy is trusted before refetching. */
const LOCAL_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export async function GET() {
  try {
    // The local copy is the primary source; the live
    // tags endpoint is the fallback when it is missing
    // or stale.
    try {
      const local = JSON.parse(
        readFileSync(join(process.cwd(), 'public', 'tags.json'), 'utf-8'),
      );
      const tags = Array.isArray(local) ? local : local.tags;
      const fresh =
        typeof local?.at === 'number' && Date.now() - local.at < LOCAL_TTL_MS;
      if (Array.isArray(tags) && tags.length > 0 && fresh) {
        return NextResponse.json({ tags });
      }
    } catch {
      // fall through to the live API
    }
    const tags = await TiqetsApi.fetchTiqetsTags();
    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Failed to fetch Tiqets tags:', error);
    return NextResponse.json({ tags: [] }, { status: 500 });
  }
}
