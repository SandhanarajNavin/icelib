"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  children: ReactNode;
  /** Stagger in seconds, applied as a transition delay. */
  delay?: number;
  className?: string;
};

/**
 * Fades + lifts its children into view, and replays every time they come
 * back — the reset only happens once the element is fully off screen.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
