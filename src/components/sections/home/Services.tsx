"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { services } from "@/lib/data/services";

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      className={className}
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronUp({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      className={className}
    >
      <path
        d="M1 6.5L6 1.5L11 6.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      // Row divider lines draw in (scaleX 0→1) as the list scrolls into view.
      gsap.from(".service-divider", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  const { contextSafe } = useGSAP({ scope: containerRef });

  const toggle = (index: number) => {
    const nextIndex = index === openIndex ? null : index;

    contextSafe(() => {
      const prevEl = openIndex !== null ? panelRefs.current[openIndex] : null;
      const nextEl = nextIndex !== null ? panelRefs.current[nextIndex] : null;

      if (prevEl) {
        gsap.to(prevEl, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
      if (nextEl) {
        const targetHeight = nextEl.scrollHeight;
        gsap.fromTo(
          nextEl,
          { height: 0, opacity: 0 },
          {
            height: targetHeight,
            opacity: 1,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => gsap.set(nextEl, { height: "auto" }),
          },
        );
      }
    })();

    setOpenIndex(nextIndex);
  };

  return (
    <section ref={containerRef} className="pt-20">
      <Container className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <AnimatedHeading
          as="h2"
          lines={["Designed", "for Every Space."]}
          className="text-6xl font-normal leading-18"
        />
        <div className="max-w-md">
          <p className="text-muted">
            From concept to completion, we deliver thoughtful design solutions
            tailored to every space and every vision.
          </p>
          <div className="mt-6">
            <Button href="/services">View All Services</Button>
          </div>
        </div>
      </Container>

      <Container>
        {services.map((service, index) => {
          const isOpen = index === openIndex;
          const initiallyOpen = index === 0;
          return (
            <div key={service.slug}>
              <div className="relative mb-5 min-h-20">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.slug}`}
                  className="group absolute inset-x-0 z-10 w-full overflow-hidden p-8 text-left"
                >
                  {/* Native :hover-driven (not GSAP): stays perfectly in sync
                      with the group-hover text colors below across the
                      accordion's own open/close reflow, which can otherwise
                      leave a JS mouseenter/mouseleave-tracked fill stuck on
                      the wrong row. */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-out ${
                      isOpen ? "" : "group-hover:scale-y-100"
                    }`}
                  />

                  <div className="relative z-10 flex w-full items-center justify-between">
                    <span
                      className={`text-xl transition-colors duration-300 ${
                        isOpen
                          ? "text-white"
                          : "text-foreground group-hover:text-white"
                      }`}
                    >
                      ({service.index})
                    </span>

                    <span
                      className={`text-center px-2 text-xl font-normal transition-colors duration-300 md:px-4 md:text-[27px] ${
                        isOpen
                          ? "text-white"
                          : "text-foreground group-hover:text-white"
                      }`}
                    >
                      {service.title}
                    </span>

                    <span
                      className={`hidden w-20 items-center gap-2 text-lg font-normal transition-colors duration-300 md:inline-flex ${
                        isOpen
                          ? "text-white"
                          : "text-accent group-hover:text-white"
                      }`}
                    >
                      {isOpen ? "Close" : "Expand"}
                      {isOpen ? <ChevronUp /> : <ChevronDown />}
                    </span>
                  </div>
                </button>

                <div
                  id={`service-panel-${service.slug}`}
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  style={{
                    height: initiallyOpen ? undefined : 0,
                    opacity: initiallyOpen ? 1 : 0,
                    marginTop: initiallyOpen ? "2rem" : 0,
                  }}
                  className="overflow-hidden "
                >
                  {service.image && (
                    <div className="relative min-h-105 w-full overflow-hidden md:min-h-130">
                      <Image
                        src={service.image}
                        alt={service.heading ?? service.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <div className="relative flex md:min-h-130 items-end justify-center">
                        <div className="border-t border-white/40 w-full flex justify-center items-end gap-4 md:gap-8">
                          <div className="border-l border-white/40 pl-8 pt-8 pb-8">
                            {service.heading && (
                              <h3 className="max-w-md text-3xl font-normal leading-16 text-white md:text-subheading">
                                {service.heading}
                              </h3>
                            )}

                            <div className="mt-6 max-w-lg rounded-xl p-6 text-white border border-white/25 bg-white/10 backdrop-blur-md">
                              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                                {service.description && (
                                  <p className="text-white/90 text-[16px]">
                                    {service.description}
                                  </p>
                                )}
                              </div>
                              {service.subServices && (
                                <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                                  {service.subServices.map((sub) => (
                                    <div
                                      key={sub.label}
                                      className="flex items-center gap-2"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                      >
                                        <path
                                          d="M14 0V14H0V6.99959H7.00083V0H14Z"
                                          fill="white"
                                        />
                                      </svg>
                                      <span className="text-[16px]">
                                        {sub.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          {/* <div>
                            <Button
                              variant="light"
                              showArrow={true}
                              className=""
                            >
                              Learn More
                            </Button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {index < services.length - 1 && (
                <div className="service-divider h-px w-full bg-border" />
              )}
            </div>
          );
        })}
      </Container>
    </section>
  );
}
