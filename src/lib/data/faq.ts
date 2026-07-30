import type { FaqItem } from "@/lib/types";

/** Shared across Pricing and Contact — both pages show the same FAQ list. */
export const faqItems: FaqItem[] = [
  {
    question: "What types of interior design projects do you undertake?",
    answer:
      "We specialize in residential and commercial interior design, along with 3D visualization and professional design consultation. Every project is tailored to your unique needs and vision.",
  },
  {
    question: "How does the design process work?",
    answer:
      "We begin with a consultation to understand your goals, followed by concept development, 3D visualization, material selection, and final execution — with your input at every stage.",
  },
  {
    question: "Can I see the design before construction begins?",
    answer:
      "Yes. Every project includes 3D renders and walkthroughs so you can review and approve the design before any construction work starts.",
  },
  {
    question: "How long does an interior design project take?",
    answer:
      "Timelines vary by scope, but most residential projects take 4–8 weeks for design and a few months for execution, depending on size and complexity.",
  },
];
