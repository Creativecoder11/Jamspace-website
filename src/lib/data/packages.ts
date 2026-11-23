import type { DesignPackage } from "@/lib/types";

/** The paid, bookable consultation. `price` is the amount charged via SSLCommerz. */
export const designSession = {
  titleLines: ["Book a Design", "Session."],
  description:
    "Get expert guidance for your interior design project. Discuss your ideas, understand your options, & discover the right direction with Jam Space.",
  price: 3000,
  priceLabel: "BDT 3,000",
  duration: "60 Minutes",
  durationCaption: "Focused Consultation",
  productName: "Jam Space Design Session (60 Minutes)",
  included: [
    "Personalized professional guidance.",
    "Brief introductory discussion.",
    "Recommended next steps.",
    "Written action summary.",
  ],
  image: "/images/bedroom.webp",
  ctaTitle: "Ready to Discuss Your Space?",
  ctaText:
    "Book your session with Jam Space and take the first step towards your design vision.",
} as const;

export const designPackages: DesignPackage[] = [
  {
    stage: "Discover",
    accent: "pink",
    icon: "discover",
    tag: "Complimentary",
    title: "Project Discovery",
    ctaLabel: "Discuss Your Project",
    points: [
      "Broad discussion of your requirements",
      "Relevant services and portfolio examples",
    ],
  },
  {
    stage: "Design",
    accent: "yellow",
    icon: "design",
    tag: "Fixed Design Fee",
    title: "Personalised Design",
    ctaLabel: "Discuss Your Design Requirements",
    points: [
      "50% at agreement signing, before detailed design begins",
      "50% upon final design approval, before delivery"

    ],
  },
  {
    stage: "Deliver",
    accent: "teal",
    icon: "deliver",
    tag: "Separate Quotation",
    title: "Design & Execution",
    ctaLabel: "Discuss Execution",
    points: [
      "Agreed work scope, specifications and timeline",
      "Separate execution fee and payment terms"
    ],
  },
];
