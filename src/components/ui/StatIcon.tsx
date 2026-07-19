type StatIconType = "experience" | "projects" | "satisfaction";

// Solid geometric glyphs (single filled path, no stroke) matching the same
// rendering technique as BrandGlyph — the brand step shape for years of
// experience, a house silhouette for completed projects, a star for
// satisfaction/ratings.
const paths: Record<StatIconType, string> = {
  experience: "M23 1V23H1V12.999H13.001V1H23Z",
  projects: "M22.3818 23H1.61816L11.999 2.23633L22.3818 23Z",
  satisfaction:
    "M23 23H1V2.41406L11.999 13.4131L12.7061 12.7061L23 2.41309V23Z",
};

export function StatIcon({
  type,
  className = "",
}: {
  type: StatIconType;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[type]} />
    </svg>
  );
}
