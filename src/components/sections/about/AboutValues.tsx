"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
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
    <section ref={containerRef} className="py-15 md:py-20">
      <div className="border-y border-border">
        <div className="flex flex-col md:flex-row max-w-335 mx-auto items-start justify-between">
          <div className="md:w-2/3 border-b md:border-b-0 border-r border-border pr-4 md:pr-0 py-5 md:py-8">
            <AnimatedHeading
              as="h2"
              lines={["Designing Spaces", "That Feel Meaningful."]}
              className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18 mx-4 md:mx-0"
            />
          </div>
          <div className="border-l border-border md:w-1/3 pl-4 md:pl-8 py-4 md:py-8 mx-4 md:mx-0">
            <p className="text-muted">
              Discover the passion, purpose, and philosophy that shape every
              space we create, transforming ideas into interiors that inspire
              everyday living.
            </p>
            <div className="mt-3 md:mt-6">
              <Button href="/about">Learn More About Us</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 md:mt-13 pb-7 md:pb-13 border-b border-border mx-4 md:mx-0">
        <div className="max-w-[1340px] mx-auto grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-2 md:grid-cols-3">
          {aboutValues.map((value, index) => (
            <div
              key={value.label}
              className="value-card flex items-center gap-2 md:gap-4 border border-border p-1"
            >
              <Image
                src={`/icons/about/value-${index + 1}.svg`}
                alt=""
                width={44}
                height={44}
                className="h-8 md:h-11 w-8 md:w-11 shrink-0"
              />
              <span className="font-medium">{value.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
