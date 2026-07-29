"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import type { Service } from "@/lib/types";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path d="M14 0V14H0V6.99959H7.00083V0H14Z" fill="currentColor" />
    </svg>
  );
}

export function ServiceDetail({ service }: { service: Service }) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".line", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".service-detail-fade", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
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
      <Container className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <AnimatedHeading
          as="h2"
          lines={[service.heading ?? service.title]}
          className="max-w-xl text-4xl font-normal leading-tight md:text-subheading"
        />

        <div className="service-detail-fade max-w-md">
          {service.description && (
            <p className="text-lg text-muted">{service.description}</p>
          )}
          <div className="mt-6">
            <Button href="/contact">Book a Consultation</Button>
          </div>
        </div>
      </Container>

      {service.subServices && service.subServices.length > 0 && (
        <Container className="service-detail-fade mt-14 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-border pt-10 sm:grid-cols-2">
          {service.subServices.map((sub) => (
            <div
              key={sub.label}
              className="flex items-center gap-3 text-lg text-foreground"
            >
              <span className="text-accent">
                <CheckIcon />
              </span>
              {sub.label}
            </div>
          ))}
        </Container>
      )}
    </section>
  );
}
