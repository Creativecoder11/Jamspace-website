import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PagePlaceholder } from "@/components/sections/PagePlaceholder";
import { contactInfo } from "@/lib/data/footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with JamSpace to start your next project.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        image="/images/about-strip-03.webp"
      />
      <PagePlaceholder message="A full contact form is coming soon. Reach us directly in the meantime:">
        <ul className="space-y-2 text-sm">
          <li>{contactInfo.address}</li>
          <li>
            <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="hover:text-accent">
              {contactInfo.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${contactInfo.email}`} className="hover:text-accent">
              {contactInfo.email}
            </a>
          </li>
        </ul>
      </PagePlaceholder>
    </>
  );
}
