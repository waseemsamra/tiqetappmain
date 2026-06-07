
'use server';

import { revalidatePath } from 'next/cache';
import { paymentSettingsSchema, type PaymentSettings } from '@/lib/payments';
import type { FormState } from '@/types';

// NOTE: In a real production app, this would securely update environment variables
// or a dedicated secret management service. For this demo, we'll log it.
// The actual storage mechanism for the API key is outside the scope of this simplified example.

export async function getPaymentSettingsAction(): Promise<PaymentSettings> {
    // In a real app, you would fetch this from a secure store.
    // For this example, we'll rely on an environment variable.
    return {
        ziinaApiKey: process.env.ZIINA_API_KEY || '',
    };
}


export async function updatePaymentSettingsAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const rawData = {
      ziinaApiKey: formData.get('ziinaApiKey'),
    }
    
    const dataToValidate = Object.fromEntries(
        Object.entries(rawData).filter(([_, v]) => v !== null)
    );

    const validatedFields = paymentSettingsSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        return {
            success: false,
            message: 'Validation failed.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const newApiKey = validatedFields.data.ziinaApiKey;

        if (newApiKey && newApiKey !== '********') {
            // In a real app, you would securely save this key.
            // For this project, we assume it's set as an environment variable
            // during deployment. This action simulates the success of that process.
            console.log("Simulating update of ZIINA_API_KEY. In a real app, update your environment variables.");
        }
        
        revalidatePath('/admin/payments', 'layout');
        if (validatedFields.data.ziinaApiKey !== undefined) {
             revalidatePath('/admin/payments/ziina');
        }
        
        return { success: true, message: 'Payment settings updated successfully!' };
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
        return { success: false, message: errorMessage };
    }
}
