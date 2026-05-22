import { NextResponse } from 'next/server';
import { verifyOtpSchema, MOCK_OTP } from '@/lib/validators/otp';
import type { ApiError, VerifyEntryResponse } from '@/lib/types';

/**
 * POST /api/entries/verify — verify the OTP for an entry.
 *
 * Demo mode: the mock code "123456" verifies every entry, and every verified
 * entry is "selected". The entry number is a random demo value (no counter,
 * since the routes are stateless).
 */
export async function POST(
  request: Request
): Promise<NextResponse<VerifyEntryResponse | ApiError>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const parsed = verifyOtpSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  if (parsed.data.code !== MOCK_OTP) {
    return NextResponse.json({ error: 'invalid_code' }, { status: 400 });
  }

  return NextResponse.json({
    verified: true,
    selected: true,
    entryNumber: 4000 + Math.floor(Math.random() * 6000),
  });
}
