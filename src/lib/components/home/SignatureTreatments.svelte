<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import { reveal } from '$lib/actions/reveal';
  import { treatments } from '$lib/data/treatments';
  import Image from '$lib/components/ui/Image.svelte';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const lang = $derived(i18n.lang);
  const base = $derived(`/${lang}`);
  const t = $derived(i18n.t.treatments);

  let activeIdx = $state(0);
  const activeTreatment = $derived((treatments[activeIdx] ?? treatments[0])!);
</script>

<section class="bg-(--bg-elevated) py-24 md:py-36 relative overflow-hidden">
  <!-- Glow background -->
  <div
    class="absolute left-[-10%] top-[-10%] w-[50%] aspect-square bg-glow-radial rounded-full pointer-events-none"
  ></div>

  <div class="container-zen relative z-10">
    <header class="max-w-2xl mx-auto text-center" use:reveal>
      <p class="eyebrow text-xs uppercase tracking-[0.25em]">{t.eyebrow}</p>
      <h2 class="mt-5 text-3xl font-light leading-tight sm:text-4xl md:text-5xl text-(--text-base)">
        {t.title}
      </h2>
      <p class="mt-6 text-sm sm:text-base leading-relaxed text-(--text-muted)">{t.subtitle}</p>
    </header>

    <!-- Línea dorada conectora e imágenes de tratamiento circulares -->
    <div
      class="relative mt-16 flex justify-between items-center max-w-3xl mx-auto px-4"
      use:reveal={{ delay: 100 }}
    >
      <!-- Línea dorada horizontal de fondo -->
      <div
        class="absolute left-10 right-10 top-[40%] -translate-y-1/2 h-[1px] bg-(--accent)/30 z-0"
      ></div>

      {#each treatments as item, idx (item.slug)}
        <button
          class="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
          onclick={() => (activeIdx = idx)}
        >
          <div
            class="relative w-16 h-16 sm:w-22 sm:h-22 rounded-full overflow-hidden border transition-all duration-500 {activeIdx ===
            idx
              ? 'border-(--accent) scale-110 shadow-lift'
              : 'border-(--line) group-hover:border-(--accent)/50'} bg-(--bg-surface)"
          >
            <Image
              src={item.image.src}
              alt={item.name[lang]}
              width={150}
              height={150}
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <!-- Pequeño número flotante sobre el círculo -->
          <span
            class="absolute top-0 right-0 flex size-5 items-center justify-center rounded-full bg-(--accent) text-[10px] font-bold text-(--bg-base) shadow-soft"
          >
            {idx + 1}
          </span>
          <span
            class="mt-3 text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 {activeIdx ===
            idx
              ? 'text-(--accent)'
              : 'text-(--text-muted) group-hover:text-(--accent)'}"
          >
            {item.name[lang].split(' ')[0]}
          </span>
        </button>
      {/each}
    </div>

    <!-- Grilla 2x2 con números gigantes de fondo para descripciones -->
    <div class="mt-20 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto" use:reveal={{ delay: 200 }}>
      {#each treatments as item, i (item.slug)}
        {@const Icon = item.icon}
        <button
          class="relative text-left group p-6 rounded-zen bg-(--bg-surface) border transition-all duration-300 hover:shadow-soft flex flex-col justify-between {activeIdx ===
          i
            ? 'border-(--accent)/60 shadow-soft'
            : 'border-(--line) hover:border-(--accent)/30'}"
          onclick={() => (activeIdx = i)}
        >
          <!-- Número translúcido gigante en Serif clásica -->
          <span
            class="absolute right-6 top-4 font-display text-7xl md:text-8xl font-light text-(--accent)/10 group-hover:text-(--accent)/20 transition-colors duration-300 select-none"
          >
            0{i + 1}
          </span>

          <div class="relative z-10 w-full">
            <div class="flex items-center gap-3">
              <span
                class="flex size-10 items-center justify-center rounded-full bg-(--accent)/10 text-(--accent)"
              >
                <Icon size={18} />
              </span>
              <h3
                class="font-display text-2xl text-(--text-base) group-hover:text-(--accent) transition-colors duration-300"
              >
                {item.name[lang]}
              </h3>
            </div>

            <p class="mt-4 text-xs sm:text-sm leading-relaxed text-(--text-muted) max-w-sm">
              {item.tagline[lang]}
            </p>

            <div
              class="mt-6 pt-4 border-t border-(--line) flex items-center justify-between text-xs text-(--text-muted) w-full"
            >
              <span class="tnum font-medium">{item.durationMin} {t.minutesLabel}</span>
              <span
                class="tnum font-display text-base text-(--text-base) font-semibold group-hover:text-(--accent) transition-colors"
              >
                {t.fromLabel}
                {item.priceFrom} €
              </span>
            </div>
          </div>
        </button>
      {/each}
    </div>

    <!-- Barra de píldora resumen horizontal -->
    <div class="mt-16 flex justify-center" use:reveal={{ delay: 300 }}>
      <div
        class="inline-flex flex-col md:flex-row items-center gap-4 md:gap-8 bg-(--bg-surface) border border-(--accent)/30 rounded-[2rem] md:rounded-full px-6 py-4 md:px-8 md:py-3 shadow-soft max-w-xl md:max-w-none"
      >
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-(--accent) animate-pulse"></span>
          <span class="text-[10px] tracking-[0.2em] uppercase text-(--text-muted)">Sesión:</span>
          <span class="text-[10px] font-bold tracking-widest text-(--text-base) uppercase"
            >{activeTreatment.name[lang]}</span
          >
        </div>

        <div class="hidden md:block h-5 w-px bg-(--line)"></div>

        <div class="flex items-center gap-6 text-[11px] uppercase tracking-wider">
          <span class="tnum text-(--text-muted)"
            >{activeTreatment.durationMin} {t.minutesLabel}</span
          >
          <span class="tnum font-bold text-(--accent)"
            >{t.fromLabel} {activeTreatment.priceFrom} €</span
          >
        </div>

        <div class="hidden md:block h-5 w-px bg-(--line)"></div>

        <a
          href={`${base}/contacto?servicio=${activeTreatment.slug}`}
          class="text-[10px] font-bold tracking-[0.2em] uppercase bg-(--accent) text-(--bg-base) hover:bg-transparent hover:text-(--accent) border border-(--accent) px-5 py-2 rounded-full transition-all duration-300"
        >
          {i18n.t.home.cta}
        </a>
      </div>
    </div>
  </div>
</section>
