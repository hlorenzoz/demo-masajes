<script lang="ts">
  import { getContext } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import Close from '$lib/components/ui/icons/Close.svelte';
  import Button from '$lib/components/ui/Button.svelte';

  interface Props {
    open: boolean;
    onclose: () => void;
  }
  let { open, onclose }: Props = $props();

  const i18n = getContext<I18nContext>(I18N_KEY);
  const base = $derived(`/${i18n.lang}`);

  const links = $derived([
    { href: base, label: i18n.t.nav.home },
    { href: `${base}/masajes`, label: i18n.t.nav.services },
    { href: `${base}/blog`, label: i18n.t.nav.blog },
    { href: `${base}/contacto`, label: i18n.t.nav.contact }
  ]);
</script>

{#if open}
  <div class="fixed inset-0 z-(--z-overlay) md:hidden">
    <button
      class="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
      aria-label="Close menu"
      transition:fade={{ duration: 200 }}
      onclick={onclose}
    ></button>

    <nav
      class="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-(--bg-base) px-7 py-6 shadow-lift"
      transition:fly={{ x: 320, duration: 350, opacity: 1 }}
      aria-label="Mobile"
    >
      <div class="flex items-center justify-between">
        <span
          class="font-display text-xl font-medium tracking-[0.22em] uppercase text-(--text-base)"
          >Hondo</span
        >
        <button
          class="grid size-9 place-items-center rounded-full hover:bg-(--bg-elevated)"
          aria-label="Close menu"
          onclick={onclose}
        >
          <Close size={20} />
        </button>
      </div>

      <ul class="mt-12 flex flex-col gap-1">
        {#each links as link (link.href)}
          <li>
            <a
              href={link.href}
              onclick={onclose}
              class="block border-b border-(--line) py-4 font-display text-2xl text-(--text-base) transition-colors hover:text-(--brand)"
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>

      <div class="mt-auto">
        <Button href={`${base}/contacto`} size="lg" class="w-full">
          {i18n.t.home.cta}
        </Button>
      </div>
    </nav>
  </div>
{/if}
