export const SUPPORTED_LANGS = ['es', 'en'] as const;

export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = 'es';

interface BenefitCopy {
  title: string;
  description: string;
}

interface TestimonialCopy {
  quote: string;
  author: string;
  location: string;
}

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
    /** Global booking button label, reused across the chrome. */
    cta: string;
  };
  theme: {
    toggleLight: string;
    toggleDark: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  philosophy: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    signature: string;
  };
  treatments: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    fromLabel: string;
    minutesLabel: string;
  };
  benefits: {
    eyebrow: string;
    title: string;
    items: BenefitCopy[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    quotes: TestimonialCopy[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    button: string;
    hoursLabel: string;
    hours: string;
    locationLabel: string;
    location: string;
  };
  footer: {
    tagline: string;
    exploreLabel: string;
    visitLabel: string;
    address: string;
    phone: string;
    hours: string;
    rights: string;
    privacy: string;
    terms: string;
  };
}

export function isLang(value: string | undefined): value is Lang {
  return value === 'es' || value === 'en';
}
