<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
  import LangSwitch from '$lib/components/ui/LangSwitch.svelte';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const base = $derived(`/${i18n.lang}`);
</script>

<header
  class="sticky top-0 z-10 flex items-center justify-between border-b border-sage-200/60 bg-[--bg-base]/80 px-6 py-4 backdrop-blur dark:border-sage-800"
>
  <a href={base} class="font-display text-xl tracking-wide text-sage-700 dark:text-sage-200">
    Zen Masajes
  </a>

  <nav class="hidden items-center gap-6 text-sm md:flex" aria-label="Primary">
    <a href={base}>{i18n.t.nav.home}</a>
    <a href={`${base}/masajes`}>{i18n.t.nav.services}</a>
    <a href={`${base}/blog`}>{i18n.t.nav.blog}</a>
    <a href={`${base}/contacto`}>{i18n.t.nav.contact}</a>
  </nav>

  <div class="flex items-center gap-4">
    <LangSwitch />
    <ThemeToggle />
  </div>
</header>
