import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * Placeholder loader for an individual massage service page.
 * Replace with real R2/content-backed data in a later task.
 */
export const load = (({ params }) => {
  if (!params.slug) {
    error(404, 'Not found');
  }
  return { slug: params.slug };
}) satisfies PageServerLoad;
