import type { LayoutServerLoad } from './$types';

export const trailingSlash = 'always';

export const load = (({ locals, setHeaders }) => {
  // Portfolio demo — must never be indexed. Google needs to crawl the page to
  // see this header, so do NOT Disallow the subdomain in robots.txt yet.
  setHeaders({ 'X-Robots-Tag': 'noindex' });
  return { lang: locals.lang };
}) satisfies LayoutServerLoad;
