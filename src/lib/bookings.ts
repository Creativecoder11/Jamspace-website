import fs from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { getBookingsCollection } from "@/lib/mongodb";

export type BookingStatus = "Pending" | "Paid" | "Failed" | "Cancelled";

export interface BookingPayment {
  valId: string;
  bankTranId: string;
  cardType: string;
  tranDate: string;
}

export interface Booking {
  bookingId: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  notes: string;
  amount: number;
  currency: "BDT";
  status: BookingStatus;
  paidAt?: string;
  payment?: BookingPayment;
  attribution?: Record<string, unknown>;
}

/** Non-guessable booking reference, also used as the SSLCommerz tran_id. */
export function createBookingId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = randomBytes(5).toString("hex").toUpperCase();
  return `JSB-${date}-${random}`;
}

export function isValidBookingId(value: unknown): value is string {
  return typeof value === "string" && /^JSB-\d{8}-[A-F0-9]{10}$/.test(value);
}

// Local JSON backup (data/bookings.json) — mirrors the leads backup in /api/contact.
const bookingsFile = path.join(process.cwd(), "data", "bookings.json");

function readLocalBookings(): Booking[] {
  try {
    if (!fs.existsSync(bookingsFile)) return [];
    return JSON.parse(fs.readFileSync(bookingsFile, "utf-8"));
  } catch {
    return [];
  }
}

function writeLocalBookings(bookings: Booking[]) {
  try {
    fs.mkdirSync(path.dirname(bookingsFile), { recursive: true });
    fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2), "utf-8");
  } catch (err) {
    console.error("[Bookings] Could not write local backup:", err);
  }
}

export async function saveBooking(booking: Booking): Promise<void> {
  try {
    const collection = await getBookingsCollection();
    await collection?.insertOne({ ...booking });
  } catch (err) {
    console.error("[Bookings] MongoDB insert failed:", err);
  }

  const local = readLocalBookings();
  local.push(booking);
  writeLocalBookings(local);
}

export async function getBooking(bookingId: string): Promise<Booking | null> {
  try {
    const collection = await getBookingsCollection();
    const doc = await collection?.findOne({ bookingId }, { projection: { _id: 0 } });
    if (doc) return doc as unknown as Booking;
  } catch (err) {
    console.error("[Bookings] MongoDB lookup failed:", err);
  }
  return readLocalBookings().find((b) => b.bookingId === bookingId) ?? null;
}

/**
 * Marks a booking as paid, at most once. Returns true only for the call that
 * made the transition, so the success redirect and the IPN can't both send
 * confirmation emails. Creates the record if it was never stored.
 */
export async function markBookingPaid(booking: Booking): Promise<boolean> {
  const changes = {
    status: "Paid" as const,
    paidAt: booking.paidAt,
    payment: booking.payment,
  };

  let transitioned: boolean | null = null;
  try {
    const collection = await getBookingsCollection();
    if (collection) {
      const result = await collection.updateOne(
        { bookingId: booking.bookingId, status: { $ne: "Paid" } },
        { $set: changes },
      );
      if (result.matchedCount === 0) {
        const existing = await collection.findOne({ bookingId: booking.bookingId });
        if (!existing) {
          await collection.insertOne({ ...booking, ...changes });
          transitioned = true;
        } else {
          transitioned = false;
        }
      } else {
        transitioned = result.modifiedCount > 0;
      }
    }
  } catch (err) {
    console.error("[Bookings] MongoDB paid update failed:", err);
  }

  const local = readLocalBookings();
  const index = local.findIndex((b) => b.bookingId === booking.bookingId);
  const wasPaidLocally = index !== -1 && local[index].status === "Paid";
  if (index === -1) {
    local.push({ ...booking, ...changes });
  } else if (!wasPaidLocally) {
    local[index] = { ...local[index], ...changes };
  }
  if (!wasPaidLocally) writeLocalBookings(local);

  return transitioned ?? !wasPaidLocally;
}

export async function updateBooking(
  bookingId: string,
  changes: Partial<Booking>,
): Promise<void> {
  try {
    const collection = await getBookingsCollection();
    await collection?.updateOne({ bookingId }, { $set: changes });
  } catch (err) {
    console.error("[Bookings] MongoDB update failed:", err);
  }

  const local = readLocalBookings();
  const index = local.findIndex((b) => b.bookingId === bookingId);
  if (index !== -1) {
    local[index] = { ...local[index], ...changes };
    writeLocalBookings(local);
  }
}
