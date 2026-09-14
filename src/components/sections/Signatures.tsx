import Image from "next/image";
import Link from "next/link";
import Section, { type Tone } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const picks = [
  {
    name: "Steamed Chicken Momos",
    note: "Hand-folded and steamed to order, with fiery red chutney and clear soup on the side.",
    image: "/images/chicken-momos.jpg",
    alt: "A blue plate of steamed chicken momos scattered with spring onion, served with red chutney and clear soup",
  },
  {
    name: "Kunafa Pistachio Bowl",
    note: "Crisp kadayif under a molten pistachio cream, buried in crushed pistachios.",
    image: "/images/kunafa-bowl.png",
    alt: "A bowl of golden shredded kunafa topped with pistachio cream and crushed pistachios, cheese stretching from the centre",
  },
  {
    name: "Pistachio Kunafa Brownie",
    note: "A fudge brownie base under crisp kunafa, pistachio cream and a slow drizzle.",
    image: "/images/kunafa-brownie.png",
    alt: "A thick chocolate brownie slab topped with crisp kunafa, pistachio cream drizzle and chopped pistachios",
  },
  {
    name: "Mojitos & Coolers",
    note: "Built tall over crushed ice with muddled mint and lime. Best carried out to the deck.",
    image: "/images/mojitos.png",
    alt: "Four tall mojitos in pink, clear mint, passion fruit and blue, garnished with mint sprigs and lime wheels",
  },
];

/**
 * The must-try row.
 *
 * Laid out as a plain four-up grid, the way the Signature Menu reads in the
 * design — photograph, title, note, a way in. The motion matches the gallery:
 * each card fades and lifts a beat after the one before it, and the
 * photograph eases into a slow zoom on hover. Nothing moves on its own.
 */
export default function Signatures({
  tone = "cream",
  bare = false,
}: {
  tone?: Tone;
  bare?: boolean;
}) {
  return (
    <Section
      tone={tone}
      bare={bare}
      id="signatures"
      eyebrow="Must-Try"
      centered
      title={
        <>
          If it&apos;s your first time,
          <span className="accent-script"> order these</span>.
        </>
      }
      intro="Four things people come back for. Most nights, they're gone by ten."
    >
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
        {picks.map((pick, i) => (
          <Reveal key={pick.name} delay={i * 0.09} className="group h-full">
            {/* Column so the Explore line sits on a shared baseline across
                cards, however long each note runs. */}
            <Link href="/menu" className="flex h-full flex-col">
              <div className="relative aspect-4/3 overflow-hidden rounded-card border border-line">
                <Image
                  src={pick.image}
                  alt={pick.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>

              <h3 className="mt-5 font-display text-2xl font-semibold leading-snug text-fg">
                {pick.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {pick.note}
              </p>
              <p className="eyebrow mt-auto pt-4 text-accent">
                Explore{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                >
                  &rarr;
                </span>
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
