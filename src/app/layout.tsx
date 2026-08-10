import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScrollProvider } from "@/lib/lenis";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedFavicon } from "@/components/ui/AnimatedFavicon";
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
    default: "JamSpace — Interior Design Studio in Dhaka", template: "%s | JamSpace",
  },

  description: "JamSpace is a Dhaka-based interior design studio crafting timeless, functional interiors — from residential design to commercial spaces, 3D visualization, and consultation.",

  openGraph: {
    title: "JamSpace — Interior Design Studio in Dhaka",
    description: "Designed Beyond Walls. Timeless interiors that blend creativity, functionality, and exceptional craftsmanship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={helveticaNow.variable}>
      <body className="min-h-screen font-sans antialiased">
        <AnimatedFavicon />

        {/* <Preloader /> */}

        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}