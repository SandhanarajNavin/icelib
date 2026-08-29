import type { ReactNode } from "react";
import Reveal from "./Reveal";
import MaskReveal from "./MaskReveal";
import SplitWords from "./SplitWords";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
  /** Centre the heading block instead of left-aligning it. */
  centered?: boolean;
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
  className = "",
}: SectionProps) {
  const align = centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
      <div className="container-x">
        <div className={align}>
          {eyebrow && (
            <Reveal>
              <p
                className={`eyebrow flex items-center gap-3 text-accent ${
                  centered ? "justify-center" : ""
                }`}
              >
                <span className="h-px w-8 bg-accent/60" />
                {eyebrow}
              </p>
            </Reveal>
          )}

          <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-fg text-balance sm:text-5xl">
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

        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
