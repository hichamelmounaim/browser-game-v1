import { NextResponse } from 'next/server';
import { getAllGames } from '@/lib/db';

export async function GET() {
  try {
    const games = getAllGames();
    return NextResponse.json({ success: true, games }, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
      }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
