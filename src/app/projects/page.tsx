import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGrid } from "@/components/sections/projects/ProjectsGrid";

export const metadata: Metadata = {
  title: "Interior Design Projects in Dhaka | JamSpace",
  description:
    "Explore JamSpace interior design projects in Dhaka, featuring thoughtfully designed residential and commercial spaces, from modern homes to inspiring workspaces.",
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
