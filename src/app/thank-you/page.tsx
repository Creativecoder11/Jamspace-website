import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { ThankYouTracker } from "@/components/analytics/ThankYouTracker";
import { ConfirmationPanel } from "@/components/sections/ConfirmationPanel";

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
  const resolvedParams = await searchParams;
  const refParam = resolvedParams.ref;
  const typeParam = resolvedParams.type;

  const reference = typeof refParam === "string" ? refParam : null;
  const projectType = typeof typeParam === "string" ? typeParam : "Residential";

  return (
    <>
      {/* Fires Meta Pixel Lead event for the thank you page */}
      <ThankYouTracker submissionId={reference} projectType={projectType} />

      <ConfirmationPanel
        reference={reference}
        title="Thank You."
        primaryAction={<Button href="/">Back To Home</Button>}
        secondaryAction={
          <Button href="/projects" variant="outline">
            View Our Projects
          </Button>
        }
      >
        <p>
          Your enquiry has been received. Our team will contact you during
          business hours to learn more about your project.
        </p>
      </ConfirmationPanel>

      <Faq />
    </>
  );
}
