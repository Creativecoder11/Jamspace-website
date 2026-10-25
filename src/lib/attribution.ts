"use client";

export interface AttributionData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  landing_page: string;
  referrer: string;
  first_seen: string;
}

const STORAGE_KEY = "jamspace_attribution";

/**
 * Initializes and persists UTM attribution parameters on landing.
 * Rule: Missing UTMs are stored as "unattributed / unknown" (never assumed as direct/Facebook).
 */
export function initAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) return;

    const urlParams = new URLSearchParams(window.location.search);
    const hasAnyUtm =
      urlParams.has("utm_source") ||
      urlParams.has("utm_medium") ||
      urlParams.has("utm_campaign") ||
      urlParams.has("utm_content") ||
      urlParams.has("utm_term");

    const utm_source = urlParams.get("utm_source") || "unattributed / unknown";
    const utm_medium = urlParams.get("utm_medium") || "unattributed / unknown";
    const utm_campaign = urlParams.get("utm_campaign") || "unattributed / unknown";
    const utm_content = urlParams.get("utm_content") || "unattributed / unknown";
    const utm_term = urlParams.get("utm_term") || "";

    const attribution: AttributionData = {
      utm_source: hasAnyUtm ? utm_source.toLowerCase().trim() : "unattributed / unknown",
      utm_medium: hasAnyUtm ? utm_medium.toLowerCase().trim() : "unattributed / unknown",
      utm_campaign: hasAnyUtm ? utm_campaign.trim() : "unattributed / unknown",
      utm_content: hasAnyUtm ? utm_content.trim() : "unattributed / unknown",
      utm_term: utm_term.trim(),
      landing_page: window.location.pathname,
      referrer: document.referrer || "direct",
      first_seen: new Date().toISOString(),
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch (err) {
    console.warn("Attribution storage inaccessible:", err);
  }
}

/**
 * Retrieves the stored attribution data for enquiry submission.
 */
export function getAttribution(): AttributionData {
  if (typeof window === "undefined") {
    return {
      utm_source: "unattributed / unknown",
      utm_medium: "unattributed / unknown",
      utm_campaign: "unattributed / unknown",
      utm_content: "unattributed / unknown",
      utm_term: "",
      landing_page: "",
      referrer: "direct",
      first_seen: new Date().toISOString(),
    };
  }

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  return {
    utm_source: "unattributed / unknown",
    utm_medium: "unattributed / unknown",
    utm_campaign: "unattributed / unknown",
    utm_content: "unattributed / unknown",
    utm_term: "",
    landing_page: window.location.pathname,
    referrer: document.referrer || "direct",
    first_seen: new Date().toISOString(),
  };
}

