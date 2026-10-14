import type { Metadata } from "next";
import WhoWeAre from "@/components/sections/WhoWeAre";
import Founders from "@/components/sections/Founders";
import Callout from "@/components/sections/Callout";

export const metadata: Metadata = {
  title: "Brand Story",
  description:
    "Two minds, one dream: how Varun Das and Hafiz Muhammed went from college conversations to building Icelib & Co in Coimbatore.",
};

export default function BrandStoryPage() {
  return (
    <>
      <WhoWeAre tone="cream" />
      <Founders tone="cream" />
      <Callout tone="cobalt" />
    </>
  );
}
