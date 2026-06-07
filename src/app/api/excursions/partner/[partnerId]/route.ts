import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { partnerId: string } }) {
    return NextResponse.json({ message: 'Partner excursions not available in API-only mode' }, { status: 403 });
}