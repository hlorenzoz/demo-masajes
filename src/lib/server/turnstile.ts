const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

/**
 * Verify a Cloudflare Turnstile token against the siteverify API.
 * @param token  The `cf-turnstile-response` value from the form.
 * @param secret The Turnstile secret key (from Platform env).
 * @param remoteIp Optional client IP for extra validation.
 */
export async function verifyTurnstile(
  token: string,
  secret: string,
  remoteIp?: string
): Promise<boolean> {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (remoteIp) body.append('remoteip', remoteIp);

  const res = await fetch(VERIFY_URL, { method: 'POST', body });
  if (!res.ok) return false;

  const data = (await res.json()) as TurnstileResponse;
  return data.success;
}
