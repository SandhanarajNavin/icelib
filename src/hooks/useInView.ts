"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;
  /** Fire once and stop observing. Defaults to false — it re-arms. */
  once?: boolean;
};

/**
 * Tracks whether an element is in view.
 *
 * By default it re-arms: the animation replays every time the element comes
 * back. Resetting only happens once the element is *entirely* past the
 * viewport, never while a sliver is still on screen — otherwise things would
 * visibly fade back out while the reader can still see them.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.25,
  once = false,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
          return;
        }

        if (once) return;

        // Only re-arm once it is fully off screen, above or below.
        const r = entry.boundingClientRect;
        if (r.bottom <= 0 || r.top >= window.innerHeight) setInView(false);
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}
