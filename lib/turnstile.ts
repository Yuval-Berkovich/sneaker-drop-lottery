/**
 * Cloudflare Turnstile server-side verification.
 *
 * Works out of the box with Cloudflare's public TEST keys (no account needed):
 *   sitekey  1x00000000000000000000AA  — always passes
 *   secret   1x0000000000000000000000000000000AA
 * Swap in real keys via env vars for production.
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
}

export async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // No secret configured — fail closed so the misconfiguration is visible.
    console.warn('TURNSTILE_SECRET_KEY is not set; rejecting entry.');
    return false;
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as TurnstileVerifyResponse;
    return data.success === true;
  } catch (err) {
    console.error('Turnstile verification request failed:', err);
    return false;
  }
}
