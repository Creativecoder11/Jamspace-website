"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

import { aboutPillars } from "@/lib/data/about";

const accentTextClass = {
  pink: "text-accent",
  yellow: "text-accent-yellow",
  teal: "text-accent-teal",
} as const;

export function AboutPillars() {
  const containerRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      ScrollTrigger.batch(".pillar-card", {
        start: "top 70%",
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

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = cardRefs.current.filter(
            (el): el is HTMLDivElement => el !== null
          );

          const trailingCards = cards.slice(1);

          gsap.set(trailingCards, {
            yPercent: (i) => 110 * (i + 1),
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stackRef.current,
              start: "top top",
              end: `+=${trailingCards.length * 110}%`,
              pin: true,
              scrub: 1,
            },
          });

          trailingCards.forEach((card) => {
            tl.to(card, {
              yPercent: 0,
              ease: "none",
            });
          });

          return () => {
            gsap.set(cards, {
              clearProps: "transform",
            });
          };
        }
      );

      return () => mm.revert();
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section ref={containerRef}>
      <div className="mt-25 border-y border-border">
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

      <div ref={stackRef} className="flex flex-row pt-13">
        {aboutPillars.map((pillar, i) => (
          <div
            key={pillar.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              zIndex: aboutPillars.length - i,
            }}
            className="pillar-card relative flex h-85 flex-col justify-between border border-border bg-background p-6"
          >
            <h3
              className={`flex flex-col justify-between text-3xl font-medium ${
                accentTextClass[pillar.accent]
              }`}
            >
              {pillar.title}
            </h3>

            <p className="mt-3 text-sm text-muted">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      <Container className="mt-16">
        <MagneticButton>
          <Button href="/contact">Start a Project</Button>
        </MagneticButton>
      </Container>
    </section>
  );
}