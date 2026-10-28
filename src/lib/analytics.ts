"use client";

import { trackFBEvent } from "@/components/analytics/FacebookPixel";
import type { AttributionData } from "@/lib/attribution";

/**
 * Pushes events to window.dataLayer.
 * GA4 and other Google tags are configured in GTM from these events —
 * do not send gtag() events directly, or GA4 will count them twice.
 */
export function pushDataLayer(event: string, payload?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({
    event,
    ...payload,
  });
  console.log(
    `%c[DataLayer] event: ${event}`,
    "color: #F7931A; font-weight: bold; background: #FFF4E5; padding: 2px 6px; border-radius: 4px;",
    payload
  );
}

/**
 * Track user initiating Contact form
 */
export function trackContactFormStart(projectType?: string): void {
  const pType = projectType || "Residential";
  pushDataLayer("contact_form_start", {
    form_name: "contact_us",
    project_type: pType,
  });
  try {
    trackFBEvent("InitiateCheckout", {
      content_name: pType,
      content_category: "Contact Form Start",
    });
  } catch (err) {
    console.warn("[Analytics] Meta Pixel form_start error:", err);
  }
}

export interface ProjectEnquiryLeadData {
  submissionId: string;
  projectType: string;
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  budget?: string;
  expectedStart?: string;
  notes?: string;
  attribution?: Partial<AttributionData> | Record<string, unknown>;
}

/**
 * Track successful project enquiry submission
 * Maps to:
 * - DataLayer: generate_lead (single lead event, with all form fields & user_data)
 * - Meta Pixel: Lead (Standard Event)
 */
export function trackProjectEnquirySuccess(data: ProjectEnquiryLeadData): void {
  const attr = (data.attribution || {}) as Record<string, unknown>;

  // 1. DataLayer for GTM: one lead event per submission
  pushDataLayer("generate_lead", {
    form_name: "contact_us",
    submission_id: data.submissionId,
    project_type: data.projectType,
    location: data.location || "",
    budget: data.budget || "not sure",
    expected_start: data.expectedStart || "not sure",
    notes: data.notes || "",
    currency: "BDT",
    value: 0,
    // Client contact info for GTM tags (Google Ads Enhanced Conversions, CRM webhooks)
    client_name: data.name || "",
    client_email: data.email || "",
    client_phone: data.phone || "",
    // Attribution metadata
    utm_source: attr.utm_source || "unknown",
    utm_medium: attr.utm_medium || "unknown",
    utm_campaign: attr.utm_campaign || "unknown",
    utm_content: attr.utm_content || "unknown",
    utm_term: attr.utm_term || "",
    // Enhanced Conversions format for Google Ads / GA4
    user_data: {
      email: data.email || "",
      phone_number: data.phone || "",
      address: {
        city: data.location || "Dhaka",
        country: "BD",
      },
    },
  });

  // 2. Meta Pixel standard Lead event
  try {
    trackFBEvent("Lead", {
      content_name: data.projectType,
      content_category: "Contact Us",
      currency: "BDT",
      value: 0,
      lead_id: data.submissionId,
    });
  } catch (err) {
    console.warn("[Analytics] Meta Pixel Lead error:", err);
  }
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
 * Track primary consultation CTA click (e.g. "Let's Discuss Your Project", "Start a Project", "Book a Consultation")
 * Maps to:
 * - DataLayer: consultation_cta_click
 * - Meta Pixel: InitiateCheckout (Lead Intent)
 */
export function trackConsultationCTAClick(location: string): void {
  pushDataLayer("consultation_cta_click", {
    cta_label: "Let's Discuss Your Project",
    cta_location: location,
  });
  try {
    trackFBEvent("InitiateCheckout", {
      content_name: "Consultation CTA",
      content_category: "Lead Intent",
      click_location: location,
    });
  } catch (err) {
    console.warn("[Analytics] Meta Pixel consultation_cta_click error:", err);
  }
}

/**
 * Track WhatsApp contact link click
 * Maps to:
 * - DataLayer: whatsapp_contact_click
 * - Meta Pixel: Contact (Direct Chat Lead)
 */
export function trackWhatsAppClick(location: string): void {
  pushDataLayer("whatsapp_contact_click", {
    channel: "whatsapp",
    click_location: location,
  });
  try {
    trackFBEvent("Contact", {
      content_name: "WhatsApp Direct",
      content_category: "Instant Messaging",
      channel: "whatsapp",
      click_location: location,
    });
  } catch (err) {
    console.warn("[Analytics] Meta Pixel whatsapp click error:", err);
  }
}

/**
 * Track phone tel: contact link click
 * Maps to:
 * - DataLayer: phone_contact_click
 * - Meta Pixel: Contact (Direct Call Lead)
 */
export function trackPhoneClick(location: string): void {
  pushDataLayer("phone_contact_click", {
    channel: "phone",
    click_location: location,
  });
  try {
    trackFBEvent("Contact", {
      content_name: "Direct Phone Call",
      content_category: "Direct Call",
      channel: "phone",
      click_location: location,
    });
  } catch (err) {
    console.warn("[Analytics] Meta Pixel phone click error:", err);
  }
}

/**
 * Track mailto: email contact link click
 * Maps to:
 * - DataLayer: email_contact_click
 * - Meta Pixel: Contact (Direct Email Lead)
 */
export function trackEmailClick(location: string): void {
  pushDataLayer("email_contact_click", {
    channel: "email",
    click_location: location,
  });
  try {
    trackFBEvent("Contact", {
      content_name: "Direct Email Inquiry",
      content_category: "Direct Email",
      channel: "email",
      click_location: location,
    });
  } catch (err) {
    console.warn("[Analytics] Meta Pixel email click error:", err);
  }
}

/**
 * Track high-value project or service detail view
 * Maps to:
 * - DataLayer: view_item
 * - Meta Pixel: ViewContent
 */
export function trackViewContent(title: string, category: string): void {
  pushDataLayer("view_item", {
    item_name: title,
    item_category: category,
  });
  try {
    trackFBEvent("ViewContent", {
      content_name: title,
      content_category: category,
    });
  } catch (err) {
    console.warn("[Analytics] Meta Pixel ViewContent error:", err);
  }
}
