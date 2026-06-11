import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiKey = process.env.TIQETS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ tag_types: [] });
    }

    const resp = await fetch('https://api.tiqets.com/v2/tag_types?page_size=200', {
      headers: {
        Authorization: `Token ${apiKey}`,
        Accept: 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!resp.ok) {
      console.error('Tiqets tag_types failed:', resp.status);
      return NextResponse.json({ tag_types: [] });
    }

    const data = await resp.json();
    const tag_types = (data.tag_types || []).map((tt: any) => ({
      id: String(tt.id || ''),
      name: tt.name || '',
      group_name: tt.group_name || '',
    }));

    return NextResponse.json({ tag_types });
  } catch (error) {
    console.error('Failed to load tag_types:', error);
    return NextResponse.json({ tag_types: [] });
  }
}
