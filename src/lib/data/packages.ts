import type { DesignPackage } from "@/lib/types";

/** The paid, bookable consultation. `price` is the amount charged via SSLCommerz. */
export const designSession = {
  titleLines: ["Book a Jam", "Session."],
  description:
    "Bring a design question, a plan or an idea. We help you review your options and decide what to do next.",
  price: 3000,
  priceLabel: "BDT 3,000",
  duration: "60 Minutes",
  durationCaption: "Focused Consultation",
  productName: "Jam Space Design Session (60 Minutes)",
  included: [
    "Professional design guidance",
    "Review of your questions",
    "Recommended next steps",
    "Brief written action summary",
  ],
  excluded: ["Custom layouts", "Custom drawings"],
  image: "/images/bedroom.webp",
  ctaTitle: "What would you like to discuss?",
  ctaText:
    "Choose an available date and time. All times are shown in Bangladesh Standard Time (UTC+6).",
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
