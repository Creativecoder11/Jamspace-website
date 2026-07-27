"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { aboutValues } from "@/lib/data/about";

export function AboutValues() {
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

      ScrollTrigger.batch(".value-card", {
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

      <div className="mt-13 pb-13 border-b border-border ">
        <div className="max-w-[1340px] mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {aboutValues.map((value, index) => (
          <div
            key={value.label}
            className="value-card flex items-center gap-4 border border-border p-1"
          >
            <Image
              src={`/icons/about/value-${index + 1}.svg`}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 shrink-0"
            />
            <span className="font-medium">{value.label}</span>
          </div>
        ))}
        </div>
      </div>  
    </section>
  );
}
