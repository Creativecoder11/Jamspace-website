"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { footerColumns, contactInfo } from "@/lib/data/footer";

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

/**
 * Columns/contact/newsletter fade-up on scroll. No giant background
 * wordmark — the source design's footer doesn't have one (see PROJECT
 * memory: an earlier pass invented one, this removes it).
 */
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
    <footer ref={containerRef} className="relative overflow-hidden border-t border-border bg-background">
      {/* Decorative line-art, echoes the outlined triangle/chevron motif from the hero photo overlay. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 400"
        className="pointer-events-none absolute left-[28%] top-0 hidden h-full w-40 text-border md:block"
      >
        <polygon points="20,40 90,40 90,110" fill="none" stroke="currentColor" />
        <polygon points="10,160 90,200 10,240" fill="none" stroke="currentColor" />
        <path d="M20 300h50v50h-50z M20 350h50" fill="none" stroke="currentColor" />
      </svg>

      <Container className="grid grid-cols-1 gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="footer-col max-w-xs">
          <Logo />
          <p className="mt-4 text-sm text-muted">
            JamSpace creates timeless interiors that blend creativity,
            functionality, and exceptional craftsmanship.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/20 transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title} className="footer-col">
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

        <div className="footer-col">
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
      </Container>

      <Container className="footer-col border-t border-border py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="text-lg font-medium">Stay informed</h3>
            <p className="mt-2 max-w-md text-sm text-muted">
              Stay inspired with the latest design trends, expert insights,
              and exclusive updates from JamSpace.
            </p>
          </div>
          <div className="w-full max-w-sm">
            <NewsletterForm />
          </div>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Jamspace, All Rights Reserved</p>
        <p>Design &amp; Developed by Jamroll Studio</p>
      </Container>
    </footer>
  );
}
