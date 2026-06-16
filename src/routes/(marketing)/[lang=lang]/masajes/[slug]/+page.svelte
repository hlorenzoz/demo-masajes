<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import { treatments } from '$lib/data/treatments';
  import Image from '$lib/components/ui/Image.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Clock from '$lib/components/ui/icons/Clock.svelte';
  import Sparkle from '$lib/components/ui/icons/Sparkle.svelte';
  import ArrowRight from '$lib/components/ui/icons/ArrowRight.svelte';
  import { reveal } from '$lib/actions/reveal';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const i18n = getContext<I18nContext>(I18N_KEY);
  const lang = $derived(i18n.lang);
  const base = $derived(`/${lang}`);
  const t = $derived(i18n.t.treatments);

  const treatment = $derived(treatments.find((item) => item.slug === data.slug)!);
  const Icon = $derived(treatment.icon);

  const treatmentCategories: Record<string, 'calma' | 'recuperacion'> = {
    relajante: 'calma',
    descontracturante: 'recuperacion',
    'piedras-calientes': 'recuperacion',
    aromaterapia: 'calma'
  };

  const categories = $derived({
    calma: lang === 'es' ? 'Bienestar y Calma' : 'Calm & Wellness',
    recuperacion: lang === 'es' ? 'Terapéutico y Recuperación' : 'Therapeutic & Recovery'
  });

  const categoryLabel = $derived(categories[treatmentCategories[treatment.slug] || 'calma']);

  // Fases de la experiencia
  const phases = $derived(
    lang === 'es'
      ? [
          {
            title: 'Consulta inicial',
            desc: 'Conversamos sobre tus necesidades, tensiones acumuladas y preferencias de presión.'
          },
          {
            title: 'Inmersión sensorial',
            desc: 'Aromaterapia personalizada y toallas calientes para relajar el sistema nervioso.'
          },
          {
            title: 'Terapia manual profunda',
            desc: 'Trabajo muscular enfocado con aceites orgánicos tibios y técnicas adaptadas.'
          },
          {
            title: 'Cierre de sesión',
            desc: 'Un té de hierbas artesanal y unos minutos en silencio para reincorporarte sin prisa.'
          }
        ]
      : [
          {
            title: 'Initial consultation',
            desc: 'We talk about your needs, accumulated tension, and pressure preferences.'
          },
          {
            title: 'Sensory immersion',
            desc: 'Customized aromatherapy and warm towels to soothe the nervous system.'
          },
          {
            title: 'Deep manual therapy',
            desc: 'Focused muscle work with warm organic oils and tailored techniques.'
          },
          {
            title: 'Session closure',
            desc: 'Artisanal herbal tea and a few minutes of quiet to ease back into your day.'
          }
        ]
  );
</script>

<svelte:head>
  <title>{treatment.name[lang]} · Hondo</title>
</svelte:head>

<section class="bg-(--bg-base) pt-32 pb-20 md:pt-40 md:pb-28">
  <div class="container-zen">
    <div class="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
      <!-- Info Left -->
      <div class="lg:col-span-7 flex flex-col items-start" use:reveal>
        <span class="inline-flex items-center gap-2.5 eyebrow text-xs uppercase tracking-widest">
          <Icon size={16} />
          {categoryLabel}
        </span>
        <h1
          class="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl md:text-6xl text-(--text-base)"
        >
          {treatment.name[lang]}
        </h1>
        <p class="mt-6 text-lg leading-relaxed text-(--text-muted) max-w-xl">
          {treatment.tagline[lang]}
        </p>

        <!-- Stats Row -->
        <div
          class="mt-8 flex flex-wrap gap-8 items-baseline border-y border-(--line) py-6 w-full max-w-xl"
        >
          <div class="flex flex-col">
            <span class="text-xs text-(--text-muted) uppercase tracking-wider"
              >{lang === 'es' ? 'Duración' : 'Duration'}</span
            >
            <span
              class="mt-1 inline-flex items-center gap-2 font-display text-2xl text-(--text-base) font-light"
            >
              <Clock size={20} class="text-(--accent)" />
              <span class="tnum">{treatment.durationMin} {t.minutesLabel}</span>
            </span>
          </div>
          <div class="flex flex-col">
            <span class="text-xs text-(--text-muted) uppercase tracking-wider"
              >{lang === 'es' ? 'Precio' : 'Investment'}</span
            >
            <span class="mt-1 font-display text-2.5xl text-(--text-base) font-light">
              {t.fromLabel} <span class="tnum font-medium">{treatment.priceFrom} €</span>
            </span>
          </div>
        </div>

        <div class="mt-8">
          <Button href={`${base}/contacto?servicio=${treatment.slug}`} size="lg">
            {lang === 'es' ? 'Reservar este tratamiento' : 'Book this treatment'}
          </Button>
        </div>
      </div>

      <!-- Image Right -->
      <div class="lg:col-span-5 relative" use:reveal={{ delay: 150 }}>
        <div
          class="absolute inset-0 translate-x-4 translate-y-4 rounded-zen border border-gold-300/30 pointer-events-none"
        ></div>
        <div class="relative overflow-hidden rounded-zen shadow-lift aspect-[4/5]">
          <Image
            src={treatment.image.src}
            alt={treatment.image.alt[lang]}
            width={treatment.image.width}
            height={treatment.image.height}
            class="transition-transform duration-10000 hover:scale-105"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Fases de la experiencia -->
