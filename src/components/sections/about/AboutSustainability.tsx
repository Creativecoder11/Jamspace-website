"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { aboutSustainability } from "@/lib/data/about";

export function AboutSustainability() {
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

      gsap.from(".sustain-photo", {
        scale: 1.08,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".sustain-row", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-20">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <AnimatedHeading
          as="h2"
          lines={["Designing for", "a Better Tomorrow."]}
          className="text-6xl font-normal leading-18"
        />
        <div className="max-w-md">
          <p className="text-muted">
            Every design decision is guided by responsibility, creating
            spaces that are sustainable, functional, and built to last.
          </p>
          <div className="mt-6">
            <MagneticButton>
              <Button href="/contact">Contact Us Now</Button>
            </MagneticButton>
          </div>
        </div>
      </Container>

      <Container className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="sustain-photo relative h-80 w-full overflow-hidden rounded-xl md:h-full">
          <Image
            src="/images/about-strip-04.webp"
            alt="A durable, thoughtfully planned JamSpace interior"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col divide-y divide-border">
          {aboutSustainability.map((item) => (
            <div key={item.index} className="sustain-row py-6 first:pt-0">
              <div className="flex items-baseline gap-4">
                <span className="text-sm text-accent">({item.index})</span>
                <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="mt-3 text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
