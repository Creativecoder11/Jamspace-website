"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";

import { Container } from "@/components/ui/Container";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/lib/data/footer";
import { pricingPackages } from "@/lib/data/pricing";

/* CUSTOM TOAST COMPONENT */
type ToastType = "success" | "error";

interface CustomToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

const TOAST_DURATION = 5; // seconds

function CustomToast({ type, message, onClose }: CustomToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Tween | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const isSuccess = type === "success";
  const accent = isSuccess ? "#35C9B4" : "#E92A7B";
  const title = isSuccess ? "Message sent" : "Something went wrong";

  const dismiss = () => {
    timelineRef.current?.kill();
    gsap.to(toastRef.current, {
      x: 40,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => onCloseRef.current(),
    });
  };

  useEffect(() => {
    gsap.fromTo(
      toastRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
    );

    // Countdown bar doubles as the auto-dismiss timer
    timelineRef.current = gsap.fromTo(
      barRef.current,
      { scaleX: 1 },
      {
        scaleX: 0,
        duration: TOAST_DURATION,
        ease: "none",
        onComplete: dismiss,
      }
    );

    return () => {
      timelineRef.current?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={toastRef}
      role="alert"
      aria-live="polite"
      onMouseEnter={() => timelineRef.current?.pause()}
      onMouseLeave={() => timelineRef.current?.resume()}
      className="fixed left-4 right-4 top-4 z-50 overflow-hidden rounded-xl bg-[#F7F6F1] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] ring-1 ring-black/5 sm:left-auto sm:right-6 sm:top-6 sm:w-[380px]"
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${accent}26` }} // 15% tint
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {isSuccess ? <path d="M20 6L9 17l-5-5" /> : <path d="M18 6L6 18M6 6l12 12" />}
          </svg>
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold text-[#191919]">{title}</p>
          <p className="mt-0.5 text-sm leading-snug text-[#191919]/70">{message}</p>
        </div>

        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close notification"
          className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#191919]/50 transition-colors hover:bg-black/5 hover:text-[#191919]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Countdown bar */}
      <div className="h-[3px] w-full bg-black/5">
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{ backgroundColor: accent }}
        />
      </div>
    </div>
  );
}

/* ICONS */
function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-foreground/20 text-foreground">
      {children}
    </span>
  );
}

function PinGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

/* DATA & VALIDATION */
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

// Accepts ANY valid domain (gmail.com, jamroll.xyz, company.com.bd, etc.)
const AUTHENTIC_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Bangladesh phone: +880, 00880, 0, or nothing, followed by 1[3-9] and 8 digits
const BD_PHONE_REGEX = /^(?:\+880|00880|0)?1[3-9]\d{8}$/;

function validateEmail(value: string): true | string {
  if (!value) return "Email is required";
  if (!AUTHENTIC_EMAIL_REGEX.test(value)) {
    return "Please enter a valid email (e.g., name@gmail.com or name@company.xyz)";
  }
  return true;
}

function validatePhone(value: string): true | string {
  if (!value) return "Phone number is required";
  const cleaned = value.replace(/[\s-]/g, "");
  if (!BD_PHONE_REGEX.test(cleaned)) {
    return "Enter a valid BD number (e.g., +8801XXXXXXXXX or 01XXXXXXXXX)";
  }
  return true;
}

/* TYPES */
export type ContactFormData = {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  package: string;
  message: string;
  agreeTerms: boolean;
};

/* UI HELPERS */
function FieldLabel({ children, error }: { children: ReactNode; error?: boolean }) {
  return (
    <label className={`block text-sm font-medium ${error ? "text-red-500" : "text-foreground"}`}>
      {children} <span className="text-accent">*</span>
    </label>
  );
}

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

const inputClass =
  "mt-2 w-full border-b border-border bg-transparent pb-2 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none transition-colors";
const inputErrorClass =
  "mt-2 w-full border-b border-red-500 bg-transparent pb-2 text-sm text-foreground placeholder:text-muted/70 focus:border-red-500 focus:outline-none transition-colors";

const selectClass =
  "w-full appearance-none border-b border-border bg-transparent pb-1 pl-0 pr-8 text-sm text-foreground focus:border-accent focus:outline-none transition-colors duration-200";
const selectErrorClass =
  "w-full appearance-none border-b border-red-500 bg-transparent pb-1 pl-0 pr-8 text-sm text-foreground focus:border-red-500 focus:outline-none transition-colors duration-200";

const optionClass = "bg-background text-foreground pl-1";

/* MAIN COMPONENT */
export function ContactForm() {
  const containerRef = useRef<HTMLElement>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      projectType: "",
      location: "",
      package: "",
      message: "",
      agreeTerms: false,
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      // TODO: Replace with your actual API call / server action
      console.log("Form submitted successfully:", data);

      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Trigger success toast
      setToast({ type: "success", message: "Thank you! We will get back to you shortly." });
      reset(); // Clear the form

    } catch (error) {
      console.error("Form submission error:", error);
      // Trigger error toast
      setToast({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

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
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="mx-auto w-full md:pt-22">
      {/* Render Toast if active */}
      {toast && (
        <CustomToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="w-full md:border-t border-border md:border-b">
        <div className="mx-auto grid w-full max-w-[1340px] grid-cols-1 gap-8 md:gap-16 lg:grid-cols-2">

          {/* LEFT COLUMN: Contact Info */}
          <div className="contact-reveal mx-4 flex flex-col justify-between border-border pt-8 pb-8 md:mx-0 md:border-r">
            <div>
              <AnimatedHeading
                as="h1"
                lines={["Let's Start", "the Conversation"]}
                className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
              />
              <p className="mt-2 md:mt-4 max-w-md text-muted">
                We&apos;re here to answer your questions, discuss your ideas, and
                guide you through every step of your interior design journey.
              </p>
            </div>

            <ul className="mt-6 md:mt-10 flex flex-col gap-4 md:gap-6">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2 md:gap-4">
                  <IconBadge>{item.icon}</IconBadge>
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-muted hover:text-accent transition-colors"
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

          {/* RIGHT COLUMN: Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="contact-reveal px-4 py-0 md:px-0 md:py-8"
          >
            <h2 className="text-xl font-medium">Start Your Project</h2>

            <div className="mt-4 md:mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

              {/* Full Name */}
              <div>
                <FieldLabel error={!!errors.fullName}>Full Name</FieldLabel>
                <input
                  type="text"
                  placeholder="Type Your Full Name"
                  className={errors.fullName ? inputErrorClass : inputClass}
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                    maxLength: { value: 60, message: "Name must be under 60 characters" },
                    pattern: {
                      value: /^[A-Za-z][A-Za-z .'-]*$/,
                      message: "Please enter a valid name",
                    },
                  })}
                />
                <ErrorMessage message={errors.fullName?.message} />
              </div>

              {/* Email */}
              <div>
                <FieldLabel error={!!errors.email}>Email</FieldLabel>
                <input
                  type="email"
                  placeholder="Type Your Email Address"
                  className={errors.email ? inputErrorClass : inputClass}
                  {...register("email", { validate: validateEmail })}
                />
                <ErrorMessage message={errors.email?.message} />
              </div>

              {/* Phone Number */}
              <div>
                <FieldLabel error={!!errors.phone}>Phone Number</FieldLabel>
                <input
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                  className={errors.phone ? inputErrorClass : inputClass}
                  {...register("phone", { validate: validatePhone })}
                />
                <ErrorMessage message={errors.phone?.message} />
              </div>

              {/* Project Type */}
              <div>
                <FieldLabel error={!!errors.projectType}>Project Type</FieldLabel>
                <div className="relative mt-2">
                  <select
                    className={errors.projectType ? selectErrorClass : selectClass}
                    {...register("projectType", {
                      required: "Please select a project type",
                    })}
                  >
                    <option value="" disabled className={optionClass}>
                      {"\u3000"}Select Your Project Type
                    </option>
                    <option className={optionClass}>{"\u3000"}Residential Design</option>
                    <option className={optionClass}>{"\u3000"}Commercial Design</option>
                    <option className={optionClass}>{"\u3000"}3D Visualization</option>
                    <option className={optionClass}>{"\u3000"}Design Consultation</option>
                  </select>
                  <ChevronDown />
                </div>
                <ErrorMessage message={errors.projectType?.message} />
              </div>

              {/* Project Location */}
              <div>
                <FieldLabel error={!!errors.location}>Project Location</FieldLabel>
                <input
                  type="text"
                  placeholder="Type Your Location"
                  className={errors.location ? inputErrorClass : inputClass}
                  {...register("location", {
                    required: "Location is required",
                    minLength: { value: 2, message: "Please enter a valid location" },
                  })}
                />
                <ErrorMessage message={errors.location?.message} />
              </div>

              {/* Packages */}
              <div>
                <FieldLabel error={!!errors.package}>Packages</FieldLabel>
                <div className="relative mt-2">
                  <select
                    className={errors.package ? selectErrorClass : selectClass}
                    {...register("package", {
                      required: "Please select a package",
                    })}
                  >
                    <option value="" disabled className={optionClass}>
                      {"\u3000"}Select Your Package
                    </option>
                    {pricingPackages.map((pkg) => (
                      <option key={pkg.name} value={pkg.name} className={optionClass}>
                        {"\u3000"}
                        {pkg.name} — {pkg.price}
                        {pkg.unit ? ` / ${pkg.unit}` : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
                <ErrorMessage message={errors.package?.message} />
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <FieldLabel error={!!errors.message}>Tell Us About Your Project</FieldLabel>
                <textarea
                  rows={4}
                  placeholder="Type Your Message"
                  className={`${errors.message ? inputErrorClass : inputClass} resize-none`}
                  {...register("message", {
                    required: "Please tell us about your project",
                    minLength: { value: 10, message: "Message must be at least 10 characters" },
                    maxLength: { value: 1000, message: "Message must be under 1000 characters" },
                  })}
                />
                <ErrorMessage message={errors.message?.message} />
              </div>
            </div>

            {/* Terms & Conditions */}
            <label
              className={`mt-4 md:mt-8 flex items-start gap-2.5 pt-4 md:pt-6 text-sm ${errors.agreeTerms ? "text-red-500" : "text-muted"
                }`}
            >
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 accent-accent cursor-pointer"
                {...register("agreeTerms", {
                  required: "You must agree to the Terms & Privacy Policy",
                })}
              />
              <span>
                I agree to the{" "}
                <a href="/terms-and-conditions" className="text-accent hover:underline">
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <br className="block md:hidden" />
                <a href="/privacy-policy" className="text-accent hover:underline">
                  Privacy Policy
                </a>{" "}
                *
              </span>
            </label>
            <ErrorMessage message={errors.agreeTerms?.message} />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 md:mt-6 w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Book a Consultant"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}