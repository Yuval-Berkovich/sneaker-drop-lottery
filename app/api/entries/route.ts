import { NextResponse } from 'next/server';
import { createEntrySchema } from '@/lib/validators/entry';
import { verifyTurnstileToken } from '@/lib/turnstile';
import type { ApiError, CreateEntryResponse } from '@/lib/types';

/**
 * POST /api/entries — create a draw entry.
 *
 * Stateless by design: Vercel serverless functions don't share memory across
 * requests, so nothing is persisted. We validate the body, verify the bot
 * token, and hand back a fresh entry id. The mock OTP is always "123456".
 */
export async function POST(
  request: Request
): Promise<NextResponse<CreateEntryResponse | ApiError>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const parsed = createEntrySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const passed = await verifyTurnstileToken(parsed.data.turnstileToken);
  if (!passed) {
    return NextResponse.json({ error: 'bot_detected' }, { status: 400 });
  }

  return NextResponse.json({
    entryId: crypto.randomUUID(),
    message: 'Entry received. Verify the code we sent you.',
  });
}
