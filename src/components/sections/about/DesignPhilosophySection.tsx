"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Data */

type Accent = "pink" | "gold" | "teal";

interface BenefitItem {
  title: string; // two lines, split on \n
  description: string;
  accent: Accent;
}

const BENEFITS = [
  {
    title: "Vision\nDriven Design",
    description:
      "Every project starts by understanding your vision, creating spaces that are meaningful and uniquely yours.",
    accent: "pink",
  },
  {
    title: "Thoughtful\nCraftsmanship",
    description:
      "We combine creativity and functionality to create interiors that are timeless, practical, and beautifully refined.",
    accent: "gold",
  },
  {
    title: "Collaborative\nJourney",
    description:
      "From the first consultation to the final reveal, we create a seamless and rewarding design experience together.",
    accent: "teal",
  },
  {
    title: "Lasting\nImpact",
    description:
      "We create interiors that inspire everyday living, enhance the way you experience your space, and stand the test of time.",
    accent: "pink",
  },
].slice(0, 4) as BenefitItem[];

const ACCENT_TEXT: Record<Accent, string> = {
  pink: "text-[color:var(--dp-pink)]",
  gold: "text-[color:var(--dp-gold)]",
  teal: "text-[color:var(--dp-teal)]",
};

/* StatCard */

function BenefitCard({ item, index }: { item: BenefitItem; index: number }) {
  const [line1, line2] = item.title.split("\n");

  return (
    <div
      className="flex h-full flex-col justify-between border border-border p-4 md:p-6 "
      style={
        index === 1
          ? {
              borderRightWidth: "0.5px",
            }
          : undefined
      }
    >
      <h3
        className={`text-[24px] font-medium leading-[1.15] md:text-[30px] ${ACCENT_TEXT[item.accent]}`}
      >
        {line1}
        <br />
        {line2}
      </h3>

      <p className="max-w-60 text-sm leading-relaxed text-[#444444] md:text-base">
        {item.description}
      </p>
    </div>
  );
}

/* Section */

const N = BENEFITS.length;

export default function DesignPhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const staircaseRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !staircaseRef.current) {
      lineRefs.current.forEach((el) => el && gsap.set(el, { scaleY: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
        gsap.to(line, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: staircaseRef.current,
            start: `top ${75 - i * 8}%`,
            end: "bottom bottom",
            scrub: 0.4,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F7F6F1] text-(--dp-ink)"
      style={
        {
          "--dp-bg": "#f4f1ea",
          "--dp-ink": "#171310",
          "--dp-line": "rgba(23,19,16,0.12)",
          "--dp-pink": "#e8137c",
          "--dp-gold": "#f2a93e",
          "--dp-teal": "#21b8a1",
        } as React.CSSProperties
      }
    >
      <div className="w-full mx-auto px-4 md:px-0">
        <div className="mt-16 md:mt-25 md:border-y border-border mb-8 md:mb-16">
          <div className="flex flex-col md:flex-row max-w-335 mx-auto items-start justify-between">
            <div className="md:w-2/3 md:border-r border-border md:pr-0 pb-4 md:py-8">
              <AnimatedHeading
                as="h2"
                lines={["Designing Spaces", "That Feel Meaningful."]}
                className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18 md:mx-0"
              />
            </div>

            <div className="md:w-1/3 md:border-l border-border md:pl-8 md:py-8 md:mx-0">
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

        {/* Desktop staircase */}
        <div
          ref={staircaseRef}
          className="relative hidden md:grid max-w-335 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${N}, 1fr)`,
            gridTemplateRows: `repeat(${N}, 335px)`,
          }}
        >
          {/* animated vertical dividers — N-1 lines between N columns */}
          {Array.from({ length: N - 1 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0 w-px "
              style={{ left: `${((i + 1) / N) * 100}%` }}
            />
          ))}

          {BENEFITS.map((item, i) => (
            <div
              key={item.title}
              className=""
              style={{
                gridColumnStart: i + 1,
                gridRowStart: i + 1,
                gridRowEnd: N + 1,
              }}
            >
              <div className="sticky top-30 h-83.75">
                <BenefitCard item={item} index={i} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-1 gap-4 w-full md:hidden">
          {BENEFITS.map((item, i) => (
            <div key={item.title} className="w-full min-h-55">
              <BenefitCard item={item} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom CTA row */}
        <div className="max-w-[1340px] mx-auto border border-border overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div className="hidden md:block border-r border-border h-28" />

            <div className="flex items-center justify-start h-28 pl-5 md:border-r border-border">
              <MagneticButton>
                <Button href="/about">Start Projects</Button>
              </MagneticButton>
            </div>

            <div className="hidden md:block border-r border-border h-28" />

            <div className="hidden md:block h-28" />
          </div>
        </div>
      </div>
    </section>
  );
}
