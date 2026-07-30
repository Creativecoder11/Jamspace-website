import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { Faq } from "@/components/sections/Faq";

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
      <ContactForm />
      <Faq />
    </>
  );
}
