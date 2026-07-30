"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { pricingPackages } from "@/lib/data/pricing";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

const headerClass = {
  pink: "bg-accent text-white",
  yellow: "bg-accent-yellow text-foreground",
  teal: "bg-accent-teal text-white",
} as const;

export function PricingCards() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.batch(".pricing-card", {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          }),
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="mt-22.5">
      <div className="border-y border-border">
        <div className="mx-auto flex max-w-[1340px] items-start justify-between">
          <div className="w-2/3 border-r border-border py-8">
            <AnimatedHeading
              as="h2"
              lines={["Explore", "Our Services."]}
              className="text-6xl font-normal leading-18"
            />
          </div>

          <div className="w-1/3 py-8 pl-8">
            <p className="text-muted">
              Explore our range of interior design services, crafted to create
              spaces that are functional, timeless, and uniquely yours.
            </p>

            <div className="mt-6">
              <MagneticButton>
                <Button href="/about">Start a Project</Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
      <Container className="flex flex-col mt-12.5 overflow-hidden border border-border lg:flex-row">
        {pricingPackages.map((pkg, i) => (
          <div
            key={pkg.name}
            className={`pricing-card flex flex-1 flex-col border-border ${
              i > 0 ? "border-t lg:border-l lg:border-t-0" : ""
            }`}
          >
            <div className={`px-6 py-4 ${headerClass[pkg.accent]}`}>
              <p className="text-lg font-medium">{pkg.name}</p>
            </div>

            <div className="flex flex-1 flex-col px-6 py-6">
              <p className="text-sm text-muted pr-2">{pkg.description}</p>

              <span className="mt-3 inline-block w-fit rounded-full bg-accent-yellow px-3 py-1 text-xs font-normal text-foreground">
                {pkg.tag}
              </span>

              <div className="mt-6 border-b border-dashed border-border pb-6">
                <p className="text-2xl font-medium">
                  {pkg.price}
                  {pkg.unit && (
                    <span className="text-sm font-normal text-muted">
                      /{pkg.unit}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted">{pkg.priceCaption}</p>
              </div>

              <div className="mt-6 flex-1">
                <p className="text-sm font-medium">
                  What&apos;s Included with This Package-
                </p>
                <ul className="mt-4 space-y-3">
                  {pkg.included.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <BrandGlyph
                        shape="step"
                        color="pink"
                        className="mt-2 h-3 w-3 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                href="/contact"
                variant="dark"
                className="mt-8 w-full justify-center"
              >
                Choose Package
              </Button>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
