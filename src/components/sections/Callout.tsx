import Link from "next/link";
import type { ReactNode } from "react";
import type { Tone } from "@/components/ui/Section";
import MaskReveal from "@/components/ui/MaskReveal";
import Reveal from "@/components/ui/Reveal";

type CalloutProps = {
  title?: ReactNode;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  tone?: Tone;
};

/**
 * The full-width reservation band from the design — a centred display line, a
 * supporting sentence and a single pill. It closes most pages, so the site
 * always ends on an invitation rather than trailing off into the footer.
 */
export default function Callout({
  title = (
    <>
      Your table is <span className="accent-script">waiting</span>.
    </>
  ),
  subtitle = "Come for the drinks. Stay for the evening.",
  ctaLabel = "Find Us",
  ctaHref = "/contact",
  tone = "cobalt",
}: CalloutProps) {
  return (
    <section className={`tone-${tone} bg-surface py-24 sm:py-32`}>
      <div className="container-x flex flex-col items-center gap-6 text-center">
        <h2 className="display text-[2.5rem] text-fg text-balance sm:text-6xl">
          <MaskReveal>{title}</MaskReveal>
        </h2>

        <Reveal delay={0.12}>
          <p className="text-base text-muted sm:text-lg">{subtitle}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <Link href={ctaHref} className="btn-pill btn-solid mt-2">
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
