"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

import { footerColumns, contactInfo } from "@/lib/data/footer";

import Image from "next/image";

const ctaStripImages = [
  "/images/cta-strip-01.webp",
  "/images/cta-strip-02.webp",
  "/images/cta-strip-03.webp",
  "/images/cta-strip-04.webp",
];

const glyphShapes = {
  chevron: {
    viewBox: "53.4797 0 22.8595 22.8595",
    d: "M76.3392 22.8595H53.4797V0L64.9088 11.429L76.3392 0V22.8595Z",
  },
  triangle: {
    viewBox: "26.7537 0 22.8594 22.8595",
    d: "M49.6131 22.8595H26.7537L38.1827 0L49.6131 22.8595Z",
  },
  step: {
    viewBox: "0 0 60 60",
    d: "M60 0L60 60L0 60L0 29.9982L30.0036 29.9982L30.0036 0L60 0Z",
  },
} as const;

function FooterGlyph({
  shape,
  className = "",
}: {
  shape: keyof typeof glyphShapes;
  className?: string;
}) {
  const { viewBox, d } = glyphShapes[shape];

  return (
    <svg
      viewBox={viewBox}
      className={className}
      aria-hidden="true"
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const ctaTrackRef = useRef<HTMLDivElement>(null);
  const ctaPanelRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const footer = containerRef.current;

      const ctaPanel = ctaPanelRef.current;
      const ctaButton = ctaButtonRef.current;
      const ctaTrack = ctaTrackRef.current;

      /*
       * Respect reduced motion preferences.
       */
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        if (ctaPanel) {
          gsap.set(ctaPanel, {
            clearProps: "all",
            opacity: 1,
            y: 0,
            scale: 1,
          });
        }

        if (ctaButton) {
          gsap.set(ctaButton, {
            clearProps: "all",
            opacity: 1,
            y: 0,
          });
        }

        gsap.set(
          footer.querySelectorAll(".footer-col"),
          {
            clearProps: "all",
            opacity: 1,
            y: 0,
            scale: 1,
          }
        );

        return;
      }

      /*
       * Infinite CTA image strip
       */
      if (ctaTrack) {
        gsap.to(ctaTrack, {
          xPercent: -50,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      /*
       * CTA panel animation
       */
      if (ctaPanel) {
        const ctaTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        ctaTimeline.fromTo(
          ctaPanel,
          {
            scale: 0.9,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          }
        );

        if (ctaButton) {
          ctaTimeline.from(
            ctaButton,
            {
              opacity: 0,
              y: 10,
              duration: 0.45,
              ease: "power3.out",
            },
            "<+=0.05"
          );
        }
      }

      /*
       * Footer columns animation
       */
      const footerColumns =
        footer.querySelectorAll<HTMLElement>(".footer-col");

      footerColumns.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();

      return () => {
        gsap.killTweensOf(ctaTrack);
      };
    },
    {
      scope: containerRef,
    }
  );

  return (
    <footer
      ref={containerRef}
      className="bg-background"
    >
      {/* CTA */}
      <div className="pb-13 pt-13 md:pb-25 md:pt-25">
        <p className="mb-8 text-center text-sm text-muted">
          Bring Your Vision to Life
        </p>

        <div className="relative h-65 overflow-hidden md:h-100">
          {/* Moving image track */}
          <div
            ref={ctaTrackRef}
            className="flex h-full w-max items-center gap-6"
          >
            {[...ctaStripImages, ...ctaStripImages].map(
              (src, i) => (
                <div
                  key={`${src}-${i}`}
                  className={`relative w-75 shrink-0 md:w-105 ${i % 2 === 0 ? "h-full" : "h-75"
                    }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                </div>
              )
            )}
          </div>

          {/* CTA Panel */}
          <div
            ref={ctaPanelRef}
            className="absolute left-1/2 top-1/2 z-10 flex h-full w-3/4 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 border-l-24 border-r-24 border-[#F7F6F1] bg-accent p-4 text-center md:aspect-4/5 md:h-full md:w-100"
          >
            <AnimatedHeading
              as="h2"
              lines={[
                "Let's Design",
                "Your",
                "Dream Space.",
              ]}
              className="text-3xl font-medium leading-tight text-white md:text-subheading"
            />

            <div ref={ctaButtonRef}>
              <MagneticButton>
                <Button
                  href="/contact"
                  variant="inverse"
                  className="font-medium"
                >
                  Contact Us Now
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Footer content */}
      <div className="border-t border-border">
        <Container className="mx-auto flex w-full max-w-335 flex-col md:flex-row md:divide-x md:divide-border">
          {/* Logo / Description */}
          <div className="mx-4 flex w-full flex-col py-8 md:mx-0 md:w-[30%] md:py-13 md:pr-8">
            <div className="md:flex-1">
              <div className="relative h-16.5 w-31.5 md:h-auto md:w-40">
                <Logo svgClassName="w-[126px] h-[66px]" />
              </div>
            </div>

            <div>
              <p className="mr-4 mt-10 text-base text-muted md:mt-4">
                Jam Space creates timeless interiors that blend
                creativity, functionality, and exceptional
                craftsmanship.
              </p>

              <div className="mt-4 flex gap-3 md:mt-6">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/jamroll.space"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Image
                    src="/icons/facebook.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(48%)_sepia(54%)_saturate(1044%)_hue-rotate(298deg)_brightness(96%)_contrast(91%)]"
                  />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/jam-space-interior"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Image
                    src="/icons/linkedin.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(48%)_sepia(54%)_saturate(1044%)_hue-rotate(298deg)_brightness(96%)_contrast(91%)]"
                  />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/jamroll.space"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Image
                    src="/icons/insta.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(48%)_sepia(54%)_saturate(1044%)_hue-rotate(298deg)_brightness(96%)_contrast(91%)]"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Footer icon - desktop */}
          <div className="hidden w-[15%] items-start justify-end pt-14 pr-6 text-border md:flex">
            <Image
              src="/footer-jam.svg"
              alt=""
              width={24}
              height={24}
              className="w-auto object-contain"
            />
          </div>

          {/* Footer icon - mobile */}
          <div className="flex w-full items-start justify-end border-b border-t px-4 py-8 text-border md:hidden">
            <Image
              src="/jam-footer-icon.svg"
              alt=""
              width={24}
              height={24}
              className="w-auto object-contain"
            />
          </div>

          {/* Footer links */}
          <div className="py-13 md:w-[55%] md:pl-8">
            <div className="mx-4 grid grid-cols-2 space-y-8 md:mx-0 md:grid-cols-4">
              {footerColumns.map((column) => (
                <div
                  key={column.title}
                  className="footer-col"
                >
                  <h3 className="text-base font-medium">
                    {column.title}
                  </h3>

                  <ul className="mt-3 space-y-1.5 text-sm text-muted md:mt-4 md:space-y-3">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="hover:text-accent"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Contact */}
              <div className="footer-col">
                <h3 className="text-base font-medium">
                  Contact Us
                </h3>

                <ul className="mt-3 space-y-1.5 text-sm text-muted md:mt-4 md:space-y-3">
                  <li>
                    Address: {contactInfo.address}
                  </li>

                  <li>
                    Phone:{" "}
                    <a
                      href={`tel:${contactInfo.phone.replace(
                        /\s+/g,
                        ""
                      )}`}
                      className="hover:text-accent"
                    >
                      {contactInfo.phone}
                    </a>
                  </li>

                  <li>
                    Email:{" "}
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="hover:text-accent"
                    >
                      {contactInfo.email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mx-4 mt-6 w-full pr-8 md:mx-0 md:mt-13 md:pr-0">
              <h3 className="text-lg font-medium">
                Stay informed
              </h3>

              <p className="mt-2 w-full text-sm text-muted">
                Stay inspired with the latest design trends,
                expert insights, and exclusive updates from Jam
                Space. Discover ideas that help you create
                beautiful, functional spaces.
              </p>

              <div className="mt-4 w-full">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <Container className="footer-col mx-auto flex w-full max-w-335 flex-col gap-2 px-4 py-3 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-0 md:py-6 md:text-sm">
          <p>
            &copy; {new Date().getFullYear()} Jam Space, All
            Rights Reserved
          </p>

          <p>
            Design &amp; Developed by{" "}
            <a
              href="https://jamroll.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent"
            >
              Jamroll Studio
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
