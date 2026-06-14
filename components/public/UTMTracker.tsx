"use client";

import { useUTM } from "@/hooks/useUTM";
import { Suspense } from "react";

function UTMTrackerComponent() {
  useUTM();
  return null;
}

export function UTMTracker() {
  return (
    <Suspense fallback={null}>
      <UTMTrackerComponent />
    </Suspense>
  );
}
