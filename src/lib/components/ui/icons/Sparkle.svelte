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
  <path d="M12 2.5c.7 4.9 2.1 6.3 7 7-4.9.7-6.3 2.1-7 7-.7-4.9-2.1-6.3-7-7 4.9-.7 6.3-2.1 7-7Z" />
</svg>
