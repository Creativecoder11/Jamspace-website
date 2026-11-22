import { NextResponse } from "next/server";
import { getBooking, isValidBookingId, updateBooking } from "@/lib/bookings";
import { confirmPaidBooking } from "@/lib/bookingConfirmation";
import { isPaid, matchesAmount, validatePayment } from "@/lib/sslcommerz";
import { designSession } from "@/lib/data/packages";
import { getSiteUrl } from "@/lib/siteUrl";

export const runtime = "nodejs";

type Result = "success" | "fail" | "cancel" | "ipn";

async function readForm(request: Request): Promise<Record<string, string>> {
  try {
    const form = await request.formData();
    const out: Record<string, string> = {};
    form.forEach((value, key) => {
      if (typeof value === "string") out[key] = value;
    });
    return out;
  } catch {
    return {};
  }
}

/** Validates with SSLCommerz server-to-server — never trusts the posted status alone. */
async function verifyAndConfirm(tranId: string, valId: string): Promise<boolean> {
  if (!valId) return false;
  const tx = await validatePayment(valId);
  if (!isPaid(tx) || tx.tran_id !== tranId || !matchesAmount(tx, designSession.price)) {
    console.warn(`[Payment] Validation rejected for ${tranId}:`, tx?.status);
    return false;
  }
  await confirmPaidBooking(tx);
  return true;
}

/** Records a failed/cancelled attempt without ever downgrading a paid booking. */
async function markUnpaid(tranId: string, status: "Failed" | "Cancelled") {
  const booking = await getBooking(tranId);
  if (booking && booking.status !== "Paid") {
    await updateBooking(tranId, { status });
  }
}

/**
 * SSLCommerz posts the customer's browser back here after payment
 * (success_url / fail_url / cancel_url) and calls the IPN server-to-server.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ result: string }> },
) {
  const { result } = (await params) as { result: Result };
  const form = await readForm(request);
  const tranId = form.tran_id ?? "";
  const siteUrl = getSiteUrl(request);

  // 303 turns the gateway's POST into a GET for our page.
  const redirectTo = (path: string) => NextResponse.redirect(`${siteUrl}${path}`, 303);
  const cancelledPage = (status: "failed" | "cancelled") =>
    redirectTo(
      `/booking-session/payment-cancelled?status=${status}${isValidBookingId(tranId) ? `&ref=${tranId}` : ""}`,
    );

  if (!isValidBookingId(tranId)) {
    return result === "ipn"
      ? NextResponse.json({ ok: false }, { status: 400 })
      : cancelledPage("failed");
  }

  try {
    switch (result) {
      case "success": {
        const paid = await verifyAndConfirm(tranId, form.val_id ?? "");
        if (paid) return redirectTo(`/booking-session/thank-you?ref=${tranId}`);
        await markUnpaid(tranId, "Failed");
        return cancelledPage("failed");
      }
      case "ipn": {
        const paid = await verifyAndConfirm(tranId, form.val_id ?? "");
        if (!paid && (form.status === "FAILED" || form.status === "CANCELLED")) {
          await markUnpaid(tranId, form.status === "FAILED" ? "Failed" : "Cancelled");
        }
        return NextResponse.json({ ok: true });
      }
      case "fail":
        await markUnpaid(tranId, "Failed");
        return cancelledPage("failed");
      case "cancel":
        await markUnpaid(tranId, "Cancelled");
        return cancelledPage("cancelled");
      default:
        return NextResponse.json({ ok: false }, { status: 404 });
    }
  } catch (error) {
    console.error(`[Payment] ${result} handler error for ${tranId}:`, error);
    return result === "ipn"
      ? NextResponse.json({ ok: false }, { status: 500 })
      : cancelledPage("failed");
  }
}

/**
 * A GET here (link opened directly, refresh, or a gateway redirect without a
 * form post) can't carry payment data, so show the matching result page.
 * Success is never confirmed from a GET — that only happens via the validated POST.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ result: string }> },
) {
  const { result } = await params;
  const siteUrl = getSiteUrl(request);
  const tranId = new URL(request.url).searchParams.get("tran_id");
  const ref = isValidBookingId(tranId) ? `&ref=${tranId}` : "";

  if (result === "cancel" || result === "fail") {
    const status = result === "cancel" ? "cancelled" : "failed";
    return NextResponse.redirect(
      `${siteUrl}/booking-session/payment-cancelled?status=${status}${ref}`,
      303,
    );
  }
  return NextResponse.redirect(`${siteUrl}/packages`, 303);
}
