// components/TawkChat.tsx
// Tawk.to live chat widget for Hiddenbrooke Resort
// 100% free — no API key or payment needed
// Replace TAWK_PROPERTY_ID with your actual ID from tawk.to dashboard

"use client";

import { useEffect } from "react";

// ─── REPLACE THIS with your actual Tawk.to Property ID ───────────────────────
// Find it in: tawk.to Dashboard → Administration → Channels → Chat Widget
// It's in the script snippet URL: https://embed.tawk.to/YOUR_ID_HERE/default
const TAWK_PROPERTY_ID = "6999bef2b93b9b1c36687616";
const TAWK_WIDGET_ID = "1ji093ou5";

export default function TawkChat() {
  useEffect(() => {
    // Don't load twice
    if (document.getElementById("tawk-script")) return;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    // Set up Tawk API object
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    (window as any).Tawk_LoadTime = new Date();

    // Inject the Tawk.to script
    const script = document.createElement("script");
    script.id = "tawk-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const existing = document.getElementById("tawk-script");
      if (existing) existing.remove();
    };
  }, []);

  return null;
}
