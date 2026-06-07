
'use server';

import type { FormState } from "@/types";
import { createOrUpdateExcursionTypeAction } from "@/app/actions";

export async function createExcursionTypeServerAction(prevState: FormState, formData: FormData): Promise<FormState> {
    // The createOrUpdateExcursionTypeAction expects the ID as the first argument.
    // For creation, we pass `null`. The previous state is passed second.
    return createOrUpdateExcursionTypeAction(null, prevState, formData);
}
