import { readFileSync } from 'fs';
import { join } from 'path';
import TagsClientPage from './tags-client-page';

export const revalidate = 0;

export default async function AdminTagsPage() {
  const filePath = join(process.cwd(), 'public', 'tags.json');
  let tags: any[] = [];
  try {
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    tags = Array.isArray(parsed.tags) ? parsed.tags : [];
  } catch {}

  return <TagsClientPage initialTags={tags} />;
}
