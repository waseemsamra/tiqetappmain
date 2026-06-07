
'use server';

import { getExcursionById } from "@/app/actions";
import type { Excursion } from "@/types";

export async function getExcursionForCheckoutAction(id: string): Promise<Excursion | null> {
    return getExcursionById(id);
}
