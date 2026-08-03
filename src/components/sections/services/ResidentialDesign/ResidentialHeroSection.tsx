"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

import { gsap, ScrollTrigger, SplitText } from "@/lib/animations/gsap";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Container } from "@/components/ui/Container";

export default function ResidentialHeroSection() {
  const ctaTrackRef = useRef<HTMLDivElement>(null);
  const ctaStripImages = [
    "/images/cta-strip-01.webp",
    "/images/cta-strip-02.webp",
    "/images/cta-strip-03.webp",
    "/images/cta-strip-04.webp",
  ];

  useGSAP(() => {
    if (ctaTrackRef.current) {
      gsap.to(ctaTrackRef.current, {
        xPercent: -50,
        duration: 30,
        repeat: -1,
        ease: "none",
      });
    }

    const split = SplitText.create(".story-fill", {
      type: "lines,words,chars",
      linesClass: "story-fill-line",
      autoSplit: true,
    });

    gsap.set(split.chars, {
      color: "#1919194D",
    });

    gsap.to(split.chars, {
      color: "#191919",
      stagger: 0.02,
      ease: "none",
      scrollTrigger: {
        trigger: ".story-fill",
        start: "top 80%",
        end: "bottom 35%",
        scrub: true,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      split.revert();
    };
  });

  return (
    <>
      <section>
        <div className="mt-20 md:mt-38 md:border-y border-border px-4 md:px-0">
          <div className="mx-auto flex flex-col md:flex-row max-w-335 md:items-start md:justify-between gap-2 md:gap-0">
            <div className="md:w-2/3 md:border-r border-border pt-4 md:py-8">
              <AnimatedHeading
                as="h2"
                lines={["Residential", "Design."]}
                className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
              />
            </div>

            <div className="md:w-1/3 pb-4 md:py-8 md:pl-8">
              <p className="text-muted">
                Thoughtfully designed homes that balance comfort, functionality,
                and timeless aesthetics to reflect the way you live.
              </p>

              <div className="mt-3 md:mt-6">
                <MagneticButton>
                  <Button href="/about">Start a Project</Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div ref={ctaTrackRef} className="flex h-full w-max gap-5">
            {[...ctaStripImages, ...ctaStripImages].map((src, i) => (
              <div
                key={i}
                className="relative gap-10 h-65 w-65 shrink-0 md:h-105 md:w-105"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
        <Container className="py-12 md:py-20 px-4 md:px-0">
          <p>About the Service:</p>
          <p className="story-fill mt-2.5 text-2xl md:text-[27px] leading-8 md:leading-10 md:pr-16">
            Your home should be more than just a place to live. Our residential
            design service creates interiors that reflect your lifestyle,
            maximize functionality, and bring lasting comfort through thoughtful
            planning, refined materials, and timeless design.
          </p>
        </Container>
      </section>
    </>
  );
}
