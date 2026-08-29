"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

type TypewriterProps = {
  text: string;
  /** Milliseconds per character while typing. */
  speed?: number;
  /** Milliseconds per character while erasing. */
  eraseSpeed?: number;
  /** Pause before the first character, in milliseconds. */
  startDelay?: number;
  /** How long the finished line rests before it erases. */
  holdFull?: number;
  /** How long the empty line rests before it types again. */
  holdEmpty?: number;
  /** Type, hold, erase, repeat — forever. */
  loop?: boolean;
  className?: string;
};

/**
 * Types its text out when it first scrolls into view, and — when `loop` is
 * set — erases and retypes it indefinitely.
 *
 * The full string is always rendered (invisible) to reserve its exact box, so
 * the line never reflows as it fills or empties. That same full string is the
 * copy screen readers get; the animating characters are hidden from them, so
 * a looping line never re-announces itself.
 */
export default function Typewriter({
  text,
  speed = 55,
  eraseSpeed = 28,
  startDelay = 400,
  holdFull = 2200,
  holdEmpty = 500,
  loop = false,
  className = "",
}: TypewriterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text.length);
      return;
    }

    // Rewind, so returning to the line starts it over rather than
    // resuming mid-word.
    setShown(0);

    let cancelled = false;
    let timer = 0;
    let i = 0;
    let typing = true;

    const step = () => {
      if (cancelled) return;

      i += typing ? 1 : -1;
      setShown(i);

      if (typing && i >= text.length) {
        if (!loop) return;
        typing = false;
        timer = window.setTimeout(step, holdFull);
      } else if (!typing && i <= 0) {
        typing = true;
        timer = window.setTimeout(step, holdEmpty);
      } else {
        timer = window.setTimeout(step, typing ? speed : eraseSpeed);
      }
    };

    timer = window.setTimeout(step, startDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [inView, text, speed, eraseSpeed, startDelay, holdFull, holdEmpty, loop]);

  // A looping line keeps its caret; a one-shot line drops it once finished.
  const showCaret = loop || shown < text.length;

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {/* Reserves the final box so the line never reflows mid-type. */}
      <span className="invisible">{text}</span>

      <span className="absolute inset-0" aria-hidden>
        {text.slice(0, shown)}
        {showCaret && <span className="caret" />}
      </span>

      <span className="sr-only">{text}</span>
    </span>
  );
}
