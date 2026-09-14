import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Menu from "@/components/sections/Menu";
import Callout from "@/components/sections/Callout";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Momos, signature kunafa bowls, brownies and bakes, mojitos and coolers, loaded fries and coffee. Prices in rupees, taxes included.",
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Menu"
        title={
          <>
            Everything comes off{" "}
            <span className="accent-script">one small pass</span>.
          </>
        }
        intro="Six sections, no filler. Hand-folded, steamed and poured to order — which is why there's sometimes a wait, and why it's worth it."
      />
      <Menu tone="cream" bare />
      <Callout
        title={
          <>
            Hungry <span className="accent-script">already</span>?
          </>
        }
        subtitle="Order in, or come down to the deck and watch it being made."
        ctaLabel="Order Now"
        ctaHref="https://swiggy.com"
        tone="cobalt"
      />
    </>
  );
}
