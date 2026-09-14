"use client";

import { useState } from "react";
import { menu, type MenuItem } from "@/content/menu";
import Section, { type Tone } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

const tagStyles: Record<NonNullable<MenuItem["tag"]>, string> = {
  signature: "border-accent/45 text-accent-soft",
  bestseller: "border-accent-soft/45 text-accent-soft",
  new: "border-fg-soft/35 text-fg-soft",
};

const tagLabels: Record<NonNullable<MenuItem["tag"]>, string> = {
  signature: "Signature",
  bestseller: "Bestseller",
  new: "New",
};

export default function Menu({ tone = "cobalt", bare = false }: { tone?: Tone; bare?: boolean }) {
  const [activeId, setActiveId] = useState(menu[0].id);
  const active = menu.find((c) => c.id === activeId) ?? menu[0];

  return (
    <Section
      tone={tone}
      bare={bare}
      id="menu"
      eyebrow="The Menu"
      centered
      title={
        <>
          Everything comes off
          <span className="accent-script"> one small pass</span>.
        </>
      }
      intro="Six sections, no filler. Prices in rupees, taxes included."
    >
      {/* Category tabs */}
      <Reveal>
        <div
          role="tablist"
          aria-label="Menu categories"
          className="flex flex-wrap justify-center gap-2.5"
        >
          {menu.map((category) => {
          const selected = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              id={`tab-${category.id}`}
              aria-selected={selected}
              aria-controls={`panel-${category.id}`}
              onClick={() => setActiveId(category.id)}
              className={`chip ${selected ? "chip-on" : ""}`}
            >
              {category.label}
            </button>
          );
          })}
        </div>
      </Reveal>

      <p className="mx-auto mt-8 max-w-xl text-center text-sm italic text-muted/60">
        {active.blurb}
      </p>

      {/* Items */}
      <Reveal delay={0.08}>
        <div
          role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        key={active.id}
        className="mt-12 grid gap-x-14 gap-y-2 md:grid-cols-2"
      >
        {active.items.map((item, i) => (
          <article
            key={item.name}
            className="rise group flex items-baseline gap-4 border-b border-line py-5 transition-colors hover:border-fg/45"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="font-display text-xl text-fg transition-colors group-hover:text-accent-soft">
                  {item.name}
                </h3>
                {item.tag && (
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] ${
                      tagStyles[item.tag]
                    }`}
                  >
                    {tagLabels[item.tag]}
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted/65">
                {item.description}
              </p>
            </div>

            <div
              aria-hidden
              className="hidden flex-1 translate-y-[-3px] border-b border-dotted border-line sm:block"
            />

            <p className="shrink-0 font-display text-lg text-accent-soft tabular-nums">
              &#8377;{item.price}
            </p>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
