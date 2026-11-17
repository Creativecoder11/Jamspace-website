"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProjectCard } from "@/components/sections/projects/MoreProjects";
import { projects } from "@/lib/data/projects";
import type { ServiceDetailContent } from "@/lib/types";

export default function ServiceRelatedProjects({
  content,
}: {
  content: ServiceDetailContent["relatedProjects"];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Image and link come from the project data; name, location and category
  // can be overridden per service.
  const cards = content.projects.flatMap((item) => {
    const project = projects.find((p) => p.slug === item.slug);
    return project ? [{ ...project, ...item }] : [];
  });

  useGSAP(
    () => {
      if (!containerRef.current) return;
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
    { scope: containerRef },
  );

  // Hide the whole section until there's at least one published case study.
  if (cards.length === 0) return null;

  return (
    <section className="mt-16 md:mt-25">
      <div className="md:border-y border-border">
        <div className="flex flex-col md:flex-row max-w-335 mx-auto items-start justify-between">
          <div className="md:w-2/3 md:border-r border-border pb-4 md:py-8">
            <AnimatedHeading
              as="h2"
              lines={["Related", "Projects."]}
              className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18 mx-4 md:mx-0"
            />
          </div>
          <div className="md:w-1/3 md:pl-8 pb-4 md:py-8 mx-4 md:mx-0">
            <p className="text-muted">{content.intro}</p>
            <div className="mt-3 md:mt-6">
              <MagneticButton>
                <Button href={content.cta.href}>{content.cta.label}</Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-335 mx-auto">
          {cards.map((project, idx) => (
            <div
              key={project.slug}
              className={`border-b md:border-b-0 border-l border-border p-4 md:p-12.5 ${
                idx === cards.length - 1 ? "md:border-r border-r" : ""
              }`}
            >
              <ProjectCard project={project} ctaLabel={content.cardLabel} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
