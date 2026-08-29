"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type DepthCarouselProps = {
  items: { key: string; node: ReactNode }[];
  /** Accessible name for the scroll region. */
  label: string;
};

/** Pixels per second. Slow enough to read a card as it passes. */
const SPEED = 38;

/** Copies of the set laid end to end, so a wrap is never visible. */
const COPIES = 3;

/**
 * Horizontal carousel that gives cards depth: the one nearest the centre sits
 * forward at full scale and opacity, its neighbours fall back and dim, and a
 * slight Y-rotation angles them away from the viewer.
 *
 * Scrolls continuously rather than card by card — there is no dwell between
 * steps. The set is repeated and the scroll position wraps by exactly one
 * set-width, so the loop is seamless and never rewinds. Motion stops on
 * hover, on focus, and while a pointer is down.
 */
export default function DepthCarousel({ items, label }: DepthCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);
  const setWidth = useRef(0);
  const held = useRef(false);
  /*
   * Scroll offset is tracked as a float here. Reading it back from the
   * element loses the fraction — browsers round scrollLeft — which would turn
   * any sub-pixel step into a full 1px per frame, making the speed track the
   * refresh rate instead of the clock.
   */
  const offset = useRef(0);

  const [onScreen, setOnScreen] = useState(false);

  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackCentre = track.scrollLeft + track.clientWidth / 2;

    for (const card of cardsRef.current) {
      if (!card) continue;
      const cardCentre = card.offsetLeft + card.offsetWidth / 2;

      // Distance from centre, normalised to card widths.
      const d = (cardCentre - trackCentre) / card.offsetWidth;
      const dist = Math.min(Math.abs(d), 1.6);

      const scale = 1 - dist * 0.11;
      const opacity = 1 - dist * 0.42;
      const rotate = Math.max(-14, Math.min(14, -d * 9));
      const lift = dist * 14;

      card.style.transform = `perspective(1100px) rotateY(${rotate}deg) scale(${scale}) translateY(${lift}px)`;
      card.style.opacity = String(Math.max(0.32, opacity));
      // Kept low and scoped by `isolate` on the root, so a lifted card can
      // never paint over the fixed navbar.
      card.style.zIndex = String(20 - Math.round(dist * 10));
    }
  }, []);

  // One set-width is the gap between a card and its first repeat.
  const measure = useCallback(() => {
    const first = cardsRef.current[0];
    const repeat = cardsRef.current[items.length];
    if (first && repeat) setWidth.current = repeat.offsetLeft - first.offsetLeft;
    paint();
  }, [items.length, paint]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Only animate while the carousel is actually on screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const io = new IntersectionObserver(
      ([e]) => setOnScreen(e.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;

    const tick = (t: number) => {
      const track = trackRef.current;
      const dt = last ? t - last : 0;
      last = t;

      if (track && !held.current) {
        offset.current += (SPEED * dt) / 1000;
        // Wrap by exactly one set, which lands on an identical frame.
        if (setWidth.current > 0 && offset.current >= setWidth.current) {
          offset.current -= setWidth.current;
        }
        track.scrollLeft = offset.current;
      }

      paint();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onScreen, paint]);

  // Adopt the reader's position if they scroll the track themselves.
  const syncFromUser = () => {
    const track = trackRef.current;
    if (!track) return;
    if (Math.abs(track.scrollLeft - offset.current) > 2) {
      offset.current = track.scrollLeft;
    }
    paint();
  };

  const hold = () => {
    held.current = true;
  };
  const release = () => {
    held.current = false;
  };

  // The set repeated; only the first pass is exposed to assistive tech.
  const reel = Array.from({ length: COPIES }, (_, copy) =>
    items.map((item) => ({ ...item, copy }))
  ).flat();

  return (
    <div className="relative isolate">
      <ul
        ref={trackRef}
        onScroll={syncFromUser}
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={release}
        onPointerDown={hold}
        onPointerUp={release}
        onPointerCancel={release}
        aria-label={label}
        tabIndex={0}
        className="depth-track flex gap-6 overflow-x-auto px-[calc(50%-9rem)] py-6 sm:px-[calc(50%-11rem)] lg:px-[calc(50%-13rem)]"
      >
        {reel.map((item, i) => (
          <li
            key={`${item.key}-${item.copy}`}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            aria-hidden={item.copy > 0}
            className="w-72 shrink-0 will-change-transform sm:w-88 lg:w-104"
          >
            {item.node}
          </li>
        ))}
      </ul>
    </div>
  );
}
