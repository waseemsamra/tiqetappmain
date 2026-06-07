import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    return NextResponse.json({ message: 'Excursion type lookup not available in API-only mode' }, { status: 403 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    return NextResponse.json({ message: 'Excursion type update not available in API-only mode' }, { status: 403 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    return NextResponse.json({ message: 'Excursion type deletion not available in API-only mode' }, { status: 403 });
}