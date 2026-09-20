"use client";

import { ThemeAnimationProvider } from "@/components/animation/ThemeAnimationProvider";
import BlueprintGrid from "@/components/animation/BlueprintGrid";
import CursorGlow from "@/components/animation/CursorGlow";
import PageViewTracker from "@/components/PageViewTracker";
import SiteBanner from "@/components/SiteBanner";
import Navbar from "@/components/Navbar";
import HomeSection from "@/components/HomeSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import { ProjectSection } from "@/components/ProjectSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
  return (
    <ThemeAnimationProvider>
      <PageViewTracker />
      <SiteBanner />
      <BlueprintGrid />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <HomeSection />
        <MarqueeTicker />
        <Services />
        <Stats />
        <WhyUs />
        <ProjectSection category="delivered" />
        <ProjectSection category="under-construction" />
        <ProjectSection category="for-sale" />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </ThemeAnimationProvider>
  );
}
