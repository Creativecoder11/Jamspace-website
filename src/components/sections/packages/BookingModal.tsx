"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { Clock, X } from "lucide-react";
import { gsap } from "@/lib/animations/gsap";

import { Button } from "@/components/ui/Button";
import { designSession } from "@/lib/data/packages";
import { getAttribution } from "@/lib/attribution";
import { trackBookingCheckout } from "@/lib/analytics";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+?8801[3-9]\d{8}|01[3-9]\d{8}|\+?[1-9]\d{7,14})$/;

// Same underline field style as the Contact form.
const inputClass =
  "mt-2 w-full border-b border-border bg-transparent pb-2 text-sm md:text-base text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none transition-colors";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  location: "",
  notes: "",
  website_fax_field: "", // honeypot
};

function Field({
  label,
  required = true,
  htmlFor,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const lenis = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = useId();
  const titleId = `${id}-title`;

  // Lock page scroll, animate in, focus the first field, restore focus on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", delay: 0.05 },
      );
    }
    const focusTimer = window.setTimeout(() => firstInputRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(focusTimer);
      lenis?.start();
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [open, lenis]);

  // Escape closes; Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, isSubmitting]);

  // Returning from the gateway via the browser Back button restores this page
  // from bfcache with the spinner still showing — reset it.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setIsSubmitting(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  if (!open) return null;

  const update =
    (key: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);

    if (form.name.trim().length < 2) return setError("Please enter your full name.");
    if (!phoneRegex.test(form.phone.replace(/[\s\-()]/g, "")))
      return setError("Please enter a valid phone number (e.g. 017XXXXXXXX or +880 1XXXXXXXXX).");
    if (!emailRegex.test(form.email.trim())) return setError("Please enter a valid email address.");
    if (form.location.trim().length < 2) return setError("Please enter your project location.");

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, attribution: getAttribution() }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok || !result.gatewayUrl) {
        throw new Error(result.error || "We couldn't start the payment. Please try again.");
      }

      trackBookingCheckout(result.bookingId, designSession.price);
      // Hand off to the SSLCommerz hosted payment page.
      window.location.assign(result.gatewayUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't start the payment. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-100 flex items-center justify-center bg-foreground/60 p-0 backdrop-blur-sm md:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative h-full w-full max-w-343 overflow-y-auto bg-background md:h-auto md:max-h-[calc(100dvh-3rem)]"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close booking form"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-accent transition-colors hover:text-foreground disabled:opacity-40 md:right-6 md:top-6"
        >
          <X className="h-7 w-7" strokeWidth={1.75} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-6 px-4 pb-6 pt-16 md:gap-16 md:px-16 md:pb-16 md:pt-16">
          {/* Left — intro */}
          <div className="flex flex-col">
            <h2 id={titleId} className="text-[32px] font-normal leading-[115%] md:text-6xl md:leading-[1.15]">
              One Step Closer to Your Dream Space.
            </h2>
            <p className="mt-3 max-w-md text-muted md:mt-5 md:text-lg">
              First, share a few details about yourself and your project so our
              team can better understand your vision.
            </p>

            <div className="mt-5 flex w-fit items-center gap-4 border border-border p-1.5 pr-8 md:mt-16">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-accent-yellow text-white md:h-15 md:w-15">
                <Clock className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-base md:text-lg">{designSession.duration}</span>
                <span className="block text-sm text-muted">{designSession.durationCaption}</span>
              </span>
            </div>

            <div className="relative mt-10 hidden aspect-510/338 w-full overflow-hidden lg:block">
              <Image
                src="/images/drawing-room.webp"
                alt="Living room interior designed by Jam Space"
                fill
                sizes="510px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden bg-border lg:block" aria-hidden="true" />

          {/* Right — form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col">
            <div className="h-1 w-full rounded-full bg-accent" aria-hidden="true" />
            <p className="mt-4 border-b border-border pb-4 text-base">Your Details</p>

            <h3 className="mt-6 text-2xl font-medium md:mt-10 md:text-[32px]">Let&apos;s Get To Know You.</h3>
            <p className="mt-2 text-muted">Share your details so we can understand your project.</p>

            <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 md:mt-12 md:gap-y-8">
              <Field label="Full Name" htmlFor={`${id}-name`}>
                <input
                  ref={firstInputRef}
                  id={`${id}-name`}
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Type Your Full Name"
                  className={inputClass}
                />
              </Field>
              <Field label="Phone Number" htmlFor={`${id}-phone`}>
                <input
                  id={`${id}-phone`}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  maxLength={30}
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+880 1XXXXXXXXX"
                  className={inputClass}
                />
              </Field>
              <Field label="Email Address" htmlFor={`${id}-email`}>
                <input
                  id={`${id}-email`}
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={150}
                  value={form.email}
                  onChange={update("email")}
                  placeholder="Type Your Email Address"
                  className={inputClass}
                />
              </Field>
              <Field label="Project Location" htmlFor={`${id}-location`}>
                <input
                  id={`${id}-location`}
                  type="text"
                  autoComplete="address-level2"
                  required
                  maxLength={150}
                  value={form.location}
                  onChange={update("location")}
                  placeholder="Type Your Project Location"
                  className={inputClass}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Tell Us About Your Project" required={false} htmlFor={`${id}-notes`}>
                  <textarea
                    id={`${id}-notes`}
                    rows={3}
                    maxLength={2000}
                    value={form.notes}
                    onChange={update("notes")}
                    placeholder="Type Your Message"
                    className="mt-2 w-full resize-none bg-transparent pb-2 text-sm text-foreground placeholder:text-muted/60 focus:outline-none md:text-base"
                  />
                </Field>
              </div>

              {/* Honeypot — hidden from people, filled by bots */}
              <input
                type="text"
                name="website_fax_field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website_fax_field}
                onChange={update("website_fax_field")}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
            </div>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-accent/10 px-4 py-3 text-sm text-accent">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-stretch md:mt-auto md:pt-10">
              <div className="sm:border-r sm:border-border sm:pr-8">
                <p className="text-sm text-muted md:text-base">Session Fee</p>
                <p className="mt-1 text-2xl font-medium md:text-[32px]">{designSession.priceLabel}</p>
              </div>
              <div className="flex flex-1 flex-col justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center py-3.5 text-base disabled:cursor-wait disabled:opacity-70 md:text-lg"
                >
                  {isSubmitting ? "Redirecting to Payment…" : "Continue to Payment"}
                </Button>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted">
              You&apos;ll complete payment securely on SSLCommerz. By continuing you
              agree to our{" "}
              <Link href="/terms-and-conditions" className="underline hover:text-accent">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="underline hover:text-accent">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
