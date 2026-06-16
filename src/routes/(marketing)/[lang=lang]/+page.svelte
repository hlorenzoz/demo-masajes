<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';

  const i18n = getContext<I18nContext>(I18N_KEY);
</script>

<svelte:head>
  <title>{i18n.t.meta.title}</title>
  <meta name="description" content={i18n.t.meta.description} />
</svelte:head>

<section class="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center">
  <h1 class="font-display text-4xl text-sage-700 md:text-6xl dark:text-sage-200">
    {i18n.t.home.heroTitle}
  </h1>
  <p class="max-w-xl text-lg text-ink-700 dark:text-sage-200/80">
    {i18n.t.home.heroSubtitle}
  </p>
  <a
    href={`/${i18n.lang}/contacto`}
    class="rounded-[--radius-zen] bg-sage-500 px-8 py-3 font-medium text-cream-50 transition-colors hover:bg-sage-600"
  >
    {i18n.t.home.cta}
  </a>
</section>
