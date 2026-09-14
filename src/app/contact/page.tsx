import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Visit from "@/components/sections/Visit";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Find Icelib & Co on the ${site.address.line1}, ${site.address.line2}. Walk-ins welcome all evening; call ahead for groups of six or more.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit Us"
        title={
          <>
            Find the blue container,{" "}
            <span className="accent-script">follow the lights</span>.
          </>
        }
        intro="Walk-ins welcome all evening. For groups of six or more, call ahead and we'll hold the deck tables."
      />
      <Visit tone="cream" bare />
    </>
  );
}
