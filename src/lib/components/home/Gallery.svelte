<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import { reveal } from '$lib/actions/reveal';
  import Image from '$lib/components/ui/Image.svelte';
  import ArrowLeft from '$lib/components/ui/icons/ArrowLeft.svelte';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const g = $derived(i18n.t.gallery);
  const lang = $derived(i18n.lang);

  let activeIndex = $state(0);

  const shots = [
    {
      src: '/images/studio-1.webp',
      w: 800,
      h: 1000,
      es: 'Sala de tratamiento con luz tenue',
      en: 'Treatment room in soft light'
    },
    {
      src: '/images/studio-2.webp',
      w: 800,
      h: 600,
      es: 'Aceites y toallas dobladas',
      en: 'Oils and folded towels'
    },
    {
      src: '/images/studio-3.webp',
      w: 800,
      h: 1100,
      es: 'Recepción con plantas',
      en: 'Reception with plants'
    },
    {
      src: '/images/studio-4.webp',
      w: 800,
      h: 700,
      es: 'Detalle de velas y piedras',
      en: 'Detail of candles and stones'
    },
    {
      src: '/images/studio-5.webp',
      w: 800,
      h: 950,
      es: 'Camilla preparada con flores',
      en: 'Massage table set with flowers'
    },
    {
      src: '/images/studio-6.webp',
      w: 800,
      h: 600,
      es: 'Té de hierbas tras la sesión',
      en: 'Herbal tea after the session'
    }
  ];

  function next() {
    activeIndex = (activeIndex + 1) % shots.length;
  }

  function prev() {
    activeIndex = (activeIndex - 1 + shots.length) % shots.length;
  }

  const activeShot = $derived((shots[activeIndex] ?? shots[0])!);
</script>

<section class="bg-(--bg-base) py-24 md:py-36 relative overflow-hidden">
  <!-- Glow background -->
  <div
    class="absolute right-[-10%] bottom-[-10%] w-[50%] aspect-square bg-glow-radial rounded-full pointer-events-none"
  ></div>

  <div class="container-zen relative z-10">
    <header class="max-w-2xl" use:reveal>
      <p class="eyebrow text-xs uppercase tracking-[0.25em]">{g.eyebrow}</p>
      <h2 class="mt-5 text-3xl font-light leading-tight sm:text-4xl md:text-5xl text-(--text-base)">
        {g.title}
      </h2>
      <p class="mt-6 text-sm sm:text-base leading-relaxed text-(--text-muted)">{g.subtitle}</p>
    </header>

    <div class="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
      <!-- Columna izquierda: Imagen activa con borde asimétrico curvo, slide counter e indicadores -->
      <div
        class="lg:col-span-7 flex flex-col md:flex-row gap-6 items-center"
        use:reveal={{ delay: 100 }}
      >
        <!-- Vertical controls and counter -->
        <div class="flex md:flex-col items-center gap-4 order-2 md:order-1">
          <!-- Button Up (ArrowLeft rotated) -->
          <button
            class="grid size-10 place-items-center rounded-full border border-(--line) hover:border-(--accent) text-(--text-base) hover:text-(--accent) transition-all cursor-pointer rotate-90"
            onclick={prev}
            aria-label="Previous image"
          >
            <ArrowLeft size={16} />
          </button>

          <!-- Slide Counter -->
          <span class="text-xs font-semibold tracking-widest text-(--text-muted) my-2 font-mono">
            {activeIndex + 1}/{shots.length}
          </span>

          <!-- Button Down (ArrowLeft rotated) -->
          <button
            class="grid size-10 place-items-center rounded-full border border-(--line) hover:border-(--accent) text-(--text-base) hover:text-(--accent) transition-all cursor-pointer -rotate-90"
            onclick={next}
            aria-label="Next image"
          >
            <ArrowLeft size={16} />
          </button>
        </div>

        <!-- Big active image and caption wrapper -->
        <div class="flex-1 w-full flex flex-col gap-4 order-1 md:order-2">
          <!-- Image container with organic mask -->
          <div
            class="relative w-full aspect-[4/5] mask-organic-1 shadow-lift bg-(--bg-elevated) overflow-hidden"
          >
            <Image
              src={activeShot.src}
              alt={lang === 'es' ? activeShot.es : activeShot.en}
              width={activeShot.w}
              height={activeShot.h}
              class="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
          <!-- Description text below -->
          <p
            class="font-display text-lg italic text-(--accent) tracking-wide text-center md:text-left transition-colors duration-300"
          >
            {lang === 'es' ? activeShot.es : activeShot.en}
          </p>
        </div>
      </div>

      <!-- Columna derecha: Grilla compacta de miniaturas -->
      <div class="lg:col-span-5 grid grid-cols-3 gap-3" use:reveal={{ delay: 200 }}>
        {#each shots as shot, i (shot.src)}
          <button
            class="relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer {activeIndex ===
            i
              ? 'border-(--accent) scale-95 shadow-soft'
              : 'border-transparent opacity-60 hover:opacity-100 hover:scale-98'}"
            onclick={() => (activeIndex = i)}
            aria-label={`View image ${i + 1}`}
          >
            <Image
              src={shot.src}
              alt={lang === 'es' ? shot.es : shot.en}
              width={200}
              height={200}
              class="h-full w-full object-cover"
            />
          </button>
        {/each}
      </div>
    </div>
  </div>
</section>
