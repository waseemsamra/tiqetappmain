import { z } from 'zod';
import type { FormState } from '@/app/actions';

// Lock user action
export async function lockUserAction(formData: FormData): Promise<FormState> {
  return { success: false, message: 'Not supported in API-only mode.' };
}

// Unlock user action
export async function unlockUserAction(formData: FormData): Promise<FormState> {
  return { success: false, message: 'Not supported in API-only mode.' };
}