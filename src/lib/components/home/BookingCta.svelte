<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import { reveal } from '$lib/actions/reveal';
  import Button from '$lib/components/ui/Button.svelte';
  import Image from '$lib/components/ui/Image.svelte';
  import Clock from '$lib/components/ui/icons/Clock.svelte';
  import Stones from '$lib/components/ui/icons/Stones.svelte';
  import MapPin from '$lib/components/ui/icons/MapPin.svelte';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const base = $derived(`/${i18n.lang}`);
  const c = $derived(i18n.t.cta);
</script>

<section class="relative overflow-hidden bg-(--bg-base) py-24 md:py-32">
  <div class="container-zen">
    <div
      class="relative overflow-hidden rounded-zen px-7 py-20 text-center shadow-lift md:px-12 md:py-28"
      use:reveal
    >
      <div class="absolute inset-0 -z-10">
        <Image src="/images/cta.webp" alt="" width={1800} height={1800} />
        <div class="absolute inset-0 bg-black/75"></div>
      </div>

      <span
        class="inline-grid size-14 place-items-center rounded-full bg-cream-50/15 text-cream-50 backdrop-blur-sm"
      >
        <Stones size={28} />
      </span>
      <p class="eyebrow mt-6 text-sm text-gold-300">{c.eyebrow}</p>
      <h2 class="mx-auto mt-4 max-w-2xl text-3xl leading-tight text-cream-50 md:text-5xl">
        {c.title}
      </h2>
      <p class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream-100/85">{c.subtitle}</p>

      <div class="mt-10 flex justify-center">
        <Button href={`${base}/contacto`} variant="accent" size="lg">{c.button}</Button>
      </div>

      <dl
        class="mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-cream-100/85"
      >
        <div class="inline-flex items-center gap-2.5">
          <Clock size={18} class="text-gold-300" />
          <dt class="sr-only">{c.hoursLabel}</dt>
          <dd class="tnum">{c.hours}</dd>
        </div>
        <div class="inline-flex items-center gap-2.5">
          <MapPin size={18} class="text-gold-300" />
          <dt class="sr-only">{c.locationLabel}</dt>
          <dd>{c.location}</dd>
        </div>
      </dl>
    </div>
  </div>
</section>
