import { NextRequest, NextResponse } from 'next/server';
import { syncTiqetsProducts, searchProducts, getHelicopterTours } from '@/lib/json-cache';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  // Verify secret token for security
  const authHeader = request.headers.get('authorization');
  const expectedSecret = process.env.SYNC_SECRET || 'sync-secret-key';
  
  if (authHeader !== `Bearer ${expectedSecret}` && process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await syncTiqetsProducts();
    return NextResponse.json({
      success: true,
      message: 'Tiqets products synced successfully',
      ...result
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  const results = await searchProducts(query, type as 'all' | 'helicopter');
  
  return NextResponse.json({
    products: results,
    total: results.length,
    query,
    type
  });
}