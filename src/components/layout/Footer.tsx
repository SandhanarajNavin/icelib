import Image from "next/image";
import Link from "next/link";
import SplitWords from "@/components/ui/SplitWords";
import { navLinks, site, socials } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-fg-soft/10 bg-ink-950">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="relative h-20 w-[135px]">
              <Image
                src="/images/logo-mark.png"
                alt={`${site.name}, ${site.tagline}`}
                fill
                sizes="135px"
                className="object-contain object-left"
              />
            </div>
            <SplitWords
              text={site.description}
              className="mt-5 max-w-xs text-sm leading-relaxed text-muted/60"
            />
          </div>

          <div>
            <h3 className="eyebrow text-muted/50">Explore</h3>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fg-soft/75 transition hover:text-accent-soft"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-muted/50">Order &amp; Follow</h3>
            <ul className="mt-5 space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-fg-soft/75 transition hover:text-accent-soft"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-fg-soft/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted/45">
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted/45">
            Made in {site.city}, by the lake.
          </p>
        </div>
      </div>
    </footer>
  );
}
