"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, Suspense } from "react";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

function FacebookPixelTracker({ pixelId }: { pixelId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = pixelId || FB_PIXEL_ID;

  useEffect(() => {
    if (!id) return;
    if (
      typeof window !== "undefined" &&
      (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
    ) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq(
        "track",
        "PageView"
      );
    }
  }, [pathname, searchParams, id]);

  return null;
}

export function FacebookPixel({ pixelId }: { pixelId?: string } = {}) {
  const id = pixelId || FB_PIXEL_ID;
  if (!id) return null;

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
      <Suspense fallback={null}>
        <FacebookPixelTracker pixelId={id} />
      </Suspense>
    </>
  );
}

/**
 * Utility function to send custom standard or custom events to Facebook Pixel
 * e.g. trackFBEvent("Lead", { content_name: "Interior Design Consultation" })
 */
export function trackFBEvent(event: string, params?: Record<string, unknown>) {
  if (
    typeof window !== "undefined" &&
    (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
  ) {
    if (params) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq(
        "track",
        event,
        params
      );
    } else {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq(
        "track",
        event
      );
    }
  }
}
