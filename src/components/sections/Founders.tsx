import Image from "next/image";
import { founders } from "@/content/founders";
import Section, { type Tone } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

/**
 * Meet the founders — one row per person, a large round portrait beside the
 * bio, alternating sides down the page. Every other row mirrors, with its
 * text set flush right against the portrait.
 *
 * On phones each row stacks: portrait first, centred, then the bio. The
 * portrait falls back to the founder's initials until a photo is supplied.
 */
export default function Founders({ tone = "cream" }: { tone?: Tone }) {
  return (
    <Section
      tone={tone}
      id="founders"
      centered
      eyebrow="Our People"
      title="Meet the Founders"
      className="border-t border-line"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-16 sm:gap-20">
        {founders.map((founder, i) => {
          const mirrored = i % 2 === 1;
          return (
            <Reveal key={founder.name}>
              <article
                className={`flex flex-col items-center gap-8 md:items-center md:gap-12 ${
                  mirrored ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="relative aspect-square w-52 shrink-0 overflow-hidden rounded-full border border-line shadow-[0_24px_50px_-28px_rgba(16,32,58,0.5)] sm:w-60 lg:w-64">
                  {founder.photo ? (
                    <Image
                      src={founder.photo}
                      alt={`Portrait of ${founder.name}`}
                      fill
                      sizes="(min-width: 1024px) 256px, 240px"
                      className="object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-full w-full items-center justify-center bg-brand font-display text-6xl text-white sm:text-7xl"
                    >
                      {founder.initials}
                    </span>
                  )}
                </div>

                <div className={`w-full ${mirrored ? "md:text-right" : ""}`}>
                  <h3 className="display text-[1.9rem] text-fg sm:text-[2.4rem]">
                    {founder.name}
                  </h3>
                  <p className="eyebrow mt-2 text-muted">{founder.role}</p>
                  <div className="mt-5 space-y-4">
                    {founder.bio.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="leading-relaxed text-fg-soft/90"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
