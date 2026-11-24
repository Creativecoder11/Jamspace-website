import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/lib/lenis";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedFavicon } from "@/components/ui/AnimatedFavicon";
import { FacebookPixel } from "@/components/analytics/FacebookPixel";
import { AttributionTracker } from "@/components/analytics/AttributionTracker";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { consentDefaultsScript } from "@/lib/consent";
import { JsonLd } from "@/components/seo/JsonLd";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
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

const HOME_TITLE = "Jam Space | Multidisciplinary Design Studio in Dhaka";
const HOME_DESCRIPTION =
  "Jam Space is a Dhaka design studio for interior design, architecture, custom furniture and 3D visualisation — homes and workplaces designed around you.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "Interior designed by Jam Space, Dhaka" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-PMJR3X8R";

  return (
    <html lang="en" className={helveticaNow.variable}>
      <head>
        {/* Google Consent Mode defaults — must run before GTM/GA load */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />

        {/* Google Tag Manager (Server-Side) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://data.jamroll.space/3m0aaxjfixcm.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','9lp=BAdFLjInVTEgKSpaPlIqRxteSkdXTBwPUAkZBBQFFA1DEAgIBQ8%3D');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://data.jamroll.space/ns.html?id=GTM-PMJR3X8R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

        <AnimatedFavicon />

        {/* <Preloader /> */}

        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>

        {fbPixelId && <FacebookPixel pixelId={fbPixelId} />}
        <AttributionTracker />
        <CookieConsent />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}