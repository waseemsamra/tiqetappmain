
'use server';

import type { FormState } from "@/types";
import { createOrUpdateExcursionTypeAction } from "@/app/actions";

export async function updateExcursionTypeServerAction(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
    // Pass the id and form data to the main action.
    return createOrUpdateExcursionTypeAction(id, prevState, formData);
}
