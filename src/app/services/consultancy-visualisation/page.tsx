import type { Metadata } from "next";
import ResidentailApproach from "@/components/sections/services/ResidentialDesign/ResidentailApproach";
import ResidentailServicesSlider from "@/components/sections/services/ResidentialDesign/ResidentailServicesSlider";
import ResidentailWhyChoose from "@/components/sections/services/ResidentialDesign/ResidentailWhyChoose";
import ResidentialHeroSection from "@/components/sections/services/ResidentialDesign/ResidentialHeroSection";
import ResidentialInculdedServices from "@/components/sections/services/ResidentialDesign/ResidentialInculdedServices";
import ServiceRelatedProjects from "@/components/sections/services/ResidentialDesign/ServiceRelatedProjects";
import { Faq } from "@/components/sections/Faq";
import { BookSession } from "@/components/sections/packages/BookSession";
import { serviceDetails } from "@/lib/data/serviceDetails";

const content = serviceDetails["consultancy-visualisation"];

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export default function ConsultancyVisualisationPage() {
  return (
    <div>
      <ResidentialHeroSection content={content.hero} />
      <ResidentialInculdedServices content={content.included} />
      <ResidentailApproach content={content.approach} serviceName={content.name} />
      <BookSession ctaLocation="consultancy_visualisation_book_session" />
      <ServiceRelatedProjects content={content.relatedProjects} />
      <ResidentailWhyChoose content={content.whyChoose} />
      <ResidentailServicesSlider content={content.audience} serviceName={content.name} />
      <Faq items={content.faq.items} intro={content.faq.intro} />
    </div>
  );
}
