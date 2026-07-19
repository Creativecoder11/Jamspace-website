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

  useGSAP(
    () => {
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
    <section ref={containerRef} className="py-24 md:py-32">
      <p className="mb-8 text-center text-sm text-muted">
        Bring Your Vision to Life
      </p>

      <div className="grid grid-cols-5 gap-2 px-2 md:gap-3 md:px-3">
        {sideImages.slice(0, 2).map((src, i) => (
          <div key={src} className="relative col-span-1 aspect-[3/4] overflow-hidden rounded-xl md:aspect-[4/5]">
            <Image
              src={src}
              alt=""
              fill
              sizes="20vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        <div className="cta-panel col-span-1 flex aspect-[3/4] flex-col items-center justify-center gap-6 rounded-xl bg-accent p-4 text-center md:aspect-[4/5]">
          <AnimatedHeading
            as="h2"
            lines={["Let's Design", "Your", "Dream Space."]}
            className="text-2xl font-medium leading-tight text-white md:text-subheading"
          />
          <div className="cta-button">
            <MagneticButton>
              <Button href="/contact" variant="inverse">
                Contact Us Now
              </Button>
            </MagneticButton>
          </div>
        </div>

        {sideImages.slice(2, 4).map((src) => (
          <div key={src} className="relative col-span-1 aspect-[3/4] overflow-hidden rounded-xl md:aspect-[4/5]">
            <Image src={src} alt="" fill sizes="20vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
