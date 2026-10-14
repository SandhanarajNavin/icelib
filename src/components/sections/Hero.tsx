import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";

/*
  Scrim channel values. Deliberately neutral rather than a brand blue: the
  hero is the photograph, and the overlay is only here to carry the type. A
  tinted scrim would recolour the food and the blue Icelib & Co packaging.
*/
const SCRIM = "9, 11, 15";

/*
  Film grain: fractal noise drawn by an inline SVG, tiled over the photo at
  low opacity. Static, so it reads as texture rather than flicker.
*/
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/**
 * Home hero: the feast on the counter, full bleed, with the line and two ways
 * in on the left. The photograph fades in on load while settling from a very
 * slight zoom, and a fine grain sits over it. The navbar sits solid above,
 * so the copy clears it with top padding.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="tone-scrim relative flex min-h-[38rem] items-end overflow-hidden sm:min-h-[42rem] lg:min-h-svh lg:items-center"
      style={{ backgroundColor: `rgb(${SCRIM})` }}
    >
      <div className="hero-settle absolute inset-0">
        <Image
          src="/images/hero-feast.jpg"
          alt="Smash burgers, fries, glazed chicken wings, momos with dipping sauces, an iced tea and a mojito in Icelib & Co packaging on a stainless steel counter"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[62%_center] lg:object-center"
        />
      </div>

      {/* Phones: the copy sits low, so the scrim builds toward the base. */}
      <div
        aria-hidden
        className="absolute inset-0 lg:hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(${SCRIM},0.3) 0%, rgba(${SCRIM},0.2) 22%, rgba(${SCRIM},0.8) 55%, rgba(${SCRIM},0.95) 100%)`,
        }}
      />

      {/*
        Desktop: density off the left edge only, where the copy is, fading
        out before the burgers so the food reads unobstructed on the right.
      */}
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundImage: `linear-gradient(100deg, rgba(${SCRIM},0.92) 0%, rgba(${SCRIM},0.8) 24%, rgba(${SCRIM},0.5) 40%, rgba(${SCRIM},0.12) 56%, rgba(${SCRIM},0) 66%)`,
        }}
      />

      {/* Grain, over photo and scrims alike */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="container-x relative z-10 pb-14 pt-32 sm:pb-20 lg:py-32">
        <div className="max-w-xl">
          <p className="eyebrow rise text-fg/85" style={{ animationDelay: "0.2s" }}>
            Lakeside Drinks &amp; Eatery
          </p>

          <h1
            className="headline rise mt-5 text-[3.4rem] text-fg sm:text-[4.75rem] lg:text-[5.75rem]"
            style={{ animationDelay: "0.28s" }}
          >
            Sip. Bite.
            <br />
            Laugh. Repeat.
          </h1>

          <p
            className="rise mt-6 max-w-sm text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "0.4s" }}
          >
            A lakeside eatery for good food, refreshing drinks and even better
            evenings.
          </p>

          <div
            className="rise mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: "0.52s" }}
          >
            <Link
              href="/menu"
              className="btn-pill group h-12 border-brand bg-brand text-white hover:border-[#0a44a6] hover:bg-[#0a44a6] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
            >
              Explore Menu
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/brand-story"
              className="btn-pill btn-outline h-12 backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
