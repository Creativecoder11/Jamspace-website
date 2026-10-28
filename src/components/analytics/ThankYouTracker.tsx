"use client";

import { useEffect, useRef } from "react";
import { trackProjectEnquirySuccess } from "@/lib/analytics";
import { trackFBEvent } from "@/components/analytics/FacebookPixel";

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

      console.log(
        `%c[Meta Pixel] Firing Lead event on /thank-you page for ref: ${id}`,
        "color: #00A86B; font-weight: bold; font-size: 14px;"
      );

      // Direct Meta Pixel Lead call
      trackFBEvent("Lead", {
        content_name: type,
        content_category: "Contact Us",
        currency: "BDT",
        value: 0,
      });

      // Dispatch GA4 generate_lead & GTM dataLayer
      trackProjectEnquirySuccess({
        projectType: type,
        submissionId: id,
      });
    }
  }, [submissionId, projectType]);

  return null;
}

