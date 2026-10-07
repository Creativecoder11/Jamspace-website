import type { ElementType } from "react";

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
