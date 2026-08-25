import type { Metadata } from "next";
import ResidentailApproach from "@/components/sections/services/ResidentialDesign/ResidentailApproach";
import ResidentailServicesSlider from "@/components/sections/services/ResidentialDesign/ResidentailServicesSlider";
import ResidentailWhyChoose from "@/components/sections/services/ResidentialDesign/ResidentailWhyChoose";
import ResidentialHeroSection from "@/components/sections/services/ResidentialDesign/ResidentialHeroSection";
import ResidentialInculdedServices from "@/components/sections/services/ResidentialDesign/ResidentialInculdedServices";


export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential design, commercial interiors, 3D visualization, and design consultation from Jam Space.",
};
export default function residentialDesign() {
  return (
    <div>
      <ResidentialHeroSection/>
      <ResidentialInculdedServices/>
      <ResidentailApproach/>
      <ResidentailWhyChoose/>
      <ResidentailServicesSlider/>
    </div>
  )
}
