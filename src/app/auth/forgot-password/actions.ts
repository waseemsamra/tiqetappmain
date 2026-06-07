
'use server';

import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const emailSchema = z.string().email("Please enter a valid email address.");

export async function handlePasswordResetRequest(prevState: any, formData: FormData) {
    const email = formData.get('email');
    const validatedEmail = emailSchema.safeParse(email);

    if (!validatedEmail.success) {
        return { success: false, message: validatedEmail.error.flatten().formErrors.join(', ') };
    }

    const supabase = createClient();
    const redirectTo = `${new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').origin}/auth/update-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(validatedEmail.data, {
        redirectTo: redirectTo,
    });

    if (error) {
        console.error("Password Reset Error:", error);
        return { success: false, message: 'Could not send password reset link. Please try again.' };
    }

    return { success: true, message: 'Check your email for a link to reset your password. The link will expire in one hour.' };
}
