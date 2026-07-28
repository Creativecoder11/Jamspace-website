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
    <section ref={containerRef}>
      <div className="journey-frame relative w-full overflow-hidden py-20">
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

        <div className="relative flex h-full max-w-335 mx-auto flex-col gap-10 px-4 md:px-0">
          <AnimatedHeading
            as="h2"
            lines={["The Journey", "Behind Every Space."]}
            className="text-4xl font-normal leading-tight text-white md:text-6xl md:leading-18"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Discover + Design */}
            <div className="grid gap-4 md:col-span-2 sm:grid-cols-2">
              {aboutJourneySteps.slice(0, 2).map((step) => (
                <div
                  key={step.index}
                  className="journey-step flex h-[420px] w-full flex-col justify-between bg-[#F7F6F1] p-6"
                >
                  <span className="text-base text-muted leading-[120%]">({step.index})</span>

                  <div>
                    <h3 className={`text-2xl font-medium ${titleClass[step.accent]}`}>
                      {step.title}
                    </h3>

                    <p className="mt-6 text-base text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Copy */}
            <div className="journey-copy flex justify-end items-center md:col-span-2">
              <div className="flex max-w-lg flex-col">
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


            {/* JAM Logo */}
            <div
              aria-hidden="true"
              className="hidden items-end justify-start text-white/15 md:col-span-2 md:flex"
            >
              <Image
                src="/JAM-v.svg"
                width={478}
                height={143}
                alt="logo"
              />
            </div>


            {/* Deliver + Reveal */}
            <div className="grid gap-4 md:col-span-2 sm:grid-cols-2">
              {aboutJourneySteps.slice(2, 4).map((step) => (
                <div
                  key={step.index}
                  className="journey-step flex h-[420px] w-full flex-col justify-between bg-[#F7F6F1] p-6"
                >
                  <span className="text-sm text-muted">({step.index})</span>

                  <div>
                    <h3 className={`text-2xl font-medium ${titleClass[step.accent]}`}>
                      {step.title}
                    </h3>

                    <p className="mt-6 text-sm text-muted">
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
