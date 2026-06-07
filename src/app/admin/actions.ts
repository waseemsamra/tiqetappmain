
'use server';

import { getCitiesByCountryName } from "@/app/actions";

export async function getCitiesByCountryNameAction(countryName: string): Promise<{ name: string }[]> {
    return getCitiesByCountryName(countryName);
}
