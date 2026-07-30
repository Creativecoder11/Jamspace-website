"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";

import { gsap } from "@/lib/animations/gsap";

interface SlideItem {
  index: string;
  audience: string;
  image: string;
}

const slides: SlideItem[] = [
  {
    index: "01",
    audience: "New Homeowners.",
    image: "/images/services-residential-01.webp",
  },
  {
    index: "02",
    audience: "Growing Families.",
    image: "/images/about-strip-04.webp",
  },
  {
    index: "03",
    audience: "Empty Nesters.",
    image: "/images/about-strip-05.webp",
  },
  {
    index: "04",
    audience: "Design Enthusiasts.",
    image: "/images/about-strip-02.webp",
  },
];

/**
 * Animation configuration
 */
const PIN_TOP_OFFSET = 80;

/**
 * How long each slide transition takes
 * inside the GSAP timeline.
 */
const SLIDE_TRANSITION_DURATION = 3;

/**
 * How long each slide stays locked after settling.
 *
 * Increase to 0.7 or 0.8 for a stronger hold.
 * Decrease to 0.3 for a shorter hold.
 */
const SLIDE_HOLD_DURATION = 0.55;

/**
 * Scroll distance for each timeline unit.
 *
 * Increase this value if transitions feel too fast.
 */
const SCROLL_DISTANCE_PER_TIMELINE_UNIT = 90;

/**
 * Image parallax movement amount.
 */
const IMAGE_PARALLAX_AMOUNT = 12;

/**
 * Snap scrolling to settled slide positions.
 */
const ENABLE_SLIDE_SNAP = true;

/**
 * Recurring step-shaped brand mark.
 */
function CornerMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 -5.24537e-06L30 30L5.24537e-06 30L2.62253e-06 14.9991L15.0018 14.9991L15.0018 -2.62299e-06L30 -5.24537e-06Z"
        fill="white"
      />
    </svg>
  );
}

function SlideContent({ slide }: { slide: SlideItem }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-10 lg:p-12">
      <div className="slide-top flex items-start justify-between">
        <CornerMark />

        <span className="slide-index font-sans text-2xl font-normal text-white md:text-3xl">
          {slide.index}

          <span className="text-white/60">
            /{String(slides.length).padStart(2, "0")}
          </span>
        </span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="slide-copy">
          <span className="block overflow-hidden">
            <span className="slide-badge inline-block rounded-full bg-accent-yellow px-3 py-1 text-xs font-normal text-foreground">
              Our Services Ideal For-
            </span>
          </span>

          <h3 className="mt-3 text-5xl font-normal leading-[1.05] text-white md:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="slide-line inline-block">
                {slide.audience}
              </span>
            </span>
          </h3>
        </div>

        <CornerMark className="hidden rotate-180 md:block" />
      </div>
    </div>
  );
}

