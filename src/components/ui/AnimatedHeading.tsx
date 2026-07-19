import type { ElementType } from "react";

/**
 * Renders each string as its own overflow-hidden line with an inner `.line`
 * span, ready for a GSAP y-reveal timeline. Line breaks here are the
 * design's art-directed breaks (not runtime text-wrap detection) — every
 * multi-line heading in this design breaks at fixed, intentional points.
 */
export function AnimatedHeading({
  lines,
  as = "h2",
  className = "",
  lineClassName = "",
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
}) {
  const Tag = as;
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span className={`line inline-block ${lineClassName}`}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
