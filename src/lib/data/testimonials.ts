import type { Testimonial } from "@/lib/types";

/**
 * Only the first testimonial is art-directed in the source design; the rest
 * are placeholders (reusing existing project photos) so the card-stack
 * cycler has more than one card to cycle through.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "From the initial concept to the final details, the team was patient, responsive, and committed to getting everything right. They listened carefully to our feedback and worked through every revision with us, ultimately creating a home that reflects our vision and expectations.",
    name: "Major Serajus Salekin",
    role: "Homeowner, Jolshiri Abashan, Dhaka",
    image: "/images/testimonial-01.webp",
  },
  {
    quote:
      "The team understood our vision and brought it to life with thoughtful design and attention to detail. The result is a home that feels vibrant, comfortable, and truly personal to us.",
    name: "Md. Abdus Sabur Khan",
    role: "Homeowner, Jolshiri Abashan, Dhaka",
    image: "/images/testimonial-02.webp",
  },
  {
    quote:
      "We wanted ELENI to feel elegant, warm, and rooted in the richness of our heritage while still feeling contemporary. The design team understood that vision beautifully and created a space where our collections feel elevated and every client feels welcomed.",
    name: "Najmus Shakib Sunny",
    role: "Owner, ELENI, Banani, Dhaka",
    image: "/images/testimonial-03.webp",
  },
  {
    quote:
      "The design captured exactly what we envisioned for Greenhub - a workspace that feels fresh, welcoming, and productive. Every detail was thoughtfully designed to create an environment where people enjoy coming to work.",
    name: "Zarif F. Rahman",
    role: "Owner, Greenhub Workspace, Dhanmondi, Dhaka",
    image: "/images/testimonial-04.webp",
  },
];
