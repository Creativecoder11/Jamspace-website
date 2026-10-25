import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { contactInfo } from "@/lib/data/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Jam Space",
  description: "Terms and conditions governing the use of the Jam Space website and project enquiry services.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHero eyebrow="Terms of Service" image="/images/about-strip-03.webp" />
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <h1 className="text-3xl font-medium md:text-5xl">Terms &amp; Conditions</h1>
          <p className="mt-4 text-sm text-muted">Last updated: October 2026</p>

          <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed text-base">
            <div>
              <h2 className="text-xl font-medium text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-2 text-muted">
                By accessing and using this website (jamroll.space), you agree to comply with and be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">2. Project Enquiries &amp; Consultations</h2>
              <p className="mt-2 text-muted">
                Submitting a project enquiry through our contact form does not create a binding architectural, design, or construction agreement. A formal agreement is established only upon the signing of a tailored project proposal and contract by both parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">3. Intellectual Property</h2>
              <p className="mt-2 text-muted">
                All photographs, 3D renderings, case studies, graphics, logos, and editorial content on this site are the exclusive property of Jam Space and Jamroll Studio, unless otherwise noted. Unauthorized reproduction, duplication, or redistribution is strictly prohibited.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">4. Accuracy of Information</h2>
              <p className="mt-2 text-muted">
                While we make every effort to ensure project portfolios and service descriptions are accurate and current, project scopes, timelines, and budgets are customized individually for each client.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">5. Contact Information</h2>
              <p className="mt-2 text-muted">
                For questions regarding these terms, please contact:
              </p>
              <div className="mt-4 rounded-lg border border-border p-4 bg-white/5">
                <p className="font-medium text-foreground">Jam Space</p>
                <p className="text-sm text-muted">Email: <a href={`mailto:${contactInfo.email}`} className="text-accent underline">{contactInfo.email}</a></p>
                <p className="text-sm text-muted">Phone: <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="text-accent underline">{contactInfo.phone}</a></p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

