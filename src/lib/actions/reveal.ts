import type { Action } from 'svelte/action';

export interface RevealOptions {
  /** Stagger delay in ms before this element animates in. */
  delay?: number;
  /** Visibility ratio that triggers the reveal (0–1). */
  threshold?: number;
}

/**
 * Reveal-on-scroll action. Adds `data-reveal` (hidden) on mount, then flips it
 * to `data-reveal="shown"` when the element enters the viewport — animating with
 * transform/opacity only (GPU). Honors prefers-reduced-motion via CSS.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
  node.setAttribute('data-reveal', '');
  if (options?.delay) {
    node.style.setProperty('--reveal-delay', `${options.delay}ms`);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.setAttribute('data-reveal', 'shown');
          observer.unobserve(node);
        }
      }
    },
    {
      threshold: options?.threshold ?? 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  observer.observe(node);

  return {
    update(next) {
      if (next?.delay) {
        node.style.setProperty('--reveal-delay', `${next.delay}ms`);
      }
    },
    destroy() {
      observer.disconnect();
    }
  };
};
