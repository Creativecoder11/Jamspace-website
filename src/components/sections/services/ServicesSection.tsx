"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { services } from "@/lib/data/services";
import { MagneticButton } from "@/components/ui/MagneticButton";

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16.1605 9H7.8494C7.62675 9 7.41322 9.08845 7.25578 9.24589C7.09834 9.40332 7.0099 9.61685 7.0099 9.8395C7.0099 10.0622 7.09834 10.2757 7.25578 10.4331C7.41322 10.5906 7.62675 10.679 7.8494 10.679H14.1331L7.25629 17.5567C7.17611 17.6341 7.11215 17.7267 7.06816 17.8291C7.02416 17.9316 7.001 18.0417 7.00003 18.1532C6.99906 18.2647 7.0203 18.3752 7.06252 18.4784C7.10473 18.5816 7.16706 18.6753 7.24589 18.7541C7.32471 18.8329 7.41844 18.8953 7.52161 18.9375C7.62478 18.9797 7.73533 19.0009 7.8468 19C7.95827 18.999 8.06843 18.9758 8.17085 18.9318C8.27327 18.8878 8.36591 18.8239 8.44335 18.7437L15.321 11.8665V18.1506C15.321 18.3733 15.4094 18.5868 15.5669 18.7442C15.7243 18.9017 15.9378 18.9901 16.1605 18.9901C16.3831 18.9901 16.5967 18.9017 16.7541 18.7442C16.9116 18.5868 17 18.3733 17 18.1506V9.8395C17 9.61685 16.9116 9.40332 16.7541 9.24589C16.5967 9.08845 16.3831 9 16.1605 9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={containerRef} className="">
      <div className="mt-25 border-y border-border">
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

      <Container className="mt-10">
        {services.map((service, index) => (
          <div key={service.slug}>
            <div className="group relative min-h-20 overflow-hidden p-8">
              {/* Existing hover background effect */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-y-100"
              />

              <div className="relative z-10 flex w-full grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6">
                <div className="w-[20%]">
                  <span className="text-xl text-foreground transition-colors duration-300 group-hover:text-white">
                    ({service.index})
                  </span>
                </div>

                <div className="w-[30%]">
                  <span className="px-2 text-left text-xl font-normal text-foreground transition-colors duration-300 group-hover:text-white md:px-4 md:text-[27px]">
                    {service.title}
                  </span>
                </div>

                <div className="w-[40%]">
                    <span className="text-left text-base font-normal text-foreground transition-colors duration-300 group-hover:text-white">
                  {service.shortdescription}
                </span>
                </div>

                <div className="w-[10%]">
                    <Link
                  href={`/services/${service.slug}`}
                  aria-label={`Learn more about ${service.title}`}
                  className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-normal text-pink-500 transition-colors duration-300 group-hover:text-white md:gap-2 md:text-lg"
                >
                  <span className="hidden sm:inline">Learn More</span>
                  <ArrowIcon className="size-5 md:size-6" />
                </Link>
                </div>
              </div>
            </div>

            {index < services.length - 1 && (
              <div className="service-divider h-px w-full bg-border" />
            )}
          </div>
        ))}
      </Container>
    </section>
  );
}
