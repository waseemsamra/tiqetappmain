import { readFileSync } from 'fs';
import { join } from 'path';
import TagTypesClientPage from './tag-types-client-page';

export const revalidate = 0;

export default async function AdminTagTypesPage() {
  const filePath = join(process.cwd(), 'public', 'tag-types.json');
  let tagTypes: any[] = [];
  try {
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    tagTypes = Array.isArray(parsed.tag_types) ? parsed.tag_types : [];
  } catch {}

  return <TagTypesClientPage initialTagTypes={tagTypes} />;
}
