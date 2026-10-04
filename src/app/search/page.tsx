
import { Suspense } from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as TiqetsApi from '@/lib/tiqets-api';
import type { TiqetsTag } from '@/types';
import SearchClientPage from './search-client-page';

export const revalidate = 0;

/** How long the local tag copy is trusted. */
const LOCAL_TAGS_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export default async function SearchPage() {
    // The local copy is the primary source; the live
    // tags endpoint is the fallback when it is missing
    // or stale.
    let tags: TiqetsTag[] = [];
    try {
        const local = JSON.parse(
            readFileSync(join(process.cwd(), 'public', 'tags.json'), 'utf-8'),
        );
        const list = Array.isArray(local) ? local : local.tags;
        const fresh =
            typeof local?.at === 'number' &&
            Date.now() - local.at < LOCAL_TAGS_TTL_MS;
        if (Array.isArray(list) && list.length > 0 && fresh) {
            tags = list;
        }
    } catch {
        // fall through to the live API
    }
    if (tags.length === 0) {
        tags = await TiqetsApi.fetchTiqetsTags();
    }

    return (
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
            <Suspense fallback={<div>Loading...</div>}>
                <SearchClientPage
                    tags={tags}
                />
            </Suspense>
        </div>
    );
}
