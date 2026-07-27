import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";

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
      <PagePlaceholder message="The full project archive is coming soon. In the meantime, see a preview on the home page." />
    </>
  );
}
