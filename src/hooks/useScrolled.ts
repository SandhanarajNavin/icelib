"use client";

import { useEffect, useState } from "react";

/**
 * True once the window has scrolled past `threshold` pixels. Pass a function
 * when the threshold depends on layout; it is re-read on every scroll.
 */
export function useScrolled(threshold: number | (() => number) = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const limit = typeof threshold === "function" ? threshold : () => threshold;
    const onScroll = () => setScrolled(window.scrollY > limit());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);

  return scrolled;
}
