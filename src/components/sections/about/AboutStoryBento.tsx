"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { stats } from "@/lib/data/stats";
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

          if (!reduced) {
            badgeRotationTween.current = gsap.to(badgeRef.current, {
              rotation: 360,
              duration: 30,
              repeat: -1,
              ease: "none",
              transformOrigin: "50% 50%",
            });
          }
        },
      );

      ScrollTrigger.batch(".stat-card", {
        start: "top 85%",
        once: true,

        onEnter: (batch) => {
          gsap.from(batch, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          });

          batch.forEach((card) => {
            const reels = gsap.utils.toArray<HTMLElement>(".reel", card);

            reels.forEach((reel, di) => {
              const digitHeight =
                (reel.firstElementChild as HTMLElement | null)?.clientHeight ??
                0;

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
    {
      scope: containerRef,
    },
  );

  return (
    <section ref={containerRef} className="py-15 md:py-20 px-4 md:px-0">
      <Container className="flex flex-col pt-14">
        <p className="story-fill text-[21px] md:text-[27px] leading-[124%]">
          Founded in 2022, JamSpace is an interior design studio creating
          thoughtful residential and commercial spaces through creativity,
          functionality, and timeless craftsmanship. We transform ideas into
          inspiring environments that reflect every client&apos;s unique vision.
        </p>
      </Container>

      <div className="mx-auto flex max-w-335 mt-4 md:mt-10 flex-col gap-4 px-0 md:px-0">
        {/* First Row */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[50%]">
            <div className="relative h-[420px] md:h-120 overflow-hidden">
              <Image
                src="/images/hero-01.webp"
                alt="JamSpace Interior"
                width={240}
                height={240}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-md border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-sm leading-relaxed text-white">
                    Founded in 2022, JamSpace is an interior design studio
                    creating thoughtful residential and commercial spaces
                    through creativity, functionality, and timeless
                    craftsmanship. We transform ideas into inspiring
                    environments that reflect every client&apos;s unique vision.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full md:w-[25%] flex-col gap-4">
            {/* Logo */}
            <div className="flex h-[180px] md:h-full items-center justify-center bg-white">
              <Logo className="h-22" />
            </div>

            {/* Stats */}
            <div className="flex h-[180px] md:h-50 items-center justify-center bg-accent">
              <div className="stat-card flex flex-col gap-4 px-4 py-16">
                <div className="flex items-center justify-center gap-3">
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
                    className={`stat-number flex text-start text-4xl md:text-6xl font-medium leading-none ${accentTextClass[stat.accent]
                      }`}
                  >
                    <p>03</p>
                  </span>

                  <span
                    className={`text-4xl md:text-6xl font-medium ${accentTextClass[stat.accent]
                      }`}
                  >
                    {stat.suffix}
                  </span>
                </div>

                <p
                  className={`text-center text-xl text-foreground ${accentTextClass[stat.accent]
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
              <div className="relative h-[420px] md:h-120 overflow-hidden">
                <Image
                  src="/images/video-bg-01.webp"
                  alt="Bedroom interior — behind the scenes of a JamSpace project"
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
                  className="absolute left-1/2 top-1/2 flex h-24 w-24 md:h-40 md:w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:h-40 md:w-40"
                >
                  {/* Circular Text */}
                  <svg
                    ref={badgeRef}
                    className="video-badge-circle absolute inset-[-25px] h-[calc(100%+50px)] w-[calc(100%+50px)]"
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
                  aria-label="JamSpace video"
                  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-6"
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

                  {/* Video */}
                  <div
                    className="relative w-full max-w-5xl overflow-hidden rounded-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <video
                      src="/videos/jam-journey.mp4"
                      controls
                      autoPlay
                      playsInline
                      className="block max-h-[85vh] h-auto w-full object-contain"
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
              <div className="flex h-full flex-col justify-between">
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
                      d="M22.3818 23H1.61816L11.999 2.23633L22.3818 23Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>

                  <span
                    className={`stat-number flex text-start text-4xl md:text-6xl font-medium leading-none ${accentTextClass[stat.accent]
                      }`}
                  >
                    <p>44</p>
                  </span>

                  <span
                    className={`text-4xl md:text-6xl font-medium ${accentTextClass[stat.accent]
                      }`}
                  >
                    +
                  </span>
                </div>

                {/* Bottom */}
                <div>
                  <p className="text-xl font-medium text-white">Projects</p>
                  <p className="text-[16px] text-white">
                    Over 20+ successful projects completed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[50%] text-white p-5 bg-[#231F20]">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col w-full md:w-1/2">
                {/* text */}
                <div>
                  <p className="text-[16px]">
                    From homes to workplaces, we&apos;re creating thoughtfully
                    designed spaces across Dhaka, one project at a time.
                  </p>
                  <div className="h-1 my-5 border-b border-[#FFFFFF]/40"></div>
                </div>
                {/* left list */}
                <div className="flex gap-5 items-center">
                  <div className="flex flex-col gap-2.5">
                    <p className="border-b border-[#FFFFFF]/40">
                      <span className="text-[#E92A7B]">(01)</span> {"// Jolshiri"}
                    </p>
                    <p className="border-b border-[#FFFFFF]/40">
                      <span className="text-[#E92A7B]">(02)</span> {"// Gulshan"}
                    </p>
                    <p className="border-b border-[#FFFFFF]/40">
                      <span className="text-[#E92A7B]">(03)</span> {"// Nikunjo"}
                    </p>
                    <p className="border-b border-[#FFFFFF]/40">
                      <span className="text-[#E92A7B]">(04)</span> {"// Bashundhara"}
                    </p>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="102"
                      height="8"
                      viewBox="0 0 102 8"
                      fill="none"
                    >
                      <path
                        d="M102 3.34839V4.65156H98.7038V8H97.314V4.65156H94V3.34839H97.314V0H98.7038V3.34839H102Z"
                        fill="#F8C452"
                      />
                      <path
                        d="M55 3.34839V4.65156H51.7038V8H50.314V4.65156H47V3.34839H50.314V0H51.7038V3.34839H55Z"
                        fill="#F8C452"
                      />
                      <path
                        d="M8 3.34839V4.65156H4.70377V8H3.31401V4.65156H0V3.34839H3.31401V0H4.70377V3.34839H8Z"
                        fill="#F8C452"
                      />
                    </svg>
                  </div>
                </div>
                {/* right list */}
                <div className="flex gap-12 mt-5 items-center">
                  <div className="w-[30%]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="102"
                      height="8"
                      viewBox="0 0 102 8"
                      fill="none"
                    >
                      <path
                        d="M102 3.34839V4.65156H98.7038V8H97.314V4.65156H94V3.34839H97.314V0H98.7038V3.34839H102Z"
                        fill="#F8C452"
                      />
                      <path
                        d="M55 3.34839V4.65156H51.7038V8H50.314V4.65156H47V3.34839H50.314V0H51.7038V3.34839H55Z"
                        fill="#F8C452"
                      />
                      <path
                        d="M8 3.34839V4.65156H4.70377V8H3.31401V4.65156H0V3.34839H3.31401V0H4.70377V3.34839H8Z"
                        fill="#F8C452"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <p className="border-b border-[#FFFFFF]/40">
                      <span className="text-[#E92A7B]">(01)</span> {"// Rampura"}
                    </p>
                    <p className="border-b border-[#FFFFFF]/40">
                      <span className="text-[#E92A7B]">(01)</span> {"// Dhanmondi"}
                    </p>
                    <p className="border-b border-[#FFFFFF]/40">
                      <span className="text-[#E92A7B]">(01)</span> {"// Mirpur DOHS"}
                    </p>
                    <p className="border-b border-[#FFFFFF]/40">
                      <span className="text-[#E92A7B]">(01)</span> {"// Banani"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <BangladeshMap />
              </div>
            </div>
          </div>

          <div className="w-full md:w-[25%]">
            <div className="bg-accent-teal h-full p-5">
              <div className="flex h-full flex-col justify-between">
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

                  <span
                    className="flex text-white text-4xl md:text-6xl font-medium leading-none"
                  >
                    <p>95</p>
                  </span>

                  <span
                    className='text-4xl md:text-6xl text-white font-medium'
                  >
                    %
                  </span>
                </div>

                {/* Bottom */}
                <div>
                  <p className="text-xl font-medium text-white">Client Satisfaction</p>
                  <p className="text-[16px] text-white">
                    Consistently earning the trust and confidence of our clients.
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
