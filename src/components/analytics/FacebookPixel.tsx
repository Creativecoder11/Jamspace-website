"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, Suspense } from "react";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

function FacebookPixelTracker({ pixelId }: { pixelId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);
  const id = pixelId || FB_PIXEL_ID;

  useEffect(() => {
    if (!id) return;
    // Skip duplicate PageView on initial mount since inline script fires it
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    trackFBEvent("PageView");
  }, [pathname, searchParams, id]);

  return null;
}

export function FacebookPixel({ pixelId }: { pixelId?: string } = {}) {
  const id = pixelId || FB_PIXEL_ID;
  if (!id) return null;

  useEffect(() => {
    // Provide a test helper on window for debugging in DevTools Console
    if (typeof window !== "undefined") {
      (window as unknown as { testFBLead?: () => void }).testFBLead = () => {
        trackFBEvent("Lead", {
          content_name: "Test Residential Lead",
          content_category: "Contact Us",
          currency: "BDT",
          value: 0,
        });
        console.log(
          "%c[Meta Pixel Test] Dispatched test Lead event! Check Meta Pixel Helper extension now.",
          "color: #00A86B; font-weight: bold;"
        );
      };
    }
  }, []);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${id}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <FacebookPixelTracker pixelId={id} />
      </Suspense>
    </>
  );
}

/**
 * Robust utility function to send standard or custom events to Facebook Pixel.
 * Even if the external fbevents.js script is delayed or still loading, this guarantees
 * the call is queued in window.fbq.queue and not silently dropped.
 *
 * e.g. trackFBEvent("Lead", { content_name: "Residential" })
 */
export function trackFBEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const win = window as unknown as {
    fbq?: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    _fbq?: unknown;
  };

  // If window.fbq hasn't been set up yet, initialize the standard stub queue
  if (!win.fbq) {
    const stub = function (...args: unknown[]) {
      if (stub.callMethod) {
        stub.callMethod.apply(stub, args);
      } else {
        stub.queue = stub.queue || [];
        stub.queue.push(args);
      }
    } as ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      loaded?: boolean;
      version?: string;
    };
    stub.queue = [];
    stub.loaded = false;
    stub.version = "2.0";
    if (!win._fbq) win._fbq = stub;
    win.fbq = stub;
  }

  try {
    if (params) {
      win.fbq("track", event, params);
      console.log(
        `%c[Meta Pixel] fbq('track', '${event}')`,
        "color: #1877F2; font-weight: bold; background: #E7F3FF; padding: 2px 6px; border-radius: 4px;",
        params
      );
    } else {
      win.fbq("track", event);
      console.log(
        `%c[Meta Pixel] fbq('track', '${event}')`,
        "color: #1877F2; font-weight: bold; background: #E7F3FF; padding: 2px 6px; border-radius: 4px;"
      );
    }
  } catch (err) {
    console.error(`[Meta Pixel] Error sending event '${event}':`, err);
  }
}
