"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { initAttribution } from "@/lib/attribution";

function AttributionCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    initAttribution();
  }, [searchParams]);

  return null;
}

export function AttributionTracker() {
  return (
    <Suspense fallback={null}>
      <AttributionCapture />
    </Suspense>
  );
}

