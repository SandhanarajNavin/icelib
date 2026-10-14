import Link from "next/link";
import LoopVideo from "@/components/ui/LoopVideo";
import Reveal from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/icons";

/* The story of Valangulam, in the founder's own words. */
const story = [
  "During my college days, I often found myself visiting Valangulam. No matter how busy life got or what was going on around me, being there brought a sense of warmth and calm. It was a place where I could step away from the rush, take a breath, and simply be present.",
  "Those moments made me realise something simple: sometimes, we don't need to do more. We just need a place where we can slow down, feel everything, and enjoy the moment without looking at the clock.",
];

const after =
  "We wanted to create a space where you could come as you are. Somewhere you could sit alone and reconnect with yourself, catch up with friends, share your favourite food, or spend an evening making memories. A place where there's no pressure to hurry and no special reason needed to stay a little longer.";

/**
 * More than just food — why Icelib & Co exists, told beside a looping clip of
 * the place (the container under the trees, the lake, evenings on the deck).
 * The turn in the story is pulled out on a rule, and the closing line set in
 * the accent italic. The clip is portrait, so its frame is capped in width.
 */
export default function Evenings() {
  return (
    <section className="tone-cream bg-surface py-20 sm:py-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-muted">More Than Just Food</p>
          <h2 className="headline mt-4 text-[2.6rem] text-fg sm:text-[3.4rem]">
            Where Time Slows Down.
          </h2>
          <p className="mt-3 font-display text-[1.35rem] italic leading-snug text-fg-soft sm:text-[1.5rem]">
            A little space for yourself, your people, and your moments.
          </p>

          <div className="mt-6 max-w-xl space-y-4 leading-relaxed text-muted">
            {story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}

            <p className="border-l-2 border-brand/50 py-1 pl-5 font-display text-[1.45rem] font-semibold leading-snug text-fg">
              That feeling became the inspiration behind Icelib &amp; Co.
            </p>

            <p>{after}</p>

            <p className="pt-1 font-display text-[1.35rem] italic leading-snug text-fg">
              Because life isn&apos;t just about moving forward. Sometimes,
              it&apos;s about knowing when to pause.
            </p>
          </div>

          <Link
            href="/brand-story"
            className="btn-pill group mt-8 h-11 border-brand text-brand hover:bg-brand hover:text-white"
          >
            Our Story
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:max-w-[22rem] lg:justify-self-center"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-cream-deep shadow-[0_14px_36px_-18px_rgba(16,32,58,0.28)]">
            <LoopVideo
              src="/videos/ambiance-loop.mp4"
              poster="/videos/ambiance-loop-poster.webp"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
