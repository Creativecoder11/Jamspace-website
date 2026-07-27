"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { StatIcon } from "@/components/ui/StatIcon";
import { aboutJourneySteps } from "@/lib/data/about";

const titleClass = {
  pink: "text-accent",
  yellow: "text-accent-yellow",
  teal: "text-accent-teal",
} as const;

export function AboutJourney() {
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

      gsap.fromTo(
        ".journey-photo",
        { scale: 1.1 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-frame",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      ScrollTrigger.batch(".journey-step", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          }),
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-20">
      <div className="journey-frame relative min-h-205 w-full overflow-hidden md:min-h-215">
        <div className="journey-photo absolute inset-0">
          <Image
            src="/images/projects-bg-01.webp"
            alt="A JamSpace project in progress"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative flex h-full min-h-205 flex-col justify-between gap-10 p-6 md:min-h-215 md:p-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <AnimatedHeading
              as="h2"
              lines={["The Journey", "Behind Every Space."]}
              className="text-4xl font-normal leading-tight text-white md:text-6xl md:leading-18"
            />
            <div className="journey-copy max-w-md">
              <p className="text-white/85">
                A seamless journey from the first conversation to the final
                handover, ensuring every detail is thoughtfully planned and
                expertly executed.
              </p>
              <div className="mt-6">
                <MagneticButton>
                  <Button href="/contact">Start a Project</Button>
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:w-2/3">
            {aboutJourneySteps.slice(0, 2).map((step) => (
              <div
                key={step.index}
                className="journey-step flex min-h-56 flex-col justify-between bg-background p-6"
              >
                <span className="text-sm text-muted">({step.index})</span>
                <div>
                  <h3
                    className={`text-2xl font-medium ${titleClass[step.accent]}`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div
              aria-hidden="true"
              className="hidden shrink-0 ml-20  items-end gap-4 text-white/15 md:flex"
            >
              <Image src={'/JAM.svg'} width={120} height={120} alt="logo" className="rotate-90"/>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:w-2/3">
              {aboutJourneySteps.slice(2, 4).map((step) => (
                <div
                  key={step.index}
                  className="journey-step flex min-h-56 flex-col justify-between bg-background p-6"
                >
                  <span className="text-sm text-muted">({step.index})</span>
                  <div>
                    <h3
                      className={`text-2xl font-medium ${titleClass[step.accent]}`}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
