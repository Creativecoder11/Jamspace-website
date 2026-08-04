"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BrandGlyph } from "@/components/ui/BrandGlyph";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { mainNav } from "@/lib/data/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isMenuOpen, lenis]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 bg-background">
      <Container className="flex h-full items-center justify-between px-4 md:px-0">
        <Logo svgClassName="w-[77px] h-[40px] md:w-auto md:h-12" />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-15 text-[16px] font-normal">
            {mainNav.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className="relative inline-block px-1 py-1 hover:text-accent"
                  >
                    {isActive && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        className="absolute -left-1.5 -top-[0.2px] -right-2 rotate-360"
                      >
                        <path
                          d="M-9.53674e-07 11L7.97614e-09 -7.97631e-09L11 9.53674e-07L11 5.50033L5.49935 5.50033L5.49935 11L-9.53674e-07 11Z"
                          fill="#E92A7B"
                        />
                      </svg>
                    )}
                    {link.label}
                    {isActive && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        className="absolute  top-5 -right-1.5 rotate-180"
                      >
                        <path
                          d="M-9.53674e-07 11L7.97614e-09 -7.97631e-09L11 9.53674e-07L11 5.50033L5.49935 5.50033L5.49935 11L-9.53674e-07 11Z"
                          fill="#E92A7B"
                        />
                      </svg>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <MagneticButton>
            <Button href="/contact">Book a Consultant</Button>
          </MagneticButton>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden cursor-pointer"
        >
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-300 ${isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-300 ${isMenuOpen ? "translate-y-[-3.5px] -rotate-45" : ""
              }`}
          />
        </button>
      </Container>

      <div id="mobile-menu">
        <MobileMenu
          links={mainNav}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  );
}
