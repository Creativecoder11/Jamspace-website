"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";

const CIRCLE_TEXT = "* PLAY THE VIDEO * PLAY THE VIDEO * PLAY THE VIDEO * ";

export function VideoShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const badgeRotationTween = useRef<gsap.core.Tween | null>(null);
  const pathId = useId();
  const [isOpen, setIsOpen] = useState(false);

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

          if (!reduced) {
            // Classic Awwwards reveal: rounded/scaled-down photo grows to a
            // full-bleed square-corner frame, scrubbed to scroll position.
            gsap.fromTo(
              frameRef.current,
              { scale: 0.85, borderRadius: 32 },
              {
                scale: 1,
                borderRadius: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                },
              },
            );

            badgeRotationTween.current = gsap.to(".video-badge-circle", {
              rotate: 360,
              duration: 30,
              repeat: -1,
              ease: "none",
              // transformOrigin: "50% 50%",
            });
          }
        },
      );

      return () => {
        badgeRotationTween.current?.kill();
        mm.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] w-full"
    >
      <div
        ref={frameRef}
        className="absolute inset-0 mx-auto w-full origin-center overflow-hidden"
      >
        <Image
          src="/images/video-bg-01.webp"
          alt="Bedroom interior — behind the scenes of a JamSpace project"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative flex h-full flex-col justify-between p-6 text-white md:p-16">
          <h2 className="text-3xl font-normal md:text-heading">
            The Jam Journey
          </h2>
          <h2 className="self-end text-3xl font-normal md:text-heading">
            Behind Every Space.
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => badgeRotationTween.current?.timeScale(4)}
          onMouseLeave={() => badgeRotationTween.current?.timeScale(1)}
          aria-label="Play the video"
          className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:h-40 md:w-40"
        >
          {/* Animated Circular Text */}
          <svg
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

            <text fill="white" fontSize="15" letterSpacing="2" fontWeight="500">
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-6"
          onClick={() => setIsOpen(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close video"
            className="absolute right-6 top-6 z-10 text-4xl text-white transition-opacity hover:opacity-70"
          >
            ×
          </button>

          {/* Video Container */}
          <div
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/videos/jam-journey.mp4"
              controls
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </section>
  );
}
