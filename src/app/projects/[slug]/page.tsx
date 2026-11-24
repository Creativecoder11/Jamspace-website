import { projects } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

import ProjectHeroBanner from "@/components/sections/projects/ProjectHeroBanner";
import ProjectsStoryBento from "@/components/sections/projects/ProjectsStoryBento";
import DesignScope from "@/components/sections/projects/DesignScope";
import ProjectsPlanning from "@/components/sections/projects/ProjectsPlanning";
import ProjectsBeforeAfter from "@/components/sections/projects/ProjectsBeforeAfter";
import ProjectsChallenges from "@/components/sections/projects/ProjectsChallenges";
import DesignHighlightSilde from "@/components/sections/projects/DesignHighlightSilde";
import MoreProjects from "@/components/sections/projects/MoreProjects";

export async function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};
    return pageMetadata({
        title: `${project.name} | Jam Space`,
        description: project.heroDescription,
        path: `/projects/${project.slug}`,
        image: project.heroImage,
    });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) notFound();

    return (
        <section>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Projects", path: "/projects" },
                    { name: project.name, path: `/projects/${project.slug}` },
                ])}
            />
            <ProjectHeroBanner project={project} />
            <ProjectsStoryBento project={project} />
            <DesignScope project={project} />

            {/* ProjectsPlanning is dynamic. It only renders if you add planningItems in the data */}
            {project.planningItems && project.planningItems.length > 0 && (
                <ProjectsPlanning items={project.planningItems} />
            )}

            <ProjectsBeforeAfter project={project} />
            <ProjectsChallenges project={project} />
            <DesignHighlightSilde slides={project.highlightSlides} label={project.highlightLabel} />
            <MoreProjects currentSlug={project.slug} />
        </section>
    );
}