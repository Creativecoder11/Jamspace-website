"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ServiceDetailContent } from "@/lib/types";

/** Card accent colours cycle in this order. */
const accentClasses = ["text-accent", "text-accent-yellow", "text-accent-teal"];

/**
 * Desktop scroll effect: odd cards (02, 04) sit in the top row and stay
 * sticky under the 80px header, while even cards (01, 03) start one card
 * lower and scroll up into line with them. Native `position: sticky` does
 * the holding, so the motion is exactly in step with (Lenis) scrolling with
 * no JS on the scroll path. GSAP only adds a one-time entrance reveal.
 */
export default function ResidentailWhyChoose({
  content,
}: {
  content: ServiceDetailContent["whyChoose"];
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".why-card-inner", { autoAlpha: 0, y: 32 });
        ScrollTrigger.batch(".why-card-inner", {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
        });

        return () => gsap.set(".why-card-inner", { clearProps: "opacity,visibility,transform" });
      });

      return () => mm.revert();
    },
    { scope: gridRef },
  );

  return (
    <section>
      <div className="mx-auto mt-16 md:mt-25 flex flex-col md:flex-row max-w-335 items-start justify-between px-4 md:px-0">
        <div className="md:w-2/3">
          <AnimatedHeading
            as="h2"
            lines={["Why Choose", "This Service."]}
            className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
          />
        </div>

        <div className="md:w-1/3 md:pl-8 py-4 md:py-8">
          <p>{content.intro}</p>

          <div className="mt-3 md:mt-6">
            <MagneticButton>
              <Button href={content.cta.href}>{content.cta.label}</Button>
            </MagneticButton>
          </div>
        </div>
      </div>
      <div
        ref={gridRef}
        className="max-w-335 mt-5 md:mt-13 mx-auto flex flex-col gap-4 md:gap-0 px-4 md:flex-row md:px-0"
      >
        {content.reasons.map((reason, i) => {
          const isLower = i % 2 === 0;
          return (
            <div
              key={reason.title}
              className={`w-full md:w-[25%] ${i > 0 ? "md:-ml-px" : ""} ${
                isLower ? "md:mt-85" : "md:sticky md:top-20 md:self-start"
              }`}
            >
              <div className="why-card-inner flex flex-col h-55 md:h-85 p-3 md:p-5 justify-between border border-border bg-background">
                <p>({String(i + 1).padStart(2, "0")})</p>
                <div className="flex flex-col gap-3 md:gap-6">
                  <p
                    className={`text-xl md:text-3xl font-medium ${
                      accentClasses[i % accentClasses.length]
                    }`}
                  >
                    {reason.title}
                  </p>
                  <p>{reason.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
