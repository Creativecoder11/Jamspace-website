import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
// import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutMissionVision } from "@/components/sections/about/AboutMissionVision";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutJourney } from "@/components/sections/about/AboutJourney";
import { AboutTeam } from "@/components/sections/about/AboutTeam";
import { AboutSustainability } from "@/components/sections/about/AboutSustainability";
import { AboutStoryBento } from "@/components/sections/about/AboutStoryBento";
import DesignPhilosophySection from "@/components/sections/about/DesignPhilosophySection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the passion, purpose, and philosophy that shape every space JamSpace creates — from our founding story to our values, process, and team.",
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
      <AboutTeam />
      <AboutSustainability />
    </>
  );
}
