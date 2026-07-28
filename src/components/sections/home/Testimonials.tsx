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
      width="28"
      height="26"
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M0 0H24V26L12.0007 13.0008L0 26V0Z"
          fill="#35C9B4"
        />
      </g>

      <g clipPath="url(#clip1)">
        <path
          d="M16 0H40V26L28.0007 13.0008L16 26V0Z"
          fill="#35C9B4"
        />
      </g>

      <defs>
        <clipPath id="clip0">
          <rect width="12" height="26" fill="white" />
        </clipPath>

        <clipPath id="clip1">
          <rect
            width="12"
            height="26"
            fill="white"
            transform="translate(16)"
          />
        </clipPath>
      </defs>
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
      className="border-t border-border py-15 md:py-25 mx-4 md:mx-0"
    >
      <Container className="flex flex-col gap-4 md:gap-8 pb-8 md:pb-16 md:flex-row md:items-end md:justify-between">
        <AnimatedHeading
          as="h2"
          lines={["Words", "from Our Clients."]}
          className="text-3xl font-normal leading-[1.05] md:text-heading"
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
                className={`testimonial-card absolute inset-0 ${isActive ? "flex" : "hidden sm:flex"} flex-col overflow-hidden rounded-2xl border border-border bg-white p-3 md:p-6 md:flex-row`}
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
                <div className="flex flex-col justify-center gap-6 py-8 md:p-12">
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
            className="absolute left-0 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex"
          >
            <Image
              src="/left.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            disabled={!canCycle}
            onClick={goNext}
            className="absolute right-0 top-1/2 z-50 hidden -translate-y-1/2 translate-x-1/2 items-center justify-center md:flex"
          >
            <Image
              src="/right.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </button>
        </div>
      </Container>
    </section>
  );
}
