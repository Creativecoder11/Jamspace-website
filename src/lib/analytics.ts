"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { trackFBEvent } from "@/components/analytics/FacebookPixel";

/**
 * Pushes events to window.dataLayer
 * Note: PII (Name, Phone, Email, Address, Message) must NEVER be included.
 */
export function pushDataLayer(event: string, payload?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({
    event,
    ...payload,
  });
}

/**
 * Track user initiating Contact form
 */
export function trackContactFormStart(projectType?: string): void {
  pushDataLayer("contact_form_start", {
    form_name: "contact_us",
    project_type: projectType || "Residential",
  });
  sendGAEvent("event", "form_start", {
    form_name: "contact_us",
  });
}

/**
 * Track successful project enquiry submission
 * Maps to:
 * - DataLayer: project_enquiry_success
 * - GA4: generate_lead (Key Event)
 * - Meta Pixel: Lead (Standard Event)
 */
export function trackProjectEnquirySuccess(data: {
  projectType: string;
  submissionId: string;
}): void {
  const payload = {
    project_type: data.projectType,
    form_name: "contact_us",
    submission_id: data.submissionId,
  };

  pushDataLayer("project_enquiry_success", payload);

  // GA4 key conversion event
  sendGAEvent("event", "generate_lead", {
    project_type: data.projectType,
    form_name: "contact_us",
    currency: "BDT",
  });

  // Meta Pixel standard Lead event
  trackFBEvent("Lead", {
    content_name: data.projectType,
    content_category: "Contact Us",
  });
}

/**
 * Track failed submission (diagnostic, non-PII)
 */
export function trackProjectEnquiryError(errorType: string): void {
  pushDataLayer("project_enquiry_error", {
    form_name: "contact_us",
    error_type: errorType,
  });
}

/**
 * Track primary consultation CTA click (e.g. "Let's Discuss Your Project")
 */
export function trackConsultationCTAClick(location: string): void {
  pushDataLayer("consultation_cta_click", {
    cta_label: "Let's Discuss Your Project",
    cta_location: location,
  });
  sendGAEvent("event", "consultation_cta_click", {
    cta_location: location,
  });
}

/**
 * Track WhatsApp contact link click
 */
export function trackWhatsAppClick(location: string): void {
  pushDataLayer("whatsapp_contact_click", {
    channel: "whatsapp",
    click_location: location,
  });
  sendGAEvent("event", "whatsapp_contact_click", {
    channel: "whatsapp",
    click_location: location,
  });
}

/**
 * Track phone tel: contact link click
 */
export function trackPhoneClick(location: string): void {
  pushDataLayer("phone_contact_click", {
    channel: "phone",
    click_location: location,
  });
  sendGAEvent("event", "phone_contact_click", {
    channel: "phone",
    click_location: location,
  });
}
