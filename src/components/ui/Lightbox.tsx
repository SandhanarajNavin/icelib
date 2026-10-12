"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { GalleryImage } from "@/content/gallery";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";

type LightboxProps = {
  images: GalleryImage[];
  /** The photo on screen, or null when closed. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

/* Horizontal travel, in px, that counts as a swipe rather than a tap. */
const SWIPE = 50;

/**
 * Full-screen photo viewer.
 *
 * Built on the native <dialog>: shown modally it sits in the top layer, traps
 * focus, closes on Escape and hands focus back to the tile that opened it —
 * none of which needs reimplementing here. Arrows, arrow keys and a swipe
 * step through the set, wrapping at either end.
 */
export default function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeX = useRef<number | null>(null);
  const open = index !== null;
  const count = images.length;

  const step = (by: number) => {
    if (index === null) return;
    onIndexChange((index + by + count) % count);
  };

  // Mirror `index` onto the dialog, and keep the page behind it still.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // However it closes (Escape, the button, the backdrop), report it once.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onDialogClose = () => {
      document.documentElement.style.overflow = "";
      onClose();
    };
    dialog.addEventListener("close", onDialogClose);
    return () => dialog.removeEventListener("close", onDialogClose);
  }, [onClose]);

  const current = index ?? 0;
  // The photo on screen plus its neighbours, so stepping never waits on a load.
  const mounted = open
    ? Array.from(new Set([current, (current + 1) % count, (current - 1 + count) % count]))
    : [];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photo viewer"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        else if (e.key === "ArrowLeft") step(-1);
      }}
      // A click on the dialog itself (not the photo or controls) is the backdrop.
      onClick={(e) => {
        if (e.target === e.currentTarget) dialogRef.current?.close();
      }}
      onPointerDown={(e) => {
        swipeX.current = e.pointerType === "mouse" ? null : e.clientX;
      }}
      onPointerUp={(e) => {
        if (swipeX.current === null) return;
        const dx = e.clientX - swipeX.current;
        swipeX.current = null;
        if (Math.abs(dx) > SWIPE) step(dx < 0 ? 1 : -1);
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white backdrop:bg-black/90 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="pointer-events-none flex h-full flex-col">
          {/* Top bar: position in the set, and a way out */}
          <div className="pointer-events-auto flex items-center justify-between px-4 py-4 sm:px-6">
            <p className="text-sm tabular-nums text-white/70" aria-live="polite">
              {current + 1} / {count}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              autoFocus
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Photo, with the arrows either side of it */}
          <div className="relative min-h-0 flex-1">
            {mounted.map((i) => (
              <Image
                key={images[i].src}
                src={images[i].src}
                alt={i === current ? images[i].alt : ""}
                aria-hidden={i !== current}
                fill
                sizes="100vw"
                quality={90}
                className={`pointer-events-auto select-none object-contain px-4 transition-opacity duration-300 sm:px-24 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
              />
            ))}

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="pointer-events-auto absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="pointer-events-auto absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Caption */}
          <p className="px-6 pb-6 pt-4 text-center text-sm text-white/85 sm:text-base">
            {images[current].caption}
          </p>
        </div>
      )}
    </dialog>
  );
}
