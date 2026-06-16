<script lang="ts">
  import { page } from '$app/state';
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
  import LangSwitch from '$lib/components/ui/LangSwitch.svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import Menu from '$lib/components/ui/icons/Menu.svelte';
  import MobileNav from '$lib/components/layout/MobileNav.svelte';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const base = $derived(`/${i18n.lang}`);

  let scrolled = $state(false);
  let menuOpen = $state(false);

  const links = $derived([
    { href: base, label: i18n.t.nav.home, exact: true },
    { href: `${base}/masajes`, label: i18n.t.nav.services, exact: false },
    { href: `${base}/blog`, label: i18n.t.nav.blog, exact: false },
    { href: `${base}/contacto`, label: i18n.t.nav.contact, exact: false }
  ]);

  function isActive(href: string, exact: boolean): boolean {
    const path = page.url.pathname.replace(/\/$/, '');
    const target = href.replace(/\/$/, '');
    return exact ? path === target : path.startsWith(target);
  }

  $effect(() => {
    const onScroll = () => (scrolled = window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<header
  class="fixed inset-x-0 top-0 z-(--z-header) transition-[background-color,box-shadow,border-color] duration-300 ease-zen {scrolled
    ? 'border-b border-(--line) bg-(--bg-base)/90 shadow-soft backdrop-blur-md'
    : 'border-b border-transparent bg-transparent'}"
>
  <div class="container-zen flex h-22 items-center justify-between gap-4">
    <!-- Left: Ubicación elegante (oculta en pantallas pequeñas) -->
    <div
      class="hidden flex-1 items-center gap-1.5 text-[10px] font-medium tracking-[0.25em] text-(--text-muted) uppercase md:flex"
    >
      <span class="inline-block h-1 w-1 rounded-full bg-(--accent)"></span>
      <span>Escazú, Costa Rica</span>
    </div>

    <!-- Center: Logotipo y Links -->
    <div class="flex flex-col items-center justify-center gap-2 md:flex-none">
      <a
        href={base}
        class="group flex items-baseline gap-1 text-(--text-base) transition-opacity hover:opacity-80"
        aria-label="Hondo"
      >
        <span
          class="font-display text-2xl font-light tracking-[0.3em] uppercase text-(--text-base) md:text-3xl"
          >Hondo</span
        >
      </a>

      <nav class="hidden items-center gap-7 md:flex" aria-label="Primary">
        {#each links as link (link.href)}
          <a
            href={link.href}
            aria-current={isActive(link.href, link.exact) ? 'page' : undefined}
            class="group relative text-[10px] font-semibold tracking-[0.25em] uppercase text-(--text-muted) transition-colors hover:text-(--accent) aria-current:text-(--accent)"
          >
            {link.label}
          </a>
        {/each}
      </nav>
    </div>

    <!-- Right: LangSwitch, ThemeToggle y Reservar -->
    <div class="flex flex-1 items-center justify-end gap-3">
      <div class="hidden items-center gap-3 sm:flex">
        <LangSwitch />
        <ThemeToggle />
      </div>
      <Button
        href={`${base}/contacto`}
        variant="outline-accent"
        class="hidden lg:inline-flex py-2 px-5 text-[10px] font-bold tracking-[0.2em]"
      >
        {i18n.t.nav.contact}
      </Button>
      <button
        class="grid size-10 place-items-center rounded-full text-(--text-base) hover:bg-(--bg-elevated) md:hidden"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onclick={() => (menuOpen = true)}
      >
        <Menu size={22} />
      </button>
    </div>
  </div>
</header>

<MobileNav open={menuOpen} onclose={() => (menuOpen = false)} />
