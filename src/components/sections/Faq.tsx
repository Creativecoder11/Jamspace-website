"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";

import { Container } from "@/components/ui/Container";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { faqItems } from "@/lib/data/faq";

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent text-accent">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className={`transition-transform duration-300 ${open ? "" : "rotate-180"}`}
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
    <section ref={containerRef} className="py-22">
      <Container className="flex flex-col gap-8 pt-14 md:flex-row md:items-start md:justify-between">
        <AnimatedHeading
          as="h2"
          lines={["Frequently", "Asked Questions"]}
          className="text-6xl font-normal leading-18"
        />
        <p className="max-w-xs text-muted">
          Find answers to the most common questions about our services,
          design process, timelines, and how we bring your vision to life.
        </p>
      </Container>

      <Container className="mt-14">
        {faqItems.map((faq, i) => {
          const isOpen = i === openIndex;
          return (
            <div key={faq.question} className="faq-row border-b border-border">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-8 text-left"
              >
                <span className="text-2xl font-normal md:text-3xl">
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
                <p className="max-w-2xl pb-8 text-muted">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
