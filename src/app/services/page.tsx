import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { ServicesSection } from "@/components/sections/services/ServicesSection";

export const metadata: Metadata =
{
  title: "Design Services in Dhaka | Jam Space",
  description: "Explore Jam Space design services in Dhaka, including residential interiors, commercial spaces, 3D visualization, and professional design consultation.",
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
