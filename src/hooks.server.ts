import { redirect, type Handle } from '@sveltejs/kit';
import { DEFAULT_LANG, isLang, type Lang } from '$lib/i18n/types';

/** Parse the Accept-Language header and pick the best supported language. */
function detectLang(header: string | null): Lang {
  if (!header) return DEFAULT_LANG;
  for (const part of header.split(',')) {
    const code = part.trim().slice(0, 2).toLowerCase();
    if (isLang(code)) return code;
  }
  return DEFAULT_LANG;
}

export const handle: Handle = async ({ event, resolve }) => {
  const segments = event.url.pathname.split('/').filter(Boolean);
  const first = segments[0];

  // Root or unsupported language prefix -> redirect using Accept-Language.
  if (!isLang(first)) {
    const target = detectLang(event.request.headers.get('accept-language'));
    const rest = first ? `/${segments.join('/')}` : '';
    redirect(302, `/${target}${rest}${event.url.search}`);
  }

  event.locals.lang = first;

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', first)
  });
};
