import type { CSSProperties } from "react";
import { gsap } from "@/lib/animations/gsap";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

export { gsap, Flip };

export const STACK_CARD_SELECTOR = ".ts-card";
export const STACK_FLIP_DURATION = 0.8;
// Spring-like overshoot rather than a flat ease, per the "physically
// reordering a stack of cards" feel this slider is going for.
export const STACK_FLIP_EASE = "back.out(1.4)";

/**
 * Depth 0 is the active card; 1-3 are the receding cards behind it (visible
 * per the brief's "2-3 cards behind"); anything deeper sits fully hidden,
 * waiting off-stage to cycle back into view.
 */
const STACK_DEPTHS = [
  { scale: 1, opacity: 1, y: 0, z: 50 },
  { scale: 0.95, opacity: 0.8, y: 20, z: 40 },
  { scale: 0.9, opacity: 0.55, y: 38, z: 30 },
  { scale: 0.85, opacity: 0.3, y: 54, z: 20 },
] as const;
const HIDDEN_DEPTH = { scale: 0.8, opacity: 0, y: 66, z: 10 } as const;

export function stackDepthFor(position: number) {
  return STACK_DEPTHS[position] ?? HIDDEN_DEPTH;
}

export function stackCardStyle(position: number): CSSProperties {
  const depth = stackDepthFor(position);
  return {
    transform: `translateY(${depth.y}px) scale(${depth.scale})`,
    opacity: depth.opacity,
    zIndex: depth.z,
  };
}

export function captureFlipState() {
  // zIndex is deliberately excluded: it's a discrete stacking value, not a
  // meaningful thing to interpolate, and React already applies the new
  // zIndex synchronously (via flushSync) before this runs — Flip only
  // needs to smoothly animate position/scale/opacity between the two
  // already-committed states.
  return Flip.getState(STACK_CARD_SELECTOR, { props: "opacity" });
}

export function playFlip(state: ReturnType<typeof Flip.getState>, onComplete: () => void) {
  return Flip.from(state, {
    duration: STACK_FLIP_DURATION,
    ease: STACK_FLIP_EASE,
    absolute: false,
    onComplete,
  });
}
