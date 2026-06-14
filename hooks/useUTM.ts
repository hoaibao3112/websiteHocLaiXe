"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useUTM() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    const utmData: Record<string, string> = {};
    let hasUtm = false;

    utmKeys.forEach((key) => {
      const val = searchParams.get(key);
      if (val) {
        utmData[key] = val;
        hasUtm = true;
      }
    });

    if (hasUtm) {
      sessionStorage.setItem("utm_data", JSON.stringify(utmData));
    }
  }, [searchParams]);
}
