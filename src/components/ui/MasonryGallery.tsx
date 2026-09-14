import Image from "next/image";
import type { GalleryImage } from "@/content/gallery";
import Reveal from "./Reveal";

type MasonryGalleryProps = {
  images: GalleryImage[];
};

/**
 * Tile shapes, cycled across the images. Mixing three ratios is what gives the
 * grid its ragged edge — the same rhythm the gallery has in the design file.
 * Written out as whole class names so Tailwind can see them.
 */
const ASPECTS = [
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[1/1]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-[1/1]",
];

/**
 * A masonry grid of photographs.
 *
 * Laid out with CSS multi-column rather than a row-span grid: columns balance
 * their own heights, so mixed tile shapes pack flush instead of leaving a hole
 * wherever the spans fail to divide evenly.
 *
 * The motion is deliberately quiet — each tile fades and lifts as it comes
 * into view, a beat after the one before it, and the photograph inside eases
 * into a slow zoom on hover. All CSS transition: no scroll hijacking, no
 * transform maths, nothing that fights the page.
 */
export default function MasonryGallery({ images }: MasonryGalleryProps) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
      {images.map((image, i) => (
        <Reveal
          key={image.src}
          /* Stagger caps out so a long gallery never crawls in. */
          delay={Math.min(i, 5) * 0.09}
          className="group relative mb-4 break-inside-avoid overflow-hidden rounded-card border border-line sm:mb-5"
        >
          <div className={`relative w-full ${ASPECTS[i % ASPECTS.length]}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />

            {/* Caption ground — always present, so captions work on touch too. */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
            />

            <p className="absolute inset-x-0 bottom-0 p-4 text-[0.8rem] font-medium leading-snug text-white transition-transform duration-500 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 sm:text-sm">
              {image.caption}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
