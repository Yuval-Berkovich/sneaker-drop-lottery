import { z } from 'zod';

/** Schema for the POST /api/entries/verify request body. */
export const verifyOtpSchema = z.object({
  entryId: z.uuid(),
  code: z.string().regex(/^\d{6}$/),
});

export type VerifyOtpBody = z.infer<typeof verifyOtpSchema>;

/** The mock OTP — every entry verifies with this code (demo mode). */
export const MOCK_OTP = '123456';
