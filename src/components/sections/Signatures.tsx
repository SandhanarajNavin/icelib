import Image from "next/image";
import Section from "@/components/ui/Section";
import DepthCarousel from "@/components/ui/DepthCarousel";

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

export default function Signatures() {
  const items = picks.map((pick) => ({
    key: pick.name,
    node: (
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={pick.image}
            alt={pick.alt}
            fill
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 22rem, 18rem"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/5 to-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-semibold leading-snug text-fg">
            {pick.name}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">
            {pick.note}
          </p>
        </div>
      </article>
    ),
  }));

  return (
    <Section
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
      <DepthCarousel items={items} label="Must-try dishes" />
    </Section>
  );
}
