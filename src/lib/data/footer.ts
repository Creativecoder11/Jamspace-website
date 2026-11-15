import type { FooterColumn, NavLink } from "@/lib/types";

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
      { label: "Interiors", href: "/services#interiors" },
      { label: "Architecture", href: "/services#architecture" },
      { label: "Furniture", href: "/services#furniture" },
      { label: "Consultancy & Visualisation", href: "/services#consultancy-visualisation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Download Brochure", href: "/brochure.pdf" },
      { label: "FAQs", href: "/contact#faq" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

export const contactInfo = {
  address: `H: 654, R: 09 Ave: 04, Mirpur DOHS, Dhaka 1216`,
  phone: "+880 1629658114",
  email: "space@jamroll.xyz",
};

export const socialLinks: NavLink[] = [];
