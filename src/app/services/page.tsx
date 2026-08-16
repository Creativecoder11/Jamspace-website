import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { ServicesSection } from "@/components/sections/services/ServicesSection";

export const metadata: Metadata =
{
  title: "Interior Design Services in Dhaka | JamSpace",
  description: "Explore JamSpace interior design services in Dhaka, including residential interiors, commercial spaces, 3D visualization, and professional design consultation.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        image="/images/services-residential-01.webp"
      />
      <ServicesSection />
    </>
  );
}
