"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export function PageHero({
  eyebrow,
  image,
}: {
  eyebrow: string;
  image: string;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([".page-hero-banner", ".line", ".page-hero-intro"], {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          ".page-hero-banner",
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1 },
        )
        .from(".page-hero-glyphs", { opacity: 0, x: 20, duration: 0.7 }, "-=0.5")
        .from(
          ".line",
          { yPercent: 110, stagger: 0.12, duration: 0.9 },
          "-=0.5",
        )
        .from(".page-hero-intro", { y: 16, opacity: 0, duration: 0.7 }, "-=0.6");
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="pt-22 mx-2.5">
      <div>
        <div className="page-hero-banner relative w-full overflow-hidden h-90 rounded-3xl">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(min-width: 1340px) 1340px, 100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(25,25,25,0)_-28.5%,#191919_100%)]" />

          <div className="relative  flex h-full items-center justify-between px-8 md:px-14">
            <h1 className="text-5xl font-normal text-white md:text-7xl">
              {eyebrow}
            </h1>
            <Image src="/JAM.svg" alt="" width={90} height={80} className="page-hero-glyphs hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
