import Image from "next/image";
import Link from "next/link";
import SplitWords from "@/components/ui/SplitWords";
import { navLinks, orderUrl, site, socials } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="tone-deep border-t border-line bg-surface">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="relative h-[3.4rem] w-[173px]">
              <Image
                src="/images/logo-wordmark.png"
                alt={`${site.name}, ${site.tagline}`}
                fill
                sizes="173px"
                className="object-contain object-left"
              />
            </div>
            <SplitWords
              text={site.description}
              className="mt-5 max-w-xs text-sm leading-relaxed text-muted/85"
            />
            <Link
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-solid mt-7 h-11"
            >
              Order Now
            </Link>
          </div>

          <div>
            <h3 className="eyebrow text-muted/70">Explore</h3>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-soft/85 transition hover:text-fg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-muted/70">Find Us</h3>
            <address className="mt-5 space-y-2.5 text-sm not-italic text-fg-soft/85">
              <p className="leading-relaxed">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <p>
                <Link
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="transition hover:text-fg"
                >
                  {site.phone}
                </Link>
              </p>
              <p>
                <Link
                  href={`mailto:${site.email}`}
                  className="transition hover:text-fg"
                >
                  {site.email}
                </Link>
              </p>
            </address>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-fg-soft/85 transition hover:text-fg"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          {/* The signature line, in the display serif's italic cut. */}
          <p className="accent-script text-2xl">{site.tagline}</p>
          <p className="text-xs text-muted/70">
            &copy; {year} {site.name}. All rights reserved. Made in {site.city},
            by the lake.
          </p>
        </div>
      </div>
    </footer>
  );
}
