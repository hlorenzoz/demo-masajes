<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';

  const i18n = getContext<I18nContext>(I18N_KEY);
</script>

<section class="mx-auto max-w-3xl px-6 py-20">
  <h1 class="font-display text-3xl text-sage-700 dark:text-sage-200">
    {i18n.lang === 'es' ? 'Aviso legal' : 'Legal notice'}
  </h1>
</section>
