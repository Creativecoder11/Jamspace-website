import type { Metadata } from "next";
import { contactInfo } from "@/lib/data/footer";

/** Canonical origin of the live site — override per environment with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://jamroll.space").replace(/\/$/, "");

export const SITE_NAME = "Jam Space";

/** Default social-share image, used when a page doesn't set its own. */
export const DEFAULT_OG_IMAGE = "/images/services-residential-1.webp";

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/jamroll.space",
  "https://www.instagram.com/jamroll.space",
  "https://linkedin.com/company/jam-space-interior",
];

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;

interface PageMetaInput {
  /** Page title. " | Jam Space" is added only when the title doesn't already name the brand. */
  title: string;
  description: string;
  /** Route path, e.g. "/about". Used for the canonical URL and og:url. */
  path: string;
  image?: string;
  type?: "website" | "article";
}

/** Title, description, canonical URL and social-share tags for one page. */
export function pageMetadata({ title, description, path, image, type = "website" }: PageMetaInput): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const images = [{ url: image ?? DEFAULT_OG_IMAGE, alt: fullTitle }];
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}

// ---------------------------------------------------------------------------
// Structured data (JSON-LD)
// ---------------------------------------------------------------------------

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** The studio as a local business — powers the knowledge panel and brand understanding. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    description:
      "Jam Space is a multidisciplinary design studio in Dhaka offering interior design, architectural design, custom furniture, and design consultancy & 3D visualisation for homes and commercial spaces.",
    url: SITE_URL,
    logo: absoluteUrl("/icon.png"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    telephone: contactInfo.phone.replace(/\s+/g, ""),
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "House 654, Road 09, Avenue 4, Mirpur DOHS",
      addressLocality: "Dhaka",
      postalCode: "1216",
      addressCountry: "BD",
    },
    areaServed: { "@type": "City", name: "Dhaka" },
    knowsAbout: [
      "Interior Design",
      "Architectural Design",
      "Custom Furniture",
      "3D Visualisation",
      "Space Planning",
    ],
    sameAs: SOCIAL_PROFILES,
  };
}

/** Tells Google the site's name, so results show "Jam Space" rather than the domain. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: ["Jam Space Dhaka", "jamroll.space"],
    url: SITE_URL,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Breadcrumb trail for an inner page; Home is added automatically. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** One service the studio offers, linked back to the organization. */
export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "City", name: "Dhaka" },
  };
}
