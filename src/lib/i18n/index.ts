import type { Dictionary, Lang } from './types';
import { es } from './locales/es';
import { en } from './locales/en';

export type { Dictionary, Lang } from './types';
export { SUPPORTED_LANGS, DEFAULT_LANG, isLang } from './types';

const dictionaries: Record<Lang, Dictionary> = { es, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Shape stored in Svelte context for i18n consumers. */
export interface I18nContext {
  readonly lang: Lang;
  readonly t: Dictionary;
}

/** Symbol key for getContext/setContext — avoids string collisions. */
export const I18N_KEY = Symbol('i18n');
