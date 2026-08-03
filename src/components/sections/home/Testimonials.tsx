"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

/** SSR-safe resting position for a card at a given stack slot (0 = front). */
function stackStyle(position: number): CSSProperties {
  return {
    transform: `translate(calc(var(--stack-offset-x, 30px) * ${position}), calc(var(--stack-offset-y, -8px) * ${position}))`,
    zIndex: testimonials.length - position,
  };
}

// Matches the `sm` breakpoint: below it cards use a simple horizontal slide,
// at/above it they use the playing-card stack.
const DESKTOP_QUERY = "(min-width: 640px)";

/**
 * Every tunable number for the slider's motion lives here. Nothing inside
 * `cycle()` below is a magic number — it all reads from this object, so the
 * whole animation can be restyled just by editing these values.
 */
const SLIDER_ANIMATION = {
  mobile: {
    duration: 0.6,
    ease: "power2.inOut",
  },

  next: {
    // The front card's entire trip from the front slot to the back of the
    // stack: one continuous glide (no separate "fly out" + "settle" legs),
    // so it's never mid-flight in a state that looks like it vanished.
    exit: {
      duration: 1,
      ease: "power2.inOut",
    },

    // The card promoted into the front slot: a gentle scale-up so the
    // duration reads as a deliberate "spotlight" moment, not a stall.
    frontReveal: {
      duration: 1,
      ease: "power2.out",
      fromScale: 0,
    },

    // Every other card (position 2 and deeper) steps forward one slot,
    // synchronized with the same 1-second transition as the front card.
    backgroundShift: {
      duration: 1,
      ease: "power2.out",
    },
  },

  prev: {
    entrance: {
      duration: 1,
      ease: "power2.out",
    },

    backgroundShift: {
      duration: 1,
      ease: "power2.out",
    },
  },
} as const;

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isAnimating = useRef(false);

  const [order, setOrder] = useState<number[]>(() =>
    testimonials.map((_, i) => i),
  );
  // Defaults to the mobile (non-stacked) reading of the DOM so server and
  // first client paint always agree; the real value lands post-mount.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
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

      gsap.from(".testimonial-card", {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        // Hand opacity back to the mobile active/inactive class once the
        // reveal finishes, so a card that starts inactive (captured here as
        // a 0 -> 0 no-op) doesn't carry a stale inline opacity: 0 that later
        // outranks its "opacity-100" class when it becomes the active card.
        clearProps: "opacity",
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

  // Single entry point for both buttons. direction 1 = Next, -1 = Previous.
  // Guarded by isAnimating so rapid clicks can never start overlapping
  // timelines on the same card; React order state only updates once the
  // GSAP timeline (which owns every visual frame of the transition) finishes.
  const cycle = (direction: 1 | -1) => {
    if (!canCycle || isAnimating.current) return;
    isAnimating.current = true;

    const currentOrder = order;
    const count = currentOrder.length;
    const backSlot = count - 1;
    const mobile = !isDesktop;
    const offsets = readStackOffsets(stackRef.current);
    const travel = stackRef.current?.offsetWidth || 0;

    contextSafe(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          isAnimating.current = false;
          setOrder((o) =>
            direction === 1
              ? [...o.slice(1), o[0]]
              : [o[o.length - 1], ...o.slice(0, -1)],
          );
        },
      });

      if (mobile) {
        // Mobile: plain horizontal slide, one card at a time.
        const outgoingEl = cardRefs.current[currentOrder[0]];
        const incomingIndex =
          direction === 1 ? currentOrder[1] : currentOrder[backSlot];
        const incomingEl = cardRefs.current[incomingIndex];

        const m = SLIDER_ANIMATION.mobile;
        if (incomingEl) {
          tl.set(incomingEl, { x: direction === 1 ? travel : -travel, zIndex: 2 }, 0);
          tl.to(incomingEl, { x: 0, duration: m.duration, ease: m.ease }, 0);
        }
        if (outgoingEl) {
          tl.set(outgoingEl, { zIndex: 1 }, 0);
          tl.to(
            outgoingEl,
            { x: direction === 1 ? -travel : travel, duration: m.duration, ease: m.ease },
            0,
          );
          tl.set(outgoingEl, { clearProps: "opacity,zIndex" });
        }
        return;
      }

      // Desktop: playing-card stack swoop.
      const restX = (slot: number) => offsets.x * slot;
      const restY = (slot: number) => offsets.y * slot;

      if (direction === 1) {
        // Front card glides in one continuous motion to the back of the
        // stack while everyone else steps forward.
        const { exit, frontReveal, backgroundShift } = SLIDER_ANIMATION.next;
        const movingEl = cardRefs.current[currentOrder[0]];
        const restIndices = currentOrder.slice(1);
        const backZIndex = count - backSlot;

        if (movingEl) {
          // Stay above the entire stack for the whole glide — it must never
          // dip behind another card mid-flight — and only drop to its true
          // back-of-stack z-index the instant it actually arrives.
          tl.set(movingEl, { zIndex: count + 1 }, 0)
            .to(
              movingEl,
              {
                x: restX(backSlot),
                y: restY(backSlot),
                duration: exit.duration,
                ease: exit.ease,
              },
              0,
            )
            .set(movingEl, { zIndex: backZIndex });
        }

        restIndices.forEach((testimonialIndex, i) => {
          const el = cardRefs.current[testimonialIndex];
          if (!el) return;
          if (i === 0) {
            // The card stepping up into the new front slot: its own position
            // delta is tiny (it was already sitting one slot back), so a
            // plain position tween would barely read as "longer" no matter
            // the duration. A gentle scale-up gives the extra time something
            // visible to spend. (Opacity is deliberately left alone here —
            // dipping it below 1 lets the fully-opaque card behind bleed
            // through as a faint double-exposure ghost, since this card is
            // sitting directly on top of it the whole time.)
            tl.fromTo(
              el,
              { scale: frontReveal.fromScale },
              {
                x: restX(i),
                y: restY(i),
                scale: 1,
                duration: frontReveal.duration,
                ease: frontReveal.ease,
              },
              0,
            );
            return;
          }
          tl.to(
            el,
            { x: restX(i), y: restY(i), duration: backgroundShift.duration, ease: backgroundShift.ease },
            0,
          );
        });
      } else {
        // Back card rises above the whole stack and glides directly from
        // wherever it's currently sitting into the front slot — a single,
        // direct slide rather than swooping further out first.
        const { entrance, backgroundShift } = SLIDER_ANIMATION.prev;
        const movingEl = cardRefs.current[currentOrder[backSlot]];
        const restIndices = currentOrder.slice(0, backSlot);

        if (movingEl) {
          tl.set(movingEl, { zIndex: count + 1 }, 0).to(
            movingEl,
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              duration: entrance.duration,
              ease: entrance.ease,
            },
            0,
          );
        }

        restIndices.forEach((testimonialIndex, i) => {
          const el = cardRefs.current[testimonialIndex];
          if (!el) return;
          tl.to(
            el,
            { x: restX(i + 1), y: restY(i + 1), duration: backgroundShift.duration, ease: backgroundShift.ease },
            0,
          );
        });
      }
    })();
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
          ref={stackRef}
          className="relative mx-auto min-h-140 max-w-285 overflow-hidden sm:overflow-visible [--stack-offset-x:20px] [--stack-offset-y:-8px] sm:[--stack-offset-x:14px] sm:[--stack-offset-y:-6px] md:min-h-95 lg:[--stack-offset-x:24px] lg:[--stack-offset-y:10px]"
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
                aria-hidden={!isActive && !isDesktop}
                className={`testimonial-card absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-3 md:p-6 md:flex-row ${
                  isActive
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto"
                }`}
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
                  <QuoteMark />
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
            className="absolute left-2 top-1/2 z-50 flex -translate-y-1/2 items-center justify-center sm:left-0 sm:-translate-x-1/2 pb-12 md:pb-0"
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
            className="absolute right-2 top-1/2 z-50 flex -translate-y-1/2 items-center justify-center sm:right-0 sm:translate-x-1/2 pb-12 md:pb-0"
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
