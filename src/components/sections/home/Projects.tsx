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

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={direction === "left" ? "rotate-180" : ""}
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

  useGSAP(
    () => {
      // gsap.from(".line", {
      //   yPercent: 100,
      //   duration: 0.9,
      //   stagger: 0.12,
      //   ease: "power3.out",
      //   scrollTrigger: {
      //     trigger: containerRef.current,
      //     start: "top 80%",
      //     toggleActions: "play none none reverse",
      //   },
      // });

      // Scroll-jacked pin slideshow — desktop only. Mobile navigates the
      // same slides via tap-driven prev/next arrows instead (see goPrev/goNext).
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: `+=${projects.length * 100}%`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              projects.length - 1,
              Math.floor(self.progress * projects.length),
            );
            setActiveIndex(idx);
            setShowKeepScrolling(self.progress < 0.03);
          },
        });
      });
    },
    { scope: containerRef },
  );

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
        {
          opacity: 1,
          yPercent: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
        },
      );
    },
    { scope: pinRef, dependencies: [activeIndex] },
  );

  const project = projects[activeIndex];
  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () =>
    setActiveIndex((i) => Math.min(projects.length - 1, i + 1));

  return (
    <section ref={containerRef} className="">
      <Container className="flex flex-col gap-4 md:gap-8 md:flex-row md:items-end md:justify-between px-4 md:pt-22.5 pt-10 pb-10 md:px-0">
        <AnimatedHeading
          as="h2"
          lines={["Spaces", "We've Transformed."]}
          className="text-[42px] md:text-6xl font-normal leading-[120%] md:leading-18"
        />
        <div className="max-w-md md:pl-5 md:ms-0">
          <p className="text-muted">
            A curated collection of spaces thoughtfully designed to reflect each
            client's vision, lifestyle, and purpose.
          </p>
        </div>
      </Container>

      <div
        ref={pinRef}
        className="relative md:h-dvh min-h-155 md:min-h-135 w-full overflow-hidden"
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
          className={`absolute left-6 top-1/2 hidden -translate-y-1/2 text-sm text-white transition-opacity duration-500 md:block md:left-16 ${
            showKeepScrolling ? "opacity-100" : "opacity-0"
          }`}
        >
          Keep Scrolling ↓
        </div>

        <Link
          href="/projects"
          className="absolute hidden md:block right-6 top-6 text-sm text-white hover:text-accent md:top-1/2 md:right-16 md:-translate-y-1/2"
        >
          All Projects ↗
        </Link>

        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Previous project"
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-opacity active:scale-95 disabled:opacity-30 md:hidden"
        >
          <ArrowIcon direction="left" />
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex === projects.length - 1}
          aria-label="Next project"
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-opacity active:scale-95 disabled:opacity-30 md:hidden"
        >
          <ArrowIcon direction="right" />
        </button>

        <div className="absolute inset-0 flex items-center justify-center px-14 md:px-6">
          <div className="w-full max-w-sm h-auto md:h-[460px] rounded-xl bg-background p-4 md:p-6 shadow-xl">
            <h3 className="text-2xl font-medium">{project.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
              <span className="text-accent-teal">
                <PinIcon />
              </span>
              {project.location}
            </p>
            <div className="relative mt-4 h-[220px] md:h-[280px] w-full overflow-hidden rounded-lg">
              <Image
                src={project.image}
                alt={project.name}
                fill
                // sizes="400px"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-sm">
                <BrandGlyph shape="step" color="pink" className="h-3 w-3" />
                {project.category}
              </span>
              <a
                href={`/projects/${project.slug}`}
                className="group inline-flex items-center gap-2 rounded-xl md:px-6 px-2 md:py-3 py-2 text-sm font-normal tracking-wide transition-colors duration-300 bg-accent text-accent-foreground font-medium hover:bg-foreground"
              >
                See Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="hidden md:block"
                >
                  <path
                    d="M10.9926 0H1.01928C0.752101 0 0.495863 0.106137 0.306938 0.295062C0.118013 0.483987 0.0118755 0.740225 0.0118755 1.00741C0.0118755 1.27459 0.118013 1.53082 0.306938 1.71975C0.495863 1.90867 0.752101 2.01481 1.01928 2.01481H8.55971L0.307549 10.268C0.211331 10.3609 0.134585 10.4721 0.0817881 10.595C0.028991 10.7179 0.0012004 10.8501 3.80363e-05 10.9838C-0.00112432 11.1176 0.0243648 11.2503 0.075018 11.3741C0.125671 11.4979 0.200474 11.6103 0.295062 11.7049C0.38965 11.7995 0.502129 11.8743 0.625935 11.925C0.749742 11.9756 0.882397 12.0011 1.01616 12C1.14992 11.9988 1.28211 11.971 1.40502 11.9182C1.52793 11.8654 1.63909 11.7887 1.73202 11.6925L9.98519 3.43979V10.9807C9.98519 11.2479 10.0913 11.5041 10.2803 11.6931C10.4692 11.882 10.7254 11.9881 10.9926 11.9881C11.2598 11.9881 11.516 11.882 11.7049 11.6931C11.8939 11.5041 12 11.2479 12 10.9807V1.00741C12 0.740225 11.8939 0.483987 11.7049 0.295062C11.516 0.106137 11.2598 0 10.9926 0Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              {/* <Button href={`/projects/${project.slug}`}>See Details</Button> */}
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
