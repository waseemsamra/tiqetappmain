import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Simple in-memory rate limiter (for demo; replace with Redis in production)
const failedAttempts = new Map<string, { count: number; firstAttempt: number }>();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5;

function getIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ?? 
    request.headers.get('x-real-ip') ?? 
    (request as any).ip ?? 
    'unknown'
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (!failedAttempts.has(ip)) {
    return false;
  }
  
  const data = failedAttempts.get(ip)!;
  if (now - data.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    // Reset if outside the window
    failedAttempts.delete(ip);
    return false;
  }
  
  return data.count >= RATE_LIMIT_MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  if (!failedAttempts.has(ip)) {
    failedAttempts.set(ip, { count: 1, firstAttempt: now });
  } else {
    const data = failedAttempts.get(ip)!;
    data.count++;
    // Keep the original firstAttempt time for the window
  }
}

function clearFailedAttempts(ip: string) {
  failedAttempts.delete(ip);
}

export async function POST(request: NextRequest) {
  try {
    const ip = getIP(request);
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    const body = await request.json();
    const { email, password, redirect } = body;
    
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Create response first so we can set cookies on it
    const response = NextResponse.json({ success: true, redirect: redirect || '/admin' });
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });
    
    if (error || !data.user) {
      // Record failed attempt for invalid credentials
      recordFailedAttempt(ip);
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Fetch user role from user_metadata
    const role = data.user.user_metadata?.role as string | undefined;
    if (role !== 'admin') {
      // Record failed attempt for non-admin user
      recordFailedAttempt(ip);
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Clear failed attempts on successful login
    clearFailedAttempts(ip);
    
    // Return success - cookies are already set on response via setAll callback
    return response;
  } catch (err) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // Create response first so we can set cookies on it
  const response = NextResponse.json({ success: true });
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  
  await supabase.auth.signOut();
  return response;
}