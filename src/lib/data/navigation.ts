import type { NavLink, NavMenuItem } from "@/lib/types";
import { homeServices } from "@/lib/data/services";

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Packages", href: "/packages" },
  { label: "Blog", href: "/blog" },
];

/** Dropdown entries under "Services" — one per service detail page. */
export const servicesMenu: NavMenuItem[] = homeServices.map((service) => ({
  label: service.title,
  href: service.href,
}));

/** Nav entries that open a dropdown, keyed by the parent link's href. */
export const navMenus: Record<string, NavMenuItem[]> = {
  "/services": servicesMenu,
};
