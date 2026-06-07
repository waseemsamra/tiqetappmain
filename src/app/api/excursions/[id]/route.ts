
import { NextResponse } from 'next/server';
import * as TiqetsApi from '@/lib/tiqets-api';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const excursion = await TiqetsApi.fetchTiqetsProductById(params.id);
        
        if (!excursion) {
            return NextResponse.json(null, { status: 404 });
        }
        
        return NextResponse.json(excursion);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    return NextResponse.json({ message: 'Excursion update not available in API-only mode' }, { status: 403 });
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    return NextResponse.json({ message: 'Excursion deletion not available in API-only mode' }, { status: 403 });
}
