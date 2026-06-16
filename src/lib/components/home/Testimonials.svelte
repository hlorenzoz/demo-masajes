<script lang="ts">
  import { getContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import { reveal } from '$lib/actions/reveal';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const t = $derived(i18n.t.testimonials);

  let index = $state(0);
  const current = $derived(t.quotes[index] ?? t.quotes[0]);

  function show(i: number): void {
    index = i;
  }

  // Auto-avance suave; se detiene si el usuario prefiere menos movimiento.
  $effect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const total = t.quotes.length;
    const id = setInterval(() => {
      index = (index + 1) % total;
    }, 6500);
    return () => clearInterval(id);
  });
</script>

<section class="bg-(--bg-elevated) py-24 md:py-36">
  <div class="container-zen max-w-4xl text-center" use:reveal>
    <p class="eyebrow text-sm">{t.eyebrow}</p>
    <h2 class="mt-5 text-3xl leading-tight md:text-4xl">{t.title}</h2>

    <div class="relative mt-12 min-h-44 md:min-h-52">
      <span
        class="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-display text-8xl leading-none text-(--accent)/30 select-none"
      >
        &ldquo;
      </span>
      {#if current}
        {#key index}
          <blockquote class="mx-auto max-w-2xl" in:fade={{ duration: 500 }}>
            <p class="font-display text-2xl leading-snug text-(--text-base) md:text-3xl">
              {current.quote}
            </p>
            <footer class="mt-7 text-sm text-(--text-muted)">
              <span class="font-medium text-(--text-base)">{current.author}</span>
              <span class="mx-2 text-(--accent)">·</span>
              <span>{current.location}</span>
            </footer>
          </blockquote>
        {/key}
      {/if}
    </div>

    <div class="mt-10 flex items-center justify-center gap-3">
      {#each t.quotes as quote, i (quote.author)}
        <button
          class="h-px transition-all duration-300 ease-zen {i === index
            ? 'w-10 bg-(--accent)'
            : 'w-5 bg-(--line) hover:bg-(--text-muted)'}"
          aria-label={`${quote.author}, ${quote.location}`}
          aria-current={i === index ? 'true' : undefined}
          onclick={() => show(i)}
        ></button>
      {/each}
    </div>
  </div>
</section>
