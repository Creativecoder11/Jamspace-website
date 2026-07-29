"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import type { Service } from "@/lib/types";

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

export function OtherServices({ services }: { services: Service[] }) {
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

  if (services.length === 0) return null;

  return (
    <section ref={containerRef} className="pb-24 pt-10">
      <Container>
        <h2 className="mb-8 text-2xl font-normal text-foreground md:text-3xl">
          Explore Other Services
        </h2>

        {services.map((service, index) => (
          <div key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex w-full items-center justify-between gap-4 overflow-hidden p-6"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-out group-hover:scale-y-100"
              />

              <span className="relative z-10 text-xl text-foreground transition-colors duration-300 group-hover:text-white">
                ({service.index})
              </span>

              <span className="relative z-10 text-center text-xl font-normal text-foreground transition-colors duration-300 group-hover:text-white md:text-[27px]">
                {service.title}
              </span>

              <span className="relative z-10 text-pink-500 transition-colors duration-300 group-hover:text-white">
                <ArrowIcon />
              </span>
            </Link>

            {index < services.length - 1 && (
              <div className="service-divider h-px w-full bg-border" />
            )}
          </div>
        ))}
      </Container>
    </section>
  );
}
