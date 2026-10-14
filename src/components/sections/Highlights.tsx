import Reveal from "@/components/ui/Reveal";

const highlights = [
  {
    title: "Lakeside Views",
    body: "A relaxing spot by the lake, perfect for food and conversations.",
  },
  {
    title: "Great Food",
    body: "Momos, burgers, kunafa & more, made for every mood.",
  },
  {
    title: "Good Company",
    body: "A place to unwind with friends, family or someone special.",
  },
];

/**
 * Three short reasons to come, straight under the hero — one row on desktop
 * split by hairlines, stacked on phones.
 */
export default function Highlights() {
  return (
    <section className="tone-cream border-b border-line bg-surface py-12 sm:py-14">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-3 md:gap-0">
          {highlights.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className={`md:px-10 ${i > 0 ? "md:border-l md:border-line" : "md:pl-0"}`}
            >
              <div>
                <h2 className="font-display text-xl font-semibold uppercase tracking-[0.04em] text-fg">
                  {item.title}
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
