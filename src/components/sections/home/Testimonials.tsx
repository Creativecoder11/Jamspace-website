"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { testimonials } from "@/lib/data/testimonials";

function QuoteMark() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 3.6C9.2 5.2 6.8 8 6.8 12h6.8V24H0Zm17.6 0V14.4c0-8 4.8-13.2 12.8-14.4l1.6 3.6c-5.2 1.6-7.6 4.4-7.6 8.4h6.8V24H17.6Z"
        fill="var(--color-accent-teal)"
      />
    </svg>
  );
}

interface StackOffsets {
  x: number;
  y: number;
}

function readStackOffsets(el: HTMLElement | null): StackOffsets {
  const cs = el ? getComputedStyle(el) : null;
  return {
    x: parseFloat(cs?.getPropertyValue("--stack-offset-x") || "20"),
    y: parseFloat(cs?.getPropertyValue("--stack-offset-y") || "-8"),
  };
}

function stackStyle(position: number): CSSProperties {
  return {
    transform: `translate(calc(var(--stack-offset-x, 20px) * ${position}), calc(var(--stack-offset-y, -8px) * ${position}))`,
    zIndex: testimonials.length - position,
  };
}

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isAnimating = useRef(false);
  // `order` holds testimonial array-indices front-to-back. Only its initial
  // value ever feeds the plain inline `style` below — every cycle after
  // that is driven entirely by the GSAP timelines in goNext/goPrev.
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

      gsap.from(".testimonial-card", {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
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

  // Ease-out (not ease-in-out) is deliberate: it starts at full speed the
  // instant you click, instead of winding up slowly first, which read as a
  // ~1s delay before the card visibly moved.
  const goNext = () => {
    if (!canCycle || isAnimating.current) return;
    isAnimating.current = true;

    const [frontIndex, ...restIndices] = order;
    const frontEl = cardRefs.current[frontIndex];
    const offsets = readStackOffsets(stackRef.current);

    contextSafe(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: "power2.out" },
        onComplete: () => {
          setOrder((o) => [...o.slice(1), o[0]]);
          isAnimating.current = false;
        },
      });

      // The departing card doesn't travel across the visible stack — it
      // jumps straight to its back-of-stack resting spot (position + z-index
      // together, so it's never briefly rendered on top of the cards it's
      // supposed to be behind). Only the incoming cards — the 2nd card
      // becoming active, and everyone else easing forward one slot — are
      // actually animated.
      if (frontEl) {
        const lastPos = restIndices.length;
        tl.set(
          frontEl,
          {
            x: offsets.x * lastPos,
            y: offsets.y * lastPos,
            zIndex: testimonials.length - lastPos,
          },
          0,
        );
      }

      restIndices.forEach((testimonialIndex, i) => {
        const el = cardRefs.current[testimonialIndex];
        if (!el) return;
        tl.to(el, { x: offsets.x * i, y: offsets.y * i }, 0);
      });
    })();
  };

  const goPrev = () => {
    if (!canCycle || isAnimating.current) return;
    isAnimating.current = true;

    const lastIndex = order[order.length - 1];
    const restIndices = order.slice(0, -1);
    const offsets = readStackOffsets(stackRef.current);

    contextSafe(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: "power2.out" },
        onComplete: () => {
          setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
          isAnimating.current = false;
        },
      });

      // The incoming card — waiting at the back, about to become active —
      // is the one that's actually animated, same as the 2nd-card case in
      // goNext. The card losing "active" status doesn't travel across the
      // stack either: it jumps straight to its new resting spot (position +
      // z-index together). Everyone shifting deeper into the stack keeps
      // easing smoothly.
      const lastEl = cardRefs.current[lastIndex];
      if (lastEl) {
        tl.to(lastEl, { x: 0, y: 0 }, 0);
      }

      const [oldFrontIndex, ...deeperIndices] = restIndices;
      const oldFrontEl = cardRefs.current[oldFrontIndex];
      if (oldFrontEl) {
        tl.set(
          oldFrontEl,
          { x: offsets.x, y: offsets.y, zIndex: testimonials.length - 1 },
          0,
        );
      }

      deeperIndices.forEach((testimonialIndex, i) => {
        const el = cardRefs.current[testimonialIndex];
        if (!el) return;
        tl.to(el, { x: offsets.x * (i + 2), y: offsets.y * (i + 2) }, 0);
      });
    })();
  };

  return (
    <section
      ref={containerRef}
      className="border-t border-border py-24 md:py-32"
    >
      <Container className="flex flex-col gap-8 pb-16 md:flex-row md:items-end md:justify-between">
        <AnimatedHeading
          as="h2"
          lines={["Words", "from Our Clients."]}
          className="text-4xl font-normal leading-[1.05] md:text-heading"
        />
        <p className="max-w-md text-muted">
          Every project is built on collaboration, trust, and exceptional
          results. Here&apos;s what our clients have to say.
        </p>
      </Container>

      <Container>
        <div
          ref={stackRef}
          className="relative mx-auto min-h-140 max-w-285 [--stack-offset-x:20px] [--stack-offset-y:-8px] sm:[--stack-offset-x:14px] sm:[--stack-offset-y:-6px] md:min-h-95 lg:[--stack-offset-x:24px] lg:[--stack-offset-y:10px]"
        >
          {testimonials.map((testimonial, i) => {
            const position = order.indexOf(i);
            const isActive = position === 0;
            return (
              <div
                key={testimonial.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={stackStyle(position)}
                className={`testimonial-card absolute inset-0 ${isActive ? "flex" : "hidden sm:flex"} flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 md:flex-row`}
              >
                <div className="relative h-64 w-full shrink-0 md:h-auto md:w-2/5">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} project`}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center gap-6 p-8 md:p-12">
                  <QuoteMark />
                  <p className="text-lg text-muted md:text-2xl">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="font-normal">{testimonial.name}</p>
                    <p className="text-sm text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            aria-label="Previous testimonial"
            disabled={!canCycle}
            onClick={goPrev}
            className="absolute left-0 top-1/2 z-50 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent text-accent transition-opacity hover:bg-accent hover:text-white disabled:opacity-30 md:flex"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            disabled={!canCycle}
            onClick={goNext}
            className="absolute right-0 top-1/2 z-50 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-accent text-accent transition-opacity hover:bg-accent hover:text-white disabled:opacity-30 md:flex"
          >
            →
          </button>
        </div>
      </Container>
    </section>
  );
}
