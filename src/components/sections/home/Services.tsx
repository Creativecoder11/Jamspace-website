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

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.1605 9H7.8494C7.62675 9 7.41322 9.08845 7.25578 9.24589C7.09834 9.40332 7.0099 9.61685 7.0099 9.8395C7.0099 10.0622 7.09834 10.2757 7.25578 10.4331C7.41322 10.5906 7.62675 10.679 7.8494 10.679H14.1331L7.25629 17.5567C7.17611 17.6341 7.11215 17.7267 7.06816 17.8291C7.02416 17.9316 7.001 18.0417 7.00003 18.1532C6.99906 18.2647 7.0203 18.3752 7.06252 18.4784C7.10473 18.5816 7.16706 18.6753 7.24589 18.7541C7.32471 18.8329 7.41844 18.8953 7.52161 18.9375C7.62478 18.9797 7.73533 19.0009 7.8468 19C7.95827 18.999 8.06843 18.9758 8.17085 18.9318C8.27327 18.8878 8.36591 18.8239 8.44335 18.7437L15.321 11.8665V18.1506C15.321 18.3733 15.4094 18.5868 15.5669 18.7442C15.7243 18.9017 15.9378 18.9901 16.1605 18.9901C16.3831 18.9901 16.5967 18.9017 16.7541 18.7442C16.9116 18.5868 17 18.3733 17 18.1506V9.8395C17 9.61685 16.9116 9.40332 16.7541 9.24589C16.5967 9.08845 16.3831 9 16.1605 9Z"
        fill="currentColor"
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

      const tl = gsap.timeline();

      if (prevEl) {
        gsap.set(prevEl, { height: prevEl.scrollHeight });
        tl.to(
          prevEl,
          {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: "auto",
          },
          0,
        );
      }

      if (nextEl) {
        const targetHeight = nextEl.scrollHeight;
        gsap.set(nextEl, { height: 0, opacity: 0 });
        tl.to(
          nextEl,
          {
            height: targetHeight,
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: "auto",
            onComplete: () => gsap.set(nextEl, { height: "auto" }),
          },
          0,
        );
      }
    })();

    setOpenIndex(nextIndex);
  };

  return (
    <section ref={containerRef} className="pt-15 md:pt-20">
      <Container className="flex flex-col gap-4 md:gap-8 md:flex-row md:items-start md:justify-between px-4 md:px-0">
        <AnimatedHeading
          as="h2"
          lines={["Designed", "for Every Space."]}
          className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
        />
        <div className="max-w-md md:ms-0">
          <p className="text-muted">
            From concept to completion, we deliver thoughtful design solutions
            tailored to every space and every vision.
          </p>
          <div className="mt-3 md:mt-6">
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
              <div className="relative pb-5 min-h-17 md:min-h-20">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.slug}`}
                  className="group absolute inset-x-0 z-10 w-full overflow-hidden p-4 md:p-8 text-left"
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-out ${isOpen ? "" : "group-hover:scale-y-100"
                      }`}
                  />

                  <div className="relative z-10 flex w-full items-center justify-between">
                    <span
                      className={`text-sm md:text-xl transition-colors duration-300 ${isOpen
                        ? "text-white"
                        : "text-foreground group-hover:text-white"
                        }`}
                    >
                      ({service.index})
                    </span>

                    <span
                      className={`text-center px-2 text-xl font-normal transition-colors duration-300 md:px-4 md:text-[27px] ${isOpen
                        ? "text-white"
                        : "text-foreground group-hover:text-white"
                        }`}
                    >
                      {service.title}
                    </span>

                    <span
                      onClick={(e) => e.stopPropagation()}
                      className={`items-center gap-2 text-sm md:text-lg font-normal transition-colors duration-300 inline-flex ${isOpen ? "text-white" : "text-pink-500"
                        }`}
                    >
                      <a href="/services" className="inline-flex items-center gap-2">
                        <span className="hidden md:block">Learn More</span><span className="block md:hidden">Details</span>
                        <ArrowIcon />
                      </a>
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

                      <div className="relative flex min-h-80 md:min-h-130 items-end justify-center">
                        <div className="border-t border-white/40 w-full flex justify-center items-end gap-4 md:gap-8">
                          <div className="border-l border-white/40 pl-4 md:pl-8 pt-16 md:pt-8 pb-8 mr-4 md:mr-0">
                            {service.heading && (
                              <h3 className="md:max-w-md text-3xl leading-9 font-normal md:leading-16 text-white md:text-subheading">
                                {service.heading}
                              </h3>
                            )}

                            <div className="mt-6 max-w-lg rounded-xl p-3 md:p-6 text-white border border-white/25 bg-white/10 backdrop-blur-md">
                              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                                {service.description && (
                                  <p className="text-white/90 text-sm md:text-[16px]">
                                    {service.description}
                                  </p>
                                )}
                              </div>
                              {service.subServices && (
                                <div className="mt-4 grid grid-cols-2 md:gap-x-8 md:gap-y-3 sm:grid-cols-2">
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
                                        className="w-3.5 h-3.5 md:w-4.5 md:h-4.5"
                                      >
                                        <path
                                          d="M14 0V14H0V6.99959H7.00083V0H14Z"
                                          fill="white"
                                        />
                                      </svg>
                                      <span className="text-sm md:text-[16px]">
                                        {sub.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
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