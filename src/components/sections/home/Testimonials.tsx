"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isAnimating = useRef(false);
  const [cardH, setCardH] = useState(0);

  const [order, setOrder] = useState<number[]>(() =>
    testimonials.map((_, i) => i),
  );

  const count = order.length;
  const canCycle = count > 1;

  const STEP_Y = 20;
  const STEP_SCALE = 0.04;
  const STEP_OPACITY = 0.1;

  /* Uniform card height = tallest card */
  useLayoutEffect(() => {
    const measure = () => {
      const els = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!els.length) return;
      els.forEach((el) => (el.style.height = "auto"));
      const h = Math.max(...els.map((el) => el.offsetHeight));
      els.forEach((el) => (el.style.height = ""));
      setCardH(h);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

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

      gsap.from(".testimonial-container", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".testimonial-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  const cycle = (direction: 1 | -1) => {
    if (!canCycle || isAnimating.current) return;
    isAnimating.current = true;

    const currentOrder = order;
    const nextOrder =
      direction === 1
        ? [...currentOrder.slice(1), currentOrder[0]]
        : [currentOrder[currentOrder.length - 1], ...currentOrder.slice(0, -1)];

    const tl = gsap.timeline({
      onComplete: () => {
        setOrder(nextOrder);
        isAnimating.current = false;
      },
    });

    nextOrder.forEach((testimonialIndex, newPos) => {
      const el = cardRefs.current[testimonialIndex];

      tl.to(
        el,
        {
          y: newPos * STEP_Y,
          scale: 1 - newPos * STEP_SCALE,
          opacity: Math.max(1 - newPos * STEP_OPACITY, 0.2),
          zIndex: count - newPos,
          duration: 0.9,
          ease: "power3.inOut",
        },
        0,
      );
    });
  };

  return (
    <section
      ref={containerRef}
      className="border-t border-border md:py-25 mx-4 md:mx-0"
    >
      <Container className="flex flex-col gap-4 md:gap-8 md:flex-row md:items-end md:justify-between pt-10 md:pt-0 pb-10 md:px-0">
        <AnimatedHeading
          as="h2"
          lines={["Words", "from Our Clients."]}
          className="text-[42px] md:text-6xl font-normal leading-[120%] md:leading-18"
        />
        <div className="max-w-md md:pl-5 md:ms-0">
          <p className="text-muted">
            Every project is built on collaboration, trust, and exceptional results. Here&apos;s what our clients have to say.
          </p>
        </div>
      </Container>

      <Container>
        <div
          className="testimonial-container relative mx-auto max-w-285"
          style={{
            height: cardH ? cardH + (count - 1) * STEP_Y : undefined,
            marginBottom: (count - 1) * STEP_Y,
            perspective: "1200px",
          }}
        >
          {order.map((testimonialIndex, slot) => {
            const testimonial = testimonials[testimonialIndex];
            return (
              <div
                key={testimonial.name}
                ref={(el) => {
                  cardRefs.current[testimonialIndex] = el;
                }}
                className="absolute left-0 right-0 mx-auto flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-3 md:p-6 md:flex-row"
                style={{
                  transform: `translateY(${slot * STEP_Y}px) scale(${1 - slot * STEP_SCALE})`,
                  opacity: Math.max(1 - slot * STEP_OPACITY, 0.2),
                  zIndex: count - slot,
                  height: cardH || undefined,
                }}
              >
                <div className="relative h-60 w-full shrink-0 md:h-auto md:w-2/5">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} project`}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center gap-3 md:gap-6 py-8 md:p-12">
                  <Image
                    src="/icons/quote.svg"
                    width={24}
                    height={24}
                    alt="Quote"
                    className="mb-5"
                  />
                  <p className="text-base text-muted md:text-2xl">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="text-base md:text-2xl font-bold">{testimonial.name}</p>
                    <p className="text-sm md:text-base text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            aria-label="Previous testimonial"
            disabled={!canCycle}
            onClick={() => cycle(-1)}
            className="absolute left-2 top-1/2 z-50 flex -translate-y-1/2 items-center justify-center pb-12 md:pb-0 md:-left-5"
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
            onClick={() => cycle(1)}
            className="absolute right-2 top-1/2 z-50 flex -translate-y-1/2 items-center justify-center pb-12 md:pb-0 md:-right-5"
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