<script lang="ts">
  import { getContext } from 'svelte';
  import { page } from '$app/state';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import Image from '$lib/components/ui/Image.svelte';
  import ArrowLeft from '$lib/components/ui/icons/ArrowLeft.svelte';
  import Clock from '$lib/components/ui/icons/Clock.svelte';
  import { reveal } from '$lib/actions/reveal';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const lang = $derived(i18n.lang);
  const base = $derived(`/${lang}`);
  const slug = $derived(page.params.slug);

  interface ContentBlock {
    title?: { es: string; en: string };
    text: { es: string; en: string };
  }

  interface FullPost {
    slug: string;
    title: { es: string; en: string };
    date: { es: string; en: string };
    readTime: string;
    image: string;
    quote?: { es: string; en: string };
    blocks: ContentBlock[];
  }

  const postsData: Record<string, FullPost> = {
    'el-arte-del-descanso': {
      slug: 'el-arte-del-descanso',
      title: {
        es: 'El arte del descanso: por qué parar también se entrena',
        en: 'The art of rest: why stopping is also something you train for'
      },
      date: { es: '12 de Junio, 2026', en: 'June 12, 2026' },
      readTime: '5 min',
      image: '/images/blog-descanso.webp',
      quote: {
        es: 'El verdadero descanso no es la ausencia de movimiento, sino el diseño intencionado del silencio.',
        en: 'True rest is not the absence of movement, but the intentional design of silence.'
      },
      blocks: [
        {
          text: {
            es: 'Vivimos en un mundo que premia el estar ocupados constantemente. El esfuerzo se mide en horas extras y la desconexión se percibe casi como una debilidad. Sin embargo, fisiológicamente, el cuerpo no funciona como una máquina continua. El músculo crece en el descanso, el sistema nervioso se equilibra en el silencio, y las articulaciones recuperan su rango de movilidad cuando bajamos la guardia.',
            en: 'We live in a world that constantly rewards busyness. Effort is measured in overtime and disconnecting is almost perceived as a weakness. Fysiologically, however, the body does not function like a continuous machine. Muscle grows during rest, the nervous system balances itself in silence, and joints recover their range of motion when we let our guard down.'
          }
        },
        {
          title: {
            es: 'Entrenar el reposo',
            en: 'Training for repose'
          },
          text: {
            es: 'Al igual que planificamos sesiones de fuerza, reuniones de negocio o citas, el descanso debe ser agendado de forma seria. Un masaje terapéutico de autor no es un mimo esporádico o un lujo superfluo. Es una sesión dedicada de trabajo manual que fuerza al sistema parasimpático a activarse, bajando el cortisol y acelerando la regeneración celular profunda.',
            en: 'Just as we plan strength sessions, business meetings, or dates, rest must be scheduled seriously. A signature therapeutic massage is not a sporadic indulgence or a superfluous luxury. It is a dedicated session of manual work that forces the parasympathetic system to activate, lowering cortisol and accelerating deep cellular regeneration.'
          }
        },
        {
          text: {
            es: 'Cuando entendés que el descanso forma parte del entrenamiento del alto rendimiento, tu relación con tu cuerpo cambia. Sergio diseña cada sesión de Hondo en Costa Rica bajo esta premisa: darte el espacio y el oficio para que tu cuerpo realmente aprenda a soltar.',
            en: 'When you understand that rest is part of high-performance training, your relationship with your body shifts. Sergio designs every Hondo session in Costa Rica under this premise: giving you the space and the craft for your body to truly learn to let go.'
          }
        }
      ]
    },
    'recuperacion-deportiva': {
      slug: 'recuperacion-deportiva',
      title: {
        es: 'Terapia manual vs contracturas de oficina: la guía real',
        en: 'Manual therapy vs desk knots: the real guide'
      },
      date: { es: '28 de Mayo, 2026', en: 'May 28, 2026' },
      readTime: '7 min',
      image: '/images/blog-deportiva.webp',
      quote: {
        es: 'Un estiramiento de cinco minutos en tu silla no va a deshacer meses de mala postura postural.',
        en: 'A five-minute stretch in your chair is not going to undo months of poor postural habits.'
      },
      blocks: [
        {
          text: {
            es: 'El sedentarismo de oficina y las horas acumuladas frente a la pantalla generan una serie de tensiones crónicas, principalmente en la zona cervical, los trapecios y la región lumbar. Este tipo de contracturas no son simplemente molestias casuales; representan adaptaciones musculares de fatiga acumulativa.',
            en: 'Office sedentary habits and hours accumulated in front of the screen generate chronic tensions, mostly in the neck, traps, and lower back. These knots are not just casual discomforts; they represent muscular adaptations to cumulative fatigue.'
          }
        },
        {
          title: {
            es: 'La necesidad de la técnica profunda',
            en: 'The need for deep technique'
          },
          text: {
            es: 'Los estiramientos leves ayudan a la circulación inmediata, pero las bandas tensas y los puntos gatillo necesitan presión mecánica directa. Mediante la terapia manual profunda, se ejerce una compresión que interrumpe el ciclo del dolor, aporta sangre oxigenada a los tejidos y deshace las adherencias miofasciales.',
            en: 'Mild stretches help immediate circulation, but tight bands and trigger points require direct mechanical pressure. Through deep manual therapy, compression is applied that interrupts the pain cycle, brings oxygenated blood to the tissues, and breaks down myofascial adhesions.'
          }
        },
        {
          text: {
            es: 'En Hondo Costa Rica, no trabajamos con plantillas automáticas. Sergio localiza de forma precisa cada nudo muscular para liberar el rango completo de movimiento de tu espalda, permitiéndote volver al trabajo y a los entrenamientos sin dolor ni restricciones.',
            en: 'At Hondo Costa Rica, we do not work with template routines. Sergio precisely locates each muscle knot to release the full range of motion of your back, allowing you to return to work and training pain-free.'
          }
        }
      ]
    },
    'beneficios-piedras-volcanicas': {
      slug: 'beneficios-piedras-volcanicas',
      title: {
        es: 'Piedras volcánicas: el poder térmico en la recuperación muscular',
        en: 'Volcanic stones: thermal power in muscle recovery'
      },
      date: { es: '15 de Mayo, 2026', en: 'May 15, 2026' },
      readTime: '4 min',
      image: '/images/blog-piedras.webp',
      quote: {
        es: 'La termoterapia es uno de los métodos más antiguos y eficientes de recuperación muscular profunda.',
        en: 'Thermotherapy is one of the oldest and most efficient methods of deep muscle recovery.'
      },
      blocks: [
        {
          text: {
            es: 'El uso de piedras volcánicas calientes no es solo un adorno estético de spa. Se fundamenta en la termoterapia: la transferencia controlada de calor a los tejidos profundos del cuerpo. La piedra de basalto retiene el calor de manera excepcional, liberándolo de forma constante a medida que se desliza por el músculo.',
            en: "The use of hot volcanic stones is not just a spa aesthetic decoration. It is based on thermotherapy: the controlled transfer of heat to the body's deep tissues. Basalt stone retains heat exceptionally well, releasing it steadily as it glides over muscle."
          }
        },
        {
          title: {
            es: 'Cómo reacciona el músculo al calor',
            en: 'How muscles react to heat'
          },
          text: {
            es: 'El calor estimula la vasodilatación, incrementando el flujo sanguíneo local. Esto ayuda a eliminar toxinas y a aportar nutrientes esenciales para la reparación tisular rápida. Además, el estímulo térmico relaja las fibras musculares tensas, lo que permite trabajar a mayor profundidad sin necesidad de aplicar una presión dolorosa.',
            en: 'Heat stimulates vasodilation, increasing local blood flow. This helps flush out toxins and deliver essential nutrients for rapid tissue repair. Furthermore, thermal stimulus relaxes tight muscle fibers, allowing deep-tissue work without painful pressure.'
          }
        },
        {
          text: {
            es: 'Este tratamiento es ideal para personas que sufren de cansancio generalizado, fibromialgia o tensión muscular difusa. Descubrí el ritual térmico y la atención artesanal de Sergio en su estudio en Costa Rica.',
            en: "This treatment is ideal for individuals experiencing generalized fatigue, fibromyalgia, or diffuse muscle tension. Discover the thermal ritual and Sergio's artisanal care in his Costa Rica studio."
          }
        }
      ]
    }
  };

  const post = $derived(
    (slug
      ? (postsData[slug] ?? postsData['el-arte-del-descanso'])
      : postsData['el-arte-del-descanso'])!
  );
