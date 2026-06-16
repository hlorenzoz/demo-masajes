<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import { buildMeta, localBusinessJsonLd, SITE_NAME } from '$lib/seo/meta';
  import Hero from '$lib/components/home/Hero.svelte';
  import Philosophy from '$lib/components/home/Philosophy.svelte';
  import SignatureTreatments from '$lib/components/home/SignatureTreatments.svelte';
  import Benefits from '$lib/components/home/Benefits.svelte';
  import Testimonials from '$lib/components/home/Testimonials.svelte';
  import Gallery from '$lib/components/home/Gallery.svelte';
  import BookingCta from '$lib/components/home/BookingCta.svelte';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const meta = $derived(
    buildMeta({
      lang: i18n.lang,
      title: i18n.t.meta.title,
      description: i18n.t.meta.description
    })
  );
  const jsonLd = $derived(localBusinessJsonLd(i18n.t));
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.canonical} />
  {#each meta.alternates as alt (alt.lang)}
    <link rel="alternate" hreflang={alt.lang} href={alt.href} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={meta.alternates[0]?.href} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content={i18n.lang === 'es' ? 'es_ES' : 'en_US'} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={meta.canonical} />
  <meta property="og:image" content={meta.ogImage} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.ogImage} />

  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<Hero />
<Philosophy />
<SignatureTreatments />
<Benefits />
<Testimonials />
<Gallery />
<BookingCta />
