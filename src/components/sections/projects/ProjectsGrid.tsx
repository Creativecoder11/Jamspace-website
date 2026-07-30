"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/types";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

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

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card group border border-border relative h-[450px] overflow-hidden">
      <Image
        src={project.image}
        alt={`${project.name} — ${project.location}`}
        fill
        sizes="(min-width: 768px) 40vw, 90vw"
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
            <BrandGlyph shape="step" color="pink" className="h-3 w-3" />
            {project.category}
          </span>
          {/* <Button href={`/projects/${project.slug}`}>See Details</Button> */}
        </div>
      </div>
    </div>
  );
}

export function ProjectsGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  useGSAP(
    () => {
      ScrollTrigger.batch(".project-card", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          }),
      });
    },
    { scope: containerRef, dependencies: [activeCategory] },
  );

  const filterClass = (isActive: boolean) =>
    `w-fit text-left transition-colors ${
      isActive
        ? "text-3xl font-medium text-foreground"
        : "text-3xl font-normal text-[#1919194D] hover:text-foreground"
    }`;

  return (
    <section ref={containerRef} className="">
      <div className="mt-25 border-y border-border">
        <div className="mx-auto flex max-w-[1340px] items-start justify-between">
          <div className="w-2/3 border-r border-border py-8">
            <AnimatedHeading
              as="h2"
              lines={["Spaces", "That Inspire"]}
              className="text-6xl font-normal leading-18"
            />
          </div>

          <div className="w-1/3 py-8 pl-8">
            <p className="text-muted">
              Explore a curated collection of residential and commercial
              interiors, thoughtfully designed to balance beauty, functionality,
              and timeless living.
            </p>

            <div className="mt-6">
              <MagneticButton>
                <Button href="/about">Start a Project</Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
      <Container className="flex flex-col gap-10 border-t border-border md:flex-row">
        <aside className="w-full shrink-0 md:w-80 pt-12.5 md:pr-8">
          <div className="sticky top-32">
            <p className="text-base text-muted underline underline-offset-4">
              Filter Projects
            </p>

            <nav className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                aria-pressed={activeCategory === null}
                className={filterClass(activeCategory === null)}
              >
                All Projects
                {activeCategory === null && <span className="ml-1.5">×</span>}
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={filterClass(activeCategory === category)}
                >
                  {category}
                  {activeCategory === category && (
                    <span className="ml-1.5">×</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
          {filtered.map((project) => (
            <div key={project.slug} className="border-r-1 border-b border-l border-border p-[50px]">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
