import type { Component } from 'svelte';
import type { Lang } from '$lib/i18n/types';
import Leaf from '$lib/components/ui/icons/Leaf.svelte';
import Sparkle from '$lib/components/ui/icons/Sparkle.svelte';
import Stones from '$lib/components/ui/icons/Stones.svelte';
import Droplet from '$lib/components/ui/icons/Droplet.svelte';

export type IconComponent = Component<{ size?: number; class?: string }>;

export interface Treatment {
  slug: string;
  name: Record<Lang, string>;
  tagline: Record<Lang, string>;
  /** Starting price in EUR. */
  priceFrom: number;
  durationMin: number;
  icon: IconComponent;
  image: {
    src: string;
    width: number;
    height: number;
    alt: Record<Lang, string>;
  };
}

export const treatments: Treatment[] = [
  {
    slug: 'relajante',
    name: { es: 'Masaje relajante', en: 'Relaxing massage' },
    tagline: {
      es: 'Maniobras suaves y envolventes para soltar la tensión del día y reencontrar la calma.',
      en: 'Soft, flowing strokes to release the tension of the day and find your calm again.'
    },
    priceFrom: 75,
    durationMin: 60,
    icon: Leaf,
    image: {
      src: '/images/relajante.webp',
      width: 1024,
      height: 1024,
      alt: {
        es: 'Sala de masaje relajante con luz cálida',
        en: 'Relaxing massage room with warm light'
      }
    }
  },
  {
    slug: 'descontracturante',
    name: { es: 'Descontracturante', en: 'Deep tissue' },
    tagline: {
      es: 'Trabajo profundo sobre nudos y contracturas, ideal para espaldas cansadas de pantalla.',
      en: 'Deep work on knots and tension, ideal for backs worn out by the screen.'
    },
    priceFrom: 85,
    durationMin: 75,
    icon: Sparkle,
    image: {
      src: '/images/descontracturante.webp',
      width: 1024,
      height: 1024,
      alt: {
        es: 'Detalle de masaje descontracturante en la espalda',
        en: 'Deep tissue massage on the back'
      }
    }
  },
  {
    slug: 'piedras-calientes',
    name: { es: 'Piedras calientes', en: 'Hot stone' },
    tagline: {
      es: 'El calor de la piedra volcánica relaja el músculo en profundidad sin presión intensa.',
      en: 'The heat of volcanic stone relaxes muscle deeply without intense pressure.'
    },
    priceFrom: 95,
    durationMin: 90,
    icon: Stones,
    image: {
      src: '/images/piedras-calientes.webp',
      width: 1024,
      height: 1024,
      alt: { es: 'Piedras calientes sobre la espalda', en: 'Hot stones placed on the back' }
    }
  },
  {
    slug: 'aromaterapia',
    name: { es: 'Aromaterapia', en: 'Aromatherapy' },
    tagline: {
      es: 'Aceites esenciales seleccionados para tu estado de ánimo, en un masaje suave de cuerpo entero.',
      en: 'Essential oils chosen for your mood, in a gentle full-body massage.'
    },
    priceFrom: 80,
    durationMin: 60,
    icon: Droplet,
    image: {
      src: '/images/aromaterapia.webp',
      width: 1024,
      height: 1024,
      alt: { es: 'Aceites esenciales para aromaterapia', en: 'Essential oils for aromatherapy' }
    }
  }
];
