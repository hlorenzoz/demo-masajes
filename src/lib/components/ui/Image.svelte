<script lang="ts">
  interface Props {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** CSS class for the wrapper (controls aspect/cover via object-fit). */
    class?: string;
    sizes?: string;
    srcset?: string;
    /** Eager-load above-the-fold images (e.g. the hero). */
    priority?: boolean;
  }

  let {
    src,
    alt,
    width,
    height,
    class: extra = '',
    sizes,
    srcset,
    priority = false
  }: Props = $props();

  let loaded = $state(false);
</script>

<img
  {src}
  {alt}
  {width}
  {height}
  {sizes}
  {srcset}
  loading={priority ? 'eager' : 'lazy'}
  fetchpriority={priority ? 'high' : 'auto'}
  decoding="async"
  onload={() => (loaded = true)}
  class="h-full w-full object-cover transition-[opacity,filter] duration-700 ease-zen {loaded
    ? 'opacity-100 blur-0'
    : 'opacity-0 blur-md'} {extra}"
/>
