import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGrid } from "@/components/sections/projects/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated collection of spaces JamSpace has thoughtfully designed across Dhaka.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        image="/images/projects-thumb-01.webp"
      />
      <ProjectsGrid />
    </>
  );
}
