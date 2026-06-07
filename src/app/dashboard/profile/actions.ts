
'use server';

import * as UserService from '@/lib/user-service';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { UserDocument } from '@/types';

export async function getDocumentsAction(userId: string): Promise<UserDocument[]> {
    return UserService.getDocuments(userId);
}


export async function uploadDocumentAction(formData: FormData): Promise<{ success: boolean; message: string; }> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: 'Authentication required.' };
    }

    const result = await UserService.uploadDocument(user.id, formData);
    if (result.success) {
        revalidatePath('/dashboard/profile');
    }
    return result;
}

export async function deleteDocumentAction(documentId: string): Promise<{ success: boolean; message: string; }> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, message: 'Authentication required.' };

    const result = await UserService.deleteDocument(user.id, documentId);
    if (result.success) {
        revalidatePath('/dashboard/profile');
    }
    return result;
}
