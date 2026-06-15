"use client";

import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

// Official Zalo Vector Icon (using paths for bubble & text to ensure perfect rendering across all browsers)
const ZaloIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* White Speech Bubble */}
    <path fillRule="evenodd" clipRule="evenodd" d="M7.779 43.5892C10.1019 43.846 13.0061 43.1836 15.0682 42.1825C24.0225 47.1318 38.0197 46.8954 46.4923 41.4732C46.8209 40.9803 47.1279 40.4677 47.4128 39.9363C49.1062 36.7779 50.0004 33.22 50.0004 27.1316V22.7175C50.0004 16.629 49.1062 13.0711 47.4128 9.91273C45.7385 6.75436 43.2461 4.28093 40.0877 2.58758C36.9293 0.894239 33.3714 0 27.283 0H22.8499C17.6644 0 14.2982 0.652754 11.4699 1.89893C11.3153 2.03737 11.1636 2.17818 11.0151 2.32135C2.71734 10.3203 2.08658 27.6593 9.12279 37.0782C9.13064 37.0921 9.13933 37.1061 9.14889 37.1203C10.2334 38.7185 9.18694 41.5154 7.55068 43.1516C7.28431 43.399 7.37944 43.5512 7.779 43.5892Z" fill="white"/>
    {/* Blue Zalo letters */}
    <path d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1801 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z" fill="#0068FF"/>
    <path d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z" fill="#0068FF"/>
    <path d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z" fill="#0068FF"/>
    <path d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z" fill="#0068FF"/>
    <path d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z" fill="#0068FF"/>
  </svg>
);

// Official Google Maps 2020 Vector Icon
const GoogleMapsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Green section */}
    <path fill="#34A851" d="M24 12.8116L23.9999 12.8541C23.9998 12.872 23.9996 12.8899 23.9994 12.9078C23.9998 12.9287 24 12.9498 24 12.971C24 16.3073 21.4007 19.2604 19.6614 21.2367C19.1567 21.8101 18.7244 22.3013 18.449 22.6957C17.4694 24.0986 16.9524 25.6184 16.8163 26.2029C16.8163 26.6431 16.4509 27 16 27C15.5491 27 15.1837 26.6431 15.1837 26.2029C15.0476 25.6184 14.5306 24.0986 13.551 22.6957C13.2756 22.3013 12.8433 21.8101 12.3386 21.2367C10.5993 19.2604 8 16.3073 8 12.971C8 12.9498 8.0002 12.9287 8.0006 12.9079C8.0002 12.8758 8 12.8437 8 12.8116C8 8.49736 11.5817 5 16 5C20.4183 5 24 8.49736 24 12.8116ZM16 15.6812C17.7132 15.6812 19.102 14.325 19.102 12.6522C19.102 10.9793 17.7132 9.62319 16 9.62319C14.2868 9.62319 12.898 10.9793 12.898 12.6522C12.898 14.325 14.2868 15.6812 16 15.6812Z"/>
    {/* Blue section */}
    <path fill="#4285F5" d="M23.1054 9.21856C22.1258 7.37546 20.4161 5.96177 18.3504 5.34277L13.7559 10.5615C14.3208 9.98352 15.1174 9.62346 16.0002 9.62346C17.7134 9.62346 19.1022 10.9796 19.1022 12.6524C19.1022 13.3349 18.8711 13.9646 18.4811 14.4711L23.1054 9.21856Z"/>
    {/* Yellow section */}
    <path fill="#F9BB0E" d="M12.4311 21.3425C12.4004 21.3076 12.3695 21.2725 12.3383 21.2371C11.1918 19.9344 9.67162 18.2073 8.76855 16.2257L13.5439 10.8018C13.1387 11.3136 12.8976 11.9556 12.8976 12.6526C12.8976 14.3254 14.2865 15.6816 15.9997 15.6816C16.8675 15.6816 17.6521 15.3336 18.2151 14.7727L12.4311 21.3425Z"/>
    {/* Red section */}
    <path fill="#E74335" d="M9.89288 7.76562C8.71207 9.12685 8 10.8881 8 12.8117C8 12.8438 8.0002 12.8759 8.0006 12.9079C8.0002 12.9288 8 12.9499 8 12.9711C8 14.1082 8.30196 15.2009 8.76889 16.2254L13.5362 10.8106L9.89288 7.76562Z"/>
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
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-4 animate-slide-up">
      
      {/* Facebook Messenger Button */}
      <a
        href="https://www.facebook.com/chienthangtiengiang2023/photos"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleTrackClick("Facebook")}
        className="group relative w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
        title="Nhắn tin qua Facebook"
      >
        <FacebookIcon className="w-6.5 h-6.5" />
        <span className="absolute right-16 bg-neutral-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Facebook Messenger
        </span>
      </a>

      {/* Zalo Chat Button */}
      <a
        href="https://zalo.me/0902868928"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleTrackClick("Zalo")}
        className="group relative w-14 h-14 bg-[#0068ff] hover:bg-[#0057d4] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300"
        title="Chat qua Zalo"
      >
        <ZaloIcon className="w-[44px] h-[44px]" />
        <span className="absolute right-16 bg-neutral-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Chat Zalo: 0902.868.928
        </span>
      </a>

      {/* Google Maps Directions Button */}
      <a
        href="https://maps.google.com/?q=168+QL1A,+Ấp+Phú+Hòa,+Xã+Mỹ+Thành,+Đồng+Tháp+(Tiền+Giang+Cũ),+Việt+Nam"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleTrackClick("GoogleMaps")}
        className="group relative w-14 h-14 bg-white hover:bg-neutral-50 text-neutral-800 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border border-neutral-100"
        title="Xem bản đồ đường đi"
      >
        <GoogleMapsIcon className="w-8 h-8" />
        <span className="absolute right-16 bg-neutral-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Chỉ đường Google Maps
        </span>
      </a>

      {/* Hotline Call Button */}
      <a
        href="tel:0902868928"
        onClick={() => handleTrackClick("Hotline")}
        className="group relative w-14 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse"
        title="Gọi ngay cho chúng tôi"
      >
        <Phone className="w-6.5 h-6.5 animate-bounce" />
        <span className="absolute right-16 bg-neutral-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Gọi Hotline: 0902.868.928
        </span>
      </a>

    </div>
  );
}
