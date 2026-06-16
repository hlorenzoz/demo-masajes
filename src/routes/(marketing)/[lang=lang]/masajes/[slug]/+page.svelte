<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<section class="mx-auto max-w-3xl px-6 py-20">
  <h1 class="font-display text-4xl text-sage-700 dark:text-sage-200">{data.slug}</h1>
</section>
