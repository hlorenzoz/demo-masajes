import { Resend } from 'resend';
import type { ContactInput } from '$lib/schemas/contact';

const FROM = 'Zen Masajes <reservas@zenmasajes.com>';
const TO = 'reservas@zenmasajes.com';

/**
 * Send the contact form as a transactional email via Resend.
 * @param input  Validated contact payload.
 * @param apiKey Resend API key (from Platform env).
 */
export async function sendContactEmail(
  input: ContactInput,
  apiKey: string
): Promise<{ ok: boolean }> {
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: input.email,
    subject: `Nueva solicitud de reserva: ${input.name}`,
    text:
      `De: ${input.name} <${input.email}>\n\n` +
      `Tratamiento: ${input.service}\n` +
      `Duración: ${input.duration} minutos\n\n` +
      `Mensaje:\n${input.message || 'Sin mensaje adicional.'}`
  });

  return { ok: error === null };
}
