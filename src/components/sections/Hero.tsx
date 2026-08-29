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

/* Solid channel values for the gradient stops; keep in sync with --color-ink-900. */
const INK = "7, 17, 31";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink-900 lg:block"
    >
      {/*
        The real storefront photograph, sharp and framed so the container,
        signage, bulbs and plants all stay in shot. Stacked above the copy on
        phones; anchored right on desktop.
      */}
      <div className="relative h-[52svh] w-full shrink-0 sm:h-[56svh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[64%]">
        <Image
          src="/images/shop.png"
          alt="The Icelib and Co container cafe lit up at night beneath strings of warm bulbs"
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover object-center"
        />

        {/* Mobile: fade the base of the photo into the copy below */}
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(${INK},0.68) 0%, rgba(${INK},0.04) 20%, rgba(${INK},0.38) 62%, rgb(${INK}) 100%)`,
          }}
        />

        {/*
          Desktop: a long graded wash off the left edge. It reaches full
          density only where the type sits, and dissolves well before the
          shopfront so the transition reads as light, not as a panel edge.
        */}
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: `linear-gradient(100deg, rgba(${INK},0.97) 0%, rgba(${INK},0.87) 11%, rgba(${INK},0.66) 27%, rgba(${INK},0.38) 44%, rgba(${INK},0.12) 62%, rgba(${INK},0) 79%)`,
          }}
        />
        {/* Vertical settle: keeps the navbar legible and grounds the base */}
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(${INK},0.6) 0%, rgba(${INK},0) 26%, rgba(${INK},0) 70%, rgba(${INK},0.55) 100%)`,
          }}
        />
      </div>

      {/* Copy */}
      <div className="container-x relative z-10 -mt-14 flex flex-1 flex-col justify-end pb-4 sm:pb-10 lg:mt-0 lg:min-h-svh lg:justify-center lg:pb-0 lg:pt-24">
        <div className="w-full lg:max-w-[52%] xl:max-w-[46%]">
          <h1
            className="rise font-display text-[2.6rem] font-extrabold leading-[1.1] tracking-tight text-fg sm:text-[3.4rem] lg:text-[4.3rem]"
            style={{ animationDelay: "0.1s" }}
          >
            Sip. Bite.
            <br />
            <span className="relative mr-2.5 inline-block sm:mr-3.5">
              {/*
                Caveat runs small for its point size, so it is scaled up — but
                only enough to sit level with the sans, not to outweigh it.
              */}
              <span
                className="accent-script"
                style={{ fontSize: "1.04em", lineHeight: 0.9 }}
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
              href="#menu"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-accent px-7 py-4 text-[0.95rem] font-semibold text-ink-950 transition hover:bg-accent-bright hover:shadow-[0_12px_38px_-12px] hover:shadow-accent focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft sm:py-3.5"
            >
              Explore the Menu
              <ArrowRightIcon className="h-[1.05rem] w-[1.05rem] transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#visit"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-accent/35 bg-ink-950/30 px-7 py-4 text-[0.95rem] font-semibold text-fg-soft backdrop-blur-sm transition hover:border-accent/70 hover:bg-accent/10 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft sm:py-3.5"
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
        href="#story"
        aria-label="Scroll to next section"
        className="relative z-10 mx-auto mb-3 flex h-9 w-9 items-center justify-center text-fg-soft/70 lg:hidden"
      >
        <ChevronDownIcon className="nudge h-6 w-6" />
      </Link>
    </section>
  );
}
