import { useEffect, type RefObject } from 'react';

/**
 * Calls `handler` when a pointerdown lands outside `ref`.
 *
 * Uses a document-level mousedown listener (capture) rather than a fixed scrim:
 * the nav's `backdrop-filter` makes it a containing block, so a `position:fixed`
 * overlay would be clipped to the nav and never cover the page.
 */
export function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: () => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return;
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener, true);
    document.addEventListener('touchstart', listener, true);
    return () => {
      document.removeEventListener('mousedown', listener, true);
      document.removeEventListener('touchstart', listener, true);
    };
  }, [ref, handler, enabled]);
}
