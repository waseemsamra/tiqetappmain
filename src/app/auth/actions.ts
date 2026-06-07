'use server'

import type { FormState } from '@/types'

export async function login(prevState: any, formData: FormData): Promise<FormState & {redirectTo?: string}> {
  return { success: false, message: 'Authentication not available in API-only mode.' };
}

export async function signup(prevState: FormState, formData: FormData) {
  return { success: false, message: 'Authentication not available in API-only mode.' };
}

export async function logout() {
  // No-op in API-only mode
}
