"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/content/gallery";

type CircularGalleryProps = {
  images: GalleryImage[];
};

/** Viewport-heights of scroll allotted to each step of the turn. */
const VH_PER_STEP = 38;

/**
 * A ring of photographs standing in 3D space, turned by the page scroll.
 *
 * The section is taller than the viewport and the ring is sticky inside it,
 * so once the ring settles into view the page holds it there: scrolling turns
 * the ring rather than moving past it, and the page only continues once the
 * last photograph has come to the front.
 *
 * Radius is derived from panel width and count so the ring closes exactly at
 * every breakpoint.
 */
export default function CircularGallery({ images }: CircularGalleryProps) {
  const count = images.length;
  const step = 360 / count;

  const wrapRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const [progress, setProgress] = useState(0);
  const [panel, setPanel] = useState({ w: 320, h: 410 });

  // Panel size follows the viewport; the ring radius follows the panel.
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      if (vw < 640) setPanel({ w: 216, h: 288 });
      else if (vw < 1024) setPanel({ w: 264, h: 344 });
      else setPanel({ w: 320, h: 410 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Close the ring: half-width over tan(half the angular step).
  const radius = Math.round(
    panel.w / 2 / Math.tan(Math.PI / count) + panel.w * 0.18
  );

  const measureProgress = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    // How far the sticky child can travel inside the tall wrapper.
    const range = rect.height - window.innerHeight;
    if (range <= 0) {
      setProgress(0);
      return;
    }

    // 0 while the ring is settling in; 1 once the last photo is at the front.
    setProgress(Math.min(1, Math.max(0, -rect.top / range)));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measureProgress);
    };

    measureProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame.current);
    };
  }, [measureProgress]);

  // Continuous position around the ring, 0 → count-1 across the pinned scroll.
  const pos = progress * (count - 1);
  const activeIndex = Math.min(count - 1, Math.max(0, Math.round(pos)));

  return (
    <div
      ref={wrapRef}
      className="relative select-none"
      style={{ height: `calc(100svh + ${(count - 1) * VH_PER_STEP}vh)` }}
    >
      {/* pt clears the fixed navbar so the ring never runs under it. */}
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-8 pt-24 sm:pt-28">
        {/*
          The ring's side panels project past the container, so the scene is
          clipped by a wrapper. Keeping overflow off the perspective element
          itself avoids flattening the 3D transform. `isolate` scopes the
          panels' stacking so they cannot paint over the fixed navbar.
        */}
        <div className="isolate w-full overflow-hidden">
          <div
            className="ring-scene relative mx-auto"
            style={{
              height: panel.h,
              // Tie perspective to the ring's own size, or the 3D reads flat
              // at small radii (i.e. on phones).
              perspective: `${Math.round(radius * 3.2)}px`,
            }}
            role="group"
            aria-roledescription="carousel"
            aria-label="Gallery — turns as you scroll"
          >
            <div
              className="ring absolute left-1/2 top-1/2"
              style={{
                width: panel.w,
                height: panel.h,
                marginLeft: -panel.w / 2,
                marginTop: -panel.h / 2,
                // Driven straight from scroll — no CSS transition, or it
                // would lag a frame or two behind the wheel.
                transform: `translateZ(-${radius}px) rotateY(${-pos * step}deg)`,
              }}
            >
              {images.map((image, i) => {
                // Shortest distance from the front of the ring, in panels.
                let delta = (((i - pos) % count) + count) % count;
                if (delta > count / 2) delta -= count;
                const away = Math.abs(delta);
                const isActive = away < 0.5;

                return (
                  <figure
                    key={image.src}
                    aria-hidden={!isActive}
                    className="ring-item absolute inset-0 overflow-hidden rounded-card border border-line"
                    style={{
                      transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                      opacity: away > 2.2 ? 0 : 1 - away * 0.28,
                      filter: `brightness(${1 - away * 0.22}) saturate(${
                        1 - away * 0.2
                      })`,
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 20rem, (min-width: 640px) 17rem, 14rem"
                      className="object-cover"
                      draggable={false}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent"
                    />
                  </figure>
                );
              })}
            </div>
          </div>
        </div>

        {/* Caption + passive progress indicator */}
        <div className="flex flex-col items-center gap-5">
          <p
            className="text-center font-display text-lg text-fg"
            aria-live="polite"
          >
            {images[activeIndex].caption}
          </p>

          <div className="flex items-center gap-2" aria-hidden>
            {images.map((image, i) => (
              <span
                key={image.src}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-7 bg-accent" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
