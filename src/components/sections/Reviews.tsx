"use client";

import { useEffect, useRef, useState } from "react";
import { reviews as realReviews, sampleReviews, type Review } from "@/content/reviews";
import Reveal from "@/components/ui/Reveal";
import { StarIcon } from "@/components/ui/icons";

/*
  Real reviews when there are any. While the list is empty, sample reviews
  stand in during development only, so the layout can be previewed; a
  production build never includes them and the section stays hidden.
*/
const usingSamples = realReviews.length === 0 && process.env.NODE_ENV === "development";
const reviews = usingSamples ? sampleReviews : realReviews;

/* Drift speed, and how long a dot's jump takes. */
const PX_PER_SECOND = 45;
const JUMP_MS = 700;

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

function Card({ review }: { review: Review }) {
  return (
    <figure className="flex h-full w-[19rem] flex-col rounded-card bg-card p-7 shadow-[0_10px_28px_-20px_rgba(16,32,58,0.25)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-22px_rgba(16,32,58,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-[23rem]">
      {review.rating && (
        <div className="flex gap-1 text-brand" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, s) => (
            <StarIcon
              key={s}
              className={`h-4 w-4 ${s < review.rating! ? "" : "opacity-20"}`}
            />
          ))}
        </div>
      )}
      <blockquote className="mt-5 flex-1 font-display text-[1.3rem] leading-snug text-fg">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-semibold text-fg">{review.name}</span>
        {review.source && <span className="text-muted"> · via {review.source}</span>}
      </figcaption>
    </figure>
  );
}

/**
 * What our guests say — reviews drifting past in an endless loop.
 *
 * The list is rendered twice side by side and the strip's offset wraps at the
 * width of one copy, so the loop is seamless. It is driven per frame rather
 * than by a CSS animation so the dots can follow along: the dot for the card
 * at the left edge is lit, and tapping a dot glides the strip to that card
 * before the drift carries on.
 *
 * Hovering stops the drift, and the card under the pointer lifts with a
 * slightly deeper shadow. Pressing and holding on touch screens stops it too.
 * It only moves while on screen in a visible tab, and with reduced motion
 * requested it stays still — the dots then jump straight to a card.
 */
export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const offset = useRef(0); // px the strip has moved left, within one copy
  const hovered = useRef(false);
  const pressed = useRef(false);
  const onScreen = useRef(false);
  const reduced = useRef(false);
  const jump = useRef<{ from: number; to: number; start: number } | null>(null);

  // Width of one card plus its gap, and of one full copy of the list.
  const measure = () => {
    const track = trackRef.current;
    const first = track?.querySelector("li");
    const copy = track?.firstElementChild as HTMLElement | null;
    if (!first || !copy) return { step: 1, loop: 1 };
    const gap = parseFloat(getComputedStyle(first).marginRight) || 0;
    return { step: first.offsetWidth + gap, loop: copy.offsetWidth };
  };

  const paint = () => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
    const { step } = measure();
    setActive(Math.round(offset.current / step) % reviews.length);
  };

  useEffect(() => {
    if (reviews.length === 0) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
    });
    if (trackRef.current) io.observe(trackRef.current);

    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000; // ignore long gaps (tab switches)
      last = now;
      const { loop } = measure();

      if (jump.current) {
        const t = Math.min((now - jump.current.start) / JUMP_MS, 1);
        offset.current = jump.current.from + (jump.current.to - jump.current.from) * easeInOut(t);
        if (t === 1) jump.current = null;
      } else if (
        !reduced.current &&
        !hovered.current &&
        !pressed.current &&
        onScreen.current &&
        !document.hidden
      ) {
        offset.current += PX_PER_SECOND * dt;
      }

      offset.current = ((offset.current % loop) + loop) % loop;
      paint();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  /* Glide forward (never backward, so it keeps reading left to right) to card i. */
  const goTo = (i: number) => {
    const { step, loop } = measure();
    let to = i * step;
    if (to < offset.current) to += loop;
    if (reduced.current) {
      offset.current = to % loop;
      paint();
      return;
    }
    jump.current = { from: offset.current, to, start: performance.now() };
  };

  if (reviews.length === 0) return null;

  return (
    <section
      id="reviews"
      aria-label="Guest reviews"
      className="tone-cream border-t border-line bg-surface py-20 sm:py-24"
    >
      <div className="container-x">
        <Reveal>
          <p className="eyebrow text-muted">Reviews</p>
          <h2 className="headline mt-4 text-[2.4rem] text-fg sm:text-[3rem]">
            What Our Guests Say
          </h2>
        </Reveal>
      </div>

      <div
        className="marquee mt-10 overflow-hidden py-4"
        onMouseEnter={() => (hovered.current = true)}
        onMouseLeave={() => (hovered.current = false)}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") pressed.current = true;
        }}
        onPointerUp={() => (pressed.current = false)}
        onPointerCancel={() => (pressed.current = false)}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {[0, 1].map((copy) => (
            // The second copy only exists to close the loop; hide it from
            // screen readers so each review is announced once.
            <ul
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="flex shrink-0 items-stretch"
            >
              {reviews.map((review, i) => (
                <li key={`${copy}-${i}`} className="mr-5 list-none">
                  <Card review={review} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Dots: one per review, the one at the left edge widened */}
      {reviews.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show review ${i + 1} of ${reviews.length}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-brand" : "w-2 bg-brand/25 hover:bg-brand/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
