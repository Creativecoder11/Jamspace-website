import type { FaqItem } from "@/lib/types";

/** Shared across Packages and Contact — both pages show the same FAQ list. */
export const faqItems: FaqItem[] = [
  {
    question: "What’s the difference between Free Project Discovery and a Design Session?",
    answer:
      "Free Project Discovery is an introductory discussion to understand your project and suggest a next step. A Design Session is a paid, 60-minute professional consultation with personalised guidance and a brief written action summary. Custom drawings are excluded from both.",
  },
  {
    question: "How is my design fee calculated?",
    answer:
      "We quote a fixed fee once we understand the scope, complexity and deliverables. Included drawings, visualisations and revision allowances are set out in your design agreement.",
  },
  {
    question: "Can I hire Jam Space for design only?",
    answer:
      "Yes. You can commission design alone. If you’d like Jam Space to execute the approved design, we’ll prepare a separate proposal and agreement.",
  },
  {
    question: "When will I know the project timeline?",
    answer:
      "We discuss your target dates during discovery and confirm the design timeline when we agree on the scope. If you commission execution, its schedule is set out in the separate proposal.",
  },
];
