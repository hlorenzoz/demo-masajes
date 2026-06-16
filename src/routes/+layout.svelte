<script lang="ts">
  import '../tailwind.css';
  import { setContext } from 'svelte';
  import type { Snippet } from 'svelte';
  import { theme } from '$lib/state/theme.svelte';
  import { getDictionary, I18N_KEY, type I18nContext } from '$lib/i18n';
  import type { LayoutData } from './$types';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();

  // i18n: diccionario derivado del idioma actual (sincrónico, sin any).
  const context: I18nContext = {
    get lang() {
      return data.lang;
    },
    get t() {
      return getDictionary(data.lang);
    }
  };
  setContext(I18N_KEY, context);

  // Tema: sincronizar la Rune con el DOM y persistir (anti-flash ya aplicado en app.html).
  $effect(() => {
    const el = document.documentElement;
    el.dataset.theme = theme.current;
    el.lang = data.lang;
    localStorage.setItem('theme', theme.current);
  });
</script>

{@render children()}
