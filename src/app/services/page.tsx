import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { ServicesSection } from "@/components/sections/services/ServicesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Design Services in Dhaka | Jam Space",
  description:
    "Jam Space services in Dhaka: interior design, architectural design, custom furniture, and design consultancy with 3D visualisation for homes and businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <PageHero
        eyebrow="Services"
        image="/images/services-residential-01.webp"
      />
      <ServicesSection />
    </>
  );
}
