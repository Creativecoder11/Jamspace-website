"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { TestimonialCard } from "./TestimonialCard";
import { Navigation } from "./Navigation";
import { testimonials } from "./testimonials";
import { captureFlipState, playFlip, stackCardStyle } from "./animations";
import type { SlideDirection } from "./types";

const AUTOPLAY_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 50;

export function TestimonialSlider() {
  // `order` holds testimonial array-indices front-to-back. Only its initial
  // value ever needs to match up with anything on first paint — every
  // change after that is driven by cycle(), which captures a Flip state,
  // commits the new order synchronously (flushSync), then lets Flip
  // animate from the old rects to the new ones. Resize handling falls out
  // of this for free: Flip always measures live layout at call time, so
  // there's nothing to resync after a viewport change.
  const [order, setOrder] = useState<number[]>(() =>
    testimonials.map((_, i) => i),
  );
  const [isPaused, setIsPaused] = useState(false);
  const isAnimating = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const canCycle = testimonials.length > 1;

  const cycle = useCallback(
    (direction: SlideDirection) => {
      if (!canCycle || isAnimating.current) return;
      isAnimating.current = true;

      const state = captureFlipState();

      flushSync(() => {
        setOrder((prev) =>
          direction === "next"
            ? [...prev.slice(1), prev[0]]
            : [prev[prev.length - 1], ...prev.slice(0, -1)],
        );
      });

      playFlip(state, () => {
        isAnimating.current = false;
      });
    },
    [canCycle],
  );

  const goNext = useCallback(() => cycle("next"), [cycle]);
  const goPrev = useCallback(() => cycle("prev"), [cycle]);

  // Autoplay, paused on hover or keyboard focus.
  useEffect(() => {
    if (!canCycle || isPaused) return;
    const id = window.setInterval(goNext, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [canCycle, isPaused, goNext]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  const activeTestimonial = testimonials[order[0]];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative mx-auto w-full max-w-4xl px-2 pb-4 pt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4"
    >
      <div className="relative min-h-[460px] md:min-h-[360px]">
        {testimonials.map((testimonial, index) => {
          const position = order.indexOf(index);
          return (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              position={position}
              style={stackCardStyle(position)}
            />
          );
        })}
      </div>

      <Navigation onPrev={goPrev} onNext={goNext} disabled={!canCycle} />

      <p aria-live="polite" className="sr-only">
        Showing testimonial from {activeTestimonial.name}
      </p>
    </div>
  );
}
