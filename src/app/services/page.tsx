import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

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
      <PagePlaceholder message="A full breakdown of every service is coming soon. In the meantime, see an overview on the home page." />
    </>
  );
}
