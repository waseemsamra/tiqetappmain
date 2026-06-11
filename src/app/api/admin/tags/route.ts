import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiKey = process.env.TIQETS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ tags: [] });
    }

    const resp = await fetch('https://api.tiqets.com/v2/tags?page_size=200', {
      headers: {
        Authorization: `Token ${apiKey}`,
        Accept: 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!resp.ok) {
      console.error('Tiqets tags failed:', resp.status);
      return NextResponse.json({ tags: [] });
    }

    const data = await resp.json();
    const tags = (data.tags || []).map((tag: any) => ({
      id: String(tag.id || ''),
      name: tag.name || '',
      type_name: tag.type_name || '',
      type_id: String(tag.type_id || ''),
      type_group_name: tag.type_group_name || null,
    }));

    return NextResponse.json({ tags });
  } catch (error) {
    console.error('Failed to load tags:', error);
    return NextResponse.json({ tags: [] });
  }
}
