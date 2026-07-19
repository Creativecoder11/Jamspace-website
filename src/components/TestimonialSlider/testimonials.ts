import type { Testimonial } from "./types";

/**
 * Dummy data for this standalone slider — not wired to the site's real
 * testimonials (see src/lib/data/testimonials.ts for those). Images reuse
 * existing project photography already in public/images/.
 */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Ahmed",
    designation: "Homeowner",
    company: "Dhaka",
    image: "/images/about-strip-01.webp",
    review:
      "Working with this team was an exceptional experience from start to finish. They understood our vision, communicated clearly throughout the project, and delivered a space that feels both elegant and highly functional.",
  },
  {
    id: 2,
    name: "Tanvir Rahman",
    designation: "Business Owner",
    company: "Rahman Textiles",
    image: "/images/about-strip-02.webp",
    review:
      "From the very first consultation, the process felt effortless. The team balanced our budget and timeline while never compromising on quality, and the final result transformed how our office feels every day.",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    designation: "Homeowner",
    company: "Chittagong",
    image: "/images/about-strip-03.webp",
    review:
      "A rough concept turned into a home we genuinely love waking up in. The 3D visualizations made it easy to approve every material and layout decision ahead of time, with no surprises once construction began.",
  },
  {
    id: 4,
    name: "Imran Hossain",
    designation: "Homeowner",
    company: "Dhaka",
    image: "/images/about-strip-04.webp",
    review:
      "What stood out most was how closely the team listened. Every recommendation felt tailored to how we actually live, not just what looked good in a photo. Two years later, it still feels fresh and functional.",
  },
  {
    id: 5,
    name: "Farhana Kabir",
    designation: "Creative Director",
    company: "Studio Kabir",
    image: "/images/about-strip-05.webp",
    review:
      "Our studio needed a space that felt as considered as the work we produce. Every material choice and sightline was deliberate, and clients notice the difference the moment they walk in.",
  },
  {
    id: 6,
    name: "Rafiq Islam",
    designation: "Restaurant Owner",
    company: "Islam & Co.",
    image: "/images/services-residential-01.webp",
    review:
      "They redesigned our dining room around how guests actually move through the space. Covers went up, complaints went down, and the room finally photographs the way the food deserves.",
  },
];
