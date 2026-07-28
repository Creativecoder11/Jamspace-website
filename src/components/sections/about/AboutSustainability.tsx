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
    <section ref={containerRef} className="pt-20">
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

      <Container className="mt-14 flex flex-col gap-10 md:flex-row md:gap-[100px]">
        <div className="sustain-photo relative h-[360px] w-[360px] shrink-0 overflow-hidden">
          <Image
            src="/images/about-strip-06.png"
            alt="A durable, thoughtfully planned JamSpace interior"
            fill
            sizes="360px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-5">
          {aboutSustainability.map((item) => (
            <div
              key={item.index}
              className="sustain-row grid grid-cols-1 gap-6 border-t border-border py-6 md:grid-cols-[400px_1fr]"
            >
              <div className="flex items-center gap-12.5">
                <span className="text-xl text-accent">({item.index})</span>
                <h3 className="text-[27px]">{item.title}</h3>
              </div>

              <p className="text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
