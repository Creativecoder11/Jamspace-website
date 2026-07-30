export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  accent: "pink" | "yellow" | "teal" | "white";
  icon: "lshape" | "traiangle" | "mshape";
}

export interface SubService {
  label: string;
}

export interface Service {
  index: string;
  slug: string;
  title: string;
  heading?: string;
  description?: string;
  shortdescription?: string;
  image?: string;
  subServices?: SubService[];
}

export interface Project {
  index: string;
  slug: string;
  name: string;
  location: string;
  category: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export interface StripImage {
  image: string;
  alt: string;
}

export interface HeroSlide {
  name: string;
  location: string;
  /** Full-bleed background photo shown when this slide is active. */
  image: string;
  /** Portrait crop used in the "next up" preview card; falls back to `image`. */
  thumb?: string;
}

export interface PricingPackage {
  name: string;
  accent: "pink" | "yellow" | "teal";
  description: string;
  tag: string;
  price: string;
  /** Appended after the price as "/unit", e.g. "sq ft". Omit for flat/range prices. */
  unit?: string;
  priceCaption: string;
  included: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}
