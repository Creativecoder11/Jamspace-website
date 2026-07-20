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
      { label: "Residential Design", href: "/services#residential-design" },
      { label: "Commercial Design", href: "/services#commercial-design" },
      { label: "3D Visualization", href: "/services#3d-visualization" },
      { label: "Design Consultation", href: "/services#consultation-services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Download Brochure", href: "/brochure.pdf" },
      { label: "FAQs", href: "/faqs" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

export const contactInfo = {
  address: `H: 654, R: 09 Ave: 04, Mirpur DOHS, Dhaka 1216`,
  phone: "+880 XXX XXX XXXX",
  email: "demo@jamroll.space",
};

export const socialLinks: NavLink[] = [];
