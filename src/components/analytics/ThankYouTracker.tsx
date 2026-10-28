"use client";

import { useEffect, useRef } from "react";
import {
  trackProjectEnquirySuccess,
  pushDataLayer,
  type ProjectEnquiryLeadData,
} from "@/lib/analytics";

interface ThankYouTrackerProps {
  submissionId?: string | null;
  projectType?: string | null;
}

export function ThankYouTracker({
  submissionId,
  projectType,
}: ThankYouTrackerProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    const id = submissionId || "JS-ENQUIRY";
    const type = projectType || "Residential";

    if (typeof window !== "undefined") {
      const win = window as unknown as { fbq?: (...args: unknown[]) => void };
      try {
        localStorage.setItem("js_cookie_consent", "granted");
        win.fbq?.("consent", "grant");
      } catch {}

      let cachedData: Partial<ProjectEnquiryLeadData> = {};
      let alreadyTracked = false;

      try {
        const lastTracked = sessionStorage.getItem("js_last_tracked_lead");
        if (lastTracked === id) {
          alreadyTracked = true;
        }
        const raw = sessionStorage.getItem("last_enquiry_data");
        if (raw) {
          cachedData = JSON.parse(raw);
        }
      } catch {}

      // If not already tracked by ContactForm submission, trigger full conversion
      if (!alreadyTracked) {
        trackProjectEnquirySuccess({
          submissionId: id,
          projectType: type,
          name: cachedData.name,
          phone: cachedData.phone,
          email: cachedData.email,
          location: cachedData.location,
          budget: cachedData.budget,
          expectedStart: cachedData.expectedStart,
          notes: cachedData.notes,
          attribution: cachedData.attribution,
        });
      } else {
        // Form was already tracked on submit; push thank_you_view to dataLayer for GTM pageview-based tags
        pushDataLayer("thank_you_view", {
          submission_id: id,
          project_type: type,
          location: cachedData.location || "",
          budget: cachedData.budget || "not sure",
        });
      }
    }
  }, [submissionId, projectType]);

  return null;
}

