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
  <ellipse cx="12" cy="17" rx="7.5" ry="3" />
  <ellipse cx="12" cy="11.5" rx="6" ry="2.6" />
  <ellipse cx="12" cy="6.5" rx="4.3" ry="2.1" />
</svg>
