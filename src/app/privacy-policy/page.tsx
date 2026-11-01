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
          <p className="mt-4 text-sm text-muted">Last updated: November 2026</p>

          <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed text-base">
            <div>
              <h2 className="text-xl font-medium text-foreground">1. Introduction</h2>
              <p className="mt-1 text-muted">
                <span>
                  At Jam Space, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard information when you visit our website, explore our portfolio, contact our team, or inquire about our design services.
                </span>

                <span className="block pt-1">
                  By providing personal information through our website, you acknowledge that you have been informed of the practices described in this Policy. Where required by law, we will obtain your consent before processing your information.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">2. Information We Collect</h2>
              <p className="mt-1 text-muted">
                We may collect the following information when you interact with Jam Space:
              </p>
              <ul className="mt-1 list-disc pl-5 space-y-1 text-muted">
                <li><strong>Personal Information:</strong> Your name, email address, phone number, and other contact details.</li>
                <li><strong>Project Information:</strong> Project location, property type, approximate area, budget, design preferences, and requirements shared during inquiries or consultations.</li>
                <li><strong>Communication Records:</strong> Messages, inquiries, feedback, and correspondence with our team.</li>
                <li><strong>Website Information:</strong> Technical information such as browser type, device information, IP address, and website usage data where collected through our website systems.</li>
              </ul>
              <p className="mt-1 text-muted">
                We collect information that is reasonably necessary to respond to inquiries, provide our services, and improve your experience.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">3. How We Use Your Information</h2>
              <p className="mt-1 text-muted">
                Your information may be used to:
              </p>
              <ul className="mt-1 list-disc pl-5 space-y-1 text-muted">
                <li>Respond to inquiries and consultation requests.</li>
                <li>Understand your design requirements and prepare proposals.</li>
                <li>Communicate project updates and relevant service information.</li>
                <li>Coordinate design consultations, site visits, and project activities.</li>
                <li>Improve our website, services, and customer experience.</li>
                <li>Fulfil applicable legal, accounting, and contractual obligations.</li>
              </ul>
              <p className="mt-1 text-muted font-medium">
                We will only send promotional communications where you have provided the necessary consent. You may withdraw that consent at any time.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">4. Legal Basis for Processing</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  We process personal information where permitted by applicable Bangladesh law, including where you have provided valid consent, where processing is necessary to respond to your request or fulfil a contract, or where another lawful basis applies.
                </span>

                <span className="block pt-1">
                  We will not use personal information for unrelated purposes without an appropriate legal basis.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">5. Information Sharing</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Jam Space does not sell or rent personal information to third parties.
                </span>

                <span className="block pt-1">
                  Where necessary, we may share relevant information with authorised employees, project consultants, contractors, technical service providers, or other parties involved in delivering our services.
                </span>

                <span className="block pt-1">
                  Information may also be disclosed where required by applicable law or a lawful authority.
                </span>

                <span className="block pt-1">
                  We seek to limit such sharing to information necessary for the relevant purpose and apply appropriate confidentiality and security measures.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">6. Cookies and Website Analytics</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Our website may use cookies and similar technologies to support essential website functions, understand visitor interactions, and improve performance.
                </span>

                <span className="block pt-1">
                  Where non-essential analytics or marketing cookies are used, we will provide appropriate information and choices in accordance with applicable law, contractors, technical service providers, or other parties involved in delivering our services.
                </span>

                <span className="block pt-1">
                  You may also manage cookies through your browser settings, although disabling certain cookies may affect website functionality.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">7. Project Images and Portfolio Content</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  As an interior design studio, Jam Space may document its projects through photography, videography, architectural drawings, and design visualisations.
                </span>

                <span className="block pt-1">
                  We respect the privacy of our clients and will seek appropriate authorisation before publicly sharing identifiable private spaces, confidential project information, or personal details.
                </span>

                <span className="block pt-1">
                  Portfolio materials are used to demonstrate our design expertise and professional work.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">8. Data Storage and Security</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  We take reasonable technical and organisational measures to protect personal information against unauthorised access, misuse, alteration, loss, or disclosure.
                </span>

                <span className="block pt-1">
                  Access to personal information is limited to individuals who require it for legitimate business purposes.
                </span>

                <span className="block pt-1">
                  While we take appropriate precautions, no digital system or internet transmission can be guaranteed to be completely secure.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">9. Data Retention</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  We retain personal information only for as long as necessary for the purposes for which it was collected, subject to applicable legal, contractual, accounting, and record-keeping obligations.
                </span>

                <span className="block pt-1">
                  When information is no longer required, we will take appropriate steps to delete, anonymise, or securely dispose of it, unless continued retention is legally necessary.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">10. Your Privacy Rights</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Subject to applicable law, you may request to:
                </span>

                <ul className="mt-1 list-disc pl-5 space-y-1 text-muted">
                  <li>Access personal information we hold about you.</li>
                  <li>Correct inaccurate or incomplete information.</li>
                  <li>Withdraw previously provided consent.</li>
                  <li>Request deletion of eligible personal information.</li>
                  <li>Object to certain processing activities.</li>
                  <li>Exercise applicable data portability rights.</li>
                </ul>
                <p className="mt-1 text-muted">
                  Requests may be submitted through our official contact details. We may need to verify your identity before responding.
                </p>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">11. Third-Party Services and Links</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Our website may contain links to external websites, social media platforms, or third-party services.
                </span>

                <span className="block pt-1">
                  These platforms operate under their own privacy policies. We encourage visitors to review those policies before sharing personal information.
                </span>

                <span className="block pt-1">
                  Where service providers process personal information outside Bangladesh, we will take steps to comply with applicable requirements governing international data transfers.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">12. Children&apos;s Privacy</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Our website and professional design services are intended primarily for adults.
                </span>

                <span className="block pt-1">
                  We do not knowingly collect personal information directly from children without appropriate parental or legal guardian authorisation where required by law.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">13. Changes to This Policy</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  We may update this Privacy Policy to reflect changes in our services, website operations, or applicable legal requirements.
                </span>

                <span className="block pt-1">
                  Any updates will be published on this page with a revised date.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">14. Contact Us</h2>
              <p className="mt-1 text-muted">
                For questions, concerns, or requests regarding your personal information, please contact:
              </p>
              <div className="mt-4 rounded-lg border border-border p-4 bg-white/5">
                <p className="font-medium text-foreground">Jam Space</p>
                <p className="text-sm text-muted">Email: <a href={`mailto:${contactInfo.email}`} className="text-accent underline">{contactInfo.email}</a></p>
                <p className="text-sm text-muted">Phone: <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="text-accent underline">{contactInfo.phone}</a></p>
                <p className="text-sm text-muted">Address: {contactInfo.address}</p>
                <p className="text-sm text-muted">Website: <a href="https://jamroll.space/" className="text-accent underline" target="_blank" rel="noopener noreferrer">www.jamroll.space</a></p>
                <p className="mt-1 text-muted">
                  We are committed to handling privacy-related inquiries responsibly and transparently.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

