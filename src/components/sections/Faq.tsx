"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";

import { Container } from "@/components/ui/Container";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { faqItems } from "@/lib/data/faq";

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="flex h-7 w-7 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-accent text-accent">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className={`h-3 w-3 md:h-3.5 md:w-3.5 transition-transform duration-300 ${open ? "" : "rotate-180"
          }`}
      >
        <path
          d="M7 12V2M7 2L2 7M7 2L12 7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Shared FAQ accordion — used on both the Pricing and Contact pages. */
export function Faq() {
  const containerRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      gsap.from(".faq-row", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  // Height-auto accordion: measures/animates each panel whenever the open
  // index changes (single-open — opening one closes whichever was open).
  useGSAP(
    () => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        gsap.to(panel, {
          height: i === openIndex ? "auto" : 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      });
    },
    { scope: containerRef, dependencies: [openIndex] },
  );

  return (
    <section ref={containerRef} className="py-12 md:py-20">
      <Container className="flex flex-col md:flex-row gap-4 md:gap-8 md:pt-14 md:items-start md:justify-between px-4 md:px-0">
        <AnimatedHeading
          as="h2"
          lines={["Frequently", "Asked Questions"]}
          className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
        />
        <p className="max-w-xs text-muted">
          Find answers to the most common questions about our services,
          design process, timelines, and how we bring your vision to life.
        </p>
      </Container>

      <Container className="mt-3 md:mt-10 px-4 md:px-0">
        {faqItems.map((faq, i) => {
          const isOpen = i === openIndex;
          return (
            <div key={faq.question} className="faq-row border-b border-border">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-4 md:py-8 text-left"
              >
                <span className="text-xl font-normal md:text-3xl">
                  {faq.question}
                </span>
                <ToggleIcon open={isOpen} />
              </button>

              <div
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="overflow-hidden"
                style={{ height: i === 0 ? "auto" : 0 }}
              >
                <p className="max-w-2xl pb-4 md:pb-8 text-muted">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
