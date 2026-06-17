<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import { reveal } from '$lib/actions/reveal';
  import Image from '$lib/components/ui/Image.svelte';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const p = $derived(i18n.t.philosophy);
</script>

<section class="bg-(--bg-base) py-24 md:py-36 overflow-hidden relative">
  <!-- Glowing background effect -->
  <div
    class="absolute right-[-10%] top-[20%] w-[45%] aspect-square bg-glow-radial rounded-full pointer-events-none"
  ></div>

  <div class="container-zen grid items-center gap-14 md:grid-cols-12 md:gap-16 relative z-10">
    <!-- Collage de imágenes con formas circulares y elipse -->
    <div class="relative md:col-span-5 flex justify-center items-center py-10" use:reveal>
      <!-- Imagen principal ovalada (Sergio) -->
      <div
        class="relative w-64 sm:w-72 aspect-[4/5] mask-organic-2 shadow-lift bg-(--bg-elevated) z-10"
      >
        <Image
          src="/images/sergio.webp"
          alt={i18n.lang === 'es'
            ? 'Sergio Zaldívar Guillén, terapeuta de Hondo'
            : 'Sergio Zaldívar Guillén, Hondo therapist'}
          width={600}
          height={750}
          class="h-full w-full object-cover"
        />
      </div>

      <!-- Imagen secundaria circular solapada -->
      <div
        class="absolute -right-2 top-1/2 -translate-y-1/2 w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-(--accent) overflow-hidden shadow-lift bg-(--bg-elevated) z-20 transition-transform duration-500 hover:scale-105"
      >
        <Image
          src="/images/aromaterapia.webp"
          alt="Aromaterapia"
          width={350}
          height={350}
          class="h-full w-full object-cover"
        />
      </div>

      <!-- Imagen secundaria circular inferior izquierda -->
      <div
        class="absolute -left-6 bottom-4 w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-(--accent) overflow-hidden shadow-lift bg-(--bg-elevated) z-20 transition-transform duration-500 hover:scale-105"
      >
        <Image
          src="/images/relajante.webp"
          alt={i18n.lang === 'es' ? 'Masaje relajante' : 'Relaxing massage'}
          width={300}
          height={300}
          class="h-full w-full object-cover"
        />
      </div>
    </div>

    <!-- Bloque de contenido a la derecha -->
    <div class="md:col-span-7 md:pl-6" use:reveal={{ delay: 120 }}>
      <p class="eyebrow text-xs uppercase tracking-[0.25em]">{p.eyebrow}</p>
      <h2
        class="mt-5 max-w-xl text-3xl font-light leading-tight sm:text-4xl md:text-5xl text-(--text-base)"
      >
        {p.title}
      </h2>
      <p class="mt-6 max-w-prose text-base leading-relaxed text-(--text-base)">
        {p.lead}
      </p>
      <p class="mt-4 max-w-prose text-sm leading-relaxed text-(--text-muted)">
        {p.body}
      </p>
      <p class="mt-8 font-display text-xl italic text-(--accent) tracking-wide">
        {p.signature}
      </p>
    </div>
  </div>
</section>
