import { NextResponse } from "next/server";
import { createBookingId, saveBooking, type Booking } from "@/lib/bookings";
import { createPaymentSession, isSslcommerzConfigured } from "@/lib/sslcommerz";
import { designSession } from "@/lib/data/packages";
import { getSiteUrl } from "@/lib/siteUrl";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+?8801[3-9]\d{8}|01[3-9]\d{8}|\+?[1-9]\d{7,14})$/;

function field(body: Record<string, unknown>, key: string, max: number): string {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Creates a pending design-session booking and returns the SSLCommerz gateway URL. */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (body.website_fax_field) {
      return NextResponse.json({ ok: false, error: "Bot detected" }, { status: 400 });
    }

    const name = field(body, "name", 100);
    const phone = field(body, "phone", 30);
    const email = field(body, "email", 150);
    const location = field(body, "location", 150);
    const notes = field(body, "notes", 2000);

    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "Please enter your full name." }, { status: 400 });
    }
    if (!phoneRegex.test(phone.replace(/[\s\-()]/g, ""))) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid phone number (e.g. 017XXXXXXXX or +880 1XXXXXXXXX)." },
        { status: 400 },
      );
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (location.length < 2) {
      return NextResponse.json({ ok: false, error: "Please enter your project location." }, { status: 400 });
    }

    if (!isSslcommerzConfigured()) {
      console.error("[Booking] SSLCOMMERZ_STORE_ID / SSLCOMMERZ_STORE_PASSWORD are not set.");
      return NextResponse.json(
        { ok: false, error: "Online payment is temporarily unavailable. Please contact us to book your session." },
        { status: 503 },
      );
    }

    const booking: Booking = {
      bookingId: createBookingId(),
      createdAt: new Date().toISOString(),
      name,
      phone,
      email,
      location,
      notes,
      amount: designSession.price,
      currency: "BDT",
      status: "Pending",
      attribution:
        body.attribution && typeof body.attribution === "object"
          ? (body.attribution as Record<string, unknown>)
          : undefined,
    };
    await saveBooking(booking);

    const siteUrl = getSiteUrl(request);
    const callback = (result: string) => `${siteUrl}/api/booking/payment/${result}`;

    const gatewayUrl = await createPaymentSession({
      tranId: booking.bookingId,
      amount: booking.amount,
      productName: designSession.productName,
      customer: { name, email, phone, location },
      urls: {
        success: callback("success"),
        fail: callback("fail"),
        cancel: callback("cancel"),
        ipn: callback("ipn"),
      },
    });

    return NextResponse.json({ ok: true, bookingId: booking.bookingId, gatewayUrl });
  } catch (error) {
    console.error("[Booking] Failed to start payment:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't start the payment right now. Please try again in a moment." },
      { status: 500 },
    );
  }
}
