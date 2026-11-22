import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button, ButtonArrow, buttonClasses } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { ConfirmationPanel } from "@/components/sections/ConfirmationPanel";
import { BookingTracker } from "@/components/analytics/BookingTracker";
import { getBooking, isValidBookingId } from "@/lib/bookings";
import { designSession } from "@/lib/data/packages";

export const metadata: Metadata = {
  title: "Booking Confirmed | Jam Space",
  description: "Your Jam Space design session is booked and paid. Our team will contact you to schedule it.",
  robots: { index: false, follow: false },
};

export default async function BookingSessionThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { ref } = await searchParams;
  if (!isValidBookingId(ref)) redirect("/packages");

  // Only the payment callback sends people here, after SSLCommerz validation.
  // A booking we know failed or was cancelled goes to the cancellation page.
  const booking = await getBooking(ref);
  if (booking && (booking.status === "Failed" || booking.status === "Cancelled")) {
    redirect(`/booking-session/payment-cancelled?status=${booking.status.toLowerCase()}&ref=${ref}`);
  }

  const firstName = booking?.name.split(/\s+/)[0];

  return (
    <>
      <BookingTracker bookingId={ref} value={designSession.price} />

      <ConfirmationPanel
        reference={ref}
        title="Thank You."
        primaryAction={
          <a
            href={`/api/booking/invoice?ref=${ref}`}
            download
            className={buttonClasses("primary")}
          >
            Download Invoice
            <ButtonArrow />
          </a>
        }
        secondaryAction={
          <Button href="/" variant="outline">
            Back To Home
          </Button>
        }
      >
        <p>
          {firstName ? `${firstName}, your` : "Your"} design session is
          confirmed and your payment of {designSession.priceLabel} has been
          received. A member of our design team will contact you within one
          business day to schedule your session at a time that suits you.
        </p>
        <p className="mt-3 text-sm">
          A confirmation email with your invoice is on its way. Please keep your
          reference number for any future correspondence.
        </p>
      </ConfirmationPanel>

      <Faq />
    </>
  );
}
