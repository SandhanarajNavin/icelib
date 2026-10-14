import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Menu from "@/components/sections/Menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Momos, smash burgers, Nashville tenders and wings, loaded fries, mojitos, coffee and kunafa desserts. Prices in rupees.",
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
        intro="Momos to smash burgers, mojitos to kunafa. Everything is made fresh on order — which is why there's sometimes a 10 to 20 minute wait, and why it's worth it."
      />
      <Menu tone="cream" bare />
    </>
  );
}
