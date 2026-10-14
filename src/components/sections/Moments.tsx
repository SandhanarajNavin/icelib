import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

const moments = [
  {
    src: "/images/chicken-momos.jpg",
    alt: "A blue plate of steamed chicken momos with spring onion and red chutney",
  },
  {
    src: "/images/mojitos.jpg",
    alt: "Two hands clinking tall Icelib & Co mojito cups under warm lights",
  },
  {
    src: "/images/kunafa-brownie.png",
    alt: "A brownie slab topped with crisp kunafa and pistachio cream",
  },
  {
    src: "/images/mocha-bowl.png",
    alt: "A navy Icelib & Co cup filled with a mocha bowl topped with ice cream",
  },
];

/**
 * Moments at Icelib & Co — a strip of four photographs that leads to the
 * gallery. Two across on phones, four on desktop.
 */
export default function Moments() {
  return (
    <section className="tone-cream border-t border-line bg-surface py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="headline text-[2.4rem] text-fg sm:text-[3rem]">
              Moments at Icelib &amp; Co
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/gallery"
              className="btn-pill group h-11 border-brand text-brand hover:bg-brand hover:text-white"
            >
              View All
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {moments.map((m, i) => (
            <Reveal key={m.src} delay={i * 0.07}>
              <Link
                href="/gallery"
                className="group relative block aspect-[4/5] overflow-hidden rounded-card"
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, 46vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
