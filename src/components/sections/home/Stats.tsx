"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { StatIcon } from "@/components/ui/StatIcon";
import { stats } from "@/lib/data/stats";

const accentTextClass = {
  white: "text-foreground",
  pink: "text-accent",
  yellow: "text-accent-yellow",
  teal: "text-accent-teal",
} as const;

export function Stats() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.batch(".stat-card", {
        start: "top 85%",
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          });

          batch.forEach((card) => {
            const reels = gsap.utils.toArray<HTMLElement>(".reel", card);
            reels.forEach((reel, di) => {
              const digitHeight =
                (reel.firstElementChild as HTMLElement | null)?.clientHeight ?? 0;
              const distance = (reel.children.length - 1) * digitHeight;
              if (distance <= 0) return;
              gsap.to(reel, {
                y: -distance,
                duration: 1.6,
                delay: di * 0.15,
                ease: "power2.inOut",
              });
            });
          });
        },
      });

      gsap.from(".stat-icon", {
        rotate: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="border-t border-b border-r md:border-r-0 border-l md:border-l-0 border-border mx-4 md:mx-0">
      <Container className="grid grid-cols-1 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`stat-card flex flex-col gap-2 md:gap-4 px-4 py-6 md:py-16 ${i !== stats.length - 1 ? "border-b border-border md:border-b-0" : ""} ${i > 0 ? "md:border-l md:border-border" : ""} `}
          >
            <div className="flex justify-center items-center gap-1.5 md:gap-3">
              <StatIcon
                type={stat.icon}
                className={`stat-icon h-6 w-6 ${accentTextClass[stat.accent]}`}
              />
              <span
                className={`stat-number flex text-7xl md:text-8xl font-medium leading-none text-start ${accentTextClass[stat.accent]}`}
              >
                {String(stat.value)
                  .padStart(2, "0")
                  .split("")
                  .map((digit, di) => (
                    <span
                      key={di}
                      className="inline-block h-[1em] overflow-hidden"
                    >
                      <span className="reel block">
                        {Array.from(
                          { length: Number(digit) + 1 },
                          (_, n) => n,
                        ).map((n) => (
                          <span key={n} className="block h-[1em] leading-none">
                            {n}
                          </span>
                        ))}
                      </span>
                    </span>
                  ))}
              </span>
              <span className={`text-7xl md:text-8xl font-medium ${accentTextClass[stat.accent]}`}>
                {stat.suffix}
              </span>
            </div>
            <p className="text-foreground text-center text-xl md:text-3xl">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
