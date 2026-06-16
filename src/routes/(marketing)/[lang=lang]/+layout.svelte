<script lang="ts">
  import type { Snippet } from 'svelte';
  import Header from '$lib/components/layout/Header.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="flex min-h-screen flex-col">
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
  <footer class="border-t border-sage-200/60 px-6 py-8 text-center text-sm text-ink-700/60 dark:border-sage-800">
    © {new Date().getFullYear()} Zen Masajes
  </footer>
</div>
