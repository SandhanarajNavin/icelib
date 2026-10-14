import Section, { type Tone } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import MaskReveal from "@/components/ui/MaskReveal";

/* The founders' story, in their words — how it began, then building it. */
const story = [
  "We come from different places, Calicut and Ernakulam, and started out as two college students with big dreams and no clear idea of how far they would take us. We met at the Central University of Tamil Nadu, where Varun was pursuing his BBA, which he has since completed, and Hafiz was his senior, doing his MBA. What began as conversations between two people slowly turned into something more. We found ourselves thinking alike, sharing ideas, talking about the future, and imagining what it would be like to build something of our own. Neither of us wanted to simply have an idea and leave it at that. We wanted to give it a life, an identity, and a future. Before we knew it, in 2025, those conversations became the beginning of Icelib & Co.",
  "We started working towards that dream during our college years, and opened the café that same year. Varun was juggling assignments, exams, and the responsibilities of building the café, while Hafiz took care of the morning operations. We were learning how to run a business at the same time we were figuring out life for ourselves. Living away from our families, managing things on our own, and putting in long hours wasn't always easy. There were responsibilities waiting beyond the café, studies to finish, and a future we were trying to build. But every small step forward reminded us why we started.",
];

/**
 * Who we are — the founders' story, left-aligned across the full width of the
 * page container like every other section. It opens the Brand Story page, so
 * it carries the page's h1 and clears the fixed navbar with the same top
 * padding as PageHeader.
 */
export default function WhoWeAre({ tone = "cream" }: { tone?: Tone }) {
  return (
    <Section
      tone={tone}
      id="who-we-are"
      title=""
      bare
      className="pt-[8.5rem] sm:pt-[10rem]"
    >
      <div>
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span className="h-px w-8 bg-accent/50" />
            Who We Are
          </p>
        </Reveal>
        <h1 className="display mt-5 text-[2.5rem] text-fg text-balance sm:text-5xl">
          <MaskReveal delay={0.08}>
            Two Minds. One Dream.
            <span className="accent-script"> A Journey of Our Own.</span>
          </MaskReveal>
        </h1>

        <Reveal>
          <div className="mt-12 space-y-5 text-[1.05rem] leading-relaxed text-fg-soft sm:mt-14">
            {story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}

            <p>
              For us, Icelib &amp; Co was never meant to be just another café.
              We wanted to create something that carried our identity, something
              we could look back on years later and say,{" "}
              <em className="font-display text-[1.2em] text-fg">
                we built this together.
              </em>{" "}
              We&apos;re still learning, still working, and still chasing that
              vision. What started with two people sharing an idea has become
              something we&apos;re committed to growing, one day at a time.
            </p>

            <p className="border-l-2 border-brand/50 py-1 pl-5 font-display text-[1.5rem] font-semibold leading-snug text-fg sm:text-[1.7rem]">
              This is our journey, and we&apos;re glad you&apos;re a part of it.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
