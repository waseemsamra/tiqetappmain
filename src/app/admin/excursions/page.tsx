import { readFileSync } from 'fs';
import { join } from 'path';
import ExcursionsClientPage from './excursions-client-page';

export const revalidate = 0;

export default async function ExcursionsPage() {
  const filePath = join(process.cwd(), 'public', 'excursions.json');
  let experiences: any[] = [];
  try {
    const raw = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    experiences = Array.isArray(parsed.experiences) ? parsed.experiences : [];
  } catch {}

  return <ExcursionsClientPage initialExcursions={experiences} />;
}
