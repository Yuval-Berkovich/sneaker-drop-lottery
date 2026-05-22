import { z } from 'zod';
import { SHOE_SIZES } from '@/lib/utils';

const sizeList = SHOE_SIZES as readonly number[];

/** Schema for the client-side entry form (React Hook Form). */
export const entryFormSchema = z.object({
  email: z.email({ message: 'errEmail' }),
  countryCode: z.string().min(1),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9\s-]{6,15}$/, { message: 'errPhone' }),
  sizeUs: z
    .number({ message: 'errSize' })
    .refine((n) => sizeList.includes(n), { message: 'errSize' }),
  consent: z.boolean().refine((v) => v === true, { message: 'errConsent' }),
});

export type EntryFormValues = z.infer<typeof entryFormSchema>;

/** Schema for the POST /api/entries request body (server-side). */
export const createEntrySchema = z.object({
  email: z.email(),
  phone: z.string().regex(/^\+[1-9]\d{6,14}$/),
  sizeUs: z.number().refine((n) => sizeList.includes(n)),
  consent: z.literal(true),
  turnstileToken: z.string().min(1),
  locale: z.enum(['en', 'he']),
});

export type CreateEntryBody = z.infer<typeof createEntrySchema>;
