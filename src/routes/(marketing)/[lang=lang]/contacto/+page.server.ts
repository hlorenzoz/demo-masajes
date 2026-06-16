import { fail } from '@sveltejs/kit';
import { contactSchema } from '$lib/schemas/contact';
import { verifyTurnstile } from '$lib/server/turnstile';
import { sendContactEmail } from '$lib/server/resend';
import type { Actions } from './$types';

export const actions = {
  default: async ({ request, platform, getClientAddress }) => {
    const env = platform?.env;
    if (!env) {
      return fail(500, { message: 'Platform unavailable' });
    }

    const parsed = contactSchema.safeParse(
      Object.fromEntries(await request.formData())
    );
    if (!parsed.success) {
      return fail(400, { message: 'invalid', issues: parsed.error.flatten() });
    }

    const human = await verifyTurnstile(
      parsed.data['cf-turnstile-response'],
      env.TURNSTILE_SECRET,
      getClientAddress()
    );
    if (!human) {
      return fail(400, { message: 'turnstile' });
    }

    const sent = await sendContactEmail(parsed.data, env.RESEND_API_KEY);
    if (!sent.ok) {
      return fail(502, { message: 'email' });
    }

    return { success: true };
  }
} satisfies Actions;
