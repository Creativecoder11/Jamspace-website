"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

const sideImages = [
  "/images/cta-strip-01.webp",
  "/images/cta-strip-02.webp",
  "/images/cta-strip-03.webp",
  "/images/cta-strip-04.webp",
];

export function CTA() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Background image strip loops continuously and independently of the
      // scroll-in reveal below (track duplicated, xPercent -50 for a
      // seamless loop).
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        })
        .fromTo(
          ".cta-panel",
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
        )
        .from(".line", { yPercent: 110, stagger: 0.1, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .from(".cta-button", { opacity: 0, y: 10, duration: 0.5 }, "-=0.3");
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="py-25">
      <p className="mb-8 text-center text-sm text-muted">
        Bring Your Vision to Life
      </p>

      <div className="relative h-[400px] overflow-hidden">
        {/* Looping image strip, behind everything. Heights alternate full/300px
            (even index = full, odd index = 300px, vertically centered) —
            the source array has an even count so the rhythm stays
            consistent across the seam where the duplicated half loops. */}
        <div ref={trackRef} className="flex h-full w-max items-center gap-6">
          {[...sideImages, ...sideImages].map((src, i) => (
            <div
              key={i}
              className={`relative w-75 shrink-0 md:w-105 ${i % 2 === 0 ? "h-full" : "h-75"}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="420px"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* <div className="absolute inset-0 bg-black/45" /> */}

        {/* CTA panel, z-index stacked on top of the marquee, centered */}
        <div className="cta-panel absolute left-1/2 top-1/2 z-10 flex aspect-3/4 w-70 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 bg-accent p-4 text-center md:aspect-4/5 md:w-90">
          <AnimatedHeading
            as="h2"
            lines={["Let's Design", "Your", "Dream Space."]}
            className="text-2xl font-medium leading-tight text-white md:text-subheading"
          />
          <div className="cta-button">
            <MagneticButton>
              <Button href="/contact" variant="inverse" className="font-medium">
                Contact Us Now
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
