import { NextResponse } from "next/server";
import { getBooking, isValidBookingId } from "@/lib/bookings";
import { bookingFromTransaction, invoiceDataFromBooking } from "@/lib/bookingConfirmation";
import { findValidTransaction, matchesAmount } from "@/lib/sslcommerz";
import { generateInvoicePdf } from "@/lib/invoice";
import { designSession } from "@/lib/data/packages";

export const runtime = "nodejs";

/** Downloads the PDF invoice for a paid design session booking: /api/booking/invoice?ref=JSB-... */
export async function GET(request: Request) {
  const ref = new URL(request.url).searchParams.get("ref");
  if (!isValidBookingId(ref)) {
    return NextResponse.json({ error: "Invalid booking reference." }, { status: 400 });
  }

  let booking = await getBooking(ref);

  // No paid record locally (e.g. DB unavailable) — ask SSLCommerz directly.
  if (booking?.status !== "Paid") {
    const tx = await findValidTransaction(ref);
    booking = tx && matchesAmount(tx, designSession.price) ? bookingFromTransaction(tx, booking) : null;
  }

  if (!booking) {
    return NextResponse.json(
      { error: "No paid booking was found for this reference." },
      { status: 404 },
    );
  }

  const pdf = await generateInvoicePdf(invoiceDataFromBooking(booking));
  return new Response(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="JamSpace-Invoice-${ref}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
