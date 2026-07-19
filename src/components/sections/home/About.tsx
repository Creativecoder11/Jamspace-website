"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { aboutStripImages, aboutTickerText } from "@/lib/data/about";

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickerTweens = useRef<ReturnType<typeof gsap.to>[]>([]);

  useGSAP(
    () => {
      // Heading line-reveal on scroll — toggleActions only, no scrub.
      gsap.from(".line", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Each panel's caption marquee loops independently, paused until that
      // panel is hovered.
      tickerTweens.current = tickerRefs.current.map((track) =>
        gsap.to(track, {
          xPercent: -50,
          duration: 12,
          repeat: -1,
          ease: "none",
          paused: true,
        }),
      );
    },
    { scope: containerRef },
  );

  const expandPanel = (i: number) => {
    gsap.to(panelRefs.current[i], {
      flexGrow: 3,
      duration: 0.7,
      ease: "power3.out",
    });
    tickerTweens.current[i]?.play();
  };

  const collapsePanel = (i: number) => {
    gsap.to(panelRefs.current[i], {
      flexGrow: 1,
      duration: 0.7,
      ease: "power3.out",
    });
    tickerTweens.current[i]?.pause();
  };

  return (
    <section ref={containerRef} className="">
      <div className="border-b border-border">
        <div className="flex max-w-[1340px] mx-auto items-start justify-between">
          <div className="w-2/3 border-r border-border py-8">
            <AnimatedHeading
              as="h2"
              lines={["Crafting Spaces", "That Inspire."]}
              className="text-6xl font-normal leading-18"
            />
          </div>
          <div className="w-1/3 pl-8 py-8">
            <p className="text-muted">
              Explore a curated collection of spaces, details, and design
              moments that reflect our passion for timeless interiors and
              thoughtful craftsmanship.
            </p>
            <div className="mt-6">
              <Button href="/about">Learn More About Us</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-13 flex h-70 max-w-[1340px] mx-auto  overflow-hidden md:h-[500px]">
        {aboutStripImages.map((item, i) => (
          <div
            key={item.image}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            onMouseEnter={() => expandPanel(i)}
            onMouseLeave={() => collapsePanel(i)}
            className="group relative h-full flex-1 overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              sizes="(min-width: 768px)"
              className="object-cover h-20 transition-transform duration-1000 ease-out group-hover:scale-106"
            />

            <div
              className="absolute inset-0 transition-colors duration-100"
              style={{
                background:
                  "linear-gradient(180deg, rgba(25, 25, 25, 0.00) 0%, rgba(0, 0, 0, 0.42) 100%)",
              }}
            />

            {/* <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full  opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div> */}

            <div className="absolute inset-x-0 bottom-0 overflow-hidden py-5 opacity-0 transition-opacity transfo duration-500 group-hover:opacity-100"
            style={{
                background:
                  "linear-gradient(180deg, rgba(25, 25, 25, 0.00) 0%, rgba(0, 0, 0, 0.42) 100%)",
              }}>
              <div
                ref={(el) => {
                  tickerRefs.current[i] = el;
                }}
                className="flex w-max h-20 justify-end items-end whitespace-nowrap"
              >
                {[aboutTickerText, aboutTickerText].map((text, j) => (
                  <span
                    key={j}
                    className="px-6 text-3xl font-normal uppercase tracking-wide text-white "
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
