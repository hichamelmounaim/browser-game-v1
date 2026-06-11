import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// CORS helper headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { searchParams } = new URL(request.url);
    let type = searchParams.get('type'); // 'games' or 'categories'

    if (type !== 'settings' && !Array.isArray(payload)) {
      return NextResponse.json(
        { success: false, error: 'Payload must be an array' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Auto-detect type if not provided in query parameter
    if (!type && payload.length > 0) {
      const firstItem = payload[0];
      // Check if it's a category (has seo_title/seo_description but no iframe_url)
      if ('seo_title' in firstItem && !('iframe_url' in firstItem)) {
        type = 'categories';
      } else {
        type = 'games';
      }
    } else if (!type) {
      // Empty array, default to games
      type = 'games';
    }

    let filename = 'games.json';
    if (type === 'categories') {
      filename = 'categories.json';
    } else if (type === 'settings') {
      filename = 'settings.json';
    }

    // Save to the main site data directory
    const dataDir = path.resolve(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dataPath = path.join(dataDir, filename);
    fs.writeFileSync(dataPath, JSON.stringify(payload, null, 2));

    const countLabel = Array.isArray(payload) ? `${payload.length} items` : '1 item';
    console.log(`Successfully synced ${type} data to ${dataPath}`);

    return NextResponse.json(
      { success: true, message: `Successfully synced ${type} (${countLabel})` },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error('Sync failed:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500, headers: corsHeaders }
    );
  }
}
