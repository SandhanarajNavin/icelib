"use client";

import { useEffect, useRef } from "react";

type LoopVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * A muted, looping clip that behaves like a moving photograph.
 *
 * It downloads as it approaches the viewport, waits on its first frame until
 * it reaches the middle of the screen, and only then starts playing — so the
 * visitor sees it begin. It pauses once it scrolls fully out of view, and
 * resumes the next time it crosses the middle. With reduced motion requested
 * it stays on its poster frame.
 */
export default function LoopVideo({ src, poster, className = "" }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Approaching: fetch it, so it is ready by the time it reaches the middle.
    const load = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !video.src) {
          video.preload = "auto";
          video.src = src;
        }
      },
      { rootMargin: "400px 0px" },
    );

    // Crossing a thin band through the middle of the screen: play.
    const centre = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play().catch(() => {});
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    // Fully off screen: pause.
    const away = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });

    load.observe(video);
    centre.observe(video);
    away.observe(video);
    return () => {
      load.disconnect();
      centre.disconnect();
      away.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      disablePictureInPicture
      className={className}
    />
  );
}
