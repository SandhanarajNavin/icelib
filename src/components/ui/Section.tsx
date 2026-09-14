import type { ReactNode } from "react";
import Reveal from "./Reveal";
import MaskReveal from "./MaskReveal";
import SplitWords from "./SplitWords";

/**
 * The design alternates a warm off-white page with solid blue blocks. A
 * section declares which it is, and every foreground token inside resolves
 * against that surface — see the tone classes in globals.css.
 */
export type Tone = "cream" | "cobalt" | "deep";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
  /** Centre the heading block instead of left-aligning it. */
  centered?: boolean;
  tone?: Tone;
  /** Skip the heading block — the page already has a PageHeader above it. */
  bare?: boolean;
  className?: string;
};

/**
 * Shared section shell: consistent rhythm and heading treatment.
 *
 * The heading assembles rather than arriving as a block — the eyebrow fades
 * in, the title rises from behind its own edge, and the intro builds word by
 * word just behind it.
 */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  centered = false,
  tone = "cream",
  bare = false,
  className = "",
}: SectionProps) {
  const align = centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <section
      id={id}
      className={`tone-${tone} bg-surface py-20 sm:py-28 ${className}`}
    >
      <div className="container-x">
        {!bare && (
        <div className={align}>
          {eyebrow && (
            <Reveal>
              <p
                className={`eyebrow flex items-center gap-3 text-accent ${
                  centered ? "justify-center" : ""
                }`}
              >
                <span className="h-px w-8 bg-accent/50" />
                {eyebrow}
              </p>
            </Reveal>
          )}

          {/*
            Display serif, set uppercase and tight-leaded as in the design.
            Cormorant runs optically small, so the section heading sits at the
            design's 48px rather than the sans it replaced.
          */}
          <h2 className="display mt-5 text-[2.5rem] text-fg text-balance sm:text-5xl">
            <MaskReveal delay={0.08}>{title}</MaskReveal>
          </h2>

          {intro && (
            <SplitWords
              text={intro}
              delay={0.24}
              from={centered ? "center" : "left"}
              className={`mt-5 text-base leading-relaxed text-muted sm:text-lg ${
                centered ? "mx-auto" : ""
              }`}
            />
          )}
        </div>
        )}

        <div className={bare ? "" : "mt-12 sm:mt-14"}>{children}</div>
      </div>
    </section>
  );
}
