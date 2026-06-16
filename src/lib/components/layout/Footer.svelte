<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const base = $derived(`/${i18n.lang}`);
  const year = new Date().getFullYear();
  const f = $derived(i18n.t.footer);
</script>

<footer class="border-t border-(--line) bg-(--bg-elevated)">
  <div class="container-zen grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
    <div class="max-w-xs">
      <a href={base} class="flex items-baseline gap-2 text-(--text-base)">
        <span class="font-display text-2xl font-medium tracking-[0.22em] uppercase">Hondo</span>
        <span class="h-1.5 w-1.5 rounded-full bg-(--accent)"></span>
      </a>
      <p class="mt-5 text-sm leading-relaxed text-(--text-muted)">{f.tagline}</p>
    </div>

    <nav aria-label="Footer">
      <h2 class="eyebrow text-xs">{f.exploreLabel}</h2>
      <ul class="mt-4 flex flex-col gap-2.5 text-sm">
        <li>
          <a class="text-(--text-base) transition-colors hover:text-(--brand)" href={base}
            >{i18n.t.nav.home}</a
          >
        </li>
        <li>
          <a
            class="text-(--text-base) transition-colors hover:text-(--brand)"
            href={`${base}/masajes`}>{i18n.t.nav.services}</a
          >
        </li>
        <li>
          <a class="text-(--text-base) transition-colors hover:text-(--brand)" href={`${base}/blog`}
            >{i18n.t.nav.blog}</a
          >
        </li>
        <li>
          <a
            class="text-(--text-base) transition-colors hover:text-(--brand)"
            href={`${base}/contacto`}>{i18n.t.nav.contact}</a
          >
        </li>
      </ul>
    </nav>

    <div>
      <h2 class="eyebrow text-xs">{f.visitLabel}</h2>
      <address class="mt-4 flex flex-col gap-2.5 text-sm not-italic text-(--text-muted)">
        <span>{f.address}</span>
        <a class="text-(--text-base) transition-colors hover:text-(--brand)" href="tel:+34911234567"
          >{f.phone}</a
        >
        <span class="tnum">{f.hours}</span>
      </address>
    </div>
  </div>

  <div class="border-t border-(--line)">
    <div
      class="container-zen flex flex-col items-center justify-between gap-3 py-6 text-xs text-(--text-muted) sm:flex-row"
    >
      <p>© {year} Hondo. {f.rights}</p>
      <nav class="flex gap-5" aria-label="Legal">
        <a class="transition-colors hover:text-(--text-base)" href={`${base}/legal`}>{f.privacy}</a>
        <a class="transition-colors hover:text-(--text-base)" href={`${base}/legal`}>{f.terms}</a>
      </nav>
    </div>
  </div>
</footer>
