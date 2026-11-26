"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { Clock, Tag, X } from "lucide-react";
import { gsap } from "@/lib/animations/gsap";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { Button } from "@/components/ui/Button";
import { BookingModal } from "@/components/sections/packages/BookingModal";
import { designSession } from "@/lib/data/packages";
import { trackBookingModalOpen } from "@/lib/analytics";

function InfoChip({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: "teal" | "yellow";
}) {
  return (
    <div className="flex flex-1 items-center gap-3 border border-border p-1 pr-4">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center text-white ${
          tone === "teal" ? "bg-accent-teal" : "bg-accent-yellow"
        }`}
      >
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </div>
  );
}

/**
 * "Book a Design Session." — the paid consultation, opens the booking modal.
 * `autoOpen` is set when arriving from "Try Again" on the payment-cancelled page.
 * `ctaLocation` tags the analytics event so each page using this section is tracked separately.
 */
export function BookSession({
  autoOpen = false,
  ctaLocation = "packages_book_session",
}: {
  autoOpen?: boolean;
  ctaLocation?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(autoOpen);

  const openModal = useCallback((location: string) => {
    trackBookingModalOpen(location);
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Drop ?book=session so a refresh doesn't reopen the modal.
  useEffect(() => {
    if (!autoOpen) return;
    trackBookingModalOpen("payment_retry");
    const url = new URL(window.location.href);
    url.searchParams.delete("book");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }, [autoOpen]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".session-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} id="book-a-session" className="mt-16 md:mt-22.5">
      <div className="md:border-y border-border">
        <div className="mx-auto flex max-w-335 flex-col md:flex-row">
          {/* Left — session details */}
          <div className="session-reveal flex flex-col md:w-[41%]  md:border-l border-border">
            <div className="px-4 pb-6 md:px-0 md:pb-8 md:pr-8 md:pl-8 md:pt-8">
              <AnimatedHeading
                as="h2"
                lines={[...designSession.titleLines]}
                className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
              />
              <p className="mt-3 max-w-md text-muted md:mt-4">{designSession.description}</p>

              <div className="mt-5 flex gap-3 md:mt-6">
                <InfoChip
                  tone="teal"
                  label={designSession.priceLabel}
                  icon={<Tag className="h-4 w-4" strokeWidth={2} />}
                />
                <InfoChip
                  tone="yellow"
                  label={designSession.duration}
                  icon={<Clock className="h-4 w-4" strokeWidth={2} />}
                />
              </div>
            </div>

            <div className="grid gap-8 border-t border-border px-4 pt-6 sm:grid-cols-2 sm:gap-6 md:grid-cols-1 md:gap-10 md:px-0 md:pr-8 md:pt-6 md:pl-8 md:pb-8 xl:grid-cols-2 xl:gap-6">
              <div>
                <p className="whitespace-nowrap border-b border-border pb-4 text-xl md:text-2xl">What&apos;s Included?</p>
                <ul className="mt-4 space-y-3 md:mt-6">
                  {designSession.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <BrandGlyph shape="step" color="pink" className="mt-1 h-3 w-3 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="whitespace-nowrap border-b border-border pb-4 text-xl md:text-2xl">What&apos;s Excluded?</p>
                <ul className="mt-4 space-y-3 md:mt-6">
                  {designSession.excluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-3 w-3 shrink-0 items-center justify-center bg-muted text-background"
                      >
                        <X className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right — image + CTA */}
          <div className="session-reveal flex flex-1 flex-col px-4 pt-8 md:border-l border-border md:px-0 md:pl-8 md:py-8">
            <div className="relative aspect-600/340 w-full overflow-hidden">
              <Image
                src={designSession.image}
                alt="Bedroom interior designed by Jam Space"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-6 text-2xl font-normal md:mt-8">{designSession.ctaTitle}</h3>
            <p className="mt-2 text-sm text-muted md:mt-4">{designSession.ctaText}</p>
            <Button
              className="mt-4 w-full justify-center md:mt-6"
              onClick={() => openModal(ctaLocation)}
            >
              Book a Session
            </Button>
          </div>
        </div>
      </div>

      <BookingModal open={isModalOpen} onClose={closeModal} />
    </section>
  );
}
