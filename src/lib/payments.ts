
import { z } from 'zod';

// Note: The functions that read/write from the filesystem have been moved to a server action
// in src/app/admin/payments/actions.ts to avoid bundling server-side 'fs' module with client components.

export type PaymentSettings = {
    ziinaApiKey?: string;
};

export const paymentSettingsSchema = z.object({
  ziinaApiKey: z.string().min(1, { message: "API Key cannot be empty." }).optional().or(z.literal('')),
});
