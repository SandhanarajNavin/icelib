import { gallery } from "@/content/gallery";
import Section, { type Tone } from "@/components/ui/Section";
import MasonryGallery from "@/components/ui/MasonryGallery";

export default function Ambiance({ tone = "deep", bare = false }: { tone?: Tone; bare?: boolean }) {
  return (
    <Section
      tone={tone}
      bare={bare}
      id="ambiance"
      eyebrow="Gallery"
      centered
      title={
        <>
          Water on one side,
          <span className="accent-script"> the city on the other</span>.
        </>
      }
      intro="Open-air decking, glass-topped tables and bulbs strung through the branches, over the water."
    >
      <MasonryGallery images={gallery} />
    </Section>
  );
}
