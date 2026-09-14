"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, orderUrl, site } from "@/content/site";
import { useScrolled } from "@/hooks/useScrolled";

export default function Navbar() {
  const scrolled = useScrolled(40);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* Close the drawer on navigation — the bar persists across route changes. */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /*
    Only the home page puts a full-bleed photograph behind the bar. Everywhere
    else the bar sits on a light page header, so it needs its own surface from
    the very top rather than waiting for a scroll.
  */
  const overHero = pathname === "/" && !scrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    /*
      The bar stays blue rather than cream when it has a surface: the logo mark
      is white-on-transparent, so a light bar would swallow it. It takes the
      brand cobalt specifically, matching the hero and every page header — so
      the bar merges into whatever sits at the top of the page instead of
      banding across it.
    */
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        overHero
          ? "tone-scrim border-b border-transparent bg-transparent"
          : "tone-cobalt border-b border-line bg-brand/92 backdrop-blur-xl"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-x flex items-center justify-between gap-6 py-5 sm:py-7"
      >
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="relative block h-[2.6rem] w-[132px] shrink-0 transition-opacity hover:opacity-80 sm:h-[3rem] sm:w-[153px]"
        >
          <Image
            src="/images/logo-wordmark.png"
            alt={`${site.name}, ${site.tagline}`}
            fill
            priority
            sizes="153px"
            className="object-contain object-left"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1.5 text-[0.95rem] transition-colors ${
                    active
                      ? "font-semibold text-fg"
                      : "text-fg-soft/75 hover:text-fg"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-accent transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-outline hidden h-11 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft sm:inline-flex"
          >
            Order Now
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg text-fg transition hover:bg-fg/10 lg:hidden"
          >
            <span
              className={`h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="tone-cobalt border-t border-line bg-brand/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-lg px-3 py-3 text-base transition ${
                  isActive(link.href)
                    ? "bg-fg/10 font-semibold text-fg"
                    : "text-fg-soft/75 hover:bg-fg/10 hover:text-fg"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <Link
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-outline w-full"
            >
              Order Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
