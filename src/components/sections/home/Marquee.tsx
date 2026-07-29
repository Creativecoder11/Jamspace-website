"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";

const words = ["TIMELESS", "ELEGANT", "MODERN", "BOLD"];
const glyphShapes = ["sparkle", "diamond", "triangle", "sparkle"] as const;
const glyphColors = ["pink", "yellow", "teal", "pink"] as const;
const glyphColorClass = {
  pink: "text-accent",
  yellow: "text-accent-yellow",
  teal: "text-accent-teal",
} as const;

const glyphPaths = {
  sparkle: "M60 0L60 60L0 60L0 29.9982L30.0036 29.9982L30.0036 0L60 0Z",
  diamond: "M60 60L0 60L29.9982 0L60 60Z",
  triangle: "M60 60L0 60L0 0L29.9982 29.9982L60 0L60 60Z",
} as const;

type GlyphShape = keyof typeof glyphPaths;

function MarqueeGlyph({
  shape,
  className = "",
}: {
  shape: GlyphShape;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={glyphPaths[shape]} />
    </svg>
  );
}

export function Marquee() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 24,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  // Marquee speed/direction tracks Lenis scroll velocity.
  useLenis((lenis) => {
    const tween = tweenRef.current;
    if (!tween) return;
    const speed = gsap.utils.clamp(0.6, 4, 1 + Math.abs(lenis.velocity) * 0.06);
    tween.timeScale(lenis.velocity < 0 ? -speed : speed);
  });

  const item = (i: number) => (
    <span key={i} className="flex items-center gap-3.5 px-2 md:gap-6 md:px-6">
      <span className="text-[36px] leading-[120%] font-normal uppercase md:text-stat md:leading-none">
        {words[i % words.length]}
      </span>

      <MarqueeGlyph
        shape={glyphShapes[i % glyphShapes.length]}
        className={`w-6 h-6 shrink-0 md:w-15 md:h-15 ${glyphColorClass[glyphColors[i % glyphColors.length]]}`}
      />
    </span>
  );

  return (
    <section
      ref={containerRef}
      className="overflow-hidden mt-15 border-y border-border py-8"
    >
      <div ref={trackRef} className="flex w-max">
        {Array.from({ length: words.length * 2 }, (_, i) => item(i))}
      </div>
    </section>
  );
}
