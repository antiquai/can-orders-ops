'use client";'

import NavBarComponent from "@/components/NavBarComponent";
import HeroSection from "@/components/HeroSectionComponent";
import Catalog from "@/components/Catalog";


export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black">
      <NavBarComponent />
      <section id="hero-section" className="scroll-mt-20">
        <HeroSection />
      </section>
      <section id="catalogue-section" className="scroll-mt-20">
        <Catalog />
      </section>
    </main>
  );
}
