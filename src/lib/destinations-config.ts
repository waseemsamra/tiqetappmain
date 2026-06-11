export type Region = {
  name: string;
  countries: string[];
};

export function getDestinationsConfigSync(): Region[] {
  try {
    const { readFileSync } = require('fs');
    const { join } = require('path');
    const CONFIG_PATH = join(process.cwd(), 'public', 'destinations-config.json');
    const raw = readFileSync(CONFIG_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.regions) ? parsed.regions : [];
  } catch {
    return [];
  }
}

export function updateDestinationsConfigSync(regions: Region[]): { success: boolean; message: string } {
  try {
    const { writeFileSync } = require('fs');
    const { join } = require('path');
    const { revalidatePath } = require('next/cache');
    const CONFIG_PATH = join(process.cwd(), 'public', 'destinations-config.json');
    const payload = { regions: regions.filter(r => r.name && r.countries) };
    writeFileSync(CONFIG_PATH, JSON.stringify(payload, null, 2));
    revalidatePath('/destinations');
    return { success: true, message: 'Destinations configuration updated.' };
  } catch (error) {
    console.error('updateDestinationsConfigSync error:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Failed to update destinations config.' };
  }
}
