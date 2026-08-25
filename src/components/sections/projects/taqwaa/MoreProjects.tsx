"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { projects } from "@/lib/data/projects";

function PinIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M12 22s7-7.4 7-13a7 7 0 1 0-14 0c0 5.6 7 13 7 13Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <circle cx="12" cy="9" r="2.4" fill="currentColor" />
        </svg>
    );
}

type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="project-card group border border-border relative h-80 md:h-112.5 overflow-hidden">
            <Image
                src={project.image}
                alt={`${project.name} — ${project.location}`}
                fill
                sizes="(min-width: 768px) 33vw, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="text-xl font-medium text-white">{project.name}</h3>

                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
                    <span className="text-accent-teal">
                        <PinIcon />
                    </span>
                    {project.location}
                </p>

                <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/20 pt-4">
                    <span className="flex items-center gap-2 text-sm text-white">
                        <BrandGlyph
                            shape="step"
                            color="pink"
                            className="h-3 w-3"
                        />
                        {project.category}
                    </span>
                </div>
            </div>
        </div>
    );
}

const MoreProjects = () => {
    const containerRef = useRef(null);
    const featuredProjects = projects.slice(0, 3);

    useGSAP(
        () => {
            gsap.set(".project-card", { opacity: 0, y: 24 });

            ScrollTrigger.batch(".project-card", {
                start: "top 90%",
                once: true,
                onEnter: (batch) => {
                    gsap.to(batch, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.12,
                        ease: "power3.out",
                        overwrite: "auto",
                    });
                },
            });

            ScrollTrigger.refresh();
        },
        { scope: containerRef }
    );

    return (
        <div>
            <div className="md:border-y border-border pt-10 md:pt-0">
                <div className="flex flex-col md:flex-row max-w-335 mx-auto items-start justify-between">
                    <div className="md:w-2/3 md:border-r border-border md:pr-0 pb-4 md:py-8">
                        <AnimatedHeading
                            as="h2"
                            lines={["Explore", "More Projects."]}
                            className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18 mx-4 md:mx-0"
                        />
                    </div>

                    <div className="md:w-1/3 border-border md:pl-8 md:py-8 mx-4 md:mx-0">
                        <p className="text-muted">
                            Discover the passion, purpose, and philosophy that shape every
                            space we create, transforming ideas into interiors that inspire
                            everyday living.
                        </p>

                        <div className="mt-3 md:mt-6">
                            <MagneticButton>
                                <Button href="/about">Learn More About Us</Button>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Card */}
            <div ref={containerRef} className="border-b border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 max-w-335 mx-auto">
                    {featuredProjects.map((project, idx) => (
                        <div
                            key={project.slug}
                            className={`border-b md:border-b-0 border-l border-border p-4 md:p-12.5
                                ${idx === featuredProjects.length - 1 ? "md:border-r border-r" : ""}`}
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MoreProjects;