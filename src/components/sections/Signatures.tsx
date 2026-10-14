import Image from "next/image";
import Link from "next/link";
import { menu } from "@/content/menu";
import Reveal from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

/*
  Each pick names a dish on the menu; its price is read from the menu data,
  so the card can never disagree with the menu page. Items sold several ways
  show their lowest price as "from".
*/
const picks = [
  {
    item: "Platter Momo",
    note: "A little of everything, with signature sauces",
    image: "/images/chicken-momos-platter.jpg",
    alt: "A momo platter with steamed, fried and tandoori momos around three dipping sauces",
  },
  {
    item: "The OG Smash",
    note: "Smashed beef, cheese, pickles & signature sauce",
    image: "/images/pick-smash-burger.jpg",
    alt: "Two smash burgers with melted cheese, jalapeños and ketchup in Icelib & Co wrappers",
  },
  {
    item: "Kunafa Pistachio Bowl",
    note: "Crisp kunafa under molten pistachio cream",
    image: "/images/kunafa-bowl.png",
    alt: "A bowl of golden shredded kunafa topped with pistachio cream and crushed pistachios",
  },
  {
    item: "Blue Ocean",
    note: "Our signature mojito, built tall over ice",
    image: "/images/mojitos.png",
    alt: "Tall mojitos garnished with mint and lime, the blue one at the end",
  },
];

function priceOf(name: string) {
  const found = menu.flatMap((c) => c.items).find((i) => i.name === name);
  if (!found) return "";
  if (typeof found.price === "number") return `₹${found.price}`;
  return `From ₹${Math.min(...found.price.map((p) => p.price))}`;
}

/**
 * Our Signature Picks — four dishes, each card a photo, name, short note and
 * price. The heading row carries a way through to the full menu.
 */
export default function Signatures() {
  return (
    <section id="signatures" className="tone-cream bg-surface py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-xl">
            <p className="eyebrow flex items-center gap-3 text-muted">
              <span className="h-px w-8 bg-muted/50" />
              Must Try
            </p>
            <h2 className="headline mt-4 text-[2.6rem] text-fg sm:text-[3.4rem]">
              Our Signature Picks
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              From crowd-favourite momos to indulgent desserts, explore what
              makes Icelib &amp; Co special.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href="/menu"
              className="btn-pill group h-11 shrink-0 border-brand text-brand hover:bg-brand hover:text-white"
            >
              View Full Menu
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {picks.map((pick, i) => (
            <Reveal key={pick.item} delay={i * 0.08} className="group h-full">
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
                <h3 className="headline mt-4 text-[1.4rem] text-fg">{pick.item}</h3>
                <p className="mt-1 text-sm text-muted">{pick.note}</p>
                <p className="mt-auto pt-3 font-semibold text-fg tabular-nums">
                  {priceOf(pick.item)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
