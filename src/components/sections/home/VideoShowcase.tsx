"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";

const CIRCLE_TEXT = "PLAY THE VIDEO * PLAY THE VIDEO * PLAY THE VIDEO * ";

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
              duration: 14,
              repeat: -1,
              ease: "none",
              transformOrigin: "50% 50%",
            });
          }
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] w-full">
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
          <h2 className="text-3xl font-normal md:text-heading">The Jam Journey</h2>
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
          <svg viewBox="0 0 100 100" className="video-badge-circle absolute inset-0 h-full w-full">
            <defs>
              <path
                id={pathId}
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text fill="white" fontSize="15" letterSpacing="2">
              <textPath href={`#${pathId}`}>{CIRCLE_TEXT}</textPath>
            </text>
          </svg>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-foreground md:h-16 md:w-16">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
              <path d="M4 2.5v13l11-6.5-11-6.5Z" />
            </svg>
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="JamSpace video"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close video"
            className="absolute right-6 top-6 text-3xl text-white"
          >
            ×
          </button>
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl">
            <Image
              src="/images/video-bg-01.webp"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
              Video coming soon
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
