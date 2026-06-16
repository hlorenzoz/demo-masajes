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
  <path d="M12 3s6.5 5.8 6.5 10.5a6.5 6.5 0 0 1-13 0C5.5 8.8 12 3 12 3Z" />
  <path d="M9 13.5a3 3 0 0 0 3 3" />
</svg>
