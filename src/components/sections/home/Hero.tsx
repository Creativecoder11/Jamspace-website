"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { heroSlides, heroSlideCount } from "@/lib/data/hero";

function PinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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
  const imageCrossfadeRef = useRef<HTMLDivElement>(null);
  const lastAnimatedSlide = useRef(1);
  const slideDirection = useRef<1 | -1>(1);
  const [slide, setSlide] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const activeSlide = heroSlides[slide - 1];
  const upcomingSlides = [1, 2].map((offset) => {
    const index = (slide - 1 + offset) % heroSlideCount;
    return { index, ...heroSlides[index] };
  });

  useGSAP(
    () => {
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
    { scope: containerRef },
  );

  useGSAP(
    () => {
      if (slide === lastAnimatedSlide.current) return;
      lastAnimatedSlide.current = slide;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([imageCrossfadeRef.current, ".preview-card"], {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          imageCrossfadeRef.current,
          { xPercent: slideDirection.current * 6, scale: 1.15 },
          { xPercent: 0, scale: 1, duration: 1 },
        )
        .fromTo(
          ".preview-card",
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, stagger: 0.12, duration: 0.6 },
          "-=0.75",
        );
    },
    { scope: containerRef, dependencies: [slide] },
  );

  useEffect(() => {
    if (isHovered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      slideDirection.current = 1;
      setSlide((s) => (s === heroSlideCount ? 1 : s + 1));
    }, 4000);

    return () => window.clearInterval(id);
  }, [slide, isHovered]);

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[100vh] min-h-[700px] mx-auto overflow-x-hidden overflow-y-hidden"
    >
      {/* Image Container */}
      <div ref={imageRef} className="absolute inset-0 overflow-x-hidden overflow-y-hidden">
        <div ref={imageCrossfadeRef} className="absolute inset-0">
          <Image
            src={activeSlide.image}
            alt={`Interior design project ${slide} of ${heroSlideCount} by JamSpace`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/10 to-transparent" />
      </div>

      <div className="relative z-10 flex items-end h-full overflow-x-hidden mx-4 md:mx-0">
        <div className="w-full md:border-t border-white/40">
          <div className="flex flex-col md:flex-row w-full max-w-335 mx-auto gap-10 items-start md:items-end justify-between">
            {/* Fix Text Card */}
            <div className=" md:pb-10">
              <AnimatedHeading
                as="h1"
                lines={["Designed", "Beyond Walls."]}
                className="text-[3rem] leading-[120%] font-normal md:leading-24 text-white md:text-hero"
              />
              <p className="hero-subcopy text-base mt-6 max-w-md text-white/85">
                Every detail is carefully considered to create interiors that
                reflect your personality while delivering timeless quality.
              </p>
              <div className="hero-cta mt-4 md:mt-8">
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
            <div className="flex w-full md:w-auto flex-col pb-10 gap-4">
              <p className="text-lg text-white/80 md:ml-30">Our Recent Projects</p>
              <div className="flex w-full flex-col md:flex-row items-stretch md:items-end">
                {/* Desktop */}
                <div className="mr-6 w-[100px] hidden md:flex flex-col items-center gap-3 text-white">
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
                      onClick={() => {
                        slideDirection.current = -1;
                        setSlide((s) => (s === 1 ? heroSlideCount : s - 1));
                      }}
                      className="flex h-8 w-8 items-center justify-center border-white/40 "
                    >
                      <Image
                        src="/icons/left-arrow.svg"
                        alt=""
                        width={30}
                        height={30}
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="Next slide"
                      onClick={() => {
                        slideDirection.current = 1;
                        setSlide((s) => (s === heroSlideCount ? 1 : s + 1));
                      }}
                      className="flex h-8 w-8 items-center justify-center border-white/40"
                    >
                      <Image
                        src="/icons/right-arrow.svg"
                        alt=""
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  {upcomingSlides.map((card) => (
                    <div
                      key={card.index}
                      className="preview-card group flex h-[200px] w-[164px] md:h-72 md:w-55 flex-col rounded-lg border border-white/25 bg-white/10 p-3 backdrop-blur-md"
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

                      <div className="relative mt-3 flex-1 overflow-hidden rounded-sm">
                        <Image
                          src={card.thumb ?? card.image}
                          alt={`${card.name} — ${card.location}`}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />

                        <button
                          type="button"
                          aria-label={`View ${card.name} — ${card.location}`}
                          onClick={() => {
                            slideDirection.current = 1;
                            setSlide(card.index + 1);
                          }}
                          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 pointer-events-none opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto"
                        >
                          <span className="relative flex items-center justify-center">
                            <Image
                              src="/icons/View - Vector.png"
                              alt=""
                              width={60}
                              height={60}
                            />

                            <span className="absolute inset-0 pt-6 flex items-center justify-center text-sm font-medium text-white">
                              View
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mobile */}
                <div className="mt-5 flex w-full md:hidden items-center justify-between text-white">
                  <span className="text-3xl font-sans font-normal">
                    {String(slide).padStart(2, "0")}/
                    <span className="text-base text-white/60">
                      {String(heroSlideCount).padStart(2, "0")}
                    </span>
                  </span>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      aria-label="Previous slide"
                      onClick={() => {
                        slideDirection.current = -1;
                        setSlide((s) => (s === 1 ? heroSlideCount : s - 1));
                      }}
                      className="flex h-8 w-8 items-center justify-center"
                    >
                      <Image
                        src="/icons/left-arrow.svg"
                        alt=""
                        width={30}
                        height={30}
                      />
                    </button>

                    <button
                      type="button"
                      aria-label="Next slide"
                      onClick={() => {
                        slideDirection.current = 1;
                        setSlide((s) => (s === heroSlideCount ? 1 : s + 1));
                      }}
                      className="flex h-8 w-8 items-center justify-center"
                    >
                      <Image
                        src="/icons/right-arrow.svg"
                        alt=""
                        width={30}
                        height={30}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
