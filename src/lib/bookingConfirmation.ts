import { getBooking, markBookingPaid, type Booking } from "@/lib/bookings";
import { generateInvoicePdf, type InvoiceData } from "@/lib/invoice";
import {
  getBookingConfirmationEmailHtml,
  getClientConfirmationAttachments,
} from "@/lib/emailTemplates";
import { escapeHtml, getMailAddresses, getMailTransporter } from "@/lib/mailer";
import type { SslcommerzTransaction } from "@/lib/sslcommerz";
import { designSession } from "@/lib/data/packages";

/** Merges our stored booking with the validated SSLCommerz transaction. */
export function bookingFromTransaction(
  tx: SslcommerzTransaction,
  stored: Booking | null,
): Booking {
  return {
    bookingId: tx.tran_id,
    createdAt: stored?.createdAt ?? new Date().toISOString(),
    name: stored?.name ?? tx.value_a ?? "",
    email: stored?.email ?? tx.value_b ?? "",
    phone: stored?.phone ?? tx.value_c ?? "",
    location: stored?.location ?? tx.value_d ?? "",
    notes: stored?.notes ?? "",
    amount: designSession.price,
    currency: "BDT",
    status: "Paid",
    paidAt: stored?.paidAt ?? new Date().toISOString(),
    payment: {
      valId: tx.val_id,
      bankTranId: tx.bank_tran_id ?? "",
      cardType: tx.card_type ?? "",
      tranDate: tx.tran_date ?? "",
    },
    attribution: stored?.attribution,
  };
}

export function invoiceDataFromBooking(booking: Booking): InvoiceData {
  return {
    bookingId: booking.bookingId,
    paidAt: booking.paidAt ?? booking.createdAt,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    location: booking.location,
    amount: booking.amount,
    cardType: booking.payment?.cardType,
    bankTranId: booking.payment?.bankTranId,
  };
}

/**
 * Records a validated payment and, the first time only, emails the client
 * (with the invoice PDF) and the studio.
 */
export async function confirmPaidBooking(tx: SslcommerzTransaction): Promise<void> {
  const stored = await getBooking(tx.tran_id);
  const booking = bookingFromTransaction(tx, stored);
  const firstConfirmation = await markBookingPaid(booking);
  if (!firstConfirmation) return;

  const transporter = getMailTransporter();
  if (!transporter) {
    console.log(`[Booking] SMTP not configured — skipped emails for ${booking.bookingId}`);
    return;
  }

  const { adminEmail, fromAddress } = getMailAddresses();
  const invoice = Buffer.from(await generateInvoicePdf(invoiceDataFromBooking(booking)));
  const invoiceAttachment = {
    filename: `JamSpace-Invoice-${booking.bookingId}.pdf`,
    content: invoice,
    contentType: "application/pdf",
  };

  const rows: Array<[string, string]> = [
    ["Booking Ref", booking.bookingId],
    ["Client Name", booking.name],
    ["Phone", booking.phone],
    ["Email", booking.email],
    ["Project Location", booking.location],
    ["Amount Paid", designSession.priceLabel],
    ["Payment Method", booking.payment?.cardType || "-"],
    ["Bank Transaction ID", booking.payment?.bankTranId || "-"],
  ];
  if (booking.notes) rows.push(["About the Project", booking.notes]);

  const adminHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #111111; color: #ffffff; padding: 24px;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 500;">Jam Space — Design Session Booked &amp; Paid</h1>
        <p style="margin: 6px 0 0; font-size: 13px; color: #E92A7B; font-weight: 600;">Reference: ${escapeHtml(booking.bookingId)}</p>
      </div>
      <div style="padding: 24px; background-color: #fafafa;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding: 8px 0; color: #666; width: 170px; vertical-align: top;">${label}:</td><td style="padding: 8px 0; font-weight: 600; white-space: pre-wrap;">${escapeHtml(value)}</td></tr>`,
            )
            .join("")}
        </table>
        <p style="margin-top: 20px; font-size: 13px; color: #555;">Please contact the client to schedule the 60-minute session.</p>
      </div>
    </div>`;

  try {
    await Promise.all([
      transporter.sendMail({
        from: fromAddress,
        to: adminEmail,
        subject: `[Jam Space Booking] Design Session Paid | ${booking.name} | ${booking.bookingId}`,
        html: adminHtml,
        attachments: [invoiceAttachment],
      }),
      booking.email &&
        transporter.sendMail({
          from: fromAddress,
          to: booking.email,
          subject: `Your Design Session Is Confirmed — Jam Space (${booking.bookingId})`,
          html: getBookingConfirmationEmailHtml({
            name: escapeHtml(booking.name),
            bookingId: booking.bookingId,
            amountLabel: designSession.priceLabel,
            duration: designSession.duration,
          }),
          // Brand logo + gallery images referenced by cid: in the template.
          attachments: [...getClientConfirmationAttachments(), invoiceAttachment],
        }),
    ]);
  } catch (err) {
    console.error(`[Booking] Email sending failed for ${booking.bookingId}:`, err);
  }
}
