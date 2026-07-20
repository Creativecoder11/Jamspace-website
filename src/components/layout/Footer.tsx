"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { footerColumns, contactInfo } from "@/lib/data/footer";
import Image from "next/image";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.9V12H8v3h2v6h3v-6h2.2l.8-3H13v-1.6c0-.6.4-1.4 1.5-1.4Z",
  },
  {
    label: "LinkedIn",
    path: "M6.94 8.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88ZM5.5 10h3v9h-3v-9Zm5.5 0h2.9v1.23h.04c.4-.76 1.4-1.56 2.9-1.56 3.1 0 3.66 2.04 3.66 4.7V19h-3v-4.1c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.23V19h-3v-9Z",
    href: "https://linkedin.com",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm0 5.3a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm4.06-5.42a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 5.9c-1.9 0-2.13 0-2.88.04-.74.04-1.24.15-1.68.33-.45.18-.84.42-1.22.8-.38.38-.62.77-.8 1.22-.18.44-.29.94-.33 1.68C5.05 10.72 5.05 10.95 5.05 12s0 1.28.04 2.03c.04.74.15 1.24.33 1.68.18.45.42.84.8 1.22.38.38.77.62 1.22.8.44.18.94.29 1.68.33.75.04.98.04 2.88.04s2.13 0 2.88-.04c.74-.04 1.24-.15 1.68-.33.45-.18.84-.42 1.22-.8.38-.38.62-.77.8-1.22.18-.44.29-.94.33-1.68.04-.75.04-.98.04-2.03s0-1.28-.04-2.03c-.04-.74-.15-1.24-.33-1.68a3.3 3.3 0 0 0-.8-1.22 3.3 3.3 0 0 0-1.22-.8c-.44-.18-.94-.29-1.68-.33-.75-.04-.98-.04-2.88-.04Z",
  },
];

// Same three brand accent shapes used everywhere else (logo mark, stat
// icons, marquee), rendered here as large outlines instead of solid fills —
// a decorative column between the intro and the link columns.
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

/** Columns/contact/newsletter fade-up on scroll. */
export function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.batch(".footer-col", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          }),
      });
    },
    { scope: containerRef },
  );

  return (
    <footer ref={containerRef} className="border-t border-border bg-background">
      <Container className="flex flex-row md:gap-x-0 md:divide-x md:divide-border">
        <div className="flex flex-col w-[30%] space-between  py-13 md:pr-8">
          <div className="flex-1">
            <Logo />
          </div>
          <div>
            <p className="mt-4 text-sm text-muted">
              JamSpace creates timeless interiors that blend creativity,
              functionality, and exceptional craftsmanship.
            </p>
            <div className="mt-6 flex gap-3">
              <Image
                src="/icons/facebook.svg"
                alt=""
                width={24}
                height={24}
                className="w-auto object-contain"
              />
              <Image
                src="/icons/linkedin.svg"
                alt=""
                width={24}
                height={24}
                className="w-auto object-contain"
              />
              <Image
                src="/icons/insta.svg"
                alt=""
                width={24}
                height={24}
                className="w-auto object-contain"
              />
            </div>
          </div>
        </div>

        <div className="flex items-start w-[15%] pt-14 pr-6 justify-end text-border">
          <Image
            src="/footer-jam.svg"
            alt=""
            width={24}
            height={24}
            className="w-auto object-contain"
          />
        </div>

        <div className="py-13 w-[55%] md:pl-8">
          <div className="flex gap-8">
            {footerColumns.map((column) => (
              <div key={column.title} className="w-[30%]">
                <h3 className="text-sm font-medium">{column.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted">
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
              <h3 className="text-sm font-medium">Contact Us</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
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

          <div className="mt-13 w-full">
            <h3 className="text-lg font-medium">Stay informed</h3>
            <p className="mt-2 w-full text-sm text-muted">
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

      <Container className="footer-col flex flex-col gap-2 border-t border-border py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
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
    </footer>
  );
}
