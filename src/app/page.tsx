import Hero from "@/components/sections/Hero";
import Signatures from "@/components/sections/Signatures";
import Teasers from "@/components/sections/Teasers";
import Callout from "@/components/sections/Callout";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Signatures tone="cream" />
      <Teasers tone="cobalt" />
      <Callout tone="deep" />
    </>
  );
}
