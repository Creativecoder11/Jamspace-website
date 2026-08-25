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
    name: "Taqwaa Residence",
    location: "Jolshiri Residential Area",
    image: "/images/hero 1.webp",
    thumb: "/images/projects/taqwaa.webp",
  },
  {
    name: "Casa Zaheen",
    location: "Jolshiri Residential Area",
    image: "/images/hero 2.webp",
    thumb: "/images/projects/casa-zaheen.webp",
  },
  {
    name: "Green Hub Space",
    location: "Dhanmondi",
    image: "/images/hero 3.webp",
    thumb: "/images/projects/green-hub.webp",
  },
  {
    name: "Rakeen's Residence",
    location: "Jolshiri Residential Area",
    image: "/images/hero 4.webp",
    thumb: "/images/projects/rakeen.webp",
  },
  {
    name: "Rooftop & Pool Area",
    location: "Jolshiri Residential Area",
    image: "/images/hero 5.webp",
    thumb: "/images/projects/pool.webp",
  },
  {
    name: "PTI",
    location: "Matikata, Kalshi",
    image: "/images/about-strip-01.webp",
    thumb: "/images/projects/pti.webp",
  },
  // {
  //   name: "Project Name",
  //   location: "Location",
  //   image: "/images/about-strip-04.webp",
  //   thumb: "/images/about-strip-04.webp",
  // },
  // {
  //   name: "Project Name",
  //   location: "Location",
  //   image: "/images/about-strip-05.webp",
  //   thumb: "/images/about-strip-05.webp",
  // },
];

export const heroSlideCount = heroSlides.length;
