
'use server';

import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long."),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export async function handlePasswordUpdate(prevState: any, formData: FormData) {
    const validatedFields = passwordSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { 
            success: false, 
            message: validatedFields.error.flatten().fieldErrors.password?.[0] || validatedFields.error.flatten().fieldErrors.confirmPassword?.[0] || 'Invalid input.'
        };
    }
    
    const { password } = validatedFields.data;
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        console.error("Password Update Error:", error);
        return { success: false, message: error.message };
    }

    // Redirecting from server action is cleaner
    redirect('/auth/update-password?message=Password updated successfully! You can now log in.');
}
