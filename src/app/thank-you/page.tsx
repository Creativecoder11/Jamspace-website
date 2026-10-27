import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/lib/data/footer";

export const metadata: Metadata = {
  title: "Thank You | Jam Space",
  description: "Your project enquiry has been received. The Jam Space team will be in touch shortly.",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { ref } = await searchParams;
  const reference = typeof ref === "string" ? ref : null;

  return (
    <section className="py-24 md:py-40">
      <Container className="max-w-2xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="mt-6 text-[44px] md:text-6xl font-normal leading-[120%]">
          Thank You.
        </h1>
        <p className="mt-4 text-muted text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Your enquiry has been received. Our team will contact you during business hours to learn more about your project.
        </p>

        {reference && (
          <div className="mt-6 inline-block rounded-md border border-border bg-white/5 px-4 py-2 text-xs font-mono text-muted">
            Reference: <span className="text-foreground font-semibold">{reference}</span>
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/projects" variant="secondary">
            View Our Projects
          </Button>
        </div>

        <p className="mt-10 text-sm text-muted">
          Need to reach us sooner? Call{" "}
          <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="text-accent underline">
            {contactInfo.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${contactInfo.email}`} className="text-accent underline">
            {contactInfo.email}
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
