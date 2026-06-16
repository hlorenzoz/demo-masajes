import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
  return { lang: locals.lang };
}) satisfies LayoutServerLoad;
