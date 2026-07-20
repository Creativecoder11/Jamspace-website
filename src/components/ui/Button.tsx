import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary" | "light" | "inverse";

interface BaseProps {
  variant?: ButtonVariant;
  showArrow?: boolean;
  className?: string;
}

const base =
  "group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-normal tracking-wide transition-colors duration-300";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-foreground font-medium hover:bg-foreground",
  secondary:
    "border border-foreground/20 text-foreground hover:border-foreground",
  // For use over photos: white outline, matches the Hero/Services/Video CTAs.
  light:
    "border border-white/70 text-white hover:bg-white hover:text-foreground",
  // Solid white pill with accent text — the CTA section's button on a pink panel.
  inverse: "bg-white text-accent hover:bg-foreground hover:text-white",
};

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M10.9926 0H1.01928C0.752101 0 0.495863 0.106137 0.306938 0.295062C0.118013 0.483987 0.0118755 0.740225 0.0118755 1.00741C0.0118755 1.27459 0.118013 1.53082 0.306938 1.71975C0.495863 1.90867 0.752101 2.01481 1.01928 2.01481H8.55971L0.307549 10.268C0.211331 10.3609 0.134585 10.4721 0.0817881 10.595C0.028991 10.7179 0.0012004 10.8501 3.80363e-05 10.9838C-0.00112432 11.1176 0.0243648 11.2503 0.075018 11.3741C0.125671 11.4979 0.200474 11.6103 0.295062 11.7049C0.38965 11.7995 0.502129 11.8743 0.625935 11.925C0.749742 11.9756 0.882397 12.0011 1.01616 12C1.14992 11.9988 1.28211 11.971 1.40502 11.9182C1.52793 11.8654 1.63909 11.7887 1.73202 11.6925L9.98519 3.43979V10.9807C9.98519 11.2479 10.0913 11.5041 10.2803 11.6931C10.4692 11.882 10.7254 11.9881 10.9926 11.9881C11.2598 11.9881 11.516 11.882 11.7049 11.6931C11.8939 11.5041 12 11.2479 12 10.9807V1.00741C12 0.740225 11.8939 0.483987 11.7049 0.295062C11.516 0.106137 11.2598 0 10.9926 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

type LinkButtonProps = BaseProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };
type NativeButtonProps = BaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

/** Pill CTA. Renders a Next Link when `href` is passed, otherwise a <button>. */
export function Button({
  variant = "primary",
  showArrow = true,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as LinkButtonProps;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
        {showArrow && <Arrow />}
      </Link>
    );
  }

  const buttonRest = rest as NativeButtonProps;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {children}
      {showArrow && <Arrow />}
    </button>
  );
}
