<script lang="ts">
  import { enhance } from '$app/forms';
  import { getContext, onMount } from 'svelte';
  import { page } from '$app/state';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import { treatments } from '$lib/data/treatments';
  import ArrowRight from '$lib/components/ui/icons/ArrowRight.svelte';
  import Clock from '$lib/components/ui/icons/Clock.svelte';
  import MapPin from '$lib/components/ui/icons/MapPin.svelte';
  import Mail from '$lib/components/ui/icons/Mail.svelte';
  import Phone from '$lib/components/ui/icons/Phone.svelte';
  import Sparkle from '$lib/components/ui/icons/Sparkle.svelte';
  import { reveal } from '$lib/actions/reveal';
  import type { ActionData } from './$types';

  const i18n = getContext<I18nContext>(I18N_KEY);
  const lang = $derived(i18n.lang);
  const base = $derived(`/${lang}`);

  let { form }: { form: ActionData } = $props();

  // Estados del formulario reactivo
  let selectedService = $state(page.url.searchParams.get('servicio') || 'relajante');
  let duration = $state<'60' | '90'>('60');
  let name = $state('');
  let email = $state('');
  let userMessage = $state('');
  let submitting = $state(false);

  interface DateOption {
    dayNum: number;
    dayLabel: string;
    dateString: string;
  }

  // Generar próximos 7 días hábiles (excluye Domingos)
  const dates = $derived.by<DateOption[]>(() => {
    const list: DateOption[] = [];
    const today = new Date();
    const daysNameEs = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const daysNameEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 1; i <= 10; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      if (nextDate.getDay() === 0) continue; // Saltear Domingos

      const dayNum = nextDate.getDate();
      const dayLabel =
        lang === 'es' ? daysNameEs[nextDate.getDay()]! : daysNameEn[nextDate.getDay()]!;
      const dateString = nextDate.toISOString().split('T')[0]!;
      list.push({ dayNum, dayLabel, dateString });
      if (list.length >= 7) break;
    }
    return list;
  });

  let selectedDate = $state('');

  onMount(() => {
    const firstDate = dates[0];
    if (firstDate) {
      selectedDate = firstDate.dateString;
    }
  });

  const slots = [
    { time: '10:00', period: 'morning', occupied: false },
    { time: '11:30', period: 'morning', occupied: true },
    { time: '14:00', period: 'afternoon', occupied: false },
    { time: '15:30', period: 'afternoon', occupied: false },
    { time: '17:00', period: 'afternoon', occupied: true },
    { time: '18:30', period: 'evening', occupied: false },
    { time: '20:00', period: 'evening', occupied: false }
  ];

  let selectedTime = $state('10:00');

  const activeTreatment = $derived(
    (treatments.find((t) => t.slug === selectedService) || treatments[0])!
  );

  // Si dura 90 min, sumamos un plus al precio base de 60 min
  const estimatedPrice = $derived(
    duration === '90' ? activeTreatment.priceFrom + 30 : activeTreatment.priceFrom
  );

  const combinedMessage = $derived(
    `Fecha: ${selectedDate}\nHora: ${selectedTime}\n\nComentarios:\n${userMessage || 'Ninguno'}`
  );

  // Cargar script de Turnstile de forma segura en cliente
  onMount(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });

  function handleSubmit() {
    submitting = true;
    return async ({ update }: { update: any }) => {
      submitting = false;
      await update();
    };
  }
</script>

<svelte:head>
  <title>{i18n.t.nav.contact} · {i18n.t.meta.title}</title>
</svelte:head>

