import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    index: "01",
    slug: "interior-design",
    title: "Interior Design",
    shortdescription: "Residential and commercial interiors designed around how people live, work and use a space.",
    heading: "Designing Homes That Feel Like Home",
    description:
      "Create warm, functional, and timeless interiors tailored to your lifestyle.",
    image: "/images/services-residential-1.webp",
    subServices: [
      { label: "Full Home Design" },
      { label: "Renovation & Remodeling" },
      { label: "Single Room Design" },
      { label: "Custom Furniture Design" },
    ],
  },
  {
    index: "02",
    slug: "architectural-design",
    title: "Architectural Design",
    heading: "Spaces Built for Business",
    shortdescription: "Design for residential and commercial buildings, façades and outdoor spaces, shaped by their site and use.",
    description:
      "Functional, on-brand commercial interiors designed to perform as well as they look.",
    image: "/images/services-commercial-1.webp",
    subServices: [
      { label: "Office Design" },
      { label: "Retail & Hospitality" },
      { label: "Workspace Planning" },
      { label: "Brand-Led Interiors" },
    ],
  },
  {
    index: "03",
    slug: "custom-furniture",
    title: "Custom Furniture",
    heading: "See It Before It's Built",
    shortdescription: "Bespoke furniture, cabinetry and built-in storage designed to fit the space and its everyday use.",
    description:
      "Photorealistic renders and walkthroughs that let you approve every detail up front.",
    image: "/images/services-3d-1.webp",
    subServices: [
      { label: "Photorealistic Renders" },
      { label: "Virtual Walkthroughs" },
      { label: "Material Studies" },
      { label: "Lighting Simulation" },
    ],
  },
  {
    index: "04",
    slug: "consultancy-visualisation",
    title: "Consultancy & Visualisation",
    heading: "Expert Guidance, Start to Finish",
    shortdescription: "Design guidance, space planning, and 2D and 3D visualisation to help you explore your options.",
    description:
      "One-on-one design consultation to help you plan, budget, and scope your project.",
    image: "/images/services-consultation-1.webp",
    subServices: [
      { label: "Design Audits" },
      { label: "Budget Planning" },
      { label: "Space Planning" },
      { label: "Vendor Coordination" },
    ],
  },
];

/**
 * Homepage services accordion — the four design disciplines.
 * `href` points at the matching section of the Services page; update the
 * anchors once the Services page is restructured around these disciplines.
 */
export const homeServices: (Service & { href: string })[] = [
  {
    index: "01",
    slug: "interior-design",
    title: "Interior Design",
    heading: "Homes and Commercial Spaces",
    description:
      "We design residential and commercial interiors around everyday routines, the way teams work and how customers experience a space.",
    image: "/images/services-residential-1.webp",
    href: "/services/interior-design",
    subServices: [
      { label: "Residential Interiors" },
      { label: "Commercial Interiors" },
      { label: "Renovation" },
      { label: "Space Planning" },
    ],
  },
  {
    index: "02",
    slug: "architectural-design",
    title: "Architectural Design",
    heading: "Buildings and Their Surroundings",
    description:
      "We develop concepts and layouts for residential and commercial buildings, considering how they relate to the site and how people will use them.",
    image: "/images/projects/pti/hero.webp",
    href: "/services/architectural-design",
    subServices: [
      { label: "Residential Buildings" },
      { label: "Commercial Buildings" },
      { label: "Façades" },
      { label: "Rooftops & Outdoor Spaces" },
    ],
  },
  {
    index: "03",
    slug: "custom-furniture",
    title: "Custom Furniture",
    heading: "Furniture Designed for the Space",
    description:
      "We design and build bespoke furniture, cabinetry and fitted storage for homes and businesses, with production and installation agreed for each commission.",
    image: "/images/projects/taqwaa/bento-mid.webp",
    href: "/services/custom-furniture",
    subServices: [
      { label: "Bespoke Furniture" },
      { label: "Cabinetry" },
      { label: "Built-In Storage" },
      { label: "Shelving" },
    ],
  },
  {
    index: "04",
    slug: "consultancy-visualisation",
    title: "Consultancy & Visualisation",
    heading: "Explore Your Options Before You Decide",
    description:
      "We provide design guidance, space planning and 2D and 3D visualisation to help you understand the possibilities for your project.",
    image: "/images/services-consultation-1.webp",
    href: "/services/consultancy-visualisation",
    subServices: [
      { label: "Design Consultation" },
      { label: "Space Planning" },
      { label: "2D Drawings" },
      { label: "3D Visualisation" },
    ],
  },
];
