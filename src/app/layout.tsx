import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/lib/lenis";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedFavicon } from "@/components/ui/AnimatedFavicon";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { FacebookPixel } from "@/components/analytics/FacebookPixel";
import { AttributionTracker } from "@/components/analytics/AttributionTracker";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { consentDefaultsScript } from "@/lib/consent";
import "./globals.css";
// import { Preloader } from "@/components/ui/Preloader";

const helveticaNow = localFont({
  variable: "--font-helvetica-now",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/HelveticaNowDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/HelveticaNowDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Jam Space — Interior Design Studio in Dhaka", template: "%s | Jam Space",
  },

  description: "Jam Space is a Dhaka-based interior design studio crafting timeless, functional interiors — from residential design to commercial spaces, 3D visualization, and consultation.",

  openGraph: {
    title: "Jam Space — Interior Design Studio in Dhaka",
    description: "Designed Beyond Walls. Timeless interiors that blend creativity, functionality, and exceptional craftsmanship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" className={helveticaNow.variable}>
      <head>
        {/* Google Consent Mode defaults — must run before GTM/GA load */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />
      </head>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        <AnimatedFavicon />

        {/* <Preloader /> */}

        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>

        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {fbPixelId && <FacebookPixel pixelId={fbPixelId} />}
        <AttributionTracker />
        <CookieConsent />
      </body>
    </html>
  );
}