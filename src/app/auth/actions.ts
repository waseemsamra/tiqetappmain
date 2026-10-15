'use server'

import { createClient } from '@/lib/supabase/server'
import type { FormState } from '@/types'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData): Promise<FormState & {redirectTo?: string}> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' }
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true, message: 'Logged in successfully', redirectTo: '/dashboard' }
}

export async function signup(prevState: FormState, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' }
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters.' }
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: 'customer',
      },
    },
  })

  if (error) {
    return { success: false, message: error.message }
  }

  return {
    success: true,
    message: 'Account created! Please check your email to confirm your account.',
    redirectTo: '/login?message=Account created! Please check your email to confirm your account.',
  }
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