</script>

<svelte:head>
  <title>{post.title[lang]} · Diario de Hondo</title>
</svelte:head>

<section class="bg-(--bg-base) pt-32 pb-24 md:pt-40 md:pb-36 min-h-dvh">
  <div class="container-zen">
    <!-- Volver -->
    <div class="max-w-3xl mx-auto" use:reveal>
      <a
        href={`${base}/blog`}
        class="inline-flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--brand) transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        {lang === 'es' ? 'Volver al Diario' : 'Back to Journal'}
      </a>

      <!-- Metas -->
      <div class="flex items-center gap-3 text-xs text-(--text-muted) uppercase tracking-wider">
        <span>{post.date[lang]}</span>
        <span class="text-(--accent)">·</span>
        <span class="inline-flex items-center gap-1">
          <Clock size={12} />
          {post.readTime}
        </span>
      </div>

      <!-- Título principal -->
      <h1
        class="mt-4 font-display text-4xl md:text-5xl lg:text-6xl text-(--text-base) leading-[1.15] font-light"
      >
        {post.title[lang]}
      </h1>
    </div>

    <!-- Imagen Principal de Lujo -->
    <div
      class="mt-10 max-w-5xl mx-auto overflow-hidden rounded-zen shadow-lift border border-gold-300/20"
      use:reveal={{ delay: 100 }}
    >
      <div class="aspect-16/9 overflow-hidden">
        <Image src={post.image} alt={post.title[lang]} width={1200} height={700} priority />
      </div>
    </div>

    <!-- Contenido Editorial -->
    <div class="mt-14 max-w-2xl mx-auto" use:reveal={{ delay: 150 }}>
      <div class="prose dark:prose-invert text-base leading-relaxed text-(--text-muted) space-y-8">
        {#each post.blocks as block, i}
          {#if block.title}
            <h2
              class="font-display text-2xl md:text-3xl text-(--text-base) font-light pt-4 border-b border-(--line) pb-2"
            >
              {block.title[lang]}
            </h2>
          {/if}
          <p>{block.text[lang]}</p>

          <!-- Inyectar cita en medio si existe -->
          {#if i === 0 && post.quote}
            <blockquote class="my-8 pl-6 border-l-2 border-(--accent) py-2">
              <p class="font-display text-xl md:text-2xl text-(--text-base) italic leading-snug">
                &ldquo;{post.quote[lang]}&rdquo;
              </p>
            </blockquote>
          {/if}
        {/each}
      </div>

      <!-- Separador y firma del autor -->
      <hr class="border-(--line) my-16" />

      <div
        class="p-6 md:p-8 rounded-zen bg-(--bg-surface) border border-(--line) shadow-soft flex flex-col sm:flex-row gap-6 items-center"
      >
        <div class="size-16 rounded-full overflow-hidden border border-gold-300/30 shrink-0">
          <Image src="/images/sergio.webp" alt="Sergio Zaldívar Guillén" width={120} height={120} />
        </div>
        <div class="text-center sm:text-left">
          <span class="text-xs text-gold-500 uppercase tracking-widest"
            >{lang === 'es' ? 'Escrito por' : 'Written by'}</span
          >
          <h4 class="font-display text-lg font-medium text-(--text-base) mt-0.5">
            Sergio Zaldívar Guillén
          </h4>
          <p class="text-xs text-(--text-muted) mt-1 leading-relaxed">
            {lang === 'es'
              ? 'Terapeuta corporal especializado en terapia manual profunda y recuperación deportiva. Fundador de Hondo Costa Rica.'
              : 'Body therapist specializing in deep manual therapy and sports recovery. Founder of Hondo Costa Rica.'}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
