"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

// Custom Zalo SVG Icon
const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M2.004 12c0 5.013 4.417 9.077 9.865 9.077a10.66 10.66 0 0 0 2.217-.23c.31-.064.62-.032.905.096l3.41 1.53c.478.214.996-.183.905-.688l-.667-3.708a1.272 1.272 0 0 1 .184-.875C20.375 15.69 21.05 13.9 21.05 12c0-5.013-4.417-9.077-9.865-9.077S2.004 6.987 2.004 12z" />
    <text x="12" y="15.5" fontWeight="900" fontSize="10.5" textAnchor="middle" fill="white" fontFamily="system-ui, sans-serif">Zalo</text>
  </svg>
);

// Custom Facebook SVG Icon
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.85z"/>
  </svg>
);

export function FloatingContactButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show buttons after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTrackClick = (channel: string) => {
    try {
      if (typeof window !== "undefined") {
        if ((window as any).fbq) {
          (window as any).fbq("track", "Contact", {
            content_category: "Floating Button",
            content_name: channel,
          });
        }
        if ((window as any).gtag) {
          (window as any).gtag("event", "contact", {
            event_category: "Engagement",
            event_label: `Floating Button ${channel}`,
            method: channel,
          });
        }
      }
    } catch (err) {
      console.error("Lỗi tracking liên hệ trực tiếp:", err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3.5 animate-slide-up">
      
      {/* Facebook Messenger Button */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleTrackClick("Facebook")}
        className="group relative w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
        title="Nhắn tin qua Facebook"
      >
        <FacebookIcon className="w-5.5 h-5.5" />
        <span className="absolute right-14 bg-neutral-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Facebook Messenger
        </span>
      </a>

      {/* Zalo Chat Button */}
      <a
        href="https://zalo.me/0902868928"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleTrackClick("Zalo")}
        className="group relative w-12 h-12 bg-[#0068ff] hover:bg-[#0057d4] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
        title="Chat qua Zalo"
      >
        <ZaloIcon className="w-9 h-9" />
        <span className="absolute right-14 bg-neutral-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Chat Zalo: 0902.868.928
        </span>
      </a>

      {/* Hotline Call Button */}
      <a
        href="tel:0902868928"
        onClick={() => handleTrackClick("Hotline")}
        className="group relative w-12 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse"
        title="Gọi ngay cho chúng tôi"
      >
        <Phone className="w-5 h-5 animate-bounce" />
        <span className="absolute right-14 bg-neutral-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Gọi Hotline: 0902.868.928
        </span>
      </a>

    </div>
  );
}
