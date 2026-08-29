"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type MaskRevealProps = {
  children: ReactNode;
  /** Seconds before this line starts. */
  delay?: number;
  className?: string;
};

/**
 * Slides a line up from behind its own edge, as if rising into a window.
 *
 * The clip needs a little slack at the bottom or descenders (g, y, p) get
 * shaved off, so the mask is padded and the padding pulled back with a
 * matching negative margin — the box ends up exactly where it would have.
 */
export default function MaskReveal({
  children,
  delay = 0,
  className = "",
}: MaskRevealProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.2 });

  return (
    <span
      ref={ref}
      className={`block overflow-hidden pb-[0.18em] -mb-[0.18em] ${className}`}
    >
      <span
        className="block will-change-transform"
        style={{
          transform: inView ? "none" : "translateY(105%)",
          opacity: inView ? 1 : 0,
          transition: `transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, opacity 0.5s linear ${delay}s`,
        }}
      >
        {children}
      </span>
    </span>
  );
}
