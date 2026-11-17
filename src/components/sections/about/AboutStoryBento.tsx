"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { stats } from "@/lib/data/stats";
import { locations } from "@/lib/data/locations";
import BangladeshMap from "@/components/ui/BangladeshMap";

const CIRCLE_TEXT = "* PLAY THE VIDEO * PLAY THE VIDEO * PLAY THE VIDEO * ";

export function AboutStoryBento() {
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<SVGSVGElement>(null);
  const badgeRotationTween = useRef<gsap.core.Tween | null>(null);

  const pathId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const accentTextClass = {
    pink: "text-white",
    yellow: "text-accent-yellow",
    teal: "text-accent-teal",
    white: "text-white",
  } as const;

  const stat = stats[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as {
            reduced: boolean;
          };

          if (reduced) {
            gsap.set([".story-fill", ".stat-card", ".stat-icon"], {
              clearProps: "all",
              opacity: 1,
              y: 0,
            });
            return;
          }

          gsap.set(".stat-card", {
            opacity: 0,
            y: 30,
          });

          if (badgeRef.current) {
            badgeRotationTween.current = gsap.to(badgeRef.current, {
              rotation: 360,
              duration: 30,
              repeat: -1,
              ease: "none",
              transformOrigin: "50% 50%",
            });
          }

          ScrollTrigger.batch(".stat-card", {
            start: "top 85%",
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: "power3.out",
                overwrite: "auto",
              });

              batch.forEach((card) => {
                const reels = gsap.utils.toArray<HTMLElement>(".reel", card);

                reels.forEach((reel, di) => {
                  const digitHeight =
                    (reel.firstElementChild as HTMLElement | null)
                      ?.clientHeight ?? 0;

                  const distance = (reel.children.length - 1) * digitHeight;

                  if (distance <= 0) return;

                  gsap.to(reel, {
                    y: -distance,
                    duration: 1.6,
                    delay: di * 0.15,
                    ease: "power2.inOut",
                  });
                });
              });
            },
          });

          const icons = gsap.utils.toArray(".stat-icon");

          if (icons.length) {
            gsap.from(icons, {
              rotate: -20,
              opacity: 0,
              duration: 0.6,
              stagger: 0.15,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }

          const split = SplitText.create(".story-fill", {
            type: "words,chars",
          });

          gsap.set(split.chars, {
            color: "#1919194D",
          });

          gsap.set(split.words, {
            whiteSpace: "nowrap",
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
            badgeRotationTween.current?.kill();
            split.revert();
          };
        },
      );

      return () => mm.revert();
    },
    {
      scope: containerRef,
    },
  );

  return (
    <section
      ref={containerRef}
      className="pt-15 md:pt-0 pb-15 md:py-20 px-4 md:px-0"
    >
      <Container className="flex flex-col md:pt-14">
        <p className="story-fill text-xl md:text-3xl leading- md:leading-11 font-medium">
          Established in Dhaka in 2023, Jam Space brings together interiors,
          architecture, furniture, and consultancy & visualisation. We begin by
          listening, then develop ideas around how people live, work and
          experience a space.
        </p>
      </Container>

      <div className="mx-auto flex max-w-335 mt-4 md:mt-10 flex-col gap-4 px-0 md:px-0">
        {/* First Row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[50%]">
            <div className="relative h-90 md:h-120 overflow-hidden">
              <Image
                src="/images/hero-image-01.webp"
                alt="Jam Space Interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-md border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-sm leading-relaxed text-white">
                    Clients can engage us for design alone. Where execution is
                    separately commissioned, we coordinate the approved work
                    through an agreed scope, quotation and timeline.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full md:w-[25%] flex-col gap-4">
            {/* Logo */}
            <div className="flex h-45 md:h-full items-center justify-center bg-white">
              <Logo svgClassName="h-20 md:h-[105px] md:w-[200px]" />
            </div>

            {/* Stats */}
            <div className="flex h-45 md:h-50 items-center justify-center bg-accent">
              <div className="stat-card flex flex-col gap-4 px-4 py-16">
                <div className="flex items-center justify-center gap-1.5 md:gap-3">
                  <svg
                    className="stat-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M23 1V23H1V12.999H13.001V1H23Z"
                      fill="#ffffff"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </svg>

                  <span
                    className={`stat-number flex text-start text-6xl md:text-7xl font-medium leading-none ${
                      accentTextClass[stat.accent]
                    }`}
                  >
                    <p>{stats[0].value}</p>
                  </span>

                  <span
                    className={`text-6xl md:text-7xl font-medium ${
                      accentTextClass[stat.accent]
                    }`}
                  >
                    {stat.suffix}
                  </span>
                </div>

                <p
                  className={`text-center text-xl text-foreground ${
                    accentTextClass[stat.accent]
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[25%]">
            <div className="relative">
              {/* Video Thumbnail */}
              <div className="relative h-90 md:h-120 overflow-hidden">
                <Image
                  src="/images/about-bento-thum.webp"
                  alt="Bedroom interior — behind the scenes of a Jam Space project"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/35" />

                {/* Play Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  onMouseEnter={() => badgeRotationTween.current?.timeScale(4)}
                  onMouseLeave={() => badgeRotationTween.current?.timeScale(1)}
                  aria-label="Play the video"
                  className="absolute left-1/2 top-1/2 flex h-24 w-24 md:h-40 md:w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                >
                  {/* Circular Text */}
                  <svg
                    ref={badgeRef}
                    className="video-badge-circle absolute -inset-6.25 h-[calc(100%+50px)] w-[calc(100%+50px)]"
                    viewBox="0 0 200 200"
                  >
                    <defs>
                      <path
                        id={pathId}
                        d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                        fill="none"
                      />
                    </defs>

                    <text
                      fill="white"
                      fontSize="15"
                      letterSpacing="2"
                      fontWeight="500"
                    >
                      <textPath href={`#${pathId}`} startOffset="0%">
                        {CIRCLE_TEXT}
                      </textPath>
                    </text>
                  </svg>

                  {/* Play Icon */}
                  <Image
                    src="/icons/play.png"
                    width={140}
                    height={140}
                    alt="Play video icon"
                    className="relative z-10"
                  />
                </button>
              </div>

              {isOpen && (
                <div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Jam Space video"
                  className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 p-4 md:p-6"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close video"
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center text-4xl leading-none text-white transition-opacity hover:opacity-70 md:right-6 md:top-6"
                  >
                    ×
                  </button>

                  {/* YouTube Video */}
                  <div
                    className="relative w-full max-w-5xl overflow-hidden rounded-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/x6nOpBIlUL4?autoplay=1&rel=0"
                      title="Jam Space video"
                      className="aspect-video w-full"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[25%]">
            <div className="bg-accent-yellow h-full p-5">
              <div className="flex h-50 md:h-full flex-col justify-between">
                {/* Top */}
                <div className="flex items-center gap-1.5 md:gap-3 border-b border-white/40 pb-4">
                  <svg
                    className="stat-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M22.3818 23H1.61816L11.999 2.23633L22.3818 23Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>

                  <span
                    className={`stat-number flex text-start text-6xl md:text-7xl font-medium leading-none ${
                      accentTextClass[stat.accent]
                    }`}
                  >
                    <p>{stats[1].value}</p>
                  </span>

                  <span
                    className={`text-6xl md:text-7xl font-medium ${
                      accentTextClass[stat.accent]
                    }`}
                  >
                    {stats[1].suffix}
                  </span>
                </div>

                {/* Bottom */}
                <div>
                  <p className="text-xl font-medium text-white">
                    {stats[1].label}
                  </p>
                  <p className="text-[16px] text-white">
                    Homes, workplaces and commercial spaces designed around the
                    people who use them.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[50%] text-white p-5 bg-[#231F20]">
            <div className="flex h-full flex-col xl:flex-row gap-10 xl:gap-8">
              <div className="flex min-w-0 flex-1 flex-col">
                {/* heading */}
                <h3 className="text-[18px] md:text-[20px] leading-[1.15] font-medium">
                  We design homes around how people live and commercial spaces
                  around how people work, shop and gather
                </h3>

                <div className="my-6 border-t-1 border-white/20" />

                {/* locations: 01–05 left column, 06–10 right column */}
                <ul className="grid grid-cols-2 grid-rows-5 grid-flow-col gap-x-4 md:gap-x-6 gap-y-4 text-sm">
                  {locations.map(({ name }, i) => (
                    <li key={name} className="flex items-center gap-2">
                      <span className="text-[#E92A7B] tabular-nums">
                        ({String(i + 1).padStart(2, "0")})
                      </span>
                      <span className="whitespace-nowrap">{`// ${name}`}</span>
                    </li>
                  ))}
                </ul>

                {/* plus row */}
                <div>
                  <div
                    className="mt-auto pt-12 flex justify-between"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <path
                          d="M8 3.34839V4.65156H4.70377V8H3.31401V4.65156H0V3.34839H3.31401V0H4.70377V3.34839H8Z"
                          fill="#F8C452"
                        />
                      </svg>
                    ))}
                  </div>
                  <div
                    className="mt-auto pt-6 flex justify-between"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <path
                          d="M8 3.34839V4.65156H4.70377V8H3.31401V4.65156H0V3.34839H3.31401V0H4.70377V3.34839H8Z"
                          fill="#F8C452"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* map */}
              <div className="flex w-full xl:w-[40%] shrink-0 items-center justify-center">
                <BangladeshMap className="max-w-[300px] xl:max-w-none" />
              </div>
            </div>
          </div>

          <div className="w-full md:w-[25%]">
            <div className="bg-accent-teal h-full p-5">
              <div className="flex h-50 md:h-full flex-col justify-between">
                {/* Top */}
                <div className="flex items-center gap-3 border-b border-white/40 pb-4">
                  <svg
                    className="stat-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M23 23H1V2.41406L11.999 13.4131L12.7061 12.7061L23 2.41309V23Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>

                  <span className="flex text-white text-6xl md:text-7xl font-medium leading-none">
                    <p>{String(stats[2].value).padStart(2, "0")}</p>
                  </span>
                </div>

                {/* Bottom */}
                <div>
                  <p className="text-xl font-medium text-white">
                    {stats[2].label}
                  </p>
                  <p className="text-[16px] text-white">
                    Interiors, architecture, furniture, and consultancy &amp;
                    visualisation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
