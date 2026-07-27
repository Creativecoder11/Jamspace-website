import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing for JamSpace's interior design services.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        image="/images/hero-01.webp"
      />
      <PagePlaceholder message="Pricing packages are coming soon. Book a consultation for a tailored quote in the meantime." />
    </>
  );
}
