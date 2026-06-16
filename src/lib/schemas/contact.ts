import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  service: z.string().min(1),
  duration: z.enum(['60', '90']),
  message: z.string().max(2000).optional().default(''),
  // Cloudflare Turnstile client-side token.
  'cf-turnstile-response': z.string().min(1)
});

export type ContactInput = z.infer<typeof contactSchema>;
