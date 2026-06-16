import { error } from '@sveltejs/kit';
import { treatments } from '$lib/data/treatments';
import type { PageServerLoad } from './$types';

export const load = (({ params }) => {
  const treatment = treatments.find((t) => t.slug === params.slug);
  if (!treatment) {
    error(404, 'Treatment not found');
  }
  return { slug: params.slug };
}) satisfies PageServerLoad;
