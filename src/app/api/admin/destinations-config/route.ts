export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { updateDestinationsConfigAction, getDestinationsConfig } from '@/app/actions';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await updateDestinationsConfigAction(payload);
    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 400 });
    }
    return NextResponse.json({ success: true, message: result.message });
  } catch (error) {
    console.error('Destinations config API error:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const regions = await getDestinationsConfig();
    return NextResponse.json({ success: true, regions });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to load destinations config.' }, { status: 500 });
  }
}
