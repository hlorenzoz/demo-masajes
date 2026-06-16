<script lang="ts">
  import { getContext } from 'svelte';
  import type { Component } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import { reveal } from '$lib/actions/reveal';
  import Droplet from '$lib/components/ui/icons/Droplet.svelte';
  import Sparkle from '$lib/components/ui/icons/Sparkle.svelte';
  import Clock from '$lib/components/ui/icons/Clock.svelte';
  import Leaf from '$lib/components/ui/icons/Leaf.svelte';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const b = $derived(i18n.t.benefits);

  type IconComponent = Component<{ size?: number; class?: string }>;
  const icons: IconComponent[] = [Droplet, Sparkle, Clock, Leaf];
</script>

<section class="bg-(--bg-base) py-24 md:py-36">
  <div class="container-zen grid gap-14 md:grid-cols-12 md:gap-16">
    <header class="md:col-span-4 md:pt-2" use:reveal>
      <p class="eyebrow text-sm">{b.eyebrow}</p>
      <h2 class="mt-5 text-3xl leading-tight md:text-4xl">{b.title}</h2>
    </header>

    <ul class="md:col-span-8">
      {#each b.items as item, i (item.title)}
        {@const Icon = icons[i] ?? Leaf}
        <li
          class="flex gap-6 border-t border-(--line) py-7 first:border-t-0 first:pt-0 md:gap-8"
          use:reveal={{ delay: i * 90 }}
        >
          <span
            class="mt-1 grid size-12 shrink-0 place-items-center rounded-full bg-(--bg-elevated) text-(--brand)"
          >
            <Icon size={24} />
          </span>
          <div>
            <h3 class="font-display text-2xl">{item.title}</h3>
            <p class="mt-2 max-w-md leading-relaxed text-(--text-muted)">{item.description}</p>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>
