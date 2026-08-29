import Image from "next/image";
import Link from "next/link";
import { hours, site } from "@/content/site";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Visit() {
  return (
    <Section
      id="visit"
      eyebrow="Visit Us"
      title={
        <>
          Find the blue container,
          <span className="accent-script"> follow the lights</span>.
        </>
      }
      intro="Walk-ins welcome all evening. For groups of six or more, call ahead and we'll hold the deck tables."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="space-y-10">
            <div>
              <h3 className="eyebrow text-muted/55">Address</h3>
              <p className="mt-3 font-display text-2xl leading-snug text-fg">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <Link
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-accent-soft transition hover:text-accent"
              >
                Open in Google Maps
                <span aria-hidden>&#8599;</span>
              </Link>
            </div>

            <div>
              <h3 className="eyebrow text-muted/55">Hours</h3>
              <dl className="mt-4 space-y-3">
                {hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-fg-soft/10 pb-3"
                  >
                    <dt className="text-fg-soft/85">{h.days}</dt>
                    <dd className="text-sm tabular-nums text-muted/65">
                      {h.time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-wrap gap-10">
              <div>
                <h3 className="eyebrow text-muted/55">Call</h3>
                <Link
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="mt-2.5 block text-lg text-fg transition hover:text-accent-soft"
                >
                  {site.phone}
                </Link>
              </div>
              <div>
                <h3 className="eyebrow text-muted/55">Email</h3>
                <Link
                  href={`mailto:${site.email}`}
                  className="mt-2.5 block text-lg text-fg transition hover:text-accent-soft"
                >
                  {site.email}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative h-full min-h-[26rem] overflow-hidden rounded-2xl border border-fg-soft/10">
            <Image
              src="/images/lakeside.jpg"
              alt="Glass-topped tables on the wooden deck with the lake and city skyline beyond"
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="font-display text-xl text-fg">
                Parking on Race Course Road
              </p>
              <p className="mt-1.5 text-sm text-muted/70">
                Two minutes on foot from the walkway entrance.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
