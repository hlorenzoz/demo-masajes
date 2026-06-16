<script lang="ts">
  interface Props {
    size?: number;
    class?: string;
  }
  let { size = 24, class: cls = '' }: Props = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={cls}
  aria-hidden="true"
>
  <path d="M11.5 20.5A7.5 7.5 0 0 1 4 13C4 7.5 8.5 3.5 20 3.5c0 8.5-5.5 14.5-8.5 17Z" />
  <path d="M8.5 16.5C10.5 12 13.5 9.5 17 8.5" />
</svg>
