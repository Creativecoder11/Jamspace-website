import type { FooterColumn, NavLink } from "@/lib/types";
import { brochure } from "@/lib/data/brochure";

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Interior Design", href: "/services/interior-design" },
      { label: "Architectural Design", href: "/services/architectural-design" },
      { label: "Custom Furniture", href: "/services/custom-furniture" },
      { label: "Consultancy & Visualisation", href: "/services/consultancy-visualisation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: brochure.title, href: brochure.href },
      { label: "FAQs", href: "/contact#faq" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

export const contactInfo = {
  address: `House 654, Road 09, Avenue 4, Mirpur DOHS, Dhaka 1216`,
  phone: "+880 1629 658114",
  email: "space@jamroll.xyz",
};

export const socialLinks: NavLink[] = [];
