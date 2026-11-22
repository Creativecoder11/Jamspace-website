import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

/** 12-point "verified" badge outline, built once at module load. */
const BADGE_POINTS = Array.from({ length: 24 }, (_, i) => {
  const angle = (Math.PI / 12) * i - Math.PI / 2;
  const r = i % 2 === 0 ? 29 : 23.5;
  return `${(32 + r * Math.cos(angle)).toFixed(2)},${(32 + r * Math.sin(angle)).toFixed(2)}`;
}).join(" ");

function StatusBadge({ tone }: { tone: "success" | "cancelled" }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className="h-14 w-14 text-accent md:h-16 md:w-16"
      aria-hidden="true"
    >
      <polygon
        points={BADGE_POINTS}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {tone === "success" ? (
        <path
          d="M22.5 32.5L29 39L42 25.5"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M25 25L39 39M39 25L25 39"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

/** Pink brand chevron (from the logo mark), pointing right. */
function ReferenceMarker() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 22.86 22.86"
      fill="none"
      className="shrink-0 -rotate-90"
      aria-hidden="true"
    >
      <path
        d="M22.86 22.86H0V0L11.43 11.43L22.86 0V22.86Z"
        fill="var(--color-accent)"
      />
    </svg>
  );
}

/**
 * Result screen shared by the enquiry Thank You page and the booking
 * session thank-you / payment-cancelled pages.
 */
export function ConfirmationPanel({
  reference,
  tone = "success",
  title,
  children,
  primaryAction,
  secondaryAction,
}: {
  reference?: string | null;
  tone?: "success" | "cancelled";
  title: string;
  children: ReactNode;
  primaryAction: ReactNode;
  secondaryAction: ReactNode;
}) {
  return (
    <section className="pt-20">
      {/* Hero panel */}
      <div className="border-y border-border">
        <Container className="flex">
          <div className="relative flex-1 overflow-hidden px-4 pb-12 pt-8 md:px-0 md:pb-16 md:pt-16">
            {/* Diagonal guide line */}
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="2%"
                y1="100%"
                x2="24%"
                y2="0"
                stroke="var(--color-border)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {reference && (
              <p className="mb-8 flex items-center gap-2 text-xs text-muted md:absolute md:left-2 md:top-8 md:mb-0">
                <ReferenceMarker />
                Reference: <span className="text-foreground">{reference}</span>
              </p>
            )}

            <div className="relative mx-auto flex max-w-xl flex-col items-center text-center md:pl-50">
              <StatusBadge tone={tone} />

              <h1 className="mt-6 text-[44px] font-normal leading-[120%] md:mt-8 md:text-hero">
                {title}
              </h1>

              <div className="mt-3 max-w-md text-muted md:mt-4">{children}</div>
            </div>
          </div>

          {/* Brand glyph column */}
          <div className="hidden w-[15%] max-w-50 shrink-0 items-start justify-end border-l border-border pr-6 pt-14 md:flex">
            <Image
              src="/footer-jam.svg"
              alt=""
              width={100}
              height={334}
              className="h-auto w-20 object-contain lg:w-25"
            />
          </div>
        </Container>
      </div>

      {/* Actions row */}
      <div className="border-b border-border">
        <Container className="flex justify-center">
          <div className="flex flex-1 justify-end border-r border-border py-4 pr-3 md:py-5 md:pr-3">
            {primaryAction}
          </div>
          <div className="flex flex-1 justify-start py-4 pl-3 md:py-5">
            {secondaryAction}
          </div>
        </Container>
      </div>
    </section>
  );
}
