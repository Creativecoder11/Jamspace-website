"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Logo } from "@/components/ui/Logo";
import { isPreloaderDone, markPreloaderDone } from "@/hooks/usePreloaderDone";

/** Runs once per browser session (sessionStorage-gated). */
export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [shouldRender, setShouldRender] = useState(() => !isPreloaderDone());

  useGSAP(
    () => {
      if (!shouldRender) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions as { reduced: boolean };

          const finish = () => {
            markPreloaderDone();
            setShouldRender(false);
          };

          if (reduced) {
            finish();
            return;
          }

          const counter = { value: 0 };
          gsap
            .timeline({ onComplete: finish })
            .to(counter, {
              value: 100,
              duration: 1.6,
              ease: "power2.inOut",
              onUpdate: () => {
                if (counterRef.current) {
                  counterRef.current.textContent = Math.round(
                    counter.value,
                  ).toString();
                }
              },
            })
            .to(
              containerRef.current,
              { yPercent: -100, duration: 0.9, ease: "power3.inOut" },
              "+=0.1",
            );
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [shouldRender] },
  );

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
    >
      <Logo />
      <span ref={counterRef} className="text-6xl font-normal tabular-nums">
        0
      </span>
    </div>
  );
}
