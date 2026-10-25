import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { contactInfo } from "@/lib/data/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Jam Space",
  description: "Learn how Jam Space collects, uses, and protects your information when you submit a project enquiry.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal & Privacy" image="/images/about-strip-03.webp" />
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-medium md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-muted">Last updated: October 2026</p>

          <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed text-base">
            <div>
              <h2 className="text-xl font-medium text-foreground">1. Introduction</h2>
              <p className="mt-2 text-muted">
                Jam Space (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is an interior design studio based in Dhaka, Bangladesh. We are committed to protecting your privacy and handling your personal information transparently and responsibly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">2. Information We Collect</h2>
              <p className="mt-2 text-muted">
                When you submit an enquiry through our website or contact us directly, we may collect:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-muted">
                <li>Your name and contact phone number.</li>
                <li>Project details including project type (residential, commercial, renovation), general location, estimated budget range, and timeline.</li>
                <li>Non-personally identifiable technical information such as referral source (UTM parameters) and site interaction data.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">3. How We Use Your Information</h2>
              <p className="mt-2 text-muted">
                We use the information you provide solely to:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-muted">
                <li>Respond to your project enquiry and discuss your design requirements.</li>
                <li>Prepare design consultation proposals and project timelines.</li>
                <li>Improve our website services and evaluate campaign effectiveness.</li>
              </ul>
              <p className="mt-2 text-muted font-medium">
                We never sell, rent, or trade your personal contact details to third parties. Customer personal details (such as your name or phone number) are never shared with advertising or analytics platforms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">4. Data Storage and Retention</h2>
              <p className="mt-2 text-muted">
                Your enquiry data is stored securely and accessed only by authorized team members responsible for project coordination. We retain customer information only as long as necessary to fulfill project consultations or as required by law.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">5. Your Rights &amp; Contact</h2>
              <p className="mt-2 text-muted">
                You have the right to review, update, or request the deletion of your enquiry information at any time. To make a request or ask any questions about this policy, please reach out to us:
              </p>
              <div className="mt-4 rounded-lg border border-border p-4 bg-white/5">
                <p className="font-medium text-foreground">Jam Space Coordinator</p>
                <p className="text-sm text-muted">Email: <a href={`mailto:${contactInfo.email}`} className="text-accent underline">{contactInfo.email}</a></p>
                <p className="text-sm text-muted">Phone: <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="text-accent underline">{contactInfo.phone}</a></p>
                <p className="text-sm text-muted">Address: {contactInfo.address}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

