import type { Dictionary, Lang } from '$lib/i18n/types';

export const SITE_NAME = 'Hondo';
export const SITE_URL = 'https://hondo.example';

export interface MetaInput {
  lang: Lang;
  title: string;
  description: string;
  /** Path without language prefix, e.g. '' for home or '/masajes'. */
  path?: string;
  image?: string;
}

export interface MetaTags {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  alternates: { lang: Lang; href: string }[];
}

const DEFAULT_OG = 'https://picsum.photos/seed/hondo-hero/1200/630';

export function buildMeta({ lang, title, description, path = '', image }: MetaInput): MetaTags {
  return {
    title,
    description,
    canonical: `${SITE_URL}/${lang}${path}`,
    ogImage: image ?? DEFAULT_OG,
    alternates: [
      { lang: 'es', href: `${SITE_URL}/es${path}` },
      { lang: 'en', href: `${SITE_URL}/en${path}` }
    ]
  };
}

/** Schema.org DaySpa / LocalBusiness for rich results. */
export function localBusinessJsonLd(dict: Dictionary): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'DaySpa',
    name: SITE_NAME,
    description: dict.meta.description,
    url: SITE_URL,
    image: DEFAULT_OG,
    telephone: dict.footer.phone,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Escazú',
      postalCode: '10201',
      addressLocality: 'San José',
      addressCountry: 'CR'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '21:00'
    }
  };
  return JSON.stringify(data);
}
