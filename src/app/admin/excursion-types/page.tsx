import { readFileSync } from 'fs';
import { join } from 'path';
import ExcursionTypesClientPage from './excursion-types-client-page';

export const revalidate = 0;

export default async function ExcursionTypesPage() {
  const filePath = join(process.cwd(), 'public', 'excursion-types.json');
  let types: any[] = [];
  try {
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    types = Array.isArray(parsed.types) ? parsed.types : [];
  } catch {}

  return <ExcursionTypesClientPage initialExcursionTypes={types} />;
}
