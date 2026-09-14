import Image from "next/image";
import Link from "next/link";
import Typewriter from "@/components/ui/Typewriter";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  CoffeeIcon,
  HeartIcon,
  StarIcon,
} from "@/components/ui/icons";

const features = [
  { Icon: CoffeeIcon, title: "Premium Quality", note: "Finest ingredients" },
  { Icon: HeartIcon, title: "Made with Love", note: "Just for you" },
  { Icon: StarIcon, title: "Cozy Vibes", note: "Every time" },
];

/*
  Scrim channel values. Deliberately neutral rather than a brand blue: the
  hero is the photograph, and the overlay is only here to carry the type. A
  tinted scrim would recolour the warm bulbs and the container's own blue.
*/
const SCRIM = "9, 11, 15";

export default function Hero() {
  return (
    <section
      id="home"
      className="tone-scrim relative flex min-h-svh flex-col justify-end overflow-hidden lg:justify-center"
      style={{ backgroundColor: `rgb(${SCRIM})` }}
    >
      {/*
        The storefront photograph, full bleed. It is the hero — nothing is
        laid over it but the gradients the type needs to stay readable.
      */}
      <div className="absolute inset-0">
        <Image
          src="/images/shop.png"
          alt="The Icelib and Co container cafe lit up at night beneath strings of warm bulbs"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/*
          Phones: the copy sits over the lower half, so the scrim builds from
          near-nothing at the top to almost solid at the base.
        */}
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(${SCRIM},0.55) 0%, rgba(${SCRIM},0.28) 14%, rgba(${SCRIM},0.74) 34%, rgba(${SCRIM},0.88) 58%, rgba(${SCRIM},0.95) 100%)`,
          }}
        />

        {/*
          Desktop: density off the left edge only, where the copy is, fading
          out well before the shopfront so the photograph reads unobstructed
          on the right.
        */}
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: `linear-gradient(100deg, rgba(${SCRIM},0.9) 0%, rgba(${SCRIM},0.8) 20%, rgba(${SCRIM},0.62) 40%, rgba(${SCRIM},0.3) 56%, rgba(${SCRIM},0.08) 68%, rgba(${SCRIM},0) 78%)`,
          }}
        />
        {/* Vertical settle: keeps the navbar legible and grounds the base */}
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(${SCRIM},0.5) 0%, rgba(${SCRIM},0) 28%, rgba(${SCRIM},0) 68%, rgba(${SCRIM},0.45) 100%)`,
          }}
        />
      </div>

      {/* Copy */}
      <div className="container-x relative z-10 flex flex-col pb-8 pt-32 sm:pb-12 lg:min-h-svh lg:justify-center lg:pb-0 lg:pt-24">
        <div className="w-full lg:max-w-[52%] xl:max-w-[46%]">
          <h1
            className="display rise text-[3rem] text-fg sm:text-[4rem] lg:text-[4.25rem]"
            style={{ animationDelay: "0.1s" }}
          >
            Sip. Bite.
            <br />
            <span className="relative mr-2.5 inline-block sm:mr-3.5">
              {/*
                The emphasis word, set in the italic cut of the display serif.
              */}
              <span
                className="accent-script"
                style={{ fontSize: "1.06em", lineHeight: 0.9 }}
              >
                Laugh.
              </span>
              {/* Hand-drawn stroke, echoing the swoosh in the logo */}
              <svg
                aria-hidden
                viewBox="0 0 260 12"
                preserveAspectRatio="none"
                fill="none"
                className="absolute inset-x-0 -bottom-1.5 h-[0.3em] w-full text-accent/85 lg:-bottom-2"
              >
                <path
                  d="M3 9C46 4 132 2 257 5.4"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="draw-stroke"
                />
              </svg>
            </span>
            Repeat.
          </h1>

          {/* Supporting line — clearly secondary to the headline */}
          <p
            className="rise mt-7 whitespace-nowrap leading-none text-[1.02rem] font-medium tracking-[0.01em] text-accent-soft/90 sm:text-[1.15rem]"
            style={{ animationDelay: "0.24s" }}
          >
            <Typewriter
              text="Late nights. Warm lights. Good company."
              startDelay={800}
              loop
            />
          </p>

          <p
            className="rise mt-3.5 max-w-[30rem] text-[0.95rem] leading-relaxed text-muted sm:text-base"
            style={{ animationDelay: "0.34s" }}
          >
            A rooftop escape by the lake, where refreshing drinks, comforting
            bites and great conversations come together.
          </p>

          {/* Actions — full width and stacked on mobile, inline from sm up */}
          <div
            className="rise mt-9 flex flex-col gap-3.5 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: "0.46s" }}
          >
            <Link
              href="/menu"
              className="btn-pill btn-solid group w-full focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft sm:w-auto"
            >
              Explore the Menu
              <ArrowRightIcon className="h-[1.05rem] w-[1.05rem] transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="btn-pill btn-outline w-full backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft sm:w-auto"
            >
              Find Us
            </Link>
          </div>

          {/* Feature strip — understated, so it never competes with the headline */}
          <ul
            className="rise mt-11 grid grid-cols-3 sm:mt-14"
            style={{ animationDelay: "0.58s" }}
          >
            {features.map(({ Icon, title, note }, i) => (
              <li
                key={title}
                className={`flex flex-col items-center gap-2 px-1.5 text-center sm:flex-row sm:items-center sm:gap-2.5 sm:px-2 sm:text-left ${i > 0 ? "border-l border-white/[0.09] sm:pl-5" : "sm:pr-5"
                  } ${i === 1 ? "sm:px-5" : ""}`}
              >
                <Icon className="h-[1.1rem] w-[1.1rem] shrink-0 text-accent/75" />
                <div className="min-w-0">
                  <p className="text-[0.76rem] font-medium leading-tight text-fg/90 sm:text-[0.82rem]">
                    {title}
                  </p>
                  <p className="mt-0.5 text-[0.68rem] leading-tight text-muted/75 sm:text-[0.73rem]">
                    {note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll cue — mobile only */}
      <Link
        href="#signatures"
        aria-label="Scroll to next section"
        className="relative z-10 mx-auto mb-3 flex h-9 w-9 items-center justify-center text-fg-soft/70 lg:hidden"
      >
        <ChevronDownIcon className="nudge h-6 w-6" />
      </Link>
    </section>
  );
}
