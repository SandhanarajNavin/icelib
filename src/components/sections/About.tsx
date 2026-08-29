import Image from "next/image";
import MaskReveal from "@/components/ui/MaskReveal";
import SplitWords from "@/components/ui/SplitWords";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const notes = [
  {
    title: "Folded, not thawed",
    body: "Every momo is filled and pleated in-house, then steamed the moment you order it. That's why there's a wait — and why it's worth it.",
  },
  {
    title: "Built for the evening",
    body: "The deck opens onto the water. Tables fill as the sun drops, the bulbs come on, and nobody is in a hurry to leave.",
  },
  {
    title: "One counter, no shortcuts",
    body: "Coffee, mojitos, bowls and fries all come off the same small pass. Small menu, done properly, every single time.",
  },
];

export default function About() {
  return (
    <Section
      id="story"
      eyebrow="Our Story"
      title={
        <>
          A blue box by the water that
          <span className="accent-script"> stays open late</span>.
        </>
      }
      intro="Icelib & Co started as a single shipping container and a very good momo recipe. The lake came with the address; the string lights were our idea."
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl sm:aspect-3/4">
              <Image
                src="/images/ambiance.jpg"
                alt="Open-air deck seating overlooking the lake at dusk with string lights overhead"
                fill
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent"
              />
            </div>

            {/* Floating caption card */}
            <div className="absolute -bottom-6 -right-4 max-w-[15rem] rounded-xl border border-fg-soft/15 bg-ink-800/90 p-5 backdrop-blur-md sm:-right-8">
              <p className="font-display text-3xl text-accent-soft">2019</p>
              <p className="mt-1.5 text-sm leading-snug text-muted/75">
                One container, four tables, and a queue that hasn&apos;t really
                stopped since.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10">
          {notes.map((note, i) => (
            <Reveal key={note.title} delay={0.08 * i}>
              <div className="border-l-2 border-accent/40 pl-6">
                <h3 className="font-display text-2xl text-fg">
                  <MaskReveal>{note.title}</MaskReveal>
                </h3>
                <SplitWords
                  text={note.body}
                  delay={0.12}
                  className="mt-3 leading-relaxed text-muted/75"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
