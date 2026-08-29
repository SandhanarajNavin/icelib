import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Menu from "@/components/sections/Menu";
import Signatures from "@/components/sections/Signatures";
import Ambiance from "@/components/sections/Ambiance";
import Visit from "@/components/sections/Visit";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Signatures />
        <Ambiance />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
