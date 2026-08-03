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
    <div className="project-card group border border-border relative h-[320px] md:h-[450px] overflow-hidden">
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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".project-card", {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set(".project-card", {
        opacity: 0,
        y: 24,
      });

      ScrollTrigger.batch(".project-card", {
        start: "top 90%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });

      ScrollTrigger.refresh();
    },
    {
      scope: containerRef,
      dependencies: [activeCategory],
      revertOnUpdate: true,
    }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".project-card",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [activeCategory],
    }
  );

  const filterClass = (isActive: boolean) =>
    `w-fit text-left transition-colors ${isActive
      ? "text-lg md:text-3xl font-medium text-foreground"
      : "text-lg md:text-3xl font-normal text-[#1919194D] hover:text-foreground"
    }`;

  return (
    <section ref={containerRef} className="">
      <div className="mt-16 md:mt-25 md:border-y border-border">
        <div className="flex flex-col md:flex-row max-w-335 mx-auto items-start justify-between">
          <div className="md:w-2/3 md:border-r border-border pb-4 md:py-8">
            <AnimatedHeading
              as="h2"
              lines={["Spaces", "That Inspire"]}
              className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18 mx-4 md:mx-0"
            />
          </div>

          <div className="md:w-1/3 md:border-l border-border md:pl-8 pb-4 md:py-8 mx-4 md:mx-0">
            <p className="text-muted">
              Explore a curated collection of residential and commercial
              interiors, thoughtfully designed to balance beauty, functionality,
              and timeless living.
            </p>

            <div className="mt-3 md:mt-6">
              <MagneticButton>
                <Button href="/about">Start a Project</Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <Container className="flex flex-col gap-5 md:gap-10 border-t border-border md:flex-row px-4 md:px-0">
        <aside className="w-full shrink-0 md:w-80 pt-7 md:pr-8">
          <div className="sticky top-32">
            <p className="text-sm md:text-base text-muted underline underline-offset-4">
              Filter Projects
            </p>

            <nav className="mt-4 flex flex-col gap-1 md:gap-3">
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

        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-4 md:gap-0">
          {filtered.map((project) => (
            <div key={project.slug} className="border-r-1 border-b border-l border-border p-4 md:p-[50px] border-t md:border-t-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
