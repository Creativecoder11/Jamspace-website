"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink, NavMenuItem } from "@/lib/types";

interface NavDropdownProps {
  link: NavLink;
  items: NavMenuItem[];
}

const CLOSE_DELAY = 140;

/**
 * Desktop nav item with a hover/focus dropdown listing its child pages.
 */
export function NavDropdown({ link, items }: NavDropdownProps) {
  const pathname = usePathname();
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);
  // Active state is shown as accent text (no corner accents) for dropdown parents
  const isSectionActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
  const rootRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const clearCloseTimer = () => window.clearTimeout(closeTimer.current);

  const open = () => {
    clearCloseTimer();
    setIsOpen(true);
  };

  const close = () => {
    clearCloseTimer();
    setIsOpen(false);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setIsOpen(false), CLOSE_DELAY);
  };

  // Close on outside tap/click (touch tablets open it via the chevron button).
  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  useEffect(() => clearCloseTimer, []);

  return (
    <li
      ref={rootRef}
      className="relative"
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
      onKeyDown={(e) => {
        if (e.key === "Escape" && isOpen) {
          close();
          triggerRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) close();
      }}
    >
      <div className="flex items-center gap-2.5">
        <Link
          href={link.href}
          onClick={close}
          aria-current={pathname === link.href ? "page" : undefined}
          className={`relative inline-block px-1 py-1 hover:text-accent ${isOpen || isSectionActive ? "text-accent" : ""}`}
        >
          {link.label}
        </Link>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => (isOpen ? close() : open())}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={`${link.label} menu`}
          className={`-mr-6 flex h-6 w-4 cursor-pointer items-center justify-center hover:text-accent ${isOpen || isSectionActive ? "text-accent" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            aria-hidden="true"
            className={`transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
          >
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* pt bridges the gap between the trigger and the panel so hover isn't lost */}
      <div
        id={panelId}
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-7 transition-[opacity,translate,visibility] duration-300 ease-out motion-reduce:transition-none ${isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1.5 opacity-0"
          }`}
      >
        <ul className="flex w-[260px] flex-col rounded-xl border border-border bg-background p-2 shadow-[0_24px_48px_-24px_rgba(25,25,25,0.28)]">
          {items.map((item) => {
            const isCurrent = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isCurrent ? "page" : undefined}
                  tabIndex={isOpen ? 0 : -1}
                  className={`block rounded-lg px-4 py-2.5 text-[15px] leading-[130%] transition-colors duration-200 hover:bg-foreground/[0.04] hover:text-accent focus-visible:bg-foreground/[0.04] ${isCurrent ? "text-accent" : "text-foreground"}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}
