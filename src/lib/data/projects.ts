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
    name: "Project Name",
    location: "Location",
    category: "Residential Design",
    image: "/images/projects-thumb-01.webp",
  },
  {
    index: "02",
    slug: "project-02",
    name: "Project Name",
    location: "Location",
    category: "Commercial Design",
    image: "/images/about-strip-03.webp",
  },
  {
    index: "03",
    slug: "project-03",
    name: "Project Name",
    location: "Location",
    category: "Residential Design",
    image: "/images/about-strip-02.webp",
  },
  {
    index: "04",
    slug: "project-04",
    name: "Project Name",
    location: "Location",
    category: "3D Visualization",
    image: "/images/testimonial-01.webp",
  },
  {
    index: "05",
    slug: "project-05",
    name: "Project Name",
    location: "Location",
    category: "Residential Design",
    image: "/images/cta-strip-01.webp",
  },
  {
    index: "06",
    slug: "project-06",
    name: "Project Name",
    location: "Location",
    category: "Commercial Design",
    image: "/images/cta-strip-02.webp",
  },
];
