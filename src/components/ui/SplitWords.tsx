"use client";

import { useInView } from "@/hooks/useInView";

type SplitWordsProps = {
  text: string;
  /** Seconds between consecutive words. */
  stagger?: number;
  /** Seconds before the first word. */
  delay?: number;
  /**
   * Where the stagger originates. "left" runs the sentence through in reading
   * order; "center" radiates outward from the middle, which is what centred
   * text needs — a left-to-right stagger reads as left-aligned however the
   * text itself is set.
   */
  from?: "left" | "center";
  className?: string;
};

/**
 * Fades a paragraph in word by word as it enters view, and replays whenever
 * it comes back.
 *
 * The plain string is exposed to screen readers; the animated words are
 * hidden from them so the sentence isn't announced one word at a time.
 */
export default function SplitWords({
  text,
  stagger = 0.035,
  delay = 0,
  from = "left",
  className = "",
}: SplitWordsProps) {
  const { ref, inView } = useInView<HTMLParagraphElement>({ threshold: 0.15 });
  const words = text.split(" ");
  const middle = (words.length - 1) / 2;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>

      <span aria-hidden>
        {words.map((word, i) => {
          const order = from === "center" ? Math.abs(i - middle) : i;
          const wait = delay + order * stagger;

          return (
            <span
              key={`${word}-${i}`}
              // The trailing margin is dropped on the last word so a centred
              // line stays optically centred.
              className="mr-[0.26em] inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom last:mr-0"
            >
              <span
                className="inline-block will-change-transform"
                style={{
                  transform: inView ? "none" : "translateY(105%)",
                  opacity: inView ? 1 : 0,
                  transition: `transform 0.62s cubic-bezier(0.22, 1, 0.36, 1) ${wait}s, opacity 0.42s linear ${wait}s`,
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </p>
  );
}
