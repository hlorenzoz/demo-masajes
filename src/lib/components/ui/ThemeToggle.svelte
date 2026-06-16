<script lang="ts">
  import { getContext } from 'svelte';
  import { theme } from '$lib/state/theme.svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import Sun from '$lib/components/ui/icons/Sun.svelte';
  import Moon from '$lib/components/ui/icons/Moon.svelte';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const label = $derived(theme.isDark ? i18n.t.theme.toggleLight : i18n.t.theme.toggleDark);
</script>

<button
  type="button"
  class="grid size-9 place-items-center rounded-full text-(--text-base) transition-colors duration-200 hover:bg-(--bg-elevated) focus-visible:outline-none"
  aria-label={label}
  title={label}
  onclick={() => theme.toggle()}
>
  {#if theme.isDark}
    <Sun size={18} />
  {:else}
    <Moon size={18} />
  {/if}
</button>
