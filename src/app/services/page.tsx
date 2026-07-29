import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { ServicesSection } from "@/components/sections/services/ServicesSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential design, commercial interiors, 3D visualization, and design consultation from JamSpace.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        image="/images/services-residential-01.webp"
      />
      <ServicesSection/>      
    </>
  );
}
