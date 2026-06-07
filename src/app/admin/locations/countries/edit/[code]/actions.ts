
'use server';

import { getCitiesByCountryCode } from "@/app/actions";

export async function getCitiesForCountry(countryCode: string) {
    return getCitiesByCountryCode(countryCode);
}
