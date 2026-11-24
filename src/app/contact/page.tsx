import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact an Interior Designer in Dhaka | Jam Space",
  description:
    "Discuss your project with Jam Space, an interior design and architecture studio in Dhaka. Call, email or send us your brief and our team will get in touch.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact Us", path: "/contact" }])} />
      <PageHero eyebrow="Contact" image="/images/about-strip-03.webp" />
      <ContactForm />

      <div id="faq" className="scroll-mt-8 md:scroll-mt-0">
        <Faq />
      </div>
    </>
  );
}