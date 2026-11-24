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
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Jam Space | Multidisciplinary Design Studio in Dhaka",
  description:
    "Meet Jam Space, a multidisciplinary design studio in Dhaka. See how our interior designers and architects shape homes and workplaces around the people in them.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About Us", path: "/about" }])} />
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
