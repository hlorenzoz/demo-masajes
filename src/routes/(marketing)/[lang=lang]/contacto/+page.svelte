<script lang="ts">
  import { enhance } from '$app/forms';
  import { getContext } from 'svelte';
  import { I18N_KEY, type I18nContext } from '$lib/i18n';
  import type { ActionData } from './$types';

  const i18n = getContext<I18nContext>(I18N_KEY);
  let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
  <title>{i18n.t.nav.contact} · {i18n.t.meta.title}</title>
</svelte:head>

<section class="mx-auto max-w-xl px-6 py-20">
  <h1 class="font-display text-4xl text-sage-700 dark:text-sage-200">{i18n.t.nav.contact}</h1>

  {#if form?.success}
    <p class="mt-6 rounded-[--radius-zen] bg-sage-100 p-4 text-sage-700">
      {i18n.lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
    </p>
  {:else}
    <form method="POST" use:enhance class="mt-8 flex flex-col gap-4">
      <input name="name" placeholder="Nombre" required class="rounded-[--radius-zen] border border-sage-300 px-4 py-2" />
      <input name="email" type="email" placeholder="Email" required class="rounded-[--radius-zen] border border-sage-300 px-4 py-2" />
      <textarea name="message" rows="5" required class="rounded-[--radius-zen] border border-sage-300 px-4 py-2"></textarea>
      <!-- Cloudflare Turnstile widget se monta acá en una tarea posterior -->
      <div class="cf-turnstile" data-sitekey="TURNSTILE_SITE_KEY"></div>
      <button type="submit" class="rounded-[--radius-zen] bg-sage-500 px-6 py-3 text-cream-50 hover:bg-sage-600">
        {i18n.t.home.cta}
      </button>
    </form>
  {/if}
</section>
