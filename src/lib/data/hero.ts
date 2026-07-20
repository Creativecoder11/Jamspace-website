import type { HeroSlide } from "@/lib/types";

/**
 * Only slide 01 has real project content in the Figma (placeholder
 * "Project Name"/"Location" text is literally what's in the file — see
 * projects.ts). Slides 02-08 reuse other extracted interior photos as
 * stand-ins for the remaining slide count until real photography/copy is
 * supplied. `thumb` uses the two dedicated portrait crops extracted for
 * this widget where available, falling back to the full `image` crop.
 */
export const heroSlides: HeroSlide[] = [
  {
    name: "Project Name",
    location: "Location",
    image: "/images/hero-01.webp",
    thumb: "/images/hero-01.webp",
  },
  {
    name: "Project Name",
    location: "Location",
    image: "/images/projects-bg-01.webp",
    thumb: "/images/projects-bg-01.webp",
  },
  {
    name: "Project Name",
    location: "Location",
    image: "/images/hero-01.webp",
    thumb: "/images/hero-01.webp",
  },
  {
    name: "Project Name",
    location: "Location",
    image: "/images/testimonial-01.webp",
  },
  {
    name: "Project Name",
    location: "Location",
    image: "/images/video-bg-01.webp",
  },
  {
    name: "Project Name",
    location: "Location",
    image: "/images/about-strip-01.webp",
  },
  {
    name: "Project Name",
    location: "Location",
    image: "/images/about-strip-04.webp",
  },
  {
    name: "Project Name",
    location: "Location",
    image: "/images/about-strip-05.webp",
  },
];

export const heroSlideCount = heroSlides.length;
