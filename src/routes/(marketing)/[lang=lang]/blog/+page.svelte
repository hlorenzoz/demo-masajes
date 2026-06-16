<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';

  const i18n = getContext<I18nContext>(I18N_KEY);
</script>

<svelte:head>
  <title>{i18n.t.nav.blog} · {i18n.t.meta.title}</title>
</svelte:head>

<section class="mx-auto max-w-4xl px-6 py-20">
  <h1 class="font-display text-4xl text-sage-700 dark:text-sage-200">{i18n.t.nav.blog}</h1>
</section>
