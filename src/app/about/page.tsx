import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
// import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutMissionVision } from "@/components/sections/about/AboutMissionVision";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutJourney } from "@/components/sections/about/AboutJourney";
// import { AboutTeam } from "@/components/sections/about/AboutTeam";
import { AboutSustainability } from "@/components/sections/about/AboutSustainability";
import { AboutStoryBento } from "@/components/sections/about/AboutStoryBento";
import DesignPhilosophySection from "@/components/sections/about/DesignPhilosophySection";

export const metadata: Metadata = {
  title: "About Jam Space | Interior Design Studio in Dhaka",
  description: "Learn about Jam Space, a leading interior design studio in Dhaka creating thoughtful residential and commercial interiors through creative design, functionality, and timeless craftsmanship.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        image="/images/about-strip-05.webp"
      />
      <DesignPhilosophySection />
      <AboutStoryBento />
      <AboutMissionVision />
      <AboutValues />
      <AboutJourney />
      {/* <AboutTeam /> */}
      <AboutSustainability />
    </>
  );
}