<section class="bg-(--bg-base) pt-32 pb-24 md:pt-40 md:pb-36 min-h-dvh flex items-center">
  <div class="container-zen w-full">
    <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <!-- Left Column: Contact info & value props -->
      <div class="lg:col-span-5 flex flex-col justify-center" use:reveal>
        <span class="eyebrow text-xs uppercase tracking-widest">{i18n.t.nav.contact}</span>
        <h1
          class="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl md:text-6xl text-(--text-base)"
        >
          {lang === 'es' ? 'Solicitá tu espacio' : 'Request your space'}
        </h1>
        <p class="mt-6 text-base leading-relaxed text-(--text-muted)">
          {lang === 'es'
            ? 'Completá el formulario indicando tus preferencias. Sergio revisará tu propuesta y te confirmará la disponibilidad por correo electrónico en pocas horas.'
            : 'Fill out the form indicating your preferences. Sergio will review your proposal and confirm availability by email within a few hours.'}
        </p>

        <!-- Details block -->
        <div class="mt-10 space-y-6">
          <div class="flex items-start gap-4">
            <span
              class="grid place-items-center size-10 rounded-full bg-gold-200/20 text-(--accent) shrink-0 mt-0.5"
            >
              <MapPin size={18} />
            </span>
            <div>
              <h4 class="font-display text-lg font-medium text-(--text-base)">
                {lang === 'es' ? 'Estudio privado' : 'Private studio'}
              </h4>
              <p class="text-sm text-(--text-muted) mt-1">{i18n.t.footer.address}</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <span
              class="grid place-items-center size-10 rounded-full bg-gold-200/20 text-(--accent) shrink-0 mt-0.5"
            >
              <Clock size={18} />
            </span>
            <div>
              <h4 class="font-display text-lg font-medium text-(--text-base)">
                {lang === 'es' ? 'Horarios' : 'Available hours'}
              </h4>
              <p class="text-sm text-(--text-muted) mt-1">{i18n.t.footer.hours}</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <span
              class="grid place-items-center size-10 rounded-full bg-gold-200/20 text-(--accent) shrink-0 mt-0.5"
            >
              <Mail size={18} />
            </span>
            <div>
              <h4 class="font-display text-lg font-medium text-(--text-base)">Email</h4>
              <p class="text-sm text-(--text-muted) mt-1">contacto@hondo.cr</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <span
              class="grid place-items-center size-10 rounded-full bg-gold-200/20 text-(--accent) shrink-0 mt-0.5"
            >
              <Phone size={18} />
            </span>
            <div>
              <h4 class="font-display text-lg font-medium text-(--text-base)">
                {lang === 'es' ? 'Teléfono' : 'Phone'}
              </h4>
              <p class="text-sm text-(--text-muted) mt-1">{i18n.t.footer.phone}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Interactive Booking Form -->
      <div class="lg:col-span-7" use:reveal={{ delay: 150 }}>
        <div class="p-8 md:p-10 rounded-zen bg-(--bg-surface) border border-(--line) shadow-lift">
          {#if form?.success}
            <div class="text-center py-10 flex flex-col items-center">
              <span
                class="grid place-items-center size-16 rounded-full bg-sage-500/10 text-sage-500 mb-6 animate-pulse"
              >
                <Sparkle size={32} />
              </span>
              <h3 class="font-display text-2xl md:text-3xl text-(--text-base)">
                {lang === 'es' ? '¡Propuesta recibida!' : 'Proposal received!'}
              </h3>
              <p class="mt-4 text-base text-(--text-muted) max-w-md mx-auto">
                {lang === 'es'
                  ? 'Muchas gracias. Sergio se pondrá en contacto con vos hoy mismo para confirmar la hora exacta de tu masaje.'
                  : 'Thank you very much. Sergio will contact you today to confirm the exact time for your massage.'}
              </p>
              <div class="mt-8">
                <a
                  href={base}
                  class="inline-flex items-center gap-2 text-sm font-medium text-(--brand) hover:text-(--accent) transition-colors"
                >
                  {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          {:else}
            <form method="POST" use:enhance={handleSubmit} class="flex flex-col gap-6">
              <!-- Selector de Servicio -->
              <div class="flex flex-col gap-2">
                <label
                  for="service"
                  class="text-[10px] uppercase tracking-widest text-(--text-muted)"
                >
                  {lang === 'es' ? '1. Elegí el tratamiento' : '1. Choose treatment'}
                </label>
                <select
                  id="service"
                  name="service"
                  bind:value={selectedService}
                  class="w-full input-line-gold py-2 text-sm text-(--text-base) focus:outline-none transition-all cursor-pointer bg-transparent"
                >
                  {#each treatments as item}
                    <option value={item.slug} class="bg-(--bg-surface) text-(--text-base)"
                      >{item.name[lang]}</option
                    >
                  {/each}
                </select>
              </div>

              <!-- Selector de Duración -->
              <div class="flex flex-col gap-2">
                <span class="text-[10px] uppercase tracking-widest text-(--text-muted)">
                  {lang === 'es' ? '2. Duración de la sesión' : '2. Session duration'}
                </span>
                <div class="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onclick={() => (duration = '60')}
                    class="flex items-center justify-between border rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider transition-all cursor-pointer {duration ===
                    '60'
                      ? 'border-(--accent) bg-(--accent)/10 text-(--accent)'
                      : 'border-(--line) text-(--text-muted) hover:border-(--accent)/40'}"
                  >
                    <span>60 {i18n.t.treatments.minutesLabel}</span>
                    <span class="font-display font-medium text-sm"
                      >{activeTreatment.priceFrom} €</span
                    >
                  </button>
                  <button
                    type="button"
                    onclick={() => (duration = '90')}
                    class="flex items-center justify-between border rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider transition-all cursor-pointer {duration ===
                    '90'
                      ? 'border-(--accent) bg-(--accent)/10 text-(--accent)'
                      : 'border-(--line) text-(--text-muted) hover:border-(--accent)/40'}"
                  >
                    <span>90 {i18n.t.treatments.minutesLabel}</span>
                    <span class="font-display font-medium text-sm"
                      >{activeTreatment.priceFrom + 30} €</span
                    >
                  </button>
                </div>
                <input type="hidden" name="duration" value={duration} />
              </div>

              <!-- Selector de Fecha -->
              <div class="flex flex-col gap-2">
                <span class="text-[10px] uppercase tracking-widest text-(--text-muted)">
                  {lang === 'es' ? '3. Elegí la fecha' : '3. Choose date'}
                </span>
                <div class="flex flex-wrap gap-3">
                  {#each dates as d}
                    <button
                      type="button"
                      onclick={() => (selectedDate = d.dateString)}
                      class="flex flex-col items-center justify-center size-14 rounded-full border transition-all cursor-pointer {selectedDate ===
                      d.dateString
                        ? 'border-(--accent) bg-(--accent)/10 text-(--accent)'
                        : 'border-(--line) text-(--text-muted) hover:border-(--accent)/50'}"
                    >
                      <span class="text-[9px] uppercase tracking-wider font-semibold"
                        >{d.dayLabel}</span
                      >
                      <span class="text-sm font-bold font-mono">{d.dayNum}</span>
                    </button>
                  {/each}
                </div>
              </div>

              <!-- Selector de Horario -->
              <div class="flex flex-col gap-2">
                <span class="text-[10px] uppercase tracking-widest text-(--text-muted)">
                  {lang === 'es' ? '4. Elegí el horario' : '4. Choose time'}
                </span>
                <div class="flex flex-wrap gap-2.5">
                  {#each slots as slot}
                    <button
                      type="button"
                      disabled={slot.occupied}
                      onclick={() => (selectedTime = slot.time)}
                      class="relative px-5 py-2 text-xs font-semibold tracking-wider rounded-full border transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-35 disabled:line-through {selectedTime ===
                        slot.time && !slot.occupied
                        ? 'border-(--accent) bg-(--accent)/10 text-(--accent)'
                        : 'border-(--line) text-(--text-muted) hover:border-(--accent)/50'}"
                    >
                      {slot.time}
                    </button>
                  {/each}
                </div>
              </div>

              <!-- Campos de Nombre, Email y Nota con Estética Minimal -->
              <div class="grid gap-6 sm:grid-cols-2">
                <div class="flex flex-col gap-2">
                  <label
                    for="name"
                    class="text-[10px] uppercase tracking-widest text-(--text-muted)">Nombre</label
                  >
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={lang === 'es' ? 'Ej. Sergio Zaldívar' : 'e.g. John Doe'}
                    bind:value={name}
                    class="w-full input-line-gold py-2 text-sm text-(--text-base) focus:outline-none transition-all placeholder:text-(--text-muted)/30"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label
                    for="email"
                    class="text-[10px] uppercase tracking-widest text-(--text-muted)">Email</label
                  >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="sergio@hondo.cr"
                    bind:value={email}
                    class="w-full input-line-gold py-2 text-sm text-(--text-base) focus:outline-none transition-all placeholder:text-(--text-muted)/30"
                  />
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label
                  for="user-message"
                  class="text-[10px] uppercase tracking-widest text-(--text-muted)"
                >
                  {lang === 'es'
                    ? 'Preferencias o zonas a tratar (opcional)'
                    : 'Preferences or target areas (optional)'}
                </label>
                <textarea
                  id="user-message"
                  rows="2"
                  placeholder={lang === 'es'
                    ? 'Ej. Tensión acumulada en la espalda baja...'
                    : 'e.g. Lower back stiffness...'}
                  bind:value={userMessage}
                  class="w-full input-line-gold py-2 text-sm text-(--text-base) focus:outline-none transition-all placeholder:text-(--text-muted)/30 resize-none"
                ></textarea>
              </div>

              <!-- Input Oculto de Mensaje Combinado -->
              <input type="hidden" name="message" value={combinedMessage} />

              <!-- Resumen de Inversión Estimada -->
              <div
                class="flex items-center justify-between rounded-zen bg-(--bg-base) border border-(--line) p-5 mt-2"
              >
                <span class="text-xs uppercase tracking-widest text-(--text-muted)">
                  {lang === 'es' ? 'Inversión estimada' : 'Estimated investment'}
                </span>
                <span class="font-display text-2xl font-light text-(--accent) tnum">
                  {estimatedPrice} €
                </span>
              </div>

              <!-- Turnstile Widget -->
              <div class="flex justify-center mt-2">
                <!-- Se inyecta por el widget de turnstile, sitekey simulada para testing/Cloudflare -->
                <div class="cf-turnstile" data-sitekey="0x4AAAAAAAAB_mKq9l2-f_3W"></div>
              </div>

              <!-- Botón Submit -->
              <button
                type="submit"
                disabled={submitting}
                class="w-full mt-4 flex items-center justify-center gap-2 rounded-full bg-(--accent) text-(--bg-base) hover:bg-transparent hover:text-(--accent) border border-(--accent) px-6 py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {#if submitting}
                  <span
                    class="animate-spin rounded-full h-4 w-4 border-2 border-(--bg-base) border-t-transparent"
                  ></span>
                  {lang === 'es' ? 'Enviando...' : 'Sending...'}
                {:else}
                  {lang === 'es' ? 'Solicitar Reserva' : 'Request Booking'}
                {/if}
              </button>
            </form>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
