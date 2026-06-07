
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
  const tiqetsApiKey = process.env.TIQETS_API_KEY;

  let htmlResponse = `
    <html>
      <head>
        <title>Connection Debug</title>
        <style>
          body { font-family: sans-serif; padding: 2rem; line-height: 1.6; }
          .status { padding: 0.5rem 1rem; border-radius: 0.25rem; font-weight: bold; }
          .success { background-color: #d1fae5; color: #065f46; }
          .error { background-color: #fee2e2; color: #991b1b; }
          code { background-color: #f3f4f6; padding: 0.2rem 0.4rem; border-radius: 0.25rem; }
        </style>
      </head>
      <body>
        <h1>API Connection Debug (API-only mode)</h1>
        
        <h2>Step 1: Tiqets API Key Check</h2>
  `;

  if (tiqetsApiKey) {
    htmlResponse += `<p>TIQETS_API_KEY: <code class="status success">Found, starts with "${tiqetsApiKey.substring(0, 8)}..."</code></p>`;
  } else {
    htmlResponse += `<p>TIQETS_API_KEY: <code class="status error">NOT FOUND</code></p>`;
  }

  htmlResponse += `
    <p><i>If TIQETS_API_KEY is "NOT FOUND", please set it in your environment variables.</i></p>
    
    <h2>Supabase Status</h2>
    <p class="status error">Supabase is disabled in API-only mode. All data comes from Tiqets API.</p>
    
    </body></html>`;

  return new NextResponse(htmlResponse, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
