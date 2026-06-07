import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({ message: 'User profile update not available in API-only mode' }, { status: 403 });
}