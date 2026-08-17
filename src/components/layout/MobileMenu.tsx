"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface MobileMenuProps {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
}

// Corner-bracket accent for the active link, scaled up from the desktop version
function ActiveCorners() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 11 11"
        fill="none"
        className="absolute -left-2 -top-1"
      >
        <path
          d="M-9.53674e-07 11L7.97614e-09 -7.97631e-09L11 9.53674e-07L11 5.50033L5.49935 5.50033L5.49935 11L-9.53674e-07 11Z"
          fill="#E92A7B"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 11 11"
        fill="none"
        className="absolute top-9 -right-2 rotate-180"
      >
        <path
          d="M-9.53674e-07 11L7.97614e-09 -7.97631e-09L11 9.53674e-07L11 5.50033L5.49935 5.50033L5.49935 11L-9.53674e-07 11Z"
          fill="#E92A7B"
        />
      </svg>
    </>
  );
}

export function MobileMenu({ links, isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

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
      className={`fixed inset-x-0 top-20 z-40 flex h-[calc(100dvh-5rem)] flex-col bg-background transition-opacity duration-300 md:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
    >
      {/* top split: logo | nav */}
      <div className="flex border-t border-b border-foreground/10">
        {/* left column */}
        <div className="flex w-[35%] flex-col border-r border-foreground/10 p-4">
          <Image
            src="/footer-jam.svg"
            alt=""
            width={24}
            height={24}
            className="w-auto object-contain"
          />
        </div>

        {/* right column */}
        <div className="flex flex-1 flex-col">
          <nav aria-label="Mobile" className="py-4 px-6">
            <ul className="flex flex-col items-end gap-4 text-right">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      tabIndex={isOpen ? 0 : -1}
                      className="relative inline-block px-1 py-1 text-[28px] font-medium text-foreground hover:text-accent"
                    >
                      {isActive && <ActiveCorners />}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-foreground/10 px-5 py-6">
            <Button href="/contact" onClick={onClose} tabIndex={isOpen ? 0 : -1}>
              Book a Consultant
            </Button>
          </div>
        </div>
      </div>

      {/* spacer pushes footer to bottom */}
      <div className="flex-1" />

      {/* bottom-left contact info + socials */}
      <div className="shrink-0 px-4 pb-8">
        <div className="flex flex-col gap-1.5 mb-4 text-[#444444]">
          <p className="text-sm leading-[120%]">+880 XXX XXX XXXX</p>
          <p className="text-sm leading-[120%]">demo@jamroll.space</p>
        </div>
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/jamroll.space"
            aria-label="Facebook"
            className="group"
          >
            <Image
              src="/icons/facebook.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(22%)_sepia(96%)_saturate(3447%)_hue-rotate(327deg)_brightness(98%)_contrast(87%)]"
            />
          </a>

          <a
            href="https://linkedin.com/company/jamrollltd"
            aria-label="LinkedIn"
            className="group"
          >
            <Image
              src="/icons/linkedin.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(22%)_sepia(96%)_saturate(3447%)_hue-rotate(327deg)_brightness(98%)_contrast(87%)]"
            />
          </a>

          <a
            href="https://www.instagram.com/jamroll.space"
            aria-label="Instagram"
            className="group"
          >
            <Image
              src="/icons/insta.svg"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(22%)_sepia(96%)_saturate(3447%)_hue-rotate(327deg)_brightness(98%)_contrast(87%)]"
            />
          </a>
        </div>
      </div>
    </div>
  );
}