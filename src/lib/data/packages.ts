import type { DesignPackage } from "@/lib/types";

/** The paid, bookable consultation. `price` is the amount charged via SSLCommerz. */
export const designSession = {
  titleLines: ["Book a Design", "Session."],
  description:
    "Get expert guidance for your interior design project. Discuss your ideas, understand your options, & discover the right direction with JamSpace.",
  price: 3000,
  priceLabel: "BDT 3,000",
  duration: "60 Minutes",
  durationCaption: "Focused Consultation",
  productName: "JamSpace Design Session (60 Minutes)",
  included: [
    "Personalized professional guidance.",
    "Brief introductory discussion.",
    "Recommended next steps.",
    "Written action summary.",
  ],
  image: "/images/bedroom.webp",
  ctaTitle: "Ready to Discuss Your Space?",
  ctaText:
    "Book your session with JamSpace and take the first step towards your design vision.",
} as const;

export const designPackages: DesignPackage[] = [
  {
    stage: "Discover",
    accent: "pink",
    icon: "discover",
    tag: "Complimentary",
    title: "Project Discovery",
    points: ["Brief introductory discussion and recommended next steps."],
  },
  {
    stage: "Design",
    accent: "yellow",
    icon: "design",
    tag: "Fixed Design Fee",
    title: "Personalised Design",
    points: ["Quoted for the agreed scope, complexity and deliverables."],
  },
  {
    stage: "Deliver",
    accent: "teal",
    icon: "deliver",
    tag: "Separate Quotation",
    title: "Design & Execution",
    points: ["Execution is scoped and contracted separately after design approval."],
  },
];
