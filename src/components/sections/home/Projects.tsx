"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { projects } from "@/lib/data/projects";

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-7.4 7-13a7 7 0 1 0-14 0c0 5.6 7 13 7 13Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastAnimatedIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showKeepScrolling, setShowKeepScrolling] = useState(true);

  // Heading reveal on scroll, plus a pinned scrub-driven project switcher on
  // desktop only (matchMedia — disabled on mobile to avoid a scroll-jack
  // feel on small screens; mobile gets a plain stacked list instead).
  useGSAP(
    () => {
      gsap.from(".line", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: `+=${projects.length * 100}%`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const idx = Math.min(
              projects.length - 1,
              Math.floor(self.progress * projects.length),
            );
            setActiveIndex(idx);
            setShowKeepScrolling(self.progress < 0.03);
          },
        });
        return () => trigger.kill();
      });
    },
    { scope: containerRef },
  );

  // Parallax reveal whenever the pinned scrub swaps the active project: the
  // incoming image rises/falls in (direction follows scroll direction) while
  // the outgoing image parallaxes out the opposite way, replacing the old
  // instant opacity swap. Guarded the same way as Hero's slide-change effect
  // so it never fires on mount (both refs start at 0).
  useGSAP(
    () => {
      if (activeIndex === lastAnimatedIndex.current) return;
      const prevIndex = lastAnimatedIndex.current;
      lastAnimatedIndex.current = activeIndex;

      const outgoing = slideRefs.current[prevIndex];
      const incoming = slideRefs.current[activeIndex];
      const direction = activeIndex > prevIndex ? 1 : -1;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(outgoing, { clearProps: "all", opacity: 0 });
        gsap.set(incoming, { clearProps: "all", opacity: 1 });
        return;
      }

      gsap.to(outgoing, {
        opacity: 0,
        yPercent: direction * -8,
        scale: 1.06,
        duration: 1,
        ease: "power3.out",
      });
      gsap.fromTo(
        incoming,
        { opacity: 0, yPercent: direction * 8, scale: 1.12 },
        { opacity: 1, yPercent: 0, scale: 1, duration: 1.1, ease: "power3.out" },
      );
    },
    { scope: pinRef, dependencies: [activeIndex] },
  );

  const project = projects[activeIndex];

  return (
    <section ref={containerRef} className="">
      <Container className="flex flex-col gap-8 pb-12 pt-24 md:flex-row md:items-end md:justify-between">
        <AnimatedHeading
          as="h2"
          lines={["Spaces", "We've Transformed."]}
          className="text-6xl font-normal leading-18"
        />
        <p className="max-w-md text-muted">
          A curated collection of spaces thoughtfully designed to reflect
          each client&apos;s vision, lifestyle, and purpose.
        </p>
      </Container>

      <div
        ref={pinRef}
        className="relative h-screen min-h-[540px] w-full overflow-hidden"
      >
        {projects.map((p, i) => (
          <div
            key={p.slug}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className={`absolute inset-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={p.image}
              alt={`${p.name} — ${p.location}`}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />
          </div>
        ))}

        <div
          className={`absolute left-6 top-1/2 -translate-y-1/2 text-sm text-white transition-opacity duration-500 md:left-16 ${
            showKeepScrolling ? "opacity-100" : "opacity-0"
          }`}
        >
          Keep Scrolling ↓
        </div>

        <Link
          href="/projects"
          className="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-white hover:text-accent md:right-16"
        >
          All Projects ↗
        </Link>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="w-full max-w-sm h-[460px] rounded-xl bg-background p-6 shadow-xl">
            <h3 className="text-2xl font-medium">{project.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <span className="text-accent-teal">
                <PinIcon />
              </span>
              {project.location}
            </p>
            <div className="relative mt-4 h-[280px] w-full overflow-hidden rounded-lg">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-sm">
                <BrandGlyph shape="step" color="pink" className="h-3 w-3" />
                {project.category}
              </span>
              <Button href={`/projects/${project.slug}`}>See Details</Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
          <span className="text-5xl font-normal">
            {String(activeIndex + 1).padStart(2, "0")}/
            <span className="text-xl text-white/60">
              {String(projects.length).padStart(2, "0")}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
