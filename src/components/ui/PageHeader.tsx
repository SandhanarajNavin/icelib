import type { ReactNode } from "react";
import type { Tone } from "./Section";
import MaskReveal from "./MaskReveal";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";

type PageHeaderProps = {
  eyebrow: string;
  /**
   * Wrap the emphasised word in `<span className="accent-script">` — the
   * italic cut of the display serif that runs through every heading on the
   * site. Every page header carries one, so the signature reads as a system
   * rather than a one-off on the home page.
   */
  title: ReactNode;
  intro?: string;
  /** Matches the navbar, so header and bar read as one block. */
  tone?: Tone;
};

/**
 * The title band at the top of an inner page. Clears the fixed navbar, and
 * repeats the home page's heading choreography so arriving on /menu feels
 * like the same site rather than a different one.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  tone = "cobalt",
}: PageHeaderProps) {
  return (
    <header
      className={`tone-${tone} bg-surface pb-16 pt-[8.5rem] sm:pb-20 sm:pt-[10rem]`}
    >
      <div className="container-x">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span className="h-px w-8 bg-accent/50" />
            {eyebrow}
          </p>
        </Reveal>

        <h1 className="display mt-5 max-w-3xl text-[2.75rem] text-fg text-balance sm:text-6xl">
          <MaskReveal delay={0.08}>{title}</MaskReveal>
        </h1>

        {intro && (
          <SplitWords
            text={intro}
            delay={0.24}
            from="left"
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          />
        )}
      </div>
    </header>
  );
}
