export type Region = {
  name: string;
  countries: string[];
};

function getDestinationsConfigSync(): Region[] {
  try {
    // Only require fs on the server
    if (typeof window === 'undefined') {
      const { readFileSync } = require('fs');
      const { join } = require('path');
      const CONFIG_PATH = join(process.cwd(), 'public', 'destinations-config.json');
      const raw = readFileSync(CONFIG_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed.regions) ? parsed.regions : [];
    }
    return [];
  } catch {
    return [];
  }
}

function updateDestinationsConfigSync(regions: Region[]): { success: boolean; message: string } {
  try {
    if (typeof window === 'undefined') {
      const { writeFileSync } = require('fs');
      const { join } = require('path');
      const { revalidatePath } = require('next/cache');
      const CONFIG_PATH = join(process.cwd(), 'public', 'destinations-config.json');
      const payload = { regions: regions.filter(r => r.name && r.countries) };
      writeFileSync(CONFIG_PATH, JSON.stringify(payload, null, 2));
      revalidatePath('/destinations');
      return { success: true, message: 'Destinations configuration updated.' };
    }
    return { success: false, message: 'Cannot update destinations config on the client.' };
  } catch (error) {
    console.error('updateDestinationsConfigSync error:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Failed to update destinations config.' };
  }
}

export { getDestinationsConfigSync, updateDestinationsConfigSync };
