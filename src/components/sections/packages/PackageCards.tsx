"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Armchair, FileSearch, Layers, type LucideIcon } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { designPackages } from "@/lib/data/packages";
import { trackConsultationCTAClick } from "@/lib/analytics";
import type { DesignPackage } from "@/lib/types";

const headerClass = {
  pink: "bg-accent text-white",
  yellow: "bg-accent-yellow text-white",
  teal: "bg-accent-teal text-white",
} as const;

const cardBgClass = {
  pink: "bg-accent/5",
  yellow: "bg-accent-yellow/5",
  teal: "bg-accent-teal/5",
} as const;

const icons: Record<DesignPackage["icon"], LucideIcon> = {
  discover: FileSearch,
  design: Armchair,
  deliver: Layers,
};

/** "Find Your Perfect Fit." — Discover / Design / Deliver packages. */
export function PackageCards() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".package-card", { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.set(".package-card", { opacity: 0, y: 30 });

      ScrollTrigger.batch(".package-card", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: "auto",
          });
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="mt-16 md:mt-22.5">
      <div className="md:border-y border-border">
        <div className="flex flex-col md:flex-row max-w-335 mx-auto items-start justify-between">
          <div className="md:w-2/3 md:border-r border-border pb-4 md:py-8">
            <AnimatedHeading
              as="h2"
              lines={["Find Your", "Perfect Fit."]}
              className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18 mx-4 md:mx-0"
            />
          </div>

          <div className="md:w-1/3 md:border-l border-border md:pl-8 pb-4 md:py-8 mx-4 md:mx-0">
            <p className="text-muted">
              Explore our design packages, from initial consultation to
              personalised design and complete project execution. Find the right
              starting point for your vision.
            </p>

            <div className="mt-3 md:mt-6">
              <MagneticButton>
                <Button
                  href="/contact"
                  onClick={() => trackConsultationCTAClick("packages_overview_header")}
                >
                  Contact Us
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <Container className="flex flex-col gap-4 md:gap-0 mt-6 md:mt-12.5 overflow-hidden md:border border-border lg:flex-row px-4 md:px-0">
        {designPackages.map((pkg, i) => {
          const Icon = icons[pkg.icon];
          return (
            <div
              key={pkg.stage}
              className={`package-card flex flex-1 flex-col border-border ${
                i > 0 ? "border-t lg:border-l lg:border-t-0" : ""
              }`}
            >
              <div className={`px-3 md:px-6 py-2 md:py-3 ${headerClass[pkg.accent]}`}>
                <p className="text-base md:text-lg font-medium">{pkg.stage}</p>
              </div>

              <div className={`flex flex-1 flex-col p-4 md:p-6 ${cardBgClass[pkg.accent]} md:bg-transparent`}>
                <Icon className="h-10 w-10 text-foreground md:h-12 md:w-12" strokeWidth={1.25} aria-hidden="true" />

                <span className="mt-6 md:mt-10 inline-block w-fit rounded-full bg-accent-yellow px-3 py-1 text-xs font-normal text-foreground">
                  {pkg.tag}
                </span>

                <p className="mt-2 border-b border-border pb-4 text-xl md:text-2xl font-normal md:pb-6">
                  {pkg.title}
                </p>

                <ul className="mt-4 flex-1 space-y-3 md:mt-6">
                  {pkg.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted">
                      <BrandGlyph shape="step" color="pink" className="mt-1 h-3 w-3 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  variant="dark"
                  className="mt-6 md:mt-8 w-full justify-center"
                  onClick={() =>
                    trackConsultationCTAClick(`packages_${pkg.stage.toLowerCase()}`)
                  }
                >
                  Choose Package
                </Button>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
