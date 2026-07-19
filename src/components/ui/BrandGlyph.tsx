const colorMap = {
  pink: "var(--color-accent)",
  yellow: "var(--color-accent-yellow)",
  teal: "var(--color-accent-teal)",
  white: "#ffffff"
} as const;

type GlyphShape = "step" | "triangle" | "chevron";

const shapes: Record<GlyphShape, { viewBox: string; d: string }> = {
  step: {
    viewBox: "0 0 22.89 22.86",
    d: "M60 0L60 60L0 60L0 29.9982L30.0036 29.9982L30.0036 0L60 0Z",
  },
  triangle: {
    viewBox: "26.7537 0 22.8594 22.8595",
    d: "M49.6131 22.8595H26.7537L38.1827 0L49.6131 22.8595Z",
  },
  chevron: {
    viewBox: "53.4797 0 22.8595 22.8595",
    d: "M76.3392 22.8595H53.4797V0L64.9088 11.429L76.3392 0V22.8595Z",
  },
};

/**
 * The three brand accent shapes reused everywhere across the design: the
 * logo mark, stat icons, marquee separators, and services sub-item bullets.
 * Exact bezier paths traced from the source logo SVG (not approximated).
 */
export function BrandGlyph({
  shape,
  color,
  className = "",
}: {
  shape: GlyphShape;
  color: keyof typeof colorMap;
  className?: string;
}) {
  const { viewBox, d } = shapes[shape];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
    >
      <path
        d="M11 1.8914e-06L11 11L1.9233e-06 11L9.61593e-07 5.49968L5.50065 5.49968L5.50065 2.85293e-06L11 1.8914e-06Z"
        fill="#E92A7B"
      />
    </svg>
  );
}
