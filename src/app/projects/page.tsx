import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGrid } from "@/components/sections/projects/ProjectsGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Interior Design & Architecture Projects",
  description:
    "Browse Jam Space projects in Dhaka — residential and commercial interiors, architecture and custom furniture, from the first brief to the finished space.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Projects", path: "/projects" }])} />
      <PageHero
        eyebrow="Projects"
        image="/images/projects-thumb-01.webp"
      />

      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ProjectsGrid />
      </Suspense>
    </>
  );
}
