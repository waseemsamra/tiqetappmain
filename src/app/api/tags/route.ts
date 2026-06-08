import { NextResponse } from 'next/server';
import * as TiqetsApi from '@/lib/tiqets-api';

export const revalidate = 3600;

export async function GET() {
  try {
    const tags = await TiqetsApi.fetchTiqetsTags();
    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Failed to fetch Tiqets tags:', error);
    return NextResponse.json({ tags: [] }, { status: 500 });
  }
}
