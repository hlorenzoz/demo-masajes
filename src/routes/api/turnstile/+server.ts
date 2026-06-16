import { json, error } from '@sveltejs/kit';
import { verifyTurnstile } from '$lib/server/turnstile';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform, getClientAddress }) => {
  const env = platform?.env;
  if (!env) error(500, 'Platform unavailable');

  const { token } = (await request.json()) as { token?: string };
  if (!token) error(400, 'Missing token');

  const success = await verifyTurnstile(token, env.TURNSTILE_SECRET, getClientAddress());
  return json({ success });
};
