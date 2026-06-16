export const SUPPORTED_LANGS = ['es', 'en'] as const;

export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = 'es';

/**
 * Shape of a translation dictionary. Every locale MUST satisfy this type,
 * so a missing key fails the build instead of falling through at runtime.
 */
export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    services: string;
    blog: string;
    contact: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
  };
  theme: {
    toggleLight: string;
    toggleDark: string;
  };
}

export function isLang(value: string | undefined): value is Lang {
  return value === 'es' || value === 'en';
}
