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
    <svg viewBox={viewBox} className={className} aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const ctaTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(
          [
            ".footer-cta-panel",
            ".footer-cta-button",
            ".footer-cta-panel .line",
            ".footer-col",
          ],
          {
            clearProps: "all",
            opacity: 1,
            y: 0,
            scale: 1,
          }
        );
        return;
      }

      // Infinite CTA image strip
      gsap.to(ctaTrackRef.current, {
        xPercent: -50,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      // CTA panel animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
        .fromTo(
          ".footer-cta-panel",
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
        )
        .from(
          ".footer-cta-panel .line",
          {
            yPercent: 110,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          "<+=0.15"
        )
        .from(
          ".footer-cta-button",
          {
            opacity: 0,
            y: 10,
            duration: 0.45,
            ease: "power3.out",
          },
          "<+=0.05"
        );

      // Footer columns animation
      gsap.utils.toArray<HTMLElement>(".footer-col").forEach((el) => {
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
    },
    { scope: containerRef }
  );

  return (
    <footer ref={containerRef} className="bg-background">
      <div className="pt-13 md:pt-25 pb-13">
        <p className="mb-8 text-center text-sm text-muted">
          Bring Your Vision to Life
        </p>

        <div className="relative h-65 md:h-100 overflow-hidden">
          <div
            ref={ctaTrackRef}
            className="flex h-full w-max items-center gap-6"
          >
            {[...ctaStripImages, ...ctaStripImages].map((src, i) => (
              <div
                key={i}
                className={`relative w-75 shrink-0 md:w-105 ${i % 2 === 0 ? "h-full" : "h-75"}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="420px"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          <div className="h-full md:h-full absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border-l-24 border-r-24 border-[#F7F6F1] gap-6 bg-accent p-4 text-center md:aspect-4/5 w-3/4 md:w-100">
            <AnimatedHeading
              as="h2"
              lines={["Let's Design", "Your", "Dream Space."]}
              className="text-3xl font-medium leading-tight text-white md:text-subheading"
            />
            <div className="footer-cta-button">
              <MagneticButton>
                <Button href="/contact" variant="inverse" className="font-medium">
                  Contact Us Now
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <Container className="mx-auto w-full max-w-335 flex flex-col md:flex-row not-last:md:gap-x-0 md:divide-x md:divide-border">
          <div className="flex flex-col w-full md:w-[30%] space-between py-8 md:py-13 md:pr-8 mx-4 md:mx-0">
            <div className="md:flex-1">
              <div className="relative w-31.5 h-16.5 md:w-40 md:h-auto">
                <Logo svgClassName="w-[126px] h-[66px]" />
              </div>
            </div>
            <div>
              <p className="mt-10 md:mt-4 text-base text-muted mr-4">
                JamSpace creates timeless interiors that blend creativity,
                functionality, and exceptional craftsmanship.
              </p>
              <div className="mt-4 md:mt-6 flex gap-3">
                <a href="#" aria-label="Facebook" className="group">
                  <Image
                    src="/icons/facebook.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(48%)_sepia(54%)_saturate(1044%)_hue-rotate(298deg)_brightness(96%)_contrast(91%)]"
                  />
                </a>

                <a href="#" aria-label="LinkedIn" className="group">
                  <Image
                    src="/icons/linkedin.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(48%)_sepia(54%)_saturate(1044%)_hue-rotate(298deg)_brightness(96%)_contrast(91%)]"
                  />
                </a>

                <a href="#" aria-label="Instagram" className="group">
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

          <div className="hidden md:flex items-start w-[15%] pt-14 pr-6 justify-end text-border">
            <Image
              src="/footer-jam.svg"
              alt=""
              width={24}
              height={24}
              className="w-auto object-contain"
            />
          </div>

          <div className="md:hidden flex items-start w-full py-8 px-4 justify-end text-border border-t border-b">
            <Image
              src="/jam-footer-icon.svg"
              alt=""
              width={24}
              height={24}
              className="w-auto object-contain"
            />
          </div>

          <div className="py-13 md:w-[55%] md:pl-8">
            <div className="grid grid-cols-2 md:grid-cols-4 space-y-8 mx-4 md:mx-0">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-base font-medium">{column.title}</h3>
                  <ul className="mt-3 md:mt-4 space-y-1.5 md:space-y-3 text-sm text-muted">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="hover:text-accent">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="text-base font-medium">Contact Us</h3>
                <ul className="mt-3 md:mt-4 space-y-1.5 md:space-y-3 text-sm text-muted">
                  <li>Address: {contactInfo.address}</li>
                  <li>
                    Phone:{" "}
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
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

            <div className="mt-6 md:mt-13 w-full mx-4 md:mx-0 pr-8 md:pr-0">
              <h3 className="text-lg font-medium">Stay informed</h3>
              <p className="mt-2 w-full text-sm text-muted ">
                Stay inspired with the latest design trends, expert insights, and
                exclusive updates from JamSpace. Discover ideas that help you
                create beautiful, functional spaces.
              </p>
              <div className="mt-4 w-full">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </Container>
      </div>


      <div className="border-t border-border">
        <Container className="mx-auto w-full max-w-335 footer-col flex flex-col gap-2 py-3 md:py-6 text-xs md:text-sm text-muted md:flex-row md:items-center md:justify-between px-4 md:px-0">
          <p>&copy; {new Date().getFullYear()} Jamspace, All Rights Reserved</p>
          <p>
            Design &amp; Developed by{" "}
            <a
              href="https://jamroll.space"
              target="_blank"
              rel="noreferrer"
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
