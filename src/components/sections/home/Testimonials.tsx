"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { testimonials } from "@/lib/data/testimonials";

function QuoteMark() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" aria-hidden="true">
      <path
        d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 3.6C9.2 5.2 6.8 8 6.8 12h6.8V24H0Zm17.6 0V14.4c0-8 4.8-13.2 12.8-14.4l1.6 3.6c-5.2 1.6-7.6 4.4-7.6 8.4h6.8V24H17.6Z"
        fill="var(--color-accent-teal)"
      />
    </svg>
  );
}

// Transform recipe for each visible stack slot (front, then two peeking
// layers behind), matching the reference's fanned-deck look. Anything
// beyond the last defined slot sits at the deepest offset with opacity 0,
// waiting off-stage until it cycles back into view.
const STACK_POSITIONS = [
  { x: 0, y: 0, rotate: 0, opacity: 1 },
  { x: 6, y: 6, rotate: -1, opacity: 1 },
  { x: 12, y: 12, rotate: 1, opacity: 1 },
] as const;
const HIDDEN_STACK_POSITION = { x: 12, y: 12, rotate: 1, opacity: 0 };

function stackTarget(position: number) {
  return STACK_POSITIONS[position] ?? HIDDEN_STACK_POSITION;
}

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isAnimating = useRef(false);
  // `order` holds testimonial indices front-to-back; only its own initial
  // value ever feeds React-rendered state (z-index below) — every position
  // change after mount is driven entirely by the GSAP timelines in
  // goNext/goPrev, so React never fights GSAP over the same properties.
  const [order, setOrder] = useState<number[]>(() =>
    testimonials.map((_, i) => i),
  );

  useGSAP(
    () => {
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

      // Seed every card's stacked transform up front so the scroll-reveal
      // below (and later cycle tweens) animate from/to the correct stacked
      // x/y/rotate instead of a bare 0.
      order.forEach((testimonialIndex, position) => {
        const el = cardRefs.current[testimonialIndex];
        if (!el) return;
        const target = stackTarget(position);
        gsap.set(el, {
          x: target.x,
          y: target.y,
          rotate: target.rotate,
          opacity: target.opacity,
          zIndex: testimonials.length - position,
        });
      });

      gsap.from(".testimonial-card", {
        y: "+=40",
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  const { contextSafe } = useGSAP({ scope: containerRef });

  const canCycle = testimonials.length > 1;

  const goNext = () => {
    if (!canCycle || isAnimating.current) return;
    isAnimating.current = true;

    const [frontIndex, ...restIndices] = order;
    const frontEl = cardRefs.current[frontIndex];

    contextSafe(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut", duration: 0.6 },
        onComplete: () => {
          if (frontEl) {
            gsap.set(frontEl, {
              x: HIDDEN_STACK_POSITION.x,
              y: HIDDEN_STACK_POSITION.y,
              rotate: HIDDEN_STACK_POSITION.rotate,
              opacity: HIDDEN_STACK_POSITION.opacity,
              zIndex: testimonials.length - restIndices.length,
            });
          }
          setOrder((o) => [...o.slice(1), o[0]]);
          isAnimating.current = false;
        },
      });

      // Current front card flies out to the top-right and tucks in behind
      // the stack; everyone else slides forward one slot.
      if (frontEl) {
        tl.to(
          frontEl,
          { x: 90, y: -18, rotate: 10, opacity: 0, ease: "power2.in", duration: 0.45 },
          0,
        );
      }

      restIndices.forEach((testimonialIndex, i) => {
        const el = cardRefs.current[testimonialIndex];
        if (!el) return;
        const target = stackTarget(i);
        tl.to(
          el,
          {
            x: target.x,
            y: target.y,
            rotate: target.rotate,
            opacity: target.opacity,
            zIndex: testimonials.length - i,
          },
          0.08,
        );
      });
    })();
  };

  const goPrev = () => {
    if (!canCycle || isAnimating.current) return;
    isAnimating.current = true;

    const lastIndex = order[order.length - 1];
    const lastEl = cardRefs.current[lastIndex];
    const restIndices = order.slice(0, -1);

    contextSafe(() => {
      if (lastEl) {
        gsap.set(lastEl, { x: -90, y: -18, rotate: -15, opacity: 0 });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut", duration: 0.6 },
        onComplete: () => {
          setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
          isAnimating.current = false;
        },
      });

      // The card waiting behind the stack slides in to become the new
      // front card; everyone else shifts back one slot.
      if (lastEl) {
        tl.to(
          lastEl,
          { x: 0, y: 0, rotate: 0, opacity: 1, zIndex: testimonials.length, ease: "power2.out" },
          0,
        );
      }

      restIndices.forEach((testimonialIndex, i) => {
        const el = cardRefs.current[testimonialIndex];
        if (!el) return;
        const target = stackTarget(i + 1);
        tl.to(
          el,
          {
            x: target.x,
            y: target.y,
            rotate: target.rotate,
            opacity: target.opacity,
            zIndex: testimonials.length - (i + 1),
          },
          0,
        );
      });
    })();
  };

  return (
    <section ref={containerRef} className="border-t border-border py-24 md:py-32">
      <Container className="flex flex-col gap-8 pb-16 md:flex-row md:items-end md:justify-between">
        <AnimatedHeading
          as="h2"
          lines={["Words", "from Our Clients."]}
          className="text-4xl font-medium leading-[1.05] md:text-heading"
        />
        <p className="max-w-md text-muted">
          Every project is built on collaboration, trust, and exceptional
          results. Here&apos;s what our clients have to say.
        </p>
      </Container>

      <Container>
        <div className="relative mx-auto min-h-140 max-w-[1140px] md:min-h-95">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="testimonial-card absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-background shadow-xl md:flex-row"
            >
              <div className="relative h-64 w-full shrink-0 md:h-auto md:w-2/5">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name} project`}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
                <QuoteMark />
                <p className="text-lg text-muted md:text-2xl">{testimonial.quote}</p>
                <div>
                  <p className="font-normal">{testimonial.name}</p>
                  <p className="text-sm text-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            aria-label="Previous testimonial"
            disabled={!canCycle}
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-40 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent text-accent transition-opacity hover:bg-accent hover:text-white disabled:opacity-30 md:flex"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            disabled={!canCycle}
            onClick={goNext}
            className="absolute right-0 top-1/2 z-40 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-accent text-accent transition-opacity hover:bg-accent hover:text-white disabled:opacity-30 md:flex"
          >
            →
          </button>
        </div>
      </Container>
    </section>
  );
}
