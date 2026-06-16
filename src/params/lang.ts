import type { ParamMatcher } from '@sveltejs/kit';
import { isLang } from '$lib/i18n/types';

export const match = ((param: string): param is 'es' | 'en' =>
  isLang(param)) satisfies ParamMatcher;
