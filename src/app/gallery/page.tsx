import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Ambiance from "@/components/sections/Ambiance";
import Callout from "@/components/sections/Callout";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Open-air decking, glass-topped tables and bulbs strung through the branches — Icelib & Co by the lake in Coimbatore.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            Water on one side,{" "}
            <span className="accent-script">the city on the other</span>.
          </>
        }
        intro="Shot across a year of evenings on the deck — the light, the lights, and everything that comes off the pass."
      />
      <Ambiance tone="cream" bare />
      <Callout tone="cobalt" />
    </>
  );
}
