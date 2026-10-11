import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.TIQETS_API_KEY;
  console.log('[TEST] API Key:', key ? 'SET' : 'NOT SET');
  
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'User-Agent': 'my user agent',
    ...(key ? { Authorization: `Token ${key}` } : {}),
  };
  
  console.log('[TEST] Headers:', headers);
  
  try {
    const resp = await fetch('https://api.tiqets.com/v2/countries?page_size=100&page=2', { headers });
    console.log('[TEST] Response status:', resp.status, resp.statusText);
    const data = await resp.json();
    console.log('[TEST] Response data:', JSON.stringify(data).slice(0, 500));
    return NextResponse.json({ keyPresent: !!key, status: resp.status, countriesCount: data.countries?.length });
  } catch (e) {
    console.error('[TEST] Error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
