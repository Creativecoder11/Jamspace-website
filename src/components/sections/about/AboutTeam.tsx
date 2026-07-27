"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { aboutTeam } from "@/lib/data/about";

const panelClass = {
  pink: "bg-accent text-white",
  yellow: "bg-accent-yellow text-foreground",
  teal: "bg-accent-teal text-white",
} as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function AboutTeam() {
  const containerRef = useRef<HTMLElement>(null);

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

      ScrollTrigger.batch(".team-card", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          }),
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-20">
      <div className="border-y border-border">
        <div className="mx-auto flex max-w-[1340px] items-start justify-between">
          <div className="w-2/3 border-r border-border py-8">
            <AnimatedHeading
              as="h2"
              lines={["Designing Spaces", "That Feel Meaningful."]}
              className="text-6xl font-normal leading-18"
            />
          </div>

          <div className="w-1/3 py-8 pl-8">
            <p className="text-muted">
              Discover the passion, purpose, and philosophy that shape every
              space we create, transforming ideas into interiors that inspire
              everyday living.
            </p>

            <div className="mt-6">
              <MagneticButton>
                <Button href="/about">Learn More About Us</Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <Container className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {aboutTeam.map((member, i) => (
          <div key={`${member.name}-${i}`} className="team-card">
            <div
              className={`group relative aspect-[3/4] overflow-hidden rounded-xl ${panelClass[member.accent]}`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-6xl font-medium opacity-90">
                {initials(member.name)}
              </div>
              <BrandGlyph
                shape="step"
                color="white"
                className="absolute right-4 top-4 h-4 w-4 opacity-60"
              />

              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/50 p-4 text-sm text-white backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0">
                {member.caption}
              </div>
            </div>

            <p className="mt-4 font-medium">{member.name}</p>
            <p className="text-sm text-muted">{member.role}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
