import Link from "next/link";
import { site } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Closing invitation on the home page: a cobalt band, the line on the left
 * and directions on the right.
 */
export default function VisitBand() {
  return (
    <section className="tone-cobalt bg-surface py-16 sm:py-20">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Reveal>
          <p className="eyebrow text-fg/80">Ready for a Great Evening?</p>
          <h2 className="headline mt-4 text-[2.4rem] text-fg sm:text-[3.2rem]">
            Visit Us at the Lakeside
          </h2>
          <p className="mt-3 text-muted">
            Good food, refreshing drinks and a better view. Come say hi at
            Icelib &amp; Co.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-outline group h-11 shrink-0"
          >
            Get Directions
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
