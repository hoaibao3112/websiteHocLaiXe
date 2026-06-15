"use client";

import { Phone } from "lucide-react";

// Custom Zalo SVG Icon
const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2.004 12c0 5.013 4.417 9.077 9.865 9.077a10.66 10.66 0 0 0 2.217-.23c.31-.064.62-.032.905.096l3.41 1.53c.478.214.996-.183.905-.688l-.667-3.708a1.272 1.272 0 0 1 .184-.875C20.375 15.69 21.05 13.9 21.05 12c0-5.013-4.417-9.077-9.865-9.077S2.004 6.987 2.004 12z" />
    <text x="12" y="15.5" fontWeight="900" fontSize="10.5" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif">Zalo</text>
  </svg>
);

export function HomepageContactForm() {
  const handleTrackClick = (channel: string) => {
    try {
      if (typeof window !== "undefined") {
        if ((window as any).fbq) {
          (window as any).fbq("track", "Contact", {
            content_category: "Homepage Contact Section",
            content_name: channel,
          });
        }
        if ((window as any).gtag) {
          (window as any).gtag("event", "contact", {
            event_category: "Engagement",
            event_label: `Homepage Contact Section ${channel}`,
            method: channel,
          });
        }
      }
    } catch (err) {
      console.error("Lỗi tracking liên hệ:", err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
      {/* Zalo Button */}
      <a
        href="https://zalo.me/0902868928"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleTrackClick("Zalo")}
        className="flex-1 flex items-center justify-center gap-3 bg-[#0068ff] hover:bg-[#0057d4] text-white font-extrabold px-6 py-4 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-[#0068ff]/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-98"
      >
        <ZaloIcon className="w-8 h-8 flex-shrink-0" />
        <span>NHẮN ZALO TƯ VẤN</span>
      </a>

      {/* Hotline Button */}
      <a
        href="tel:0902868928"
        onClick={() => handleTrackClick("Hotline")}
        className="flex-1 flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-6 py-4 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-amber-600/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-98"
      >
        <Phone className="w-5 h-5 flex-shrink-0 animate-bounce" />
        <span>GỌI HOTLINE HỖ TRỢ</span>
      </a>
    </div>
  );
}
