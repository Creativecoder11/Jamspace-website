"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";

import { Container } from "@/components/ui/Container";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/lib/data/footer";

function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-foreground/20 text-foreground">
      {children}
    </span>
  );
}

function PinGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 22s7-7.4 7-13a7 7 0 1 0-14 0c0 5.6 7 13 7 13Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9" r="2.4" fill="currentColor" />
    </svg>
  );
}

function EnvelopeGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="4.5"
        width="19"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3.5 6l8.5 7 8.5-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 5c0-1 .8-2 2-2h2.2c.5 0 .9.3 1 .8l1 3.5c.1.4 0 .9-.3 1.2L8.6 10c1 2.3 2.9 4.2 5.2 5.2l1.5-1.3c.3-.3.8-.4 1.2-.3l3.5 1c.5.1.8.5.8 1V18c0 1.2-1 2-2.2 2C10.6 20 4 13.4 4 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      className="pointer-events-none absolute right-1 bottom-2.5 text-accent"
      aria-hidden="true"
    >
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const contactItems = [
  {
    label: "Visit Us",
    value: contactInfo.address,
    icon: <PinGlyph />,
    href: undefined,
  },
  {
    label: "Email",
    value: contactInfo.email,
    icon: <EnvelopeGlyph />,
    href: `mailto:${contactInfo.email}`,
  },
  {
    label: "Call Us",
    value: contactInfo.phone,
    icon: <PhoneGlyph />,
    href: `tel:${contactInfo.phone.replace(/\s+/g, "")}`,
  },
];

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {children} <span className="text-accent">*</span>
    </label>
  );
}

const inputClass =
  "mt-2 w-full border-b border-border bg-transparent pb-2 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none";

const selectClass =
  "w-full appearance-none border-b border-border bg-transparent pb-2 pr-6 text-sm text-foreground focus:border-accent focus:outline-none";

export function ContactForm() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="pt-22">
      <Container className="grid grid-cols-1 gap-16 border-t border-b border-border lg:grid-cols-2">
        <div className="contact-reveal border-r pt-8 pb-8 border-border flex flex-col justify-between">
          <div>
            <AnimatedHeading
              as="h1"
              lines={["Let's Start", "the Conversation"]}
              className="text-5xl font-normal leading-tight"
            />
            <p className="mt-4 max-w-md text-muted">
              We&apos;re here to answer your questions, discuss your ideas, and
              guide you through every step of your interior design journey.
            </p>
          </div>

          <ul className="mt-10 flex flex-col gap-6">
            {contactItems.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <IconBadge>{item.icon}</IconBadge>
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-muted hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-muted">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="contact-reveal pt-8 pb-8">
          <h2 className="text-xl font-medium">Start Your Project</h2>

          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <FieldLabel>Full Name</FieldLabel>
              <input
                type="text"
                required
                placeholder="Type Your Full Name"
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <input
                type="email"
                required
                placeholder="Type Your Email Address"
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel>Phone Number</FieldLabel>
              <input
                type="tel"
                required
                placeholder="Type Your Phone Number"
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Project Type</FieldLabel>
              <div className="relative mt-2">
                <select required defaultValue="" className={selectClass}>
                  <option value="" disabled>
                    Select Your Project Type
                  </option>
                  <option>Residential Design</option>
                  <option>Commercial Design</option>
                  <option>3D Visualization</option>
                  <option>Design Consultation</option>
                </select>
                <ChevronDown />
              </div>
            </div>

            <div>
              <FieldLabel>Project Location</FieldLabel>
              <input
                type="text"
                required
                placeholder="Type Your Location"
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel>Estimated Budget</FieldLabel>
              <div className="relative mt-2">
                <select required defaultValue="" className={selectClass}>
                  <option value="" disabled>
                    Select Your Estimated Budget
                  </option>
                  <option>Under ৳1,00,000</option>
                  <option>৳1,00,000 – ৳5,00,000</option>
                  <option>৳5,00,000 – ৳10,00,000</option>
                  <option>Above ৳10,00,000</option>
                </select>
                <ChevronDown />
              </div>
            </div>

            <div className="sm:col-span-2">
              <FieldLabel>Tell Us About Your Project</FieldLabel>
              <textarea
                required
                rows={3}
                placeholder="Type Your Message"
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <label className="mt-8 flex items-start gap-2.5 pt-6 text-sm text-muted">
            <input
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 accent-accent"
            />
            <span>
              I agree to the{" "}
              <a
                href="/terms-and-conditions"
                className="text-accent hover:underline"
              >
                Terms &amp; Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy-policy" className="text-accent hover:underline">
                Privacy Policy
              </a>{" "}
              *
            </span>
          </label>

          <Button type="submit" className="mt-6 w-full justify-center">
            Book a Consultant
          </Button>
        </form>
      </Container>
    </section>
  );
}
