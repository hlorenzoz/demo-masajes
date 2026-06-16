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
  <path
    d="M12 13c-2.4-1.9-3.4-4.4-3.4-6.8C8.6 4 12 2.2 12 2.2S15.4 4 15.4 6.2c0 2.4-1 4.9-3.4 6.8Z"
  />
  <path d="M12 13C9.4 12 4.8 11.6 4.8 11.6s.9-3.4 3.8-4" />
  <path d="M12 13c2.6-1 7.2-1.4 7.2-1.4s-.9-3.4-3.8-4" />
  <path d="M12 21c-4.2 0-7.8-2.4-7.8-2.4S6 13.6 12 13.6s7.8 5 7.8 5S16.2 21 12 21Z" />
</svg>
