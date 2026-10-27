"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CONSENT_KEY, type Consent } from "@/lib/consent";

export function getStoredConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function applyConsent(consent: Consent) {
  const win = window as unknown as {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  };

  win.dataLayer = win.dataLayer || [];
  // Consent Mode commands must be pushed as an Arguments object, like gtag() does
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    win.dataLayer!.push(arguments);
  }
  (gtag as (...args: unknown[]) => void)("consent", "update", {
    ad_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
    analytics_storage: consent,
  });
  win.dataLayer.push({ event: "cookie_consent_update", cookie_consent: consent });

  win.fbq?.("consent", consent === "granted" ? "grant" : "revoke");
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    setVisible(getStoredConsent() === null);
  }, []);

  const choose = (consent: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, consent);
    } catch {
      // Storage blocked — still apply for this page view
    }
    applyConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] w-full border-t border-border bg-background shadow-[0_-8px_40px_rgba(0,0,0,0.12)] animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="mx-auto flex max-w-[1340px] flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:py-6">
        <p className="text-sm text-muted leading-relaxed md:max-w-3xl">
          We use cookies to understand how visitors use our website and to improve our advertising.
          You can accept or reject non-essential cookies. Read our{" "}
          <Link href="/privacy-policy" className="text-accent underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button
            variant="secondary"
            showArrow={false}
            onClick={() => choose("denied")}
            className="flex-1 justify-center md:flex-none"
          >
            Reject
          </Button>
          <Button
            showArrow={false}
            onClick={() => choose("granted")}
            className="flex-1 justify-center md:flex-none"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
