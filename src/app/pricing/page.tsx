import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PricingCards } from "@/components/sections/pricing/PricingCards";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Interior Design Pricing in Dhaka | Jam Space",
  description: "Explore Jam Space interior design pricing in Dhaka for residential and commercial projects. Find the right design package and get answers to common pricing questions.",
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
