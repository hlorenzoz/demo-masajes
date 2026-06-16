import { json, error } from '@sveltejs/kit';
import { contactSchema } from '$lib/schemas/contact';
import { sendContactEmail } from '$lib/server/resend';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
  const env = platform?.env;
  if (!env) error(500, 'Platform unavailable');

  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) error(400, 'Invalid payload');

  const sent = await sendContactEmail(parsed.data, env.RESEND_API_KEY);
  return json(sent, { status: sent.ok ? 200 : 502 });
};
