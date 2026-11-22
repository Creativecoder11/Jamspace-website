"use client";

import { useEffect } from "react";
import { trackBookingPurchase } from "@/lib/analytics";

/** Fires the purchase conversion once per booking, even if the page is reloaded. */
export function BookingTracker({ bookingId, value }: { bookingId: string; value: number }) {
  useEffect(() => {
    const key = `js_tracked_booking_${bookingId}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {}
    trackBookingPurchase(bookingId, value);
  }, [bookingId, value]);

  return null;
}