<section class="bg-(--bg-elevated) py-24 md:py-32">
  <div class="container-zen">
    <header class="max-w-2xl" use:reveal>
      <span class="eyebrow text-xs uppercase tracking-widest"
        >{lang === 'es' ? 'El ritual' : 'The ritual'}</span
      >
      <h2 class="mt-3 font-display text-3xl md:text-4xl lg:text-5xl text-(--text-base)">
        {lang === 'es' ? 'Qué incluye la sesión de autor' : 'What the signature session includes'}
      </h2>
      <p class="mt-5 text-base text-(--text-muted)">
        {lang === 'es'
          ? 'No creemos en los masajes de protocolo idéntico. Diseñamos un camino sensorial adaptado paso a paso para que alcances una desconexión total.'
          : 'We do not believe in template protocols. We design a tailored sensory path to ensure you achieve complete decompression.'}
      </p>
    </header>

    <div class="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {#each phases as phase, i}
        <div
          class="p-6 md:p-8 rounded-zen bg-(--bg-surface) border border-(--line) hover:border-gold-300/30 transition-all duration-300 shadow-soft"
          use:reveal={{ delay: i * 80 }}
        >
          <span class="font-display text-3xl font-light text-gold-500/80 tracking-tight tnum">
            0{i + 1}
          </span>
          <h3 class="mt-4 font-display text-xl font-medium text-(--text-base)">{phase.title}</h3>
          <p class="mt-3 text-sm leading-relaxed text-(--text-muted)">{phase.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA final de lujo -->
<section class="bg-(--bg-base) py-20">
  <div class="container-zen max-w-4xl text-center" use:reveal>
    <span
      class="inline-grid size-12 place-items-center rounded-full bg-gold-200/20 text-(--accent) mb-6"
    >
      <Sparkle size={24} />
    </span>
    <h2 class="font-display text-3xl md:text-5xl text-(--text-base) leading-tight">
      {lang === 'es'
        ? '¿Listo para liberar la tensión acumulada?'
        : 'Ready to release accumulated tension?'}
    </h2>
    <p class="mt-6 text-base text-(--text-muted) max-w-xl mx-auto">
      {lang === 'es'
        ? 'Las citas se confirman en el mismo día. Sergio atiende de forma exclusiva en un entorno completamente privado.'
        : 'Appointments are confirmed the same day. Sergio offers exclusive care in a fully private setting.'}
    </p>
    <div class="mt-10 flex flex-wrap justify-center gap-4">
      <Button href={`${base}/contacto?servicio=${treatment.slug}`} size="lg">
        {lang === 'es' ? 'Solicitar cita ahora' : 'Request appointment now'}
      </Button>
      <a
        href={`${base}/masajes`}
        class="inline-flex items-center gap-2 px-6 py-3 border border-(--line) hover:border-(--accent) rounded-full text-sm font-medium transition-colors"
      >
        {lang === 'es' ? 'Volver al catálogo' : 'Back to catalog'}
        <ArrowRight size={16} />
      </a>
    </div>
  </div>
</section>
