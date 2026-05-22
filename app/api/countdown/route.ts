import { NextResponse } from 'next/server';
import type { CountdownResponse } from '@/lib/types';

// Recomputed on every request so the timer never expires.
export const dynamic = 'force-dynamic';

/** GET /api/countdown — a rolling 30-day countdown target. */
export function GET(): NextResponse<CountdownResponse> {
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
  const target = new Date(Date.now() + THIRTY_DAYS_MS);

  return NextResponse.json({
    targetIso: target.toISOString(),
    secondsRemaining: Math.floor(THIRTY_DAYS_MS / 1000),
  });
}
