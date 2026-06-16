import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  // Cloudflare Turnstile client-side token.
  'cf-turnstile-response': z.string().min(1)
});

export type ContactInput = z.infer<typeof contactSchema>;
