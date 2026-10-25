"use client";

import { useRef, useState, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations/gsap";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/lib/data/footer";
import { getAttribution } from "@/lib/attribution";
import {
  trackContactFormStart,
  trackProjectEnquirySuccess,
  trackProjectEnquiryError,
  trackWhatsAppClick,
  trackPhoneClick,
} from "@/lib/analytics";

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

function WhatsAppGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
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

function FieldLabel({
  children,
  required = true,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-foreground">
      {children} {required && <span className="text-accent">*</span>}
    </label>
  );
}

const inputClass =
  "mt-2 w-full border-b border-border bg-transparent pb-2 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:outline-none transition-colors";

const selectClass =
  "w-full appearance-none border-b border-border bg-transparent pb-2 pr-6 text-sm text-foreground focus:border-accent focus:outline-none transition-colors";

export function ContactForm() {
  const containerRef = useRef<HTMLElement>(null);
  const formStartedRef = useRef(false);

  // Form State according to Playbook Section 03
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Residential",
    location: "",
    budget: "",
    expectedStart: "",
    notes: "",
    agreeToTerms: false,
    website_fax_field: "", // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleFirstInteraction = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackContactFormStart(formData.projectType);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);

    // Validate phone number format
    const cleanPhone = formData.phone.replace(/[\s\-()]/g, "");
    const phoneRegex = /^(\+?8801[3-9]\d{8}|01[3-9]\d{8}|\+?[1-9]\d{7,14})$/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMessage("Please enter a valid phone number (e.g. 017XXXXXXXX or +880 1XXXXXXXXX).");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.agreeToTerms) {
      setErrorMessage("Please accept the terms and privacy policy to continue.");
      return;
    }

    setIsSubmitting(true);

    try {
      const attribution = getAttribution();

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        projectType: formData.projectType,
        location: formData.location.trim(),
        budget: formData.budget || "not sure",
        expectedStart: formData.expectedStart || "not sure",
        notes: formData.notes.trim(),
        attribution,
        website_fax_field: formData.website_fax_field,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.accepted) {
        throw new Error(result.error || "Submission failed");
      }

      const assignedId = result.submissionId || "JS-ENQUIRY";

      // Trigger analytics conversions safely (NO PII) BEFORE switching view
      try {
        trackProjectEnquirySuccess({
          projectType: formData.projectType,
          submissionId: assignedId,
        });
      } catch (analyticsErr) {
        console.warn("[Analytics] Conversion event dispatch failed:", analyticsErr);
      }

      setSubmissionId(assignedId);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      trackProjectEnquiryError(err instanceof Error ? err.message : "submission_error");
      setErrorMessage(
        "We couldn't send your enquiry right now. Please try again, or contact us using the verified phone/WhatsApp option."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} className="mx-auto w-full md:pt-22">
      <div className="w-full md:border-t border-border md:border-b">
        <div className="mx-auto grid w-full max-w-[1340px] grid-cols-1 gap-8 md:gap-16 lg:grid-cols-2">
          {/* Left Column: Studio info & Direct contact channels */}
          <div className="contact-reveal mx-4 flex flex-col justify-between border-border pt-8 pb-8 md:mx-0 md:border-r">
            <div>
              <AnimatedHeading
                as="h1"
                lines={["Let's Discuss", "Your Project."]}
                className="text-[44px] md:text-6xl font-normal leading-[120%] md:leading-18"
              />
              <p className="mt-2 md:mt-4 max-w-md text-muted">
                A Space of Your Own. Tell us a little about your space. Our team will get in touch to understand what you’re planning.
              </p>
            </div>

            <ul className="mt-6 md:mt-10 flex flex-col gap-4 md:gap-6">
              <li className="flex items-center gap-2 md:gap-4">
                <IconBadge><PinGlyph /></IconBadge>
                <div>
                  <p className="text-sm font-medium">Visit Us</p>
                  <p className="text-sm text-muted">{contactInfo.address}</p>
                </div>
              </li>

              <li className="flex items-center gap-2 md:gap-4">
                <IconBadge><PhoneGlyph /></IconBadge>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                    onClick={() => trackPhoneClick("contact_page_sidebar")}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2 md:gap-4">
                <IconBadge><WhatsAppGlyph /></IconBadge>
                <div>
                  <p className="text-sm font-medium">WhatsApp</p>
                  <a
                    href="https://wa.me/8801629658114?text=Hello%20Jam%20Space%2C%20I%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("contact_page_sidebar")}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    Chat on WhatsApp (+880 1629658114)
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2 md:gap-4">
                <IconBadge><EnvelopeGlyph /></IconBadge>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-muted hover:text-accent transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact Us Form */}
          <div className="contact-reveal px-4 py-0 md:px-0 md:py-8">
            {submissionId ? (
              <div className="rounded-xl border border-accent/40 bg-accent/5 p-6 md:p-10 text-center animate-in fade-in duration-500">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="mt-4 text-2xl font-medium text-foreground">Enquiry Received</h2>
                <p className="mt-3 text-muted text-base max-w-md mx-auto leading-relaxed">
                  Thank you. Your enquiry has been received. Our team will contact you during business hours to learn more about your project.
                </p>
                <div className="mt-6 inline-block rounded-md border border-border bg-white/5 px-4 py-2 text-xs font-mono text-muted">
                  Reference: <span className="text-foreground font-semibold">{submissionId}</span>
                </div>
                <div className="mt-8">
                  <Button
                    onClick={() => {
                      setSubmissionId(null);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                        projectType: "Residential",
                        location: "",
                        budget: "",
                        expectedStart: "",
                        notes: "",
                        agreeToTerms: false,
                        website_fax_field: "",
                      });
                    }}
                    variant="secondary"
                  >
                    Send Another Enquiry
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative">
                {/* Full-form Loading Overlay */}
                {isSubmitting && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-xl bg-background/85 backdrop-blur-sm p-6 text-center animate-in fade-in duration-300">
                    <div className="relative flex h-16 w-16 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping duration-1000" />
                      <div className="h-12 w-12 rounded-full border-2 border-border border-t-accent animate-spin" />
                      <div className="absolute h-3 w-3 rounded-full bg-accent" />
                    </div>

                    <h3 className="mt-6 text-xl font-medium text-foreground tracking-tight">
                      Sending Your Project Enquiry...
                    </h3>
                    <p className="mt-2 text-sm text-muted max-w-xs leading-relaxed">
                      Please wait a moment while we secure your details and notify the design team.
                    </p>

                    <div className="mt-5 flex items-center gap-1.5">
                      <span className="h-1.5 w-6 rounded-full bg-accent animate-pulse" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FAC551] animate-pulse" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#35C9B4] animate-pulse" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} onFocus={handleFirstInteraction} className="space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-medium">Start Your Project.</h2>
                  {/* <p className="mt-1 text-sm text-muted">
                    Tell us a little about your space. Our team will get in touch to understand what you’re planning.
                  </p> */}
                </div>

                {/* Honeypot field for bot protection */}
                <input
                  type="text"
                  name="website_fax_field"
                  value={formData.website_fax_field}
                  onChange={(e) => setFormData({ ...formData, website_fax_field: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  {/* Field 1: Name */}
                  <div>
                    <FieldLabel>Full Name</FieldLabel>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder="e.g. Tanvir Ahmed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Field 2: Email */}
                  <div>
                    <FieldLabel>Email Address</FieldLabel>
                    <input
                      type="email"
                      required
                      placeholder="e.g. tanvir@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Field 3: Phone */}
                  <div>
                    <FieldLabel>Phone Number</FieldLabel>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Field 4: Project Type */}
                  <div>
                    <FieldLabel>Project Type</FieldLabel>
                    <div className="relative mt-2">
                      <select
                        required
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className={selectClass}
                      >
                        <option value="Residential">Residential</option>
                        <option value="Office-commercial">Office-commercial</option>
                        <option value="Renovation">Renovation</option>
                        <option value="Space planning-consultancy">Space planning-consultancy</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>

                  {/* Field 5: Location */}
                  <div>
                    <FieldLabel>Project Location</FieldLabel>
                    <input
                      type="text"
                      required
                      maxLength={150}
                      placeholder="e.g. Bashundhara R/A, Dhaka"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Field 6: Approximate Budget (Optional) */}
                  <div>
                    <FieldLabel required={false}>Approximate Budget</FieldLabel>
                    <div className="relative mt-2">
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">Select Approximate Budget (Optional)</option>
                        <option value="Below BDT 8 lakh">Below BDT 8 lakh</option>
                        <option value="8–15 lakh">8–15 lakh</option>
                        <option value="15–30 lakh">15–30 lakh</option>
                        <option value="above 30 lakh">Above 30 lakh</option>
                        <option value="not sure">Not sure</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>

                  {/* Field 7: Expected Start (Optional) */}
                  <div className="sm:col-span-2">
                    <FieldLabel required={false}>Expected Start</FieldLabel>
                    <div className="relative mt-2">
                      <select
                        value={formData.expectedStart}
                        onChange={(e) => setFormData({ ...formData, expectedStart: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">Select Expected Start (Optional)</option>
                        <option value="Immediately">Immediately</option>
                        <option value="within 1–3 months">Within 1–3 months</option>
                        <option value="3–6 months">3–6 months</option>
                        <option value="later">Later</option>
                        <option value="not sure">Not sure</option>
                      </select>
                      <ChevronDown />
                    </div>
                  </div>

                  {/* Optional Project Details */}
                  <div className="sm:col-span-2">
                    <FieldLabel required={false}>Tell Us About Your Space (Optional)</FieldLabel>
                    <textarea
                      rows={3}
                      placeholder="Share any specific requirements, apartment size, or design preferences..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                {/* Consent & Privacy Notice */}
                <label className="flex items-start gap-2.5 pt-2 text-xs md:text-sm text-muted cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="mt-0.5 h-4 w-4 accent-accent"
                  />
                  <span>
                    I agree to the{" "}
                    <a href="/terms-and-conditions" target="_blank" className="text-accent underline hover:text-accent/80">
                      Terms &amp; Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" target="_blank" className="text-accent underline hover:text-accent/80">
                      Privacy Policy
                    </a>. We protect your details and never send personal data to advertising platforms. *
                  </span>
                </label>

                {/* Error Banner with Verified Phone/WhatsApp alternative */}
                {errorMessage && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-xs md:text-sm text-red-200">
                    <p className="text-black">{errorMessage}</p>
                    <p className="mt-2 text-xs text-muted">
                      Direct contact:{" "}
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                        onClick={() => trackPhoneClick("contact_form_error_fallback")}
                        className="text-accent underline mr-3"
                      >
                        {contactInfo.phone}
                      </a>
                      <a
                        href="https://wa.me/8801629658114?text=Hello%20Jam%20Space%2C%20I%20would%20like%20to%20discuss%20a%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick("contact_form_error_fallback")}
                        className="text-accent underline"
                      >
                        WhatsApp
                      </a>
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full justify-center text-sm md:text-base font-medium py-3.5"
                >
                  Send Project Enquiry
                </Button>
              </form>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
