import type { Service } from "@/lib/types";

/**
 * Only "Residential Design" has full open-panel content in the source
 * design (heading/description/image/sub-services). The other three are
 * real service names from the mockup but their expanded content is a
 * placeholder until real copy/photos are supplied for those panels.
 */
export const services: Service[] = [
  {
    index: "01",
    slug: "residential-design",
    title: "Residential Design",
    heading: "Designing Homes That Feel Like Home",
    description:
      "Create warm, functional, and timeless interiors tailored to your lifestyle.",
    image: "/images/services-residential-01.webp",
    subServices: [
      { label: "Full Home Design" },
      { label: "Renovation & Remodeling" },
      { label: "Single Room Design" },
      { label: "Custom Furniture Design" },
    ],
  },
  {
    index: "02",
    slug: "commercial-design",
    title: "Commercial Design",
    heading: "Spaces Built for Business",
    description:
      "Functional, on-brand commercial interiors designed to perform as well as they look.",
    image: "/images/about-strip-03.webp",
    subServices: [
      { label: "Office Design" },
      { label: "Retail & Hospitality" },
      { label: "Workspace Planning" },
      { label: "Brand-Led Interiors" },
    ],
  },
  {
    index: "03",
    slug: "3d-visualization",
    title: "3D Visualization",
    heading: "See It Before It's Built",
    description:
      "Photorealistic renders and walkthroughs that let you approve every detail up front.",
    image: "/images/video-bg-01.webp",
    subServices: [
      { label: "Photorealistic Renders" },
      { label: "Virtual Walkthroughs" },
      { label: "Material Studies" },
      { label: "Lighting Simulation" },
    ],
  },
  {
    index: "04",
    slug: "consultation-services",
    title: "Consultation Services",
    heading: "Expert Guidance, Start to Finish",
    description:
      "One-on-one design consultation to help you plan, budget, and scope your project.",
    image: "/images/blog-01.webp",
    subServices: [
      { label: "Design Audits" },
      { label: "Budget Planning" },
      { label: "Space Planning" },
      { label: "Vendor Coordination" },
    ],
  },
];