export default function ResidentialServicesSlider() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const pinElement = pinRef.current;

      const slideElements = slideRefs.current.filter(
        (element): element is HTMLDivElement => element !== null
      );

      const imageElements = imageRefs.current.filter(
        (element): element is HTMLDivElement => element !== null
      );

      if (!pinElement || slideElements.length === 0) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          /**
           * First slide is visible.
           * Other slides begin outside the right edge.
           */
          gsap.set(slideElements, {
            xPercent: 100,
            autoAlpha: 1,
            force3D: true,
          });

          gsap.set(slideElements[0], {
            xPercent: 0,
          });

          /**
           * Initial image positioning for parallax.
           */
          imageRefs.current.forEach((image, index) => {
            if (!image) return;

            gsap.set(image, {
              xPercent: index === 0 ? 0 : -IMAGE_PARALLAX_AMOUNT,
              scale: index === 0 ? 1.02 : 1.08,
              transformOrigin: "center center",
              force3D: true,
            });
          });

          /**
           * Initial content states.
           */
          slideElements.forEach((slide, index) => {
            const line =
              slide.querySelector<HTMLElement>(".slide-line");

            const badge =
              slide.querySelector<HTMLElement>(".slide-badge");

            const top =
              slide.querySelector<HTMLElement>(".slide-top");

            if (index === 0) {
              gsap.set([line, badge, top], {
                y: 0,
                yPercent: 0,
                autoAlpha: 1,
              });

              return;
            }

            if (line) {
              gsap.set(line, {
                yPercent: 120,
                autoAlpha: 0,
              });
            }

            if (badge) {
              gsap.set(badge, {
                y: 20,
                autoAlpha: 0,
              });
            }

            if (top) {
              gsap.set(top, {
                y: -15,
                autoAlpha: 0,
              });
            }
          });

          /**
           * Total GSAP timeline duration:
           *
           * - One hold period for every slide
           * - One transition between every two slides
           */
          const totalTimelineUnits =
            slides.length * SLIDE_HOLD_DURATION +
            (slides.length - 1) * SLIDE_TRANSITION_DURATION;

          /**
           * Invisible proxy used to create real hold sections
           * inside the GSAP timeline.
           */
          const holdState = {
            value: 0,
          };

          /**
           * Main scroll-controlled timeline.
           */
          const timeline = gsap.timeline({
            defaults: {
              ease: "none",
            },

            scrollTrigger: {
              trigger: pinElement,

              start: `top top+=${PIN_TOP_OFFSET}`,

              end: () =>
                `+=${
                  totalTimelineUnits *
                  window.innerHeight *
                  (SCROLL_DISTANCE_PER_TIMELINE_UNIT / 100)
                }`,

              pin: true,
              pinSpacing: true,

              /**
               * Smoothly catches up to the scroll position.
               */
              scrub: 1.15,

              anticipatePin: 1,
              invalidateOnRefresh: true,

              /**
               * Snap only to slide-settled positions.
               */
              snap: ENABLE_SLIDE_SNAP
                ? {
                    snapTo: "labels",

                    duration: {
                      min: 0.25,
                      max: 0.6,
                    },

                    delay: 0.1,
                    ease: "power2.out",
                  }
                : undefined,
            },
          });

          /**
           * First slide settled position.
           */
          timeline.addLabel("slide-0", 0);

          /**
           * Hide scroll hint after scrolling begins.
           */
          if (hintRef.current) {
            timeline.to(
              hintRef.current,
              {
                autoAlpha: 0,
                duration: 0.12,
                ease: "none",
              },
              0
            );
          }

          /**
           * Initial hold.
           *
           * The first slide remains completely still
           * before it starts releasing.
           */
          timeline.to(
            holdState,
            {
              value: 1,
              duration: SLIDE_HOLD_DURATION,
              ease: "none",
            },
            0
          );

          let timelineCursor = SLIDE_HOLD_DURATION;

          /**
           * Build slide transitions.
           */
          for (let index = 1; index < slideElements.length; index++) {
            const previousSlide = slideElements[index - 1];
            const incomingSlide = slideElements[index];

            const previousImage = imageRefs.current[index - 1];
            const incomingImage = imageRefs.current[index];

            const previousLine =
              previousSlide.querySelector<HTMLElement>(".slide-line");

            const previousBadge =
              previousSlide.querySelector<HTMLElement>(".slide-badge");

            const previousTop =
              previousSlide.querySelector<HTMLElement>(".slide-top");

            const incomingLine =
              incomingSlide.querySelector<HTMLElement>(".slide-line");

            const incomingBadge =
              incomingSlide.querySelector<HTMLElement>(".slide-badge");

            const incomingTop =
              incomingSlide.querySelector<HTMLElement>(".slide-top");

            const transitionStart = timelineCursor;

            /**
             * Slide release and entry.
             *
             * power2.inOut creates:
             * - A slow release
             * - Smooth acceleration
             * - A soft landing
             */
            timeline
              .to(
                previousSlide,
                {
                  xPercent: -100,
                  duration: SLIDE_TRANSITION_DURATION,
                  ease: "power2.inOut",
                },
                transitionStart
              )
              .to(
                incomingSlide,
                {
                  xPercent: 0,
                  duration: SLIDE_TRANSITION_DURATION,
                  ease: "power2.inOut",
                },
                transitionStart
              );

            /**
             * Outgoing image parallax.
             */
            if (previousImage) {
              timeline.to(
                previousImage,
                {
                  xPercent: IMAGE_PARALLAX_AMOUNT,
                  scale: 1.08,
                  duration: SLIDE_TRANSITION_DURATION,
                  ease: "power1.inOut",
                },
                transitionStart
              );
            }

            /**
             * Incoming image parallax.
             */
            if (incomingImage) {
              timeline.to(
                incomingImage,
                {
                  xPercent: 0,
                  scale: 1.02,
                  duration: SLIDE_TRANSITION_DURATION,
                  ease: "power1.inOut",
                },
                transitionStart
              );
            }

            /**
             * Outgoing text animation.
             */
            if (previousLine) {
              timeline.to(
                previousLine,
                {
                  yPercent: -35,
                  autoAlpha: 0,
                  duration: 0.35,
                  ease: "power2.in",
                },
                transitionStart
              );
            }

            if (previousBadge) {
              timeline.to(
                previousBadge,
                {
                  y: -14,
                  autoAlpha: 0,
                  duration: 0.3,
                  ease: "power2.in",
                },
                transitionStart
              );
            }

            if (previousTop) {
              timeline.to(
                previousTop,
                {
                  y: -15,
                  autoAlpha: 0,
                  duration: 0.3,
                  ease: "power2.in",
                },
                transitionStart
              );
            }

            /**
             * Incoming text animation.
             */
            if (incomingLine) {
              timeline.to(
                incomingLine,
                {
                  yPercent: 0,
                  autoAlpha: 1,
                  duration: 0.52,
                  ease: "power3.out",
                },
                transitionStart + 0.3
              );
            }

            if (incomingBadge) {
              timeline.to(
                incomingBadge,
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.42,
                  ease: "power3.out",
                },
                transitionStart + 0.36
              );
            }

            if (incomingTop) {
              timeline.to(
                incomingTop,
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.4,
                  ease: "power3.out",
                },
                transitionStart + 0.35
              );
            }

            /**
             * Move cursor to the end of the transition.
             */
            timelineCursor += SLIDE_TRANSITION_DURATION;

            /**
             * This label marks the exact point where
             * the incoming slide is fully settled.
             */
            timeline.addLabel(`slide-${index}`, timelineCursor);

            /**
             * Hold the newly settled slide before releasing
             * the next one.
             */
            timeline.to(
              holdState,
              {
                value: index + 1,
                duration: SLIDE_HOLD_DURATION,
                ease: "none",
              },
              timelineCursor
            );

            timelineCursor += SLIDE_HOLD_DURATION;
          }

          /**
           * Final release point.
           *
           * After the last slide's hold period, the pinned
           * section releases smoothly.
           */
          timeline.addLabel("release", timelineCursor);

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();

            gsap.set(slideElements, {
              clearProps: "transform,opacity,visibility",
            });

            gsap.set(imageElements, {
              clearProps: "transform",
            });

            if (hintRef.current) {
              gsap.set(hintRef.current, {
                clearProps: "opacity,visibility",
              });
            }
          };
        }
      );

      /**
       * Reduced-motion fallback.
       *
       * Only the first slide remains visible and no pinned
       * scrolling animation is created.
       */
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: reduce)",
        () => {
          gsap.set(slideElements, {
            xPercent: 100,
            autoAlpha: 0,
          });

          gsap.set(slideElements[0], {
            xPercent: 0,
            autoAlpha: 1,
          });

          return () => {
            gsap.set(slideElements, {
              clearProps: "transform,opacity,visibility",
            });
          };
        }
      );

      return () => {
        mm.revert();
      };
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section ref={containerRef} className="relative">
      {/* Desktop and tablet slider */}
      <div
        ref={pinRef}
        className="relative mt-25 hidden h-[calc(100svh-80px)] w-full overflow-hidden bg-black md:block"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.index}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            style={{
              zIndex: index + 1,
            }}
            className="absolute inset-0 overflow-hidden will-change-transform transform-gpu"
          >
            {/* Oversized image wrapper allows parallax movement */}
            <div
              ref={(element) => {
                imageRefs.current[index] = element;
              }}
              className="absolute inset-y-0 inset-x-[-14%] will-change-transform transform-gpu"
            >
              <Image
                src={slide.image}
                alt={`Residential design ideal for ${slide.audience.replace(
                  /\.$/,
                  ""
                )}`}
                fill
                sizes="100vw"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/25" />

            <SlideContent slide={slide} />
          </div>
        ))}

        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-sm text-white/80"
        >
          Scroll to Explore ↓
        </div>
      </div>

      {/* Mobile swipeable slider */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-4 md:hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.index}
            className="relative h-[75svh] w-[88vw] shrink-0 snap-center overflow-hidden rounded-2xl"
          >
            <Image
              src={slide.image}
              alt={`Residential design ideal for ${slide.audience.replace(
                /\.$/,
                ""
              )}`}
              fill
              sizes="88vw"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/25" />

            <SlideContent slide={slide} />
          </div>
        ))}
      </div>
    </section>
  );
}