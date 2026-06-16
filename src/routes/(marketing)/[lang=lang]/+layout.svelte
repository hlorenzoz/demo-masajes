<script lang="ts">
  import type { Snippet } from 'svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<div class="flex min-h-dvh flex-col">
  <Header />
  <main class="flex-1">
    {@render children()}
  </main>
  <Footer />
</div>

<div class="grain-overlay" aria-hidden="true"></div>
