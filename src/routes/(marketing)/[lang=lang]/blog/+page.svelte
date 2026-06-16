<script lang="ts">
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import Image from '$lib/components/ui/Image.svelte';
  import ArrowRight from '$lib/components/ui/icons/ArrowRight.svelte';
  import Clock from '$lib/components/ui/icons/Clock.svelte';
  import { reveal } from '$lib/actions/reveal';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const lang = $derived(i18n.lang);
  const base = $derived(`/${lang}`);

  interface Post {
    slug: string;
    date: { es: string; en: string };
    readTime: string;
    title: { es: string; en: string };
    excerpt: { es: string; en: string };
    image: string;
  }

  const posts: Post[] = [
    {
      slug: 'el-arte-del-descanso',
      date: { es: '12 Jun, 2026', en: 'Jun 12, 2026' },
      readTime: '5 min',
      title: {
        es: 'El arte del descanso: por qué parar también se entrena',
        en: 'The art of rest: why stopping is also something you train for'
      },
      excerpt: {
        es: 'En un mundo obsesionado con la productividad, recuperar el espacio para el silencio es una decisión crucial de diseño de vida.',
        en: 'In a world obsessed with productivity, reclaiming space for silence is a crucial life design decision.'
      },
      image: '/images/blog-descanso.webp'
    },
    {
      slug: 'recuperacion-deportiva',
      date: { es: '28 May, 2026', en: 'May 28, 2026' },
      readTime: '7 min',
      title: {
        es: 'Terapia manual vs contracturas de oficina: la guía real',
        en: 'Manual therapy vs desk knots: the real guide'
      },
      excerpt: {
        es: 'El dolor de hombros y cuello acumulado frente a la pantalla no desaparece estirando. Analizamos cómo trabaja la terapia manual profunda.',
        en: "Shoulder and neck pain accumulated in front of the screen won't vanish with simple stretching. We analyze how deep manual therapy works."
      },
      image: '/images/blog-deportiva.webp'
    },
    {
      slug: 'beneficios-piedras-volcanicas',
      date: { es: '15 May, 2026', en: 'May 15, 2026' },
      readTime: '4 min',
      title: {
        es: 'Piedras volcánicas: el poder térmico en la recuperación muscular',
        en: 'Volcanic stones: thermal power in muscle recovery'
      },
      excerpt: {
        es: 'La termoterapia no es solo una experiencia agradable. El calor dilata los vasos sanguíneos y acelera la reparación de los tejidos.',
        en: 'Thermotherapy is not just a pleasant experience. Heat dilates blood vessels and accelerates tissue repair.'
      },
      image: '/images/blog-piedras.webp'
    }
  ];

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);
</script>

<svelte:head>
  <title>{i18n.t.nav.blog} · {i18n.t.meta.title}</title>
</svelte:head>

<section class="bg-(--bg-base) pt-32 pb-24 md:pt-40 md:pb-36 min-h-dvh">
  <div class="container-zen">
    <!-- Header -->
    <header class="max-w-2xl text-left border-b border-(--line) pb-10" use:reveal>
      <span class="eyebrow text-xs uppercase tracking-widest">{i18n.t.nav.blog}</span>
      <h1
        class="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl md:text-6xl text-(--text-base)"
      >
        {lang === 'es' ? 'El Diario de Hondo' : 'The Hondo Journal'}
      </h1>
      <p class="mt-4 text-base text-(--text-muted)">
        {lang === 'es'
          ? 'Apuntes sobre terapia manual, fisiología del descanso y el cuidado del cuerpo.'
          : 'Notes on manual therapy, physiology of rest, and body care.'}
      </p>
    </header>

    {#if featuredPost}
      <!-- Featured Post (Editorial Large Layout) -->
      <div class="mt-14" use:reveal={{ delay: 100 }}>
        <article class="group grid gap-8 lg:grid-cols-12 items-center">
          <div
            class="lg:col-span-7 overflow-hidden rounded-zen shadow-lift border border-transparent hover:border-gold-300/30 transition-all duration-300"
          >
            <a
              href={`${base}/blog/${featuredPost.slug}`}
              class="block aspect-16/10 lg:aspect-16/9 overflow-hidden"
            >
              <Image
                src={featuredPost.image}
                alt={featuredPost.title[lang]}
                width={1200}
                height={700}
                class="transition-transform duration-1000 group-hover:scale-103"
              />
            </a>
          </div>
          <div class="lg:col-span-5 flex flex-col justify-center items-start lg:pl-6">
            <div
              class="flex items-center gap-3 text-xs text-(--text-muted) uppercase tracking-wider"
            >
              <span>{featuredPost.date[lang]}</span>
              <span class="text-(--accent)">·</span>
              <span class="inline-flex items-center gap-1">
                <Clock size={12} />
                {featuredPost.readTime}
              </span>
            </div>
            <a
              href={`${base}/blog/${featuredPost.slug}`}
              class="block mt-4 group-hover:text-(--accent) transition-colors"
            >
              <h2
                class="font-display text-3xl md:text-4xl leading-tight text-(--text-base) hover:text-(--accent)"
              >
                {featuredPost.title[lang]}
              </h2>
            </a>
            <p class="mt-5 text-base leading-relaxed text-(--text-muted)">
              {featuredPost.excerpt[lang]}
            </p>
            <a
              href={`${base}/blog/${featuredPost.slug}`}
              class="group/link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-(--brand) hover:text-(--accent) transition-all"
            >
              {lang === 'es' ? 'Leer artículo completo' : 'Read full article'}
              <ArrowRight
                size={16}
                class="transition-transform duration-300 ease-zen group-hover/link:translate-x-1"
              />
            </a>
          </div>
        </article>
      </div>
    {/if}

    <!-- Regular Posts Grid -->
    <div class="mt-20 md:mt-24 grid gap-10 sm:grid-cols-2">
      {#each regularPosts as post, i (post.slug)}
        <article class="group flex flex-col justify-between" use:reveal={{ delay: i * 100 }}>
          <div>
            <div
              class="overflow-hidden rounded-zen shadow-soft border border-transparent hover:border-gold-300/30 transition-all duration-300"
            >
              <a href={`${base}/blog/${post.slug}`} class="block aspect-16/10 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title[lang]}
                  width={800}
                  height={550}
                  class="transition-transform duration-1000 group-hover:scale-103"
                />
              </a>
            </div>
            <div
              class="mt-6 flex items-center gap-3 text-xs text-(--text-muted) uppercase tracking-wider"
            >
              <span>{post.date[lang]}</span>
              <span class="text-(--accent)">·</span>
              <span class="inline-flex items-center gap-1">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
            <a href={`${base}/blog/${post.slug}`} class="block mt-3">
              <h3
                class="font-display text-2xl md:text-3xl text-(--text-base) group-hover:text-(--accent) transition-colors duration-300 leading-tight"
              >
                {post.title[lang]}
              </h3>
            </a>
            <p class="mt-4 text-sm leading-relaxed text-(--text-muted)">
              {post.excerpt[lang]}
            </p>
          </div>
          <div class="mt-6">
            <a
              href={`${base}/blog/${post.slug}`}
              class="group/link inline-flex items-center gap-2 text-sm font-semibold text-(--brand) hover:text-(--accent) transition-all"
            >
              {lang === 'es' ? 'Leer artículo' : 'Read article'}
              <ArrowRight
                size={16}
                class="transition-transform duration-300 ease-zen group-hover/link:translate-x-1"
              />
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
