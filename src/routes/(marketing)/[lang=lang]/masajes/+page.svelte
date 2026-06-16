<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import { treatments } from '$lib/data/treatments';
  import Image from '$lib/components/ui/Image.svelte';
  import ArrowRight from '$lib/components/ui/icons/ArrowRight.svelte';
  import Clock from '$lib/components/ui/icons/Clock.svelte';
  import { reveal } from '$lib/actions/reveal';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const lang = $derived(i18n.lang);
  const base = $derived(`/${lang}`);
  const t = $derived(i18n.t.treatments);

  // Filtros reactivos con Svelte 5 Runes
  let activeFilter = $state<'all' | 'calma' | 'recuperacion'>('all');

  const categories = $derived({
    all: lang === 'es' ? 'Todos' : 'All',
    calma: lang === 'es' ? 'Bienestar y Calma' : 'Calm & Wellness',
    recuperacion: lang === 'es' ? 'Terapéutico y Recuperación' : 'Therapeutic & Recovery'
  });

  const treatmentCategories: Record<string, 'calma' | 'recuperacion'> = {
    relajante: 'calma',
    descontracturante: 'recuperacion',
    'piedras-calientes': 'recuperacion',
    aromaterapia: 'calma'
  };

  const filteredTreatments = $derived(
    activeFilter === 'all'
      ? treatments
      : treatments.filter((item) => treatmentCategories[item.slug] === activeFilter)
  );
</script>

<svelte:head>
  <title>{i18n.t.nav.services} · {i18n.t.meta.title}</title>
</svelte:head>

<section class="bg-(--bg-base) pt-32 pb-24 md:pt-40 md:pb-36 min-h-dvh">
  <div class="container-zen">
    <header class="max-w-3xl text-left" use:reveal>
      <span class="eyebrow text-sm uppercase tracking-[0.2em]">{t.eyebrow}</span>
      <h1
        class="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl md:text-6xl text-(--text-base)"
      >
        {t.title}
      </h1>
      <p class="mt-6 text-lg leading-relaxed text-(--text-muted) max-w-2xl">
        {t.subtitle}
      </p>
    </header>

    <!-- Filtros Interactivos (Tabs de Lujo) -->
    <div
      class="mt-12 md:mt-16 flex flex-wrap gap-3 border-b border-(--line) pb-6"
      use:reveal={{ delay: 100 }}
    >
      {#each Object.entries(categories) as [key, label]}
        <button
          onclick={() => (activeFilter = key as any)}
          class="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border focus-visible:outline-hidden {activeFilter ===
          key
            ? 'bg-(--accent) border-(--accent) text-(--bg-base) shadow-soft'
            : 'border-(--line) text-(--text-muted) hover:text-(--text-base) hover:border-(--text-muted)'}"
        >
          {label}
        </button>
      {/each}
    </div>

    <!-- Catálogo de Tarjetas -->
    <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:gap-10">
      {#each filteredTreatments as item (item.slug)}
        {@const Icon = item.icon}
        <article
          class="group flex flex-col justify-between overflow-hidden rounded-zen bg-(--bg-surface) border border-(--line) hover:border-gold-300/40 shadow-soft hover:shadow-lift transition-all duration-500"
          use:reveal
        >
          <div>
            <!-- Img Frame with Hover Zoom -->
            <div class="aspect-16/10 w-full overflow-hidden relative border-b border-(--line)">
              <Image
                src={item.image.src}
                alt={item.image.alt[lang]}
                width={item.image.width}
                height={item.image.height}
                class="transition-transform duration-1000 ease-zen group-hover:scale-105"
              />
              <span
                class="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-(--bg-base)/90 text-(--brand) backdrop-blur-xs transition-colors duration-300 group-hover:bg-(--accent) group-hover:text-(--bg-base)"
              >
                <Icon size={18} />
              </span>
            </div>

            <!-- Content Area -->
            <div class="p-6 md:p-8">
              <span class="text-xs font-semibold tracking-wider text-gold-500 uppercase">
                {treatmentCategories[item.slug] === 'calma'
                  ? categories.calma
                  : categories.recuperacion}
              </span>
              <h3
                class="mt-2 font-display text-2xl md:text-3xl text-(--text-base) group-hover:text-(--accent) transition-colors duration-300"
              >
                {item.name[lang]}
              </h3>
              <p class="mt-4 text-base leading-relaxed text-(--text-muted)">
                {item.tagline[lang]}
              </p>
            </div>
          </div>

          <!-- Bottom Footer Details and CTA -->
          <div
            class="px-6 pb-6 md:px-8 md:pb-8 flex items-center justify-between border-t border-(--line) pt-4 mt-auto"
          >
            <div class="flex flex-col">
              <span class="text-xs text-(--text-muted)">{t.fromLabel}</span>
              <span class="font-display text-xl font-medium text-(--text-base) tnum"
                >{item.priceFrom} €</span
              >
            </div>
            <div class="flex items-center gap-4">
              <span class="inline-flex items-center gap-1.5 text-xs text-(--text-muted) mr-2">
                <Clock size={14} />
                <span class="tnum">{item.durationMin} {t.minutesLabel}</span>
              </span>
              <a
                href={`${base}/masajes/${item.slug}`}
                class="inline-flex items-center justify-center size-10 rounded-full bg-(--bg-elevated) hover:bg-(--accent) text-(--text-base) hover:text-(--bg-base) transition-colors duration-300 shadow-soft"
                aria-label={lang === 'es'
                  ? `Ver detalles de ${item.name.es}`
                  : `View details of ${item.name.en}`}
              >
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
