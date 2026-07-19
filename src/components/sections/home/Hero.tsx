"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { heroPreviewCards, heroSlideCount } from "@/lib/data/hero";
import { usePreloaderDone } from "@/hooks/usePreloaderDone";

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-7.4 7-13a7 7 0 1 0-14 0c0 5.6 7 13 7 13Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9" r="2.4" fill="currentColor" />
    </svg>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(1);
  const preloaderDone = usePreloaderDone();

  // Intro reveal (image clip/scale-in, line-by-line headline, subcopy, CTA,
  // preview cards) plus a continuous scroll parallax on the hero image.
  // Gated on the preloader finishing first (dependencies: [preloaderDone]).
  useGSAP(
    () => {
      if (!preloaderDone) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          if (reduced) {
            gsap.set(
              [
                imageRef.current,
                ".line",
                ".hero-subcopy",
                ".hero-cta",
                ".preview-card",
              ],
              { clearProps: "all", opacity: 1 },
            );
            return;
          }

          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .fromTo(
              imageRef.current,
              { scale: 1.15, clipPath: "inset(6% 6% 6% 6% round 16px)" },
              {
                scale: 1,
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                duration: 1.4,
              },
            )
            .from(
              ".line",
              { yPercent: 110, stagger: 0.12, duration: 0.9 },
              "-=0.9",
            )
            .from(
              ".hero-subcopy",
              { y: 20, opacity: 0, duration: 0.8 },
              "-=0.6",
            )
            .from(".hero-cta", { y: 10, opacity: 0, duration: 0.6 }, "-=0.5")
            .from(
              ".preview-card",
              { x: 40, opacity: 0, stagger: 0.15, duration: 0.7 },
              "-=0.6",
            );

          gsap.to(imageRef.current, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [preloaderDone] },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] min-h-[700px]  mx-auto overflow-x-hidden overflow-y-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 overflow-x-hidden">
        <Image
          src="/images/hero-01.webp"
          alt="Warm, softly lit bedroom interior designed by JamSpace"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="relative z-10 flex  items-end h-full overflow-x-hidden">
        <div className="w-full border-t border-white/40">
          <div className="flex max-w-[1340px] mx-auto gap-10 items-end justify-between">
            {/* Fix Text Card */}
            <div className="pb-10">
              <AnimatedHeading
                as="h1"
                lines={["Designed", "Beyond Walls."]}
                className="text-[3rem] font-normal leading-24 text-white md:text-hero"
              />
              <p className="hero-subcopy mt-6 max-w-md text-white/85">
                Every detail is carefully considered to create interiors that
                reflect your personality while delivering timeless quality.
              </p>
              <div className="hero-cta mt-8">
                <MagneticButton>
                  <Button href="/contact" variant="light">
                    Book a Consultant
                  </Button>
                </MagneticButton>
              </div>
            </div>

            {/* Jam Outline Logo */}
            <div className="hidden md:flex md:flex-col md:justify-end md:items-end border-r border-l pr-5 pl-20 pb-5 border-white/40 h-[400px]">
              <Image
                src="/JAM.svg"
                alt=""
                width={1}
                height={1}
                className="w-[100px] h-[700px]"
              />
            </div>

            {/* Project Container */}
            <div className="flex flex-col pb-10 items-start gap-4">
              <p className="text-sm text-white/80">Our Recent Projects</p>
              <div className="flex items-end ">
                <div className="mr-6 flex flex-col items-center gap-3 text-white">
                  <span className="text-5xl font-sans font-normal">
                    {String(slide).padStart(2, "0")}/
                    <span className="text-lg font-sans text-white/60">
                      {String(heroSlideCount).padStart(2, "0")}
                    </span>
                  </span>
                  <div className="flex gap-5">
                    <button
                      type="button"
                      aria-label="Previous slide"
                      onClick={() =>
                        setSlide((s) => (s === 1 ? heroSlideCount : s - 1))
                      }
                      className="flex h-8 w-8 items-center justify-center border-white/40 "
                    >
                      <Image src="/icons/left-arrow.svg" alt="" width={30} height={30} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next slide"
                      onClick={() =>
                        setSlide((s) => (s === heroSlideCount ? 1 : s + 1))
                      }
                      className="flex h-8 w-8 items-center justify-center border-white/40"
                    >
                      <Image src="/icons/right-arrow.svg" alt="" width={30} height={30} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  {heroPreviewCards.map((card, i) => (
                    <div
                      key={i}
                      className="preview-card flex h-62.5 w-55 flex-col rounded-2xl border border-white/25 bg-white/10 p-3 backdrop-blur-md"
                    >
                      <div className="text-white">
                        <p className="text-sm font-medium uppercase tracking-wide">
                          {card.name}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-white/85">
                          <PinIcon />
                          {card.location}
                        </p>
                      </div>

                      <div className="relative mt-3 flex-1 overflow-hidden rounded-xl">
                        <Image
                          src={card.image}
                          alt={`${card.name} — ${card.location}`}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />

                        {i === 0 && (
                          <button
                            type="button"
                            aria-label="View project"
                            className="absolute opacity-100 left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2  items-center justify-center rounded-2xl"
                          >
                            <span className="text-[10px] font-medium text-white">
                              <Image src="/icons/hover-btn.svg" alt="" width={40} height={40} />
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
