<script lang="ts">
  import { getContext } from 'svelte';
  import { theme } from '$lib/state/theme.svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const label = $derived(theme.isDark ? i18n.t.theme.toggleLight : i18n.t.theme.toggleDark);
</script>

<button
  type="button"
  class="rounded-[--radius-zen] border border-sage-300 px-3 py-1.5 text-sm text-sage-700 transition-colors hover:bg-sage-100 dark:border-sage-600 dark:text-sage-200 dark:hover:bg-sage-800"
  aria-label={label}
  onclick={() => theme.toggle()}
>
  {theme.isDark ? '☀︎' : '☾'}
</button>
