import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import About from "@/components/sections/About";
import Callout from "@/components/sections/Callout";

export const metadata: Metadata = {
  title: "Brand Story",
  description:
    "Icelib & Co started as a single shipping container and a very good momo recipe. The lake came with the address; the string lights were our idea.",
};

export default function BrandStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title={
          <>
            A blue box by the water that{" "}
            <span className="accent-script">stays open late</span>.
          </>
        }
        intro="Icelib & Co started as a single shipping container and a very good momo recipe. The lake came with the address; the string lights were our idea."
      />
      <About tone="cream" bare />
      <Callout tone="cobalt" />
    </>
  );
}
