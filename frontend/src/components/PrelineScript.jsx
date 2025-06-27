"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    const loadPreline = () => {
      try {
        // Check if HSStaticMethods is available (loaded via CDN)
        if (typeof window !== 'undefined' && window.HSStaticMethods) {
          window.HSStaticMethods.autoInit();
        }
      } catch (error) {
        console.warn("Preline not available:", error.message);
      }
    };

    // Add a small delay to ensure the CDN script has loaded
    const timer = setTimeout(loadPreline, 100);

    return () => clearTimeout(timer);
  }, [path]);

  return null;
}