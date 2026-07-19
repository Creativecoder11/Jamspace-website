import type { Testimonial } from "@/lib/types";

/**
 * Only the first testimonial is art-directed in the source design; the rest
 * are placeholders (reusing existing project photos) so the card-stack
 * cycler has more than one card to cycle through.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Working with JamSpace was an exceptional experience from start to finish. They understood our vision, communicated clearly throughout the project, and delivered a space that feels both elegant and highly functional. The attention to detail exceeded our expectations.",
    name: "Sarah Ahmed",
    role: "Homeowner, Dhaka",
    image: "/images/testimonial-01.webp",
  },
  {
    quote:
      "From the very first consultation, JamSpace made the entire renovation process feel effortless. Their team balanced our budget and timeline while never compromising on quality, and the final result completely transformed how our office feels to work in every day.",
    name: "Tanvir Rahman",
    role: "Business Owner, Dhaka",
    image: "/images/about-strip-02.webp",
  },
  {
    quote:
      "JamSpace turned a rough concept into a home we genuinely love waking up in. The 3D visualizations made it so easy to approve every material and layout decision ahead of time, and there were absolutely no surprises once construction began.",
    name: "Nusrat Jahan",
    role: "Homeowner, Chittagong",
    image: "/images/projects-thumb-01.webp",
  },
  {
    quote:
      "What stood out most was how closely the team listened. Every recommendation felt tailored to how we actually live, not just what looked good in a photo. Two years later, the space still feels as fresh and functional as the day it was finished.",
    name: "Imran Hossain",
    role: "Homeowner, Dhaka",
    image: "/images/about-strip-04.webp",
  },
];
