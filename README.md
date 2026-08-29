# Icelib & Co — Drinks & Eatery

Marketing site for Icelib & Co, a lakeside container café in Coimbatore.

Built with **Next.js 15** (App Router), **React 19**, **TypeScript** and **Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Structure

```
src/
  app/          layout, page, global styles + design tokens
  components/
    layout/     Navbar, Footer
    sections/   Hero, About, Menu, Signatures, Ambiance, Visit
    ui/         Section, Reveal, MaskReveal, SplitWords, Typewriter,
                DepthCarousel, CircularGallery, icons
  content/      site.ts, menu.ts, gallery.ts  ← copy and data live here
  hooks/        useInView, useScrolled, useActiveSection
public/images/  photography and logo
```

**Content is data, not markup.** Menu items, hours, address and gallery
captions are plain exported objects in `src/content/`. Changing a price or a
caption is a one-line edit there — no component needs touching.

Section order lives only in `src/app/page.tsx`.

## Design tokens

Defined once as CSS custom properties in `src/app/globals.css` under `@theme`
(Tailwind v4 is CSS-first — there is no `tailwind.config.js`).

| Token | Value | |
|---|---|---|
| `ink-900` | `#07111f` | primary background |
| `ink-800` | `#0b1726` | secondary background |
| `ink-700` | `#102238` | card / surface |
| `accent` | `#d6a84f` | champagne gold |
| `fg` | `#f7f3ea` | warm ivory |
| `muted` | `#aab5c3` | soft blue-grey |

## Motion

Scroll-triggered animations re-arm, so they replay each time an element
returns to view. Everything collapses to a static render under
`prefers-reduced-motion`.

- Hero — looping typewriter on the supporting line
- Headings — masked line reveal; body copy staggers in word by word
  (centre-out where the text is centred)
- Must-Try — continuously scrolling depth carousel, pauses on hover
- Gallery — 3D ring pinned in view, turned by scroll position

## Before going live

- `src/content/menu.ts` — prices are **placeholders**
- `src/content/site.ts` — phone, email and address are **placeholders**
- `src/app/layout.tsx` — `metadataBase` points at `https://icelibandco.in`
