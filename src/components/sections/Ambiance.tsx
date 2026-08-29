import { gallery } from "@/content/gallery";
import Section from "@/components/ui/Section";
import CircularGallery from "@/components/ui/CircularGallery";

export default function Ambiance() {
  return (
    <Section
      id="ambiance"
      eyebrow="Gallery"
      centered
      title={
        <>
          Water on one side,
          <span className="accent-script"> the city on the other</span>.
        </>
      }
      intro="Open-air decking, glass-topped tables and bulbs strung through the branches. The ring holds and turns as you scroll through it."
      className="bg-ink-800/35"
    >
      <CircularGallery images={gallery} />
    </Section>
  );
}
