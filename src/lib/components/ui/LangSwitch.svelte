<script lang="ts">
  import { page } from '$app/state';
  import { getContext } from 'svelte';
  import { SUPPORTED_LANGS, I18N_KEY, type I18nContext, type Lang } from '$lib/i18n';

  const i18n = getContext<I18nContext>(I18N_KEY);

  // Reescribe el primer segmento de la URL al idioma destino, conservando el resto.
  function hrefFor(target: Lang): string {
    const segments = page.url.pathname.split('/').filter(Boolean);
    segments[0] = target;
    return `/${segments.join('/')}`;
  }
</script>

<nav class="flex gap-2 text-sm" aria-label="Language">
  {#each SUPPORTED_LANGS as lang (lang)}
    <a
      href={hrefFor(lang)}
      hreflang={lang}
      aria-current={lang === i18n.lang ? 'true' : undefined}
      class="uppercase {lang === i18n.lang ? 'font-bold text-sage-700 dark:text-sage-200' : 'text-ink-700/60'}"
    >
      {lang}
    </a>
  {/each}
</nav>
