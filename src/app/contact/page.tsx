import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Contact an Interior Designer in Dhaka | Jam Space",
  description: "Get in touch with Jam Space, an interior design studio in Dhaka, to discuss your residential or commercial project and bring your vision to life.",
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
