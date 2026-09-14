import Image from "next/image";
import Link from "next/link";
import Section, { type Tone } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const cards = [
  {
    href: "/menu",
    label: "The Menu",
    body: "Six sections, no filler — momos, signature bowls, brownies, mojitos, loaded fries and coffee.",
    image: "/images/chicken-momos-platter.jpg",
    alt: "A sharing platter of chicken momos with chutney and clear soup",
  },
  {
    href: "/gallery",
    label: "The Deck",
    body: "Open-air decking, glass-topped tables and bulbs strung through the branches, over the water.",
    image: "/images/ambiance.jpg",
    alt: "Open-air deck seating overlooking the lake at dusk with string lights overhead",
  },
  {
    href: "/brand-story",
    label: "Our Story",
    body: "One shipping container, four tables and a very good momo recipe. The lake came with the address.",
    image: "/images/shop.png",
    alt: "The Icelib & Co container lit up at night beneath strings of warm bulbs",
  },
];

/**
 * Home-page routing cards. The home page stays short and hands off to the
 * dedicated pages rather than repeating them in full.
 */
export default function Teasers({ tone = "cobalt" }: { tone?: Tone }) {
  return (
    <Section
      tone={tone}
      id="explore"
      eyebrow="Look Around"
      centered
      title={
        <>
          Three ways to <span className="accent-script">get started</span>.
        </>
      }
    >
      <div className="grid gap-8 md:grid-cols-3">
        {cards.map((card, i) => (
          <Reveal key={card.href} delay={0.08 * i}>
            <Link
              href={card.href}
              className="group block h-full overflow-hidden rounded-card border border-line bg-card transition duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="display text-2xl text-fg">{card.label}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
                <p className="eyebrow mt-5 text-accent">
                  Explore <span aria-hidden>&rarr;</span>
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
