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
          <p className="mt-4 text-sm text-muted">Last updated: November 2026</p>

          <div className="mt-8 space-y-8 text-foreground/90 leading-relaxed text-base">
            <div>
              <h2 className="text-xl font-medium text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Welcome to Jam Space. These Terms & Conditions govern your access to and use of our website, including its portfolio, project information, design content, and online inquiry services.
                </span>

                <span className="block pt-1">
                  By accessing or using this website, you agree to comply with these Terms & Conditions. If you do not agree, please discontinue use of the website.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">2. About Jam Space</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Jam Space is a Bangladesh-based interior design and architectural practice offering creative and functional design solutions for residential, commercial, and professional environments.
                </span>

                <span className="block pt-1">
                  Our services may include interior design, space planning, architectural design, renovation, custom furniture, project management, and turnkey interior execution.
                </span>

                <span className="block pt-1">
                  The specific services offered for any project are determined through individual proposals and agreements.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">3. Website Information</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  The content on this website is provided for general information, inspiration, and an overview of our design capabilities.
                </span>

                <span className="block pt-1">
                  While we aim to keep all information accurate and updated, project descriptions, specifications, materials, service availability, and other details may change without prior notice.
                </span>

                <span className="block pt-1">
                  Images, 3D visualisations, drawings, and project photographs are intended to illustrate our design work. Actual materials, finishes, colours, dimensions, and completed outcomes may vary depending on project requirements and site conditions.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">4. Design Consultations and Inquiries</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Visitors may contact Jam Space through our website, email, telephone, or other official communication channels to discuss potential projects.
                </span>

                <span className="block pt-1">
                  Submitting an inquiry or requesting a consultation does not automatically establish a contractual relationship.
                </span>

                <span className="block pt-1">
                  Consultations, site visits, design assessments, and related services may be complimentary or subject to professional fees, as communicated before the relevant service is provided.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">5. Quotations and Project Proposals</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Any quotation, cost estimate, or proposal provided by Jam Space is based on the information, requirements, and scope available at the time of preparation.
                </span>

                <span className="block pt-1">
                  Final pricing may depend on project size, design complexity, material selection, site conditions, and execution requirements.
                </span>

                <span className="block pt-1">
                  A project engagement becomes binding only when the relevant proposal or agreement is formally accepted in accordance with its stated terms.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">6. Project Agreements</h2>
              <p className="mt-1 text-muted">
                <p className="mt-1 text-muted">
                  All confirmed projects are governed by a separate written agreement, approved proposal, or other formally accepted project documentation.
                </p>
                <span className="block">
                  Such documentation will define the applicable:
                </span>

                <ul className="mt-1 list-disc pl-5 space-y-1 text-muted">
                  <li>Scope of work and deliverables.</li>
                  <li>Design and approval stages.</li>
                  <li>Project timeline and milestones.</li>
                  <li>Fees, payment terms, and applicable taxes.</li>
                  <li>Material specifications and execution responsibilities.</li>
                  <li>Revisions, variations, warranties, and handover conditions.</li>
                </ul>
                <p className="mt-1 text-muted">
                  Where any conflict exists between these website Terms & Conditions and a signed project agreement, the project agreement will prevail in relation to that project.
                </p>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">7. Client Responsibilities</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Clients engaging Jam Space are expected to provide accurate project information, relevant site details, necessary access, and timely feedback.
                </span>

                <span className="block pt-1">
                  Design approvals, material selections, scope changes, and other project decisions should be communicated through agreed channels.
                </span>

                <span className="block pt-1">
                  Any delay or change affecting project cost, delivery, or execution will be addressed according to the applicable project agreement.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">8. Design Changes and Project Modifications</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Design modifications, additional requirements, and changes to approved materials or specifications may affect project costs and timelines.
                </span>
                <span className="block pt-1">
                  Such changes will be evaluated and communicated in accordance with the relevant project agreement.
                </span>
                <span className="block pt-1">
                  Additional work will be subject to the applicable approval and payment arrangements.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">9. Intellectual Property</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Unless otherwise stated, the content published on this website, including design concepts, architectural drawings, 3D visualisations, photographs, graphics, written content, branding, and website materials, belongs to Jam Space or its respective rights holders.
                </span>
                <span className="block pt-1">
                  These materials may not be reproduced, distributed, commercially used, or modified without appropriate written permission.
                </span>
                <span className="block pt-1">
                  Ownership and usage rights relating to client-specific design deliverables will be governed by the relevant project agreement.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">10. Portfolio and Project Photography</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Jam Space may feature completed projects, design concepts, and visualisations to demonstrate its professional expertise.
                </span>
                <span className="block pt-1">
                  We respect client confidentiality and seek appropriate permission where required before publishing private or confidential project information.
                </span>
                <span className="block pt-1">
                  Some portfolio visuals may represent conceptual designs or proposed outcomes rather than completed construction.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">11. Website Usage</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Visitors agree to use this website lawfully and responsibly.
                </span>
                <span className="block pt-1">
                  You must not attempt to interfere with website functionality, gain unauthorised access to its systems, introduce malicious software, or use its content in a way that infringes the rights of Jam Space or others.
                </span>
                <span className="block pt-1">
                  We reserve the right to restrict access where misuse or unlawful activity is identified.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">12. Third-Party Links</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Our website may include links to external websites, suppliers, social media platforms, or other third-party services.
                </span>
                <span className="block pt-1">
                  These links are provided for convenience. Jam Space does not control and is not responsible for the content, availability, or privacy practices of external websites.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">13. Limitation of Liability</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Jam Space makes reasonable efforts to maintain an accurate, secure, and functional website.
                </span>
                <span className="block pt-1">
                  However, the website and its general informational content are provided without a guarantee of uninterrupted availability or freedom from technical errors.
                </span>
                <span className="block pt-1">
                  To the extent permitted by applicable law, Jam Space will not be responsible for losses arising solely from website interruptions, unauthorised third-party activity, or reliance on general website information rather than an agreed professional service.
                </span>
                <span className="block pt-1">
                  Nothing in these Terms excludes or limits liability that cannot lawfully be excluded.
                </span>
                <span className="block pt-1">
                  Any liability relating to a confirmed design or execution project will be governed by the relevant project agreement and applicable law.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">14. Privacy and Personal Information</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Personal information submitted through our website is handled in accordance with our Privacy Policy and applicable Bangladesh law.
                </span>
                <span className="block pt-1">
                  We encourage visitors to review the Privacy Policy to understand how their information is collected, used, and protected.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">15. Changes to These Terms</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  Jam Space may revise these Terms &amp; Conditions to reflect changes in website functionality, services, or applicable legal requirements.
                </span>
                <span className="block pt-1">
                  Updated terms will be published on this page with a revised date. Changes will apply prospectively unless otherwise permitted by law.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">16. Governing Law</h2>
              <p className="mt-1 text-muted">
                <span className="block">
                  These Terms &amp; Conditions are governed by the laws of the People&apos;s Republic of Bangladesh.
                </span>
                <span className="block pt-1">
                  Any dispute relating to website usage will first be addressed through good-faith communication. Where necessary, disputes will be subject to the jurisdiction of the competent courts of Bangladesh.
                </span>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium text-foreground">17. Contact Information</h2>
              <p className="mt-1 text-muted">
                For questions regarding these Terms & Conditions, please contact:
              </p>
              <div className="mt-4 rounded-lg border border-border p-4 bg-white/5">
                <p className="font-medium text-foreground">Jam Space</p>
                <p className="text-sm text-muted">Email: <a href={`mailto:${contactInfo.email}`} className="text-accent underline">{contactInfo.email}</a></p>
                <p className="text-sm text-muted">Phone: <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="text-accent underline">{contactInfo.phone}</a></p>
                <p className="text-sm text-muted">Address: {contactInfo.address}</p>
                <p className="text-sm text-muted">Website: <a href="https://jamroll.space/" className="text-accent underline" target="_blank" rel="noopener noreferrer">www.jamroll.space</a></p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

