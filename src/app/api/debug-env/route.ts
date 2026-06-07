import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    HAS_GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
    HAS_SUPABASE_URL: !!process.env.SUPABASE_URL,
    HAS_NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    HAS_SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    HAS_RESEND_API_KEY: !!process.env.RESEND_API_KEY,
  };

  return NextResponse.json(envVars);
}
