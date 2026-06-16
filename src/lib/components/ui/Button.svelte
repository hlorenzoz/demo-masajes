<script lang="ts">
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'ghost' | 'link' | 'accent' | 'outline-accent';
  type Size = 'md' | 'lg';

  interface Props {
    variant?: Variant;
    size?: Size;
    href?: string;
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    variant = 'primary',
    size = 'md',
    href,
    children,
    class: extra = '',
    ...rest
  }: Props = $props();

  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-zen active:scale-[0.98] focus-visible:outline-none';

  const sizes: Record<Size, string> = {
    md: 'px-6 py-2.5 text-xs tracking-[0.18em] uppercase',
    lg: 'px-8 py-3.5 text-xs tracking-[0.2em] uppercase'
  };

  const variants: Record<Variant, string> = {
    primary:
      'bg-(--brand) text-cream-50 shadow-soft hover:-translate-y-0.5 hover:shadow-lift hover:bg-sage-700 dark:text-sage-950',
    ghost:
      'border border-(--line) text-(--text-base) hover:border-(--accent) hover:bg-(--bg-elevated)',
    link: 'text-(--text-base) underline-offset-4 hover:text-(--brand) hover:underline',
    accent:
      'bg-(--accent) text-(--bg-base) border border-(--accent) shadow-soft hover:-translate-y-0.5 hover:shadow-lift hover:bg-transparent hover:text-(--accent)',
    'outline-accent':
      'border border-(--accent) text-(--accent) bg-transparent hover:-translate-y-0.5 hover:bg-(--accent) hover:text-(--bg-base)'
  };

  const cls = $derived(
    `${base} ${variant === 'link' ? '' : sizes[size]} ${variants[variant]} ${extra}`
  );
</script>

{#if href}
  <a {href} class={cls} {...rest}>
    {@render children()}
  </a>
{:else}
  <button class={cls} {...rest}>
    {@render children()}
  </button>
{/if}
