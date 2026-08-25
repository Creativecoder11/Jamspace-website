"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { StatIcon } from "@/components/ui/StatIcon";
import { aboutStorySnapshots } from "@/lib/data/about";

const cardClass = {
  pink: "bg-accent text-white",
  yellow: "bg-accent-yellow text-foreground",
  teal: "bg-accent-teal text-white",
} as const;

export function AboutStory() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // GSAP's color tween parser only understands literal colors
      // (hex/rgb/hsl/named), not var(...), so these mirror the
      // --foreground / --muted tokens in globals.css directly.
      const unfilledColor = "rgba(68, 68, 68, 0.35)";
      const foregroundColor = "#191919";

      gsap.from(".story-copy", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".story-photo", {
        scale: 1.08,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      ScrollTrigger.batch(".story-stat", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          }),
      });

      const split = SplitText.create(".story-fill", {
        type: "chars",
        charsClass: "story-fill-char",
      });

      gsap.set(split.chars, { color: unfilledColor });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".story-fill",
          start: "top 80%",
          end: "bottom 40%",
          scrub: 0.3,
        },
      }).to(split.chars, {
        color: foregroundColor,
        stagger: 0.05,
        ease: "none",
      });

      return () => split.revert();
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-20">
      <Container className="flex flex-col border-t border-border pt-14 ">
        <p className="story-copy story-fill text-2xl leading-relaxed">
          Founded in 2022, Jam Space is an interior design studio creating
          thoughtful residential and commercial spaces through creativity,
          functionality, and timeless craftsmanship. We transform ideas into
          inspiring environments that reflect every client&apos;s unique vision.
        </p>        
      </Container>

      <div className="mt-10 max-w-[1340px] mx-auto">
        <div className="story-photo flex">
          <div className="relative h-80 w-full overflow-hidden rounded-xl md:h-96">
            <Image
              src="/images/about-strip-01.webp"
              alt="Jam Space interior project"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          di
        </div>
        <p className="story-copy max-w-2xl text-muted">
          Jam Space is a Bangladesh based interior design studio specializing in
          residential design, commercial interiors, 3D visualization, and
          design consultation. We create spaces that balance beauty, purpose,
          and everyday functionality.
        </p>
      </div>

      <Container className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {aboutStorySnapshots.map((snapshot) => (
          <div
            key={snapshot.label}
            className={`story-stat flex flex-col gap-4 rounded-xl p-8 ${cardClass[snapshot.accent]}`}
          >
            <div className="flex items-center gap-3">
              <StatIcon type={snapshot.icon} className="h-6 w-6" />
              <span className="text-5xl font-medium">
                {snapshot.value}
                {snapshot.suffix}
              </span>
            </div>
            <div>
              <p className="text-lg font-medium">{snapshot.label}</p>
              <p className="mt-1 text-sm opacity-80">{snapshot.description}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
