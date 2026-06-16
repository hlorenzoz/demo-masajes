<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import Button from '$lib/components/ui/Button.svelte';
  import Image from '$lib/components/ui/Image.svelte';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const base = $derived(`/${i18n.lang}`);
  const h = $derived(i18n.t.hero);
</script>

<section class="relative min-h-dvh flex items-center bg-(--bg-base) pt-24 pb-16 overflow-hidden">
  <!-- Dynamic atmospheric background glows -->
  <div
    class="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-gold-200/20 dark:bg-gold-500/5 blur-3xl pointer-events-none"
  ></div>
  <div
    class="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-sage-300/20 dark:bg-sage-500/5 blur-3xl pointer-events-none"
  ></div>

  <div class="container-zen w-full relative z-10">
    <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <!-- Left text content -->
      <div class="flex flex-col items-start lg:col-span-7 text-left">
        <span
          class="inline-flex items-center gap-3 eyebrow text-xs uppercase tracking-[0.25em] text-(--accent)"
        >
          <span class="h-px w-6 bg-(--accent)"></span>
          {h.eyebrow}
        </span>
        <h1
          class="mt-6 font-display text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-(--text-base)"
        >
          {h.title}
        </h1>
        <p class="mt-6 max-w-xl text-base leading-relaxed text-(--text-muted) md:text-lg">
          {h.subtitle}
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <Button
            href={`${base}/contacto`}
            variant="accent"
            size="lg"
            class="shadow-soft hover:shadow-lift"
          >
            {h.ctaPrimary}
          </Button>
          <Button href={`${base}/masajes`} variant="outline-accent" size="lg">
            {h.ctaSecondary}
          </Button>
        </div>
      </div>

      <!-- Right image showcase (framed organically) -->
      <div class="relative lg:col-span-5 flex justify-center lg:justify-end">
        <div class="relative w-full max-w-sm lg:max-w-none aspect-[4/5]">
          <!-- Decorative luxury background border frame -->
          <div
            class="absolute inset-0 translate-x-4 translate-y-4 mask-organic-1 border border-(--accent)/30 pointer-events-none"
          ></div>

          <div
            class="mask-organic-1 shadow-lift aspect-[4/5] overflow-hidden relative bg-(--bg-surface)"
          >
            <Image src="/images/hero.webp" alt="Hondo Studio" width={1000} height={1250} priority />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none">
    <span
      class="flex flex-col items-center gap-2 text-[10px] tracking-[0.25em] text-(--text-muted) uppercase"
    >
      {h.scroll}
      <span class="h-8 w-px animate-bounce bg-(--accent) mt-1"></span>
    </span>
  </div>
</section>
