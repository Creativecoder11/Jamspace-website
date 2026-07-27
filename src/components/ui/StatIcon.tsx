type StatIconType =
  | "lshape"
  | "traiangle"
  | "mshape";

const paths: Record<StatIconType, string> = {
  lshape:
    "M23 1V23H1V12.999H13.001V1H23Z",

  traiangle:
    "M22.3818 23H1.61816L11.999 2.23633L22.3818 23Z",

  mshape:
    "M23 23H1V2.41406L11.999 13.4131L12.7061 12.7061L23 2.41309V23Z",
};

export function StatIcon({
  type,
  className = "",
  variant = "solid",
}: {
  type: StatIconType;
  className?: string;
  variant?: "solid" | "outline";
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={variant === "outline" ? "none" : "currentColor"}
      stroke={variant === "outline" ? "currentColor" : "none"}
      strokeWidth={variant === "outline" ? 0.5 : undefined}
      className={className}
      aria-hidden="true"
    >
      <path d={paths[type]} />
    </svg>
  );
}