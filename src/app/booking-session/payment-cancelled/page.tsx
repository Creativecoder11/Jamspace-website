import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { ConfirmationPanel } from "@/components/sections/ConfirmationPanel";
import { isValidBookingId } from "@/lib/bookings";

export const metadata: Metadata = {
  title: "Payment Cancelled | Jam Space",
  description: "Your design session payment was not completed. You can try again at any time.",
  robots: { index: false, follow: false },
};

export default async function PaymentCancelledPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { status, ref } = await searchParams;
  const failed = status === "failed";
  const reference = isValidBookingId(ref) ? ref : null;

  return (
    <>
      <ConfirmationPanel
        reference={reference}
        tone="cancelled"
        title={failed ? "Payment Unsuccessful." : "Payment Cancelled."}
        primaryAction={<Button href="/packages?book=session">Try Again</Button>}
        secondaryAction={
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        }
      >
        <p>
          {failed
            ? "We couldn't complete your payment, so your design session hasn't been booked yet. This can happen if the transaction was declined or timed out."
            : "Your payment was cancelled and your design session hasn't been booked. No amount has been charged."}{" "}
          You can try again whenever you&apos;re ready, or contact us and
          we&apos;ll help you book directly.
        </p>
        {failed && reference && (
          <p className="mt-3 text-sm">
            If an amount was deducted from your account, please contact us with
            your reference number and we&apos;ll resolve it promptly.
          </p>
        )}
      </ConfirmationPanel>

      <Faq />
    </>
  );
}
