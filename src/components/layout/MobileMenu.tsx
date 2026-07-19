"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { NavLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Fullscreen nav overlay shell. Staggered link-reveal timeline (open/close)
 * lands with the Header/Nav animation iteration — this is the static markup
 * + accessibility wiring (focus, Escape-to-close, aria) it will animate into.
 */
export function MobileMenu({ links, isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-background transition-opacity duration-300 md:hidden ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <nav aria-label="Mobile">
        <ul className="flex flex-col items-center gap-6 text-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="font-display text-3xl text-foreground"
                tabIndex={isOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Button href="/contact" onClick={onClose} tabIndex={isOpen ? 0 : -1}>
        Book a Consultant
      </Button>
    </div>
  );
}
