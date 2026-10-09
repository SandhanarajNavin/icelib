"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Typewriter from "@/components/ui/Typewriter";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";
import { orderUrl } from "@/content/site";

/*
  Scroll-scrubbed product film. The tall outer track gives the page room to
  scroll; the inner panel sticks to the viewport while the frame sequence is
  drawn to a canvas in step with the scroll position.
*/
const FRAME_COUNT = 300;
/*
  Web frames generated from the 4K masters in images/icelib_enhanced, already
  in play order: 001 is the exploded burger, 300 the assembled tray. Two
  widths — the canvas picks the smallest that still covers it sharply.
*/
const frameSrc = (width: number, i: number) =>
  `/images/hero-frames/${width}/${String(i + 1).padStart(3, "0")}.webp`;

/* The frames' own backdrop, so letterboxing on phones blends in. */
const BG = "#0b0c0e";

/* Scroll progress at which each caption takes over. */
const STAGES = [0, 0.14, 0.46, 0.8];

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/*
  Coarse frames first, then fill in: scrubbing early still shows something
  close to the right frame instead of stalling on the first one.
*/
function loadOrder(step: number) {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const stride of [32, 16, 8, 4, 2, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += Math.max(stride, step)) {
      if (!seen.has(i)) {
        seen.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

export default function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!track || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Phones get every other frame — half the download, still smooth.
    const step = window.innerWidth < 768 ? 2 : 1;
    // Full-HD frames once the canvas is wider than ~1300 device pixels.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth * dpr > 1300 ? 1920 : 1280;
    const frames: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
    let cancelled = false;

    // The last frame is the assembled tray, which is also the reduced-motion still.
    let target = reduced ? FRAME_COUNT - 1 : 0;
    let current = target;
    let drawn = -1;
    let dirty = true;
    let raf = 0;
    let visible = true;

    const nearestLoaded = (i: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (frames[i - d]) return i - d;
        if (frames[i + d]) return i + d;
      }
      return -1;
    };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        dirty = true;
      }
    };

    const draw = (i: number) => {
      const img = frames[i];
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const portrait = cw / ch < 1;
      // Cover on wide screens; on phones fit the width (slightly cropped) and
      // sit the tray in the upper half, leaving room for the copy below.
      const scale = portrait ? (cw / iw) * 1.3 : Math.max(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = portrait ? ch * 0.4 - h / 2 : (ch - h) / 2;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cw, ch);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, x, y, w, h);

      if (portrait) {
        // Feather the frame's top and bottom edges into the backdrop.
        const feather = h * 0.2;
        const top = ctx.createLinearGradient(0, y, 0, y + feather);
        top.addColorStop(0, BG);
        top.addColorStop(1, "rgba(11,12,14,0)");
        ctx.fillStyle = top;
        ctx.fillRect(0, y - 1, cw, feather + 1);
        const bottom = ctx.createLinearGradient(0, y + h - feather, 0, y + h);
        bottom.addColorStop(0, "rgba(11,12,14,0)");
        bottom.addColorStop(1, BG);
        ctx.fillStyle = bottom;
        ctx.fillRect(0, y + h - feather, cw, feather + 1);
      }
      drawn = i;
      dirty = false;
    };

    const readScroll = () => {
      if (reduced) return;
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total) : 0;
      target = p * (FRAME_COUNT - 1);

      // Direct style writes: these change every frame, so keep them out of React.
      if (scrimRef.current) scrimRef.current.style.opacity = String(1 - clamp(p / STAGES[1]));
      if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;

      let s = 0;
      STAGES.forEach((t, i) => {
        if (p >= t) s = i;
      });
      setStage(s); // bails out when unchanged
    };

    const tick = () => {
      raf = 0;
      if (!visible) return;
      size();
      // Ease toward the scroll position so fast flicks still play as motion.
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.05) current = target;
      const want = nearestLoaded(Math.round(current));
      if (want !== -1 && (want !== drawn || dirty)) draw(want);
      if (current !== target || dirty) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      readScroll();
      kick();
    };
    const onResize = () => {
      dirty = true;
      onScroll();
    };

    // Load: the frame we need right now first, then the rest progressively.
    const first = Math.round(target);
    const order = reduced ? [first] : [first, ...loadOrder(step).filter((i) => i !== first)];
    let next = 0;
    const loadNext = () => {
      if (cancelled || next >= order.length) return;
      const i = order[next++];
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(width, i);
      img.onload = () => {
        if (cancelled) return;
        frames[i] = img;
        // A closer frame than the one on screen just arrived.
        if (Math.abs(i - current) < Math.abs(drawn - current) || drawn === -1) dirty = true;
        kick();
        loadNext();
      };
      img.onerror = loadNext;
    };
    // A handful of parallel requests keeps the pipe full without flooding it.
    for (let k = 0; k < 6; k++) loadNext();

    // Pause drawing while the section is off screen.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(track);

    readScroll();
    current = target;
    kick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Shared fade for captions: only the active one is visible and focusable. */
  const fade = (i: number) =>
    `transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
      stage === i ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-6"
    }`;

  return (
    <section
      ref={trackRef}
      id="home"
      aria-label="Icelib and Co"
      className="frames-track tone-scrim relative"
      style={{ backgroundColor: BG }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full"
        />

        {/* Intro dimmer — lifts as the film starts to play */}
        <div
          ref={scrimRef}
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(11,12,14,0.62)" }}
        />

        {/* Base settle, so captions always have something dark beneath them */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(11,12,14,0.92) 0%, rgba(11,12,14,0.55) 22%, rgba(11,12,14,0) 48%)",
          }}
        />

        {/* 0 — Intro headline, centred over the dimmed opening frame */}
        <div
          inert={stage !== 0}
          className={`${fade(0)} absolute inset-0 flex items-end justify-center pb-24 sm:items-center sm:pb-0`}
        >
          <div className="container-x flex flex-col items-center text-center">
            <h1
              className="display rise text-[3rem] text-fg sm:text-[4.5rem] lg:text-[5.5rem]"
              style={{ animationDelay: "0.1s" }}
            >
              Sip. Bite.{" "}
              <span className="relative inline-block">
                <span className="accent-script">Laugh.</span>
                {/* Hand-drawn stroke, echoing the swoosh in the logo */}
                <svg
                  aria-hidden
                  viewBox="0 0 260 12"
                  preserveAspectRatio="none"
                  fill="none"
                  className="absolute inset-x-0 -bottom-1.5 h-[0.3em] w-full text-accent/85 lg:-bottom-2"
                >
                  <path
                    d="M3 9C46 4 132 2 257 5.4"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="draw-stroke"
                  />
                </svg>
              </span>{" "}
              Repeat.
            </h1>
            <p
              className="rise mt-6 whitespace-nowrap text-[1.02rem] font-medium leading-none tracking-[0.01em] text-accent-soft/90 sm:text-[1.15rem]"
              style={{ animationDelay: "0.24s" }}
            >
              <Typewriter
                text="Late nights. Warm lights. Good company."
                startDelay={800}
                loop
              />
            </p>
            <div
              className="rise mt-9 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row sm:gap-4"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                href="/menu"
                className="btn-pill btn-solid group focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft"
              >
                Explore the Menu
                <ArrowRightIcon className="h-[1.05rem] w-[1.05rem] transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="btn-pill btn-outline backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft"
              >
                Find Us
              </Link>
            </div>
          </div>
        </div>

        {/* 1, 2 — Captions over the film */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-12 sm:pb-16">
          <div className="container-x relative">
            <div
              inert={stage !== 1}
              className={`${fade(1)} absolute bottom-0 max-w-md`}
            >
              <p className="eyebrow text-accent">Built in layers</p>
              <h2 className="display mt-3 text-[2.25rem] text-fg sm:text-[3.25rem]">
                Stacked high, <span className="accent-script">sauced</span> right.
              </h2>
            </div>

            <div
              inert={stage !== 2}
              className={`${fade(2)} absolute bottom-0 max-w-md`}
            >
              <p className="eyebrow text-accent">Ice cold</p>
              <h2 className="display mt-3 text-[2.25rem] text-fg sm:text-[3.25rem]">
                Mint, lime and a <span className="accent-script">lot</span> of ice.
              </h2>
            </div>

            {/* 3 — The tray lands: close on the call to action */}
            <div
              inert={stage !== 3}
              className={`${fade(3)} ${stage === 3 ? "pointer-events-auto" : ""} relative max-w-md`}
            >
              <p className="eyebrow text-accent">Your tray is ready</p>
              <h2 className="display mt-3 text-[2.25rem] text-fg sm:text-[3.25rem]">
                Pull up a <span className="accent-script">chair.</span>
              </h2>
              <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:gap-4">
                <Link
                  href="/menu"
                  className="btn-pill btn-solid group focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft"
                >
                  See the Menu
                  <ArrowRightIcon className="h-[1.05rem] w-[1.05rem] transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-outline backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-soft"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll progress — a hairline down the right edge */}
        <div
          aria-hidden
          className="absolute right-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-white/15 sm:block lg:right-10"
        >
          <div ref={barRef} className="h-full w-full origin-top scale-y-0 bg-white/80" />
        </div>

        {/* Scroll cue, only while the intro is up */}
        <div
          aria-hidden
          className={`absolute inset-x-0 bottom-5 flex flex-col items-center gap-1 text-fg-soft/70 transition-opacity duration-500 ${
            stage === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="eyebrow hidden text-[0.6rem] sm:block">Scroll</span>
          <ChevronDownIcon className="nudge h-5 w-5" />
        </div>
      </div>
    </section>
  );
}
