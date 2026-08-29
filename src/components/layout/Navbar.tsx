"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { navLinks, site } from "@/content/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  const ids = useMemo(() => navLinks.map((l) => l.href.slice(1)), []);
  const active = useActiveSection(ids);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-ink-900/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-x flex items-center justify-between gap-6 py-4 sm:py-5"
      >
        <Link
          href="#home"
          onClick={() => setOpen(false)}
          aria-label={`${site.name} — home`}
          className="relative block h-[3.75rem] w-[101px] shrink-0 transition-opacity hover:opacity-80 sm:h-[4.375rem] sm:w-[118px]"
        >
          <Image
            src="/images/logo-mark.png"
            alt={`${site.name}, ${site.tagline}`}
            fill
            priority
            sizes="118px"
            className="object-contain object-left"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-1.5 text-[0.95rem] transition-colors ${
                    isActive
                      ? "font-semibold text-fg"
                      : "text-fg-soft/75 hover:text-fg"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="#menu"
            className="hidden rounded-full border border-accent px-6 py-2.5 text-[0.9rem] font-semibold text-fg transition hover:bg-accent hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft sm:inline-flex"
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
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg text-fg transition hover:bg-white/5 lg:hidden"
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
        className="border-t border-white/10 bg-ink-900/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-3 text-base transition ${
                  active === link.href.slice(1)
                    ? "bg-accent/10 font-semibold text-fg"
                    : "text-fg-soft/75 hover:bg-white/5 hover:text-fg"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2">
            <Link
              href="#menu"
              onClick={() => setOpen(false)}
              className="block rounded-xl border border-accent px-3 py-3 text-center text-base font-semibold text-fg transition hover:bg-accent hover:text-ink-950"
            >
              Order Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
