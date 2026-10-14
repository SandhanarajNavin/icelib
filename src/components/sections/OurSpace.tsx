import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

/*
  ink-950 as channels, for the desktop scrim's stops.
*/
const INK = "4, 18, 41";

/**
 * Full-bleed photograph of the container on the waterfront at sunset, the
 * copy set on the right over a scrim that darkens toward that side only, so
 * the lit sign and counter in the middle of the frame stay bright.
 *
 * The banner holds a fixed shape per screen: 4:5 on phones (a crop of the
 * centre — the sign and counter — with the copy low over a scrim), 16:9 on
 * tablets, and 21:9 on desktop, the photograph's own ratio, capped at 80% of
 * the viewport height. If the copy ever needs more room, the box grows.
 *
 * Desktop sets that height directly rather than with aspect-ratio plus a
 * max-height: a capped aspect-ratio box also narrows its width to keep the
 * ratio, which left the banner short of full bleed on shorter screens.
 */
export default function OurSpace() {
  return (
    <section className="tone-scrim relative flex aspect-[4/5] w-full items-end overflow-hidden bg-ink-950 sm:aspect-video md:items-center lg:aspect-auto lg:h-[min(42.857vw,80svh)] lg:min-h-[30rem]">
      <Image
        src="/images/waterfront-sunset.jpg"
        alt="The blue Icelib & Co container on the lakeside promenade at sunset, string lights over its rooftop deck and the glass counter glowing"
        fill
        quality={90}
        sizes="100vw"
        className="object-cover object-[52%_center]"
      />
      {/* Phones and tablets: the copy sits low, so darken from the base up. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/55 to-ink-950/5 md:hidden"
      />
      {/* Wider: darken the right-hand third only, where the copy is. */}
      <div
        aria-hidden
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `linear-gradient(to left, rgba(${INK},0.9) 0%, rgba(${INK},0.75) 24%, rgba(${INK},0.3) 36%, rgba(${INK},0) 45%)`,
        }}
      />

      <div className="container-x relative z-10 flex justify-end py-16">
        {/* Narrow enough to stay in the right third, clear of the sign. */}
        <Reveal className="max-w-md md:max-w-sm">
          <p className="eyebrow text-fg/80">Our Space</p>
          <h2 className="headline mt-4 text-[2.6rem] text-fg sm:text-[3rem]">
            Good Food Brings People Together.
          </h2>
          <p className="mt-5 leading-relaxed text-muted">
            A beautiful lakeside space where great food, refreshing drinks and
            unforgettable evenings come together.
          </p>
          <Link href="/gallery" className="btn-pill btn-outline group mt-8 h-11">
            View Gallery
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
