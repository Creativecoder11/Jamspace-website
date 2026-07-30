import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PricingCards } from "@/components/sections/pricing/PricingCards";
import { Faq } from "@/components/sections/Faq";

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
      <PricingCards />
      <Faq />
    </>
  );
}
