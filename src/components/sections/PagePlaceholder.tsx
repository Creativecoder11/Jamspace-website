"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";

/**
 * Body placeholder for interior pages whose full layout hasn't been
 * specced/built yet. Swap for a custom section once content is ready —
 * this is intentionally not meant to be the page's final layout.
 */
export function PagePlaceholder({
  message = "The full layout for this page is coming soon.",
  children,
}: {
  message?: string;
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".placeholder-panel", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="pb-24">
      <Container>
        <div className="placeholder-panel rounded-2xl border border-dashed border-border px-8 py-16 text-center">
          <p className="text-muted">{message}</p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
