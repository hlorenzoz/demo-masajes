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
  class={cls}
  aria-hidden="true"
>
  <path d="M6 6l12 12" />
  <path d="M18 6 6 18" />
</svg>
