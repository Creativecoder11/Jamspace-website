import type { Project } from "@/lib/types";

/**
 * The source design only fully art-directed project 01 (real photos,
 * placeholder "Project Name"/"Location" copy — that placeholder text is
 * literally what's in the Figma file, not a content gap on our end).
 * Projects 02-04 reuse other extracted interior photos as stand-ins until
 * real project photography/copy is supplied.
 */
export const projects: Project[] = [
  {
    index: "01",
    slug: "project-01",
    name: "Taqwaa Residence",
    location: "Jolshiri Residential Area",
    category: "Residential Design",
    image: "/images/projects/taqwaa.webp",
  },
  {
    index: "02",
    slug: "project-02",
    name: "Casa Zaheen",
    location: "Jolshiri Residential Area",
    category: "Residential Design",
    image: "/images/projects/casa-zaheen.webp",
  },
  {
    index: "03",
    slug: "project-03",
    name: "Green Hub Co-Working Space",
    location: "Dhanmondi",
    category: "Commercial Design",
    image: "/images/projects/green-hub.webp",
  },
  {
    index: "04",
    slug: "project-04",
    name: "Rakeen's Residence",
    location: "Jolshiri Residential Area",
    category: "Residential Design",
    image: "/images/projects/rakeen.webp",
  },
  {
    index: "05",
    slug: "project-05",
    name: "Rooftop & Pool Area",
    location: "Jolshiri Residential Area",
    category: "Residential Design",
    image: "/images/projects/pool.webp",
  },
  {
    index: "06",
    slug: "project-06",
    name: "PTI",
    location: "Matikata, Kalshi",
    category: "Residential Design",
    image: "/images/projects/pti.webp",
  },
];
