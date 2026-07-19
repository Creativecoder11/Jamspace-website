"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { BrandGlyph } from "@/components/ui/BrandGlyph";

const words = ["TIMELESS", "ELEGANT", "MODERN", "BOLD"];
const glyphs = ["step", "triangle", "chevron", "step"] as const;
const glyphColors = ["pink", "yellow", "teal", "pink"] as const;

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
    <span key={i} className="flex items-center gap-6 px-6">
      <span className="text-stat font-normal uppercase leading-none">
        {words[i % words.length]}
      </span>
      <BrandGlyph
        shape={glyphs[i % glyphs.length]}
        color={glyphColors[i % glyphColors.length]}
        className="w-15 h-15 shrink-0"
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
